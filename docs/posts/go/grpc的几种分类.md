---
title: grpc的几种分类
date: 2024-02-24 13:41:25
tags:
---


## GRPC双向流

### proto


```proto
syntax = "proto3";

package pb;

option go_package="./;pb";

service NotificationService {
  // 双向流式RPC
  rpc Connect (stream ClientRequest) returns (stream ServerResponse);
}

message ClientRequest {
  string message = 1;
}

message ServerResponse {
  string notification = 1;
}

```

### 服务端

```go
package main

import (
	"io"
	"log"
	"net"
	"strconv"
	"sync/atomic"
	"temp/grpc_stream/pb"

	"google.golang.org/grpc"
)

type server struct {
	pb.UnimplementedNotificationServiceServer
}

var clientIDCounter int64 // 用于生成唯一客户端ID

func (s *server) Connect(stream pb.NotificationService_ConnectServer) error {
	// 生成客户端ID
	clientID := atomic.AddInt64(&clientIDCounter, 1)
	clientLogPrefix := "Client " + strconv.FormatInt(clientID, 10) + ": "

	// 可以选择在此处添加逻辑来处理元数据（metadata）

	for {
		in, err := stream.Recv()
		if err == io.EOF {
			// 客户端关闭连接
			log.Println(clientLogPrefix + "Connection closed")
			return nil // 正常关闭连接
		}
		if err != nil {
			log.Printf(clientLogPrefix+"Failed to receive a note: %v", err)
			return err // 返回错误，但不关闭服务器
		}

		log.Println(clientLogPrefix + in.GetMessage())

		// 基于客户端请求或其他逻辑，服务器可以随时发送通知
		if err := stream.Send(&pb.ServerResponse{Notification: "New Notification"}); err != nil {
			log.Printf(clientLogPrefix+"Failed to send a notification: %v", err)
			return err // 同样，返回错误但不关闭服务器
		}
	}
}

func main() {
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterNotificationServiceServer(s, &server{})
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}

```

### 客户端

```go
package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"temp/grpc_stream/pb"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func main() {

	conn, err := grpc.Dial("localhost:50051", grpc.WithTransportCredentials(insecure.NewCredentials()), grpc.WithBlock())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	c := pb.NewNotificationServiceClient(conn)

	stream, err := c.Connect(context.Background())
	if err != nil {
		log.Fatalf("could not connect: %v", err)
	}

	go func() {
		// 创建一个5秒后发送当前时间的通道
		timeout := time.After(5 * time.Second)
		// for {
		// 	// 发送请求到服务器
		// 	if err := stream.Send(&pb.ClientRequest{Message: "Hello"}); err != nil {
		// 		log.Fatalf("Failed to send a message: %v", err)
		// 	}
		// 	time.Sleep(time.Second)
		// }
		for {
			select {
			case <-timeout:
				// 5秒后停止发送消息
				log.Println("Timeout reached, stop sending messages")
				// 此方法会发送io.EOF
				err := stream.CloseSend()
				if err != nil {
					log.Fatalf("Failed to close stream: %v", err)
				}
				return // 使用return来退出goroutine
			default:
				// 发送请求到服务器
				if err := stream.Send(&pb.ClientRequest{Message: "Hello"}); err != nil {
					log.Fatalf("Failed to send a message: %v", err)
				}
				time.Sleep(time.Second)
			}
		}
	}()

	fmt.Println("干")

	for {
		// 接收来自服务器的通知
		in, err := stream.Recv()
		if err == io.EOF {
			// 服务器关闭连接
			break
		}
		if err != nil {
			log.Fatalf("Failed to receive a notification : %v", err)
		}
		log.Printf("Received notification %s", in.Notification)
	}

}

```

<!-- more -->

## GRPC服务端流


### proto

```proto
syntax = "proto3";

package stream_service;

option go_package="./;stream_service";

// 定义一个点
message Point {
  int32 latitude = 1;
  int32 longitude = 2;
}

// 定义一个特性
message Feature {
  string name = 1;
  Point location = 2;
}

// 服务定义
service StreamService {
  // 服务器端流RPC方法
  rpc ListFeatures(Point) returns (stream Feature);
}

```

### 服务端
```go
package main

import (
	"log"
	"net"
	stream_service "temp/grpc_server_stream/pb"

	"google.golang.org/grpc"
)

type server struct {
	stream_service.UnimplementedStreamServiceServer
}

func (s *server) ListFeatures(req *stream_service.Point, stream stream_service.StreamService_ListFeaturesServer) error {
	features := []stream_service.Feature{
		{Name: "Feature1", Location: &stream_service.Point{Latitude: 1, Longitude: 2}},
		{Name: "Feature2", Location: &stream_service.Point{Latitude: 3, Longitude: 4}},
	}

	for _, feature := range features {
		if err := stream.Send(&feature); err != nil {
			return err
		}
	}
	return nil
}

func main() {
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	// 为grpc服务器注册服务，并调用Serve开始服务
	s := grpc.NewServer()
	stream_service.RegisterStreamServiceServer(s, &server{})
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}

```

### 客户端

```go 
package main

import (
	"context"
	"io"
	"log"
	stream_service "temp/grpc_server_stream/pb"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func main() {
	conn, err := grpc.Dial("localhost:50051", grpc.WithTransportCredentials(insecure.NewCredentials()), grpc.WithBlock())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	c := stream_service.NewStreamServiceClient(conn)
	// 创建一个Point请求
	point := &stream_service.Point{Latitude: 1, Longitude: 2}
	stream, err := c.ListFeatures(context.Background(), point)

	if err != nil {
		log.Fatalf("could not list features: %v", err)
	}

	for {
		feature, err := stream.Recv()
		if err == io.EOF {
			// 流结束
			break
		}
		if err != nil {
			log.Fatalf("Failed to receive a feature : %v", err)
		}
		log.Printf("Feature: %s, Location: (%d, %d)", feature.Name, feature.Location.Latitude, feature.Location.Longitude)
	}
}

```