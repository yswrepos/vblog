---
title: go encoding glob的使用场景和实例
date: 2024-02-28 18:50:14
tags: 
 - go 
 - 序列化反序列化
categories: go
---


# `encoding/gob` 简介
`encoding/gob` 是 Go 语言标准库中的一个包，用于进行 Go 对象的编码和解码（即序列化和反序列化）。"gob" 是 "Go binary" 的缩写，指的是 Go 语言特定的二进制编码格式。

`encoding/gob` 包提供了以下功能：

1. **序列化和反序列化**：`encoding/gob` 提供了 `Encoder` 和 `Decoder` 结构体，可以将 Go 对象编码为字节流（序列化），以及将字节流解码为 Go 对象（反序列化）。
   
2. **自定义类型支持**：可以注册自定义类型，以便正确地进行序列化和反序列化。

3. **高效性**：`encoding/gob` 采用了一些技术来提高性能，例如采用了高效的二进制编码格式，以及一些内部优化策略。

4. **跨语言兼容性**：虽然 `encoding/gob` 是针对 Go 对象的，但是也提供了一些支持，使得可以将 Go 对象序列化为二进制格式，然后与其他语言进行通信。

总的来说，`encoding/gob` 是 Go 语言中用于处理对象序列化和反序列化的标准库包，它提供了一种高效、易用的方式来进行数据编码和解码。

# 使用场景和示例

以下是 `encoding/gob` 包的一些使用示例和使用场景：

### 使用示例：

1. **序列化和反序列化 Go 对象**：

```go
package main

import (
	"bytes"
	"encoding/gob"
	"fmt"
)

type Person struct {
	Name string
	Age  int
}

func main() {
	// 创建一个 Person 对象
	person := Person{Name: "Alice", Age: 30}

	// 创建一个字节缓冲区用于存储序列化后的数据
	var buffer bytes.Buffer

	// 创建编码器并将数据编码到缓冲区
	encoder := gob.NewEncoder(&buffer)
	err := encoder.Encode(person)
	if err != nil {
		fmt.Println("Encode error:", err)
		return
	}

	// 创建解码器并从缓冲区解码数据
	var decodedPerson Person
	decoder := gob.NewDecoder(&buffer)
	err = decoder.Decode(&decodedPerson)
	if err != nil {
		fmt.Println("Decode error:", err)
		return
	}

	// 打印解码后的 Person 对象
	fmt.Println(decodedPerson)
}
```

2. **自定义类型的序列化和反序列化**：

```go
package main

import (
	"bytes"
	"encoding/gob"
	"fmt"
)

type Point struct {
	X, Y int
}

func main() {
	// 注册自定义类型
	gob.Register(Point{})

	// 创建一个 Point 对象
	point := Point{X: 10, Y: 20}

	// 创建一个字节缓冲区用于存储序列化后的数据
	var buffer bytes.Buffer

	// 创建编码器并将数据编码到缓冲区
	encoder := gob.NewEncoder(&buffer)
	err := encoder.Encode(point)
	if err != nil {
		fmt.Println("Encode error:", err)
		return
	}

	// 创建解码器并从缓冲区解码数据
	var decodedPoint Point
	decoder := gob.NewDecoder(&buffer)
	err = decoder.Decode(&decodedPoint)
	if err != nil {
		fmt.Println("Decode error:", err)
		return
	}

	// 打印解码后的 Point 对象
	fmt.Println(decodedPoint)
}
```

<!-- more -->

### 使用场景：

1. **RPC（远程过程调用）**：`encoding/gob` 可以用于在客户端和服务器之间传输 Go 对象，例如在使用 Go 的标准库中的 `net/rpc` 或者一些第三方的 RPC 框架时。

2. **持久化存储**：可以使用 `encoding/gob` 将 Go 对象序列化后存储到文件或者数据库中，以及从文件或者数据库中读取并反序列化为 Go 对象。

3. **消息队列**：`encoding/gob` 也可以用于消息队列系统中，例如将消息以二进制格式编码后发送到消息队列，然后从消息队列中接收并解码消息。

4. **跨语言通信**：虽然 `encoding/gob` 主要针对 Go 对象，但是也可以将 Go 对象序列化为二进制格式，然后与其他语言进行通信，尤其适用于使用 Go 编写的服务与其他服务进行通信时。

# 跨语言通信示例



在使用 `encoding/gob` 进行跨语言通信时，需要将 Go 对象序列化成二进制格式，然后通过网络传输给其他语言的系统或服务。接收方可以根据其所使用的语言和框架，使用相应的反序列化方法将二进制数据转换回原始数据格式。下面是一个简单的示例：

假设我们有一个 Go 程序，它将一个结构体 `Person` 序列化成二进制数据并通过网络传输给另一个程序，另一个程序使用 Python 来接收并反序列化这个数据。

Go 程序示例：

```go
package main

import (
	"bytes"
	"encoding/gob"
	"fmt"
	"net"
)

type Person struct {
	Name string
	Age  int
}

func main() {
	// 创建一个 Person 对象
	person := Person{Name: "Alice", Age: 30}

	// 创建一个字节缓冲区用于存储序列化后的数据
	var buffer bytes.Buffer

	// 创建编码器并将数据编码到缓冲区
	encoder := gob.NewEncoder(&buffer)
	err := encoder.Encode(person)
	if err != nil {
		fmt.Println("Encode error:", err)
		return
	}

	// 创建一个 TCP 连接并将序列化后的数据发送给接收方
	conn, err := net.Dial("tcp", "localhost:12345")
	if err != nil {
		fmt.Println("Dial error:", err)
		return
	}
	defer conn.Close()

	_, err = conn.Write(buffer.Bytes())
	if err != nil {
		fmt.Println("Write error:", err)
		return
	}

	fmt.Println("Data sent successfully")
}
```

Python 程序示例：

```python
import socket
import pickle

class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

# 创建一个 TCP 服务器来接收数据
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.bind(('localhost', 12345))
server_socket.listen(1)
print("Waiting for connection...")

conn, addr = server_socket.accept()
print("Connection established with", addr)

# 接收数据
data = conn.recv(4096)

# 反序列化数据
received_person = pickle.loads(data)

print("Received data:", received_person.name, received_person.age)
```

在这个示例中，Go 程序通过 `encoding/gob` 序列化了一个 `Person` 对象，并通过 TCP 连接发送了序列化后的数据。Python 程序通过 `pickle` 模块接收并反序列化了这个数据，并打印了接收到的 `Person` 对象的属性值。

