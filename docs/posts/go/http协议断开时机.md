---
layout: posts
title: http协议断开时机
date: 2024-01-24 20:16:49
tags:
 - https
 - web
 - 协议
categories:
 - web
---

## http协议断开的取决因素

HTTP 连接断开的时机主要取决于 HTTP 协议的版本（如 HTTP/1.1 或 HTTP/2）以及特定的服务器和客户端配置。这里有几种常见的情况：

1. **HTTP/1.0 默认行为**：在 HTTP/1.0 中，默认情况下，每个请求完成后连接都会关闭。这意味着对于每个新请求，客户端都需要建立一个新的连接。

2. **HTTP/1.1 持久连接**：HTTP/1.1 引入了持久连接（也称为连接复用），在这种情况下，连接在发送和接收多个请求/响应后仍然保持打开状态。这样做可以减少建立和关闭连接的开销。除非显式使用 `Connection: close` 头部指示关闭，否则连接将保持开启。

3. **超时**：无论是 HTTP/1.1 还是 HTTP/2，服务器和客户端通常都有一个超时设置。如果在指定的超时时间内没有数据传输，连接将自动关闭。

4. **服务器或客户端主动关闭**：服务器或客户端可以随时通过发送适当的信号来主动关闭连接。

5. **错误或异常**：在发生错误或异常情况（如网络故障、协议错误等）时，连接可能会被迫关闭。

6. **HTTP/2 的多路复用**：HTTP/2 进一步优化了连接的使用，允许在单一连接上同时进行多个请求和响应的交换。即使多个请求同时进行，连接也会保持开启，直到客户端或服务器决定关闭或发生超时。

<!-- more -->

## http协议版本选择的取决因素

本（HTTP/1.0、HTTP/1.1 或 HTTP/2）实际上并不取决于 Vue 或 Axios 本身，而是取决于几个其他因素：

1. **服务器配置**：最关键的因素是你的后端服务器支持哪种 HTTP 协议版本。如果服务器配置为支持 HTTP/2，那么在支持 HTTP/2 的环境下（如客户端和网络基础设施支持），将使用 HTTP/2。否则，将回退到 HTTP/1.1 或 HTTP/1.0。

2. **客户端支持**：客户端（例如浏览器）也必须支持 HTTP/2 才能使用这个协议。大多数现代浏览器都支持 HTTP/2。

3. **网络环境**：有时网络环境（如代理、负载均衡器等）可能对使用的协议版本有所影响，尤其是在复杂的企业网络中。

在实际应用中，如果你的后端服务器支持 HTTP/2，并且客户端（浏览器）也支持，那么当你使用 Axios 发出请求时，很可能是通过 HTTP/2 进行通信的。但如果服务器只支持 HTTP/1.1 或 HTTP/1.0，那么即使客户端支持 HTTP/2，通信也只能使用 HTTP/1.x。

可以通过浏览器的开发者工具（通常在“网络”或“Network”标签页中）检查实际的 HTTP 协议版本。在发送请求后，查找相关的 HTTP 请求，通常可以在响应头或请求头中找到表示 HTTP 协议版本的信息。

## HTTP2协议

HTTP/2.0 的多路复用（Multiplexing）是一种允许在单个 TCP 连接上同时发送和接收多个请求和响应的机制。这与 HTTP/1.x 不同，在 HTTP/1.x 中，每个请求/响应循环都需要一个单独的连接或在连接上进行顺序处理（HTTP/1.1 中的流水线处理也受限于头阻塞问题）。多路复用是 HTTP/2 的关键特性之一，它带来了显著的性能提升。

**多路复用的工作原理：**

- 同时处理多个请求/响应：在 HTTP/2 中，一个连接可以同时处理多个请求和响应。这意味着不同的请求可以同时在一个连接上开始和结束，而不会互相干扰。

- 帧和流：HTTP/2 将数据传输分解成小的帧，这些帧属于不同的流（每个流对应一个请求/响应循环）。这允许同时交错传输多个请求和响应的帧，而不会相互影响。

