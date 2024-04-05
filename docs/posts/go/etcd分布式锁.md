---
title: etcd分布式锁
date: 2024-01-16 14:52:15
tags: 
  - go
  - 分布式锁
  - redis
  - etcd
categories:
  - go
  - 分布式
---

# <center>etcd分布式锁</center>
--- 

## 实现分布式锁需要注意的事项

- 锁的独占性： 确保任何时候只有一个客户端可以持有锁。

- 死锁的预防： 如果持有锁的进程崩溃或失去连接，需要有机制释放锁，防止死锁。

- 锁的可靠性： 确保在网络分区或节点故障的情况下，锁的行为是可预测和正确的。

- 锁的公平性： 确保锁的分配是公平的，避免某些进程长时间无法获取锁。

- 性能和可伸缩性： 锁服务应当能够高效处理请求，且能随着系统扩展而伸缩。

- 重入性： 根据需求，考虑是否需要支持重入锁（同一线程可重复获得锁）。

<!-- more -->

## 使用 etcd 实现分布式锁的步骤
etcd 提供了强一致性的键值存储，可以用于实现分布式锁。以下是使用 etcd 实现分布式锁的基本步骤：

- 创建租约： 首先为锁创建一个租约（lease）。租约具有时间限制，如果客户端崩溃，租约到期后锁会自动释放。

- 尝试获取锁： 通过在 etcd 中写入一个带有租约的键来尝试获取锁。如果键已存在（已被其他客户端持有），则获取锁失败。

- 监视锁： 如果获取锁失败，客户端可以监视这个键，等待它被删除或过期，然后再次尝试获取锁。

- 维持租约： 一旦获取到锁，客户端需要定期续约以保持锁的持有状态。

- 释放锁： 当完成任务后，客户端应删除对应的键，释放锁。

## 使用示例

```go
package main

import (
	"context"
	"fmt"
	"log"
	"math/rand"
	"sync"
	"time"

	clientv3 "go.etcd.io/etcd/client/v3"
	"go.etcd.io/etcd/client/v3/concurrency"
)

const (
	LOCK_KEY = "/tmp/go/lock"
)

var wg sync.WaitGroup

func watchLock(ctx context.Context, client *clientv3.Client) {
	wChan := client.Watch(ctx, LOCK_KEY)
	for wResp := range wChan {
		for _, ev := range wResp.Events {
			log.Printf("Type: %s, Key: %s, Value: %s", ev.Type, ev.Kv.Key, ev.Kv.Value)
		}
	}
}

func tryLockWithRetry(client *clientv3.Client, retryCount int, retryInterval time.Duration, id int) {
	// lease, err := cli.Grant(context.TODO(), 30)
	// session, err := concurrency.NewSession(cli, concurrency.WithLease(lease.ID))
	session, err := concurrency.NewSession(client)
	if err != nil {
		log.Fatalf("%d New Session Error: %v\n", id, err)
	}
	defer session.Close()
	mutex := concurrency.NewMutex(session, LOCK_KEY)
	defer wg.Done()
	for i := 0; i < retryCount; i++ {
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		err = mutex.Lock(ctx)
		cancel()

		if err != nil {
			if err == context.DeadlineExceeded {
				fmt.Printf("%d 尝试 %d 次后加锁超时，等待重试...\n", id, i+1)
				time.Sleep(retryInterval)
				continue
			} else {
				wg.Done()
				log.Fatal(err)
			}
		}

		min, max := 2, 8
		src := rand.NewSource(time.Now().UnixNano())
		r := rand.New(src)
		// rand.Intn(max-min+1) 生成一个介于 0（包含）和 max-min+1（不包含）之间的随机整数。
		sleepTime := time.Duration(r.Intn(max-min+1)+min) * time.Second

		fmt.Printf("%d 成功获取锁，执行业务逻辑\n", id)
		time.Sleep(sleepTime)
		fmt.Printf("%d 执行完毕，耗时: %.2f s\n", id, sleepTime.Seconds())

		if err = mutex.Unlock(context.Background()); err != nil {
			wg.Done()
			log.Fatal(err)
		} else {
			fmt.Printf("%d 释放锁成功\n", id)
		}
		return
	}
}

func main() {
	client, err := clientv3.New(clientv3.Config{
		Endpoints:   []string{"localhost:2379"},
		DialTimeout: 5 * time.Second,
	})

	if err != nil {
		log.Fatal(err)
	}

	defer client.Close()

	const N = 5

	wg.Add(N)

	for i := 0; i < N; i++ {
		go tryLockWithRetry(client, 3, 3*time.Second, i)
	}

	fmt.Println("等待子程序执行...")
	wg.Wait()
	fmt.Println("执行完毕 程序退出")

}

```

### 运行结果

![](/static/img/posts/etcd-lock-1.png)



