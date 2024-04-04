---
title: GO GRPC自定义注册和解析
date: 2024-02-29 01:22:48
tags:
 - go
 - grpc 
 - 服务发现
categories: go
---


## 实现自定义注册逻辑(ETCD版)
实现自定义注册逻辑相对自由，没有接口实现的限制：

```go
package registrar

import (
	"context"
	"fmt"
	"log"
	"time"

	clientv3 "go.etcd.io/etcd/client/v3"
)

type EtcdRegistrar struct {
	client  *clientv3.Client
	leaseId clientv3.LeaseID
}

func NewEtcdRegistrar(endpoints []string) *EtcdRegistrar {
	cli, err := clientv3.New(clientv3.Config{
		Endpoints:   endpoints,
		DialTimeout: 5 * time.Second,
	})

	if err != nil {
		log.Fatalf("Failed to connect to etcd: %v", err)
	}

	return &EtcdRegistrar{
		client: cli,
	}
}
// 往etcd注册服务名-地址
func (r *EtcdRegistrar) Register(serviceName string, addr string, ttl int64) error {
	leaseResp, err := r.client.Grant(context.Background(), ttl)
	if err != nil {
		return err
	}
	r.leaseId = leaseResp.ID

	_, err = r.client.Put(context.Background(), fmt.Sprintf("/%s/%s", serviceName, addr), addr, clientv3.WithLease(r.leaseId))

	return err
}

```

<!-- more -->

## 实现自定义解析器(Resolver)
要实现 gRPC 中的自定义 `Resolver`，你需要遵循以下步骤：

### 1. 实现 `resolver.Builder` 接口

#### 接口签名

```go 
// Builder creates a resolver that will be used to watch name resolution updates.
type Builder interface {
	// Build creates a new resolver for the given target.
	//
	// gRPC dial calls Build synchronously, and fails if the returned error is
	// not nil.
	Build(target Target, cc ClientConn, opts BuildOptions) (Resolver, error)
	// Scheme returns the scheme supported by this resolver.  Scheme is defined
	// at https://github.com/grpc/grpc/blob/master/doc/naming.md.  The returned
	// string should not contain uppercase characters, as they will not match
	// the parsed target's scheme as defined in RFC 3986.
	Scheme() string
}
```

- **目的**：`Builder` 接口用于创建 `Resolver` 实例。
- **方法**：
  - `Build(target resolver.Target, cc resolver.ClientConn, opts resolver.BuildOptions) (resolver.Resolver, error)`: 根据给定的目标地址、客户端连接接口和构建选项来创建 `Resolver`。
  - `Scheme() string`: 返回这个 `Builder` 支持的方案（scheme）名称，例如 `"myScheme"`。

### 2. 实现 `resolver.Resolver` 接口

#### 接口签名
```go
// Resolver watches for the updates on the specified target.
// Updates include address updates and service config updates.
type Resolver interface {
	// ResolveNow will be called by gRPC to try to resolve the target name
	// again. It's just a hint, resolver can ignore this if it's not necessary.
	//
	// It could be called multiple times concurrently.
	ResolveNow(ResolveNowOptions)
	// Close closes the resolver.
	Close()
}
```
- **目的**：`Resolver` 接口定义了解析器如何监视目标地址的更新。
- **方法**：
  - `ResolveNow(resolver.ResolveNowOptions)`: 当 gRPC 客户端需要立即解析目标地址时，该方法会被调用。
  - `Close()`: 当解析器不再需要时，清理资源。

### 3. 注册自定义 `Builder`
- **操作**：使用 `resolver.Register()` 函数注册你的自定义 `Builder`。
- **示例**：
  ```go
  func init() {
      resolver.Register(&MyResolverBuilder{})
  }
  ```

### 详细叙述每一步的意义：

#### 实现 `resolver.Builder` 接口
- 这一步是定义如何构建你的自定义解析器的逻辑。`Build` 方法是创建和初始化 `Resolver` 实例的关键，它接收目标地址和客户端连接，返回一个 `Resolver`。`Scheme` 方法定义了你的解析器将要处理的 URI 方案（scheme），它在 URI 中用于标识使用哪个解析器。

#### 实现 `resolver.Resolver` 接口
- 这一步是定义解析器的行为。`Resolver` 负责实际的地址解析逻辑，包括如何响应解析请求和何时更新地址信息。`ResolveNow` 方法提供了一种机制，让 gRPC 客户端可以要求解析器立即进行解析操作。`Close` 方法则用于当解析器被废弃时的资源清理工作。

#### 注册自定义 `Builder`
- 通过注册过程，你的 `Builder` 实现被添加到 gRPC 的解析器注册表中。这样，当 gRPC 客户端遇到使用你的方案（scheme）的 URI 时，就会使用你的解析器来处理。注册通常在包的 `init` 函数中完成，以确保在程序启动时自动进行。

### 代码示例

```go 
package resolver

import (
	"context"
	"fmt"
	"log"
	"strings"
	"time"

	clientv3 "go.etcd.io/etcd/client/v3"
	"google.golang.org/grpc/resolver"
)

type etcdResolver struct {
	serviceName string
	client      *clientv3.Client
}

func NewEtcdResolver(endpoints []string, serviceName string) resolver.Builder {
	cli, err := clientv3.New(clientv3.Config{
		Endpoints:   endpoints,
		DialTimeout: 5 * time.Second,
	})
	if err != nil {
		log.Fatalf("Failed to connect to etcd: %v", err)
	}
	return &etcdResolver{
		serviceName: serviceName,
		client:      cli,
	}
}

func (r *etcdResolver) Build(target resolver.Target, cc resolver.ClientConn, opts resolver.BuildOptions) (resolver.Resolver, error) {
	prefix := fmt.Sprintf("/%s/", r.serviceName)
	log.Println("prefix", prefix)
	resp, err := r.client.Get(context.Background(), prefix, clientv3.WithPrefix())

	if err != nil {
		return nil, err
	}

	var addresses []resolver.Address
	for _, kv := range resp.Kvs {
		addr := strings.TrimPrefix(string(kv.Key), prefix)
		log.Println("addr", addr)
		addresses = append(addresses, resolver.Address{Addr: addr})
	}
    // 调用resolver.ClientConn通知客户端地址改变
	cc.UpdateState(resolver.State{Addresses: addresses})

	return r, nil

}

func (*etcdResolver) Scheme() string                          { return "etcd" }
func (*etcdResolver) ResolveNow(o resolver.ResolveNowOptions) {}
func (*etcdResolver) Close()

```

### `resolver.ClientConn`的作用

在 gRPC 中，`ClientConn` 接口在自定义解析器的上下文中扮演着重要的角色。这个接口为解析器提供了一种与 gRPC 客户端连接（ClientConn）进行交互的机制。通过这个接口，解析器能够通知 gRPC 客户端关于服务地址或服务配置的任何更新。

### `ClientConn` 接口的作用

1. **更新通知**:
   - `ClientConn` 接口包含一组回调函数，这些回调使得解析器能够将服务发现的结果或变化通知给 gRPC 客户端连接。
   - 例如，当解析器发现新的服务地址时，它可以使用这些回调来更新 gRPC 客户端的连接信息。

2. **服务地址和配置管理**:
   - 解析器通过 `ClientConn` 接口通知 gRPC 客户端有关服务地址的新信息或变更，以及任何相关的服务配置。
   - 这包括添加新的服务地址、删除旧的服务地址或更新服务配置。

### 注释的含义

当注释说“ClientConn contains the callbacks for resolver to notify any updates to the gRPC ClientConn”，这意味着：

- `ClientConn` 接口内部定义了一组回调函数。
- 这些回调函数是由解析器调用的，用于将关于服务地址或配置的更新传递给 gRPC 客户端连接。
- 解析器利用这些回调来告知 gRPC 客户端它需要知道的任何重要信息，如地址更改、服务配置更新等。

### 为什么用回调函数