- 减少延迟和提高效率：由于避免了建立多个连接的开销和减少了头阻塞（一个请求阻塞其他请求的情况），多路复用能够减少延迟，并提高网络通信的效率

## 使用Gin和Nginx提供http2协议的web服务

### Gin

对于 Gin 来说，没有特殊的配置是必需的来支持 HTTP/2.0，因为它依赖于 Go 的 net/http 包，后者从 Go 1.6 版本开始默认支持 HTTP/2.0。只要你的 Go 版本高于 1.6，并且你没有在代码中禁用 HTTP/2.0，Gin 就已经准备好支持 HTTP/2.0 了。

### Nginx

- **确认Nginx 版本**：确保你使用的 Nginx 版本支持 HTTP/2.0。从 Nginx 1.9.5 开始，HTTP/2.0 得到了支持。

- **使用SSL/TLS**：HTTP/2.0 需要 SSL/TLS（HTTPS），**因为大多数浏览器仅在 HTTPS 下支持 HTTP/2.0**。因此，你需要为你的 Nginx 服务器配置 SSL 证书和密钥。

- **开启 HTTP/2.0**：在 Nginx 配置文件中，你需要为监听的端口**添加 http2 参数**。通常，这会在 `server` 块的 `listen` 指令中指定。

**示例：**

```conf

server {
    listen 443 ssl http2;
    server_name example.com;

    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;

    location / {
        proxy_pass http://your_gin_server;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

```

### 服务端关闭连接

在服务器端，关闭连接的方式通常取决于特定的编程语言和框架。例如，对于基于 Node.js 的服务器，你可以在处理完请求后显式地关闭连接。对于其他服务器软件，如 Apache 或 Nginx，通常会根据配置的超时时间自动管理连接的关闭。

总的来说，设置超时和关闭连接的具体方法将依赖于你使用的具体技术栈和工具。需要参考相关的文档和实践来准确实施。

**对于常见的 Web 服务器**

1. **Nginx**：在 Nginx 中，你可以通过修改配置文件来设置超时参数，如 `keepalive_timeout` 和 `proxy_read_timeout`。

   示例：

   ```nginx
   http {
       ...
       keepalive_timeout 30;
       ...
   }
   ```

2. **Apache**：在 Apache 中，使用 `Timeout` 指令来设置超时时间。

   示例：

   ```apache
   Timeout 30
   ```

3. **Gin设置读写超时**
通过在服务器级别设置读写超时，可以在特定时间内没有活动时自动关闭连接。这不是立即关闭连接的方法，但它可以确保连接不会无限期地保持打开状态。

```go
server := &http.Server{
    Addr:         ":8080",
    Handler:      router,
    ReadTimeout:  5 * time.Second,
    WriteTimeout: 10 * time.Second,
}
server.ListenAndServe()
```

4. **Node.js \(Express, Koa, etc.\)**：在 Node.js 的 HTTP 服务器中，可以使用 `server.timeout` 属性来设置超时。

   示例：

   ```javascript
   const server = app.listen(port);
   server.timeout = 30000; // Timeout in milliseconds
   ```

### 客户端主动关闭 HTTP 连接

对于客户端来说，如何关闭连接取决于你使用的 HTTP 客户端库。

1. **Axios \(JavaScript\)**：在 Axios 中，你可以通过配置取消令牌（cancel token）来取消请求，从而间接关闭连接。

   示例：

   ```javascript
   const CancelToken = axios.CancelToken;
   const source = CancelToken.source();

   axios.get('/user/12345', {
     cancelToken: source.token
   }).catch(function (thrown) {
     if (axios.isCancel(thrown)) {
       console.log('Request canceled', thrown.message);
     } else {
       // 处理错误
     }
   });

   // 取消请求
   source.cancel('Operation canceled by the user.');
   ```

2. **cURL\(命令行\)**：在使用 cURL 发送请求时，你可以简单地使用 Ctrl+C 组合键来终止命令，从而关闭连接。

3. **其他编程语言和库**：大多数 HTTP 客户端库都提供了取消正在进行的 HTTP 请求的方法。具体实现取决于库和编程语言。