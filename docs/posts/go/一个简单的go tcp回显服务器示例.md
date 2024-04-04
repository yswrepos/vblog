---
layout: posts
title: 一个简单的go tcp回显服务器示例
date: 2024-01-09 14:47:49
tags:
 - go
categories:
 - go
---

```go

package main

import (
	"bufio"
	"fmt"
	"net"
	"os"
)

func main() {
	// 监听TCP端口
	listener, err := net.Listen("tcp", ":8080")
	if err != nil {
		fmt.Println("Error listening:", err.Error())
		os.Exit(1)
	}
	defer listener.Close()
	fmt.Println("Listening on :8080")

	for {
		// 接受新的连接
		conn, err := listener.Accept()
		if err != nil {
			fmt.Println("Error accepting: ", err.Error())
			continue
		}
		// 为每个连接启动一个新的协程
		go handleRequest(conn)
	}
}

// handleRequest 处理连接上的请求
func handleRequest(conn net.Conn) {
	defer conn.Close()

	reader := bufio.NewReader(conn)
	writer := bufio.NewWriter(conn)

	for {
		// 读取客户端的数据
		message, err := reader.ReadString('\n')
		if err != nil {
			if err != net.ErrClosed {
				fmt.Println("Error reading:", err.Error())
			}
			break
		}

		// 处理数据（这里简单地回显）
		fmt.Print("Message Received:", string(message))
		writer.WriteString(message)
		writer.Flush()
	}
}

```
<!-- more -->

Go语言的 `net` 包提供了创建和管理网络连接的高级接口。当你使用 `net.Listen` 和 `net.Accept` 方法创建和接受TCP连接时，Go的运行时系统在内部使用 `epoll`（在Linux平台上）来实现网络I/O操作的多路复用，但这个过程对于Go开发者是透明的。以下是这个机制的简化描述：

1. **监听端口**:
   - 当你调用 `net.Listen` 方法时，Go会在给定的网络地址上创建一个监听的socket。
   - 在Linux上，这个socket会被设置为非阻塞模式，这样系统调用就不会在等待I/O时挂起当前线程。

2. **等待连接**:
   - 接下来，当你调用监听socket的 `Accept` 方法时，Go会注册这个socket到 `epoll` 实例上，以便异步地等待新的连接。
   - 这时，`Accept` 方法通常会在一个无限循环中被调用，每次循环都尝试接受新的连接。

3. **使用 `epoll`**:
   - 在运行时内部，Go使用 `epoll` 创建了一个事件循环，等待文件描述符上的事件，如可读或可写事件。
   - 当一个新的连接到来时，`epoll` 会通知运行时系统，然后运行时会唤醒在 `Accept` 调用上阻塞的协程。

4. **处理连接**:
   - 每当 `Accept` 成功返回一个新的连接时，Go运行时通常会为该连接创建一个新的协程来处理。
   - 连接socket也被设置为非阻塞，并且注册到 `epoll` 实例上，以便异步地处理读写事件。

5. **协程调度**:
   - Go的协程调度器与网络I/O操作紧密集成。当协程等待网络操作时（例如：等待数据的到来），它会被标记为等待状态，并从OS线程上解绑。
   - 当 `epoll` 检测到对应的事件（例如：数据到达）时，运行时会重新唤醒协程，协程会在某个OS线程上继续执行。

6. **非阻塞I/O**:
   - 由于所有网络操作都是非阻塞的，所以Go可以在少量的OS线程上管理大量的协程。
   - 这样，即使一个协程因为I/O操作被阻塞，其他协程也可以继续在同一个线程上运行，大大提高了并发效率。

Go的运行时抽象了 `epoll` 的复杂性，允许开发者以同步的方式编写代码，就像是进行阻塞I/O调用一样。在底层，运行时使用 `epoll` 以非阻塞、高效的方式处理这些操作。这种模型使得Go非常适合编写高并发的网络服务。






