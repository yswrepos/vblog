---
layout: posts
title: go tcp服务器+mac压测
date: 2024-01-24 14:30:49
tags:
 - go
 - tcp
categories:
 - go
---

以下是一个基本的会记录链接数量、记录日志打印并且等到所有日志和连接关闭过后再关闭的TCP服务器:

<!-- more -->
```go
package main

import (
	"bufio"
	"fmt"
	"log"
	"net"
	"os"
	"os/signal"
	"strings"
	"sync"
	"syscall"
)

var (
	mu                sync.Mutex
	activeConnections int
	logChan           chan string    // 用于日志信息的channel
	stopChan          chan struct{}  // 用于通知程序停止的通道
	wg                sync.WaitGroup // 等待所有连接关闭
	logWorkerDone     sync.WaitGroup // 用于等待logWorker完成
)

func main() {

	PORT := ":9090"
	logChan = make(chan string, 100) // 初始化channel，缓冲大小设置为100
	stopChan = make(chan struct{})   // 初始化stopChan
	go logWorker()                   // 启动日志goroutine

	listener, err := net.Listen("tcp", PORT)
	if err != nil {
		logChan <- fmt.Sprintf("Error listening: %s\n", err.Error())
		os.Exit(1)
	}
	defer listener.Close()
	logChan <- fmt.Sprintf("Listening on %s\n", PORT)

	go handleSignals(listener)

	for {
		conn, err := listener.Accept()
		if err != nil {
			select {
			case <-stopChan:
				// 如果stopChan有信号，表示应该关闭服务器
				logChan <- "Shutdown signal received, stopping accept new connections.\n"
				wg.Wait() // 等待所有连接处理完毕
				fmt.Println("Waiting for log channel to be closed.")
				close(logChan)
				logWorkerDone.Wait() // 等待所有日志打印完成
				log.Println("Server has correctly closed.")
				return
			default:
				// 否则是一个不同的错误
				logChan <- fmt.Sprintf("Error accepting: %s\n", err.Error())
			}
			continue
		}
		connID := conn.RemoteAddr().String() // 使用远程地址作为连接的唯一标识符
		mu.Lock()
		activeConnections++
		logChan <- fmt.Sprintf("[%s] New connection accepted. Total connections: %d\n", connID, activeConnections)
		mu.Unlock()
		wg.Add(1) // 新增一个活动连接
		go handleRequest(conn, connID)
	}
}

func logWorker() {
	logWorkerDone.Add(1)
	defer logWorkerDone.Done()
	for logMsg := range logChan {
		fmt.Print(logMsg) // 串行打印日志消息
	}
}

func handleSignals(listener net.Listener) {
	signalChan := make(chan os.Signal, 1)
	signal.Notify(signalChan, os.Interrupt, syscall.SIGTERM)

	<-signalChan     // 等待信号
	close(stopChan)  // 关闭stopChan通知其他goroutine
	listener.Close() // 关闭监听器
}

func handleRequest(conn net.Conn, connID string) {
	defer conn.Close()
	defer func() {
		mu.Lock()
		activeConnections--
		logChan <- fmt.Sprintf("[%s] Connection closed. Total connections: %d\n", connID, activeConnections)
		mu.Unlock()
		wg.Done()
	}()

	reader := bufio.NewReader(conn)
	for {
		message, err := reader.ReadString('\n')
		if err != nil {
			logChan <- fmt.Sprintf("[%s] Error reading: %s\n", connID, err.Error())
			break
		}
		logChan <- fmt.Sprintf("[%s] Message received: %s", connID, string(message))
		conn.Write([]byte(message))
		if strings.TrimSpace(string(message)) == "STOP" {
			logChan <- fmt.Sprintf("[%s] TCP server stopping...\n", connID)
			break
		}
	}
}

```

## TCP压测工具 tcpkali

### nc

在Mac上连接到这个TCP服务器，您可以使用内置的`nc`（netcat）工具，或者使用任何TCP客户端程序。在终端中，可以使用以下命令：

```sh
nc localhost 9090
```

这会打开一个到本地机器上`9090`端口的TCP连接。您可以开始发送消息，服务器会将它们回显回来。

在命令行中使用 echo 命令和管道将消息传递给 nc，然后 nc 会发送这个消息并关闭连接。例如：

```sh
echo "Your message" | nc 127.0.0.1 9090
```

在这个命令中，echo 会发送一个消息，并且输出的结束会关闭管道，这会导致 nc 检测到EOF（文件结束符），然后 nc 会结束连接。

如果您想要在发送特定数量的数据后关闭连接，您可以使用 head 命令来仅发送输入的前N个字节，如下所示：

```sh
head -c 100 /dev/urandom | nc 127.0.0.1 9090
```

这个命令会发送随机数据的前100个字节到指定的服务器和端口，然后关闭连接。

对于一些更复杂的情况，您可能需要编写一个小的脚本来实现更精确的控制。

### tcpkali

为了进行压力测试，您可以使用像`wrk`或`ab`（Apache Bench）这样的工具。但是，它们主要用于HTTP服务器。对于TCP服务器，您可能需要使用像`tcpkali`或`tsung`这样的专用工具。下面是如何使用`tcpkali`进行基本压力测试的例子：

1. 安装`tcpkali`，在Mac上您可以使用Homebrew：

```sh
brew install tcpkali
```

2. 运行压力测试命令：

```sh
tcpkali -c 100 -m "Hello, World!\n" localhost:9090

# 每秒钟向服务器发送10条消息。 测试持续时间为60秒。
tcpkali -c 1000 -T 60s --message-rate 10 --message "Hello, server!" 192.168.1.100:1234
```

这个命令会启动100个并发连接到您的TCP服务器，并发送`Hello, World!`消息。`tcpkali`会报告每秒钟能够发送和接收的数据量，这是衡量TCP服务器性能的一个指标。

请注意，高性能服务器设计涉及多方面的内容，包括处理并发连接、资源管理和错误处理。上面的例子是一个起点，您可能需要根据实际需求进行调整。