使用回调函数的设计允许解析器在有新的信息时主动通知 gRPC 客户端，而不是让客户端定期轮询解析器以获取更新。这种推送机制更高效，能够确保 gRPC 客户端及时获得最新的服务信息，从而做出快速响应。

这个机制对于实现动态服务发现和负载均衡特别重要，因为服务实例可能会经常变化，而客户端需要即时获得这些变化的信息以保持连接的有效性和优化性能。


```go
// ClientConn 包含解析器用来通知 gRPC ClientConn 任何更新的回调函数。
//
// 这个接口由 gRPC 实现。用户通常不需要全新实现这个接口。像测试这样的情况下，
// 新的实现应该嵌入这个接口。这允许 gRPC 向这个接口添加新的方法。
type ClientConn interface {
    // UpdateState 根据需要更新 ClientConn 的状态。
    //
    // 如果返回错误，解析器应该再次尝试解析目标。解析器应该使用回退计时器
    // 避免对服务器请求过载。如果解析器确信重新解析不会改变结果，
    // 比如因为它是基于监视的解析器，返回的错误可以被忽略。
    //
    // 如果解析出的 State 与上次报告的相同，可以省略调用 UpdateState。
    UpdateState(State) error
    // ReportError 通知 ClientConn 解析器遇到了错误。ClientConn 将通知负载均衡器，
    // 并开始以指数回退的方式调用解析器的 ResolveNow。
    ReportError(error)
    // NewAddress 由解析器调用，用于通知 ClientConn 一组新解析出的地址。
    // 地址列表应该是完整的解析地址列表。
    //
    // 已废弃：请改用 UpdateState。
    NewAddress(addresses []Address)
    // NewServiceConfig 由解析器调用，用于通知 ClientConn 一个新的服务配置。
    // 服务配置应以 json 字符串形式提供。
    //
    // 已废弃：请改用 UpdateState。
    NewServiceConfig(serviceConfig string)
    // ParseServiceConfig 解析提供的服务配置，并返回一个提供解析配置的对象。
    ParseServiceConfig(serviceConfigJSON string) *serviceconfig.ParseResult
}

```

## 解析器为什么不设计成实现一个接口

将 `resolver.Builder` 和 `resolver.Resolver` 分成两个不同的接口是为了分离关注点，提高代码的模块化和灵活性。这种设计模式允许更清晰地定义每个接口的职责，并使得代码更易于维护和扩展。下面详细解释这样设计的意义：

### 1. 分离构建与解析逻辑
- **`resolver.Builder`** 负责创建 `resolver.Resolver` 的实例。它的主要作用是根据给定的目标地址和构建选项来“构建”或“创建”一个新的解析器。
- **`resolver.Resolver`** 负责实际的地址解析工作。它需要持续运行，监听地址的变化，并在必要时更新地址信息。

这种分离确保了解析器的创建和解析逻辑可以独立变化和优化，而不会相互影响。

### 2. 提高扩展性和灵活性
- 通过分开的接口，可以在不修改现有 `Resolver` 实现的情况下，添加新的 `Builder` 来支持不同的解析策略或配置。
- 这种设计使得添加新的解析器类型或更改解析器的创建逻辑变得更加灵活。

### 3. 降低复杂性和提高可维护性
- 将复杂的功能分解成更小、更专注的部分，可以降低单个组件的复杂性。
- 每个接口专注于一组明确的职责，使得代码更容易理解和维护。

### 4. 适应不同的使用场景
- 在某些情况下，可能需要根据运行时的具体条件动态创建不同类型的解析器。`Builder` 接口允许在运行时根据需要构建适当的 `Resolver` 实例。

### 5. 符合设计模式的最佳实践
- 这种设计模式类似于工厂模式，其中 `Builder` 充当工厂，负责创建 `Resolver` 对象。这是一种常见的设计模式，用于创建对象，尤其是在对象的创建过程比较复杂或需要依据不同条件创建不同类型的对象时。

总的来说，通过将 `Builder` 和 `Resolver` 分成两个接口，gRPC 的设计者能够提供一个既灵活又易于管理的解析器架构，使得开发者可以根据自己的需求定制服务发现和地址解析的行为。