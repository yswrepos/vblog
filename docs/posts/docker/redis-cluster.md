---
title: docker redis集群
date: 2023-11-26 23:42:02
tags:
---

## 创建网络
```sh
docker network create redis-cluster-net
```

<!-- more -->
## 启动redis

创建由3个redis节点

```sh
docker run -d --name redis-node1 --net redis-cluster-net -p 7000:6379 -v /docker/redis-cluster/redis-node1:/data redis:6.2 redis-server --appendonly yes --cluster-enabled yes --cluster-config-file /data/nodes.conf --logfile /data/redis.log --cluster-node-timeout 5000 --bind 0.0.0.0 --requirepass redispwd
docker run -d --name redis-node2 --net redis-cluster-net -p 7001:6379 -v /docker/redis-cluster/redis-node2:/data redis:6.2 redis-server --appendonly yes --cluster-enabled yes --cluster-config-file /data/nodes.conf --logfile /data/redis.log --cluster-node-timeout 5000 --bind 0.0.0.0 --requirepass redispwd
docker run -d --name redis-node3 --net redis-cluster-net -p 7002:6379 -v /docker/redis-cluster/redis-node3:/data redis:6.2 redis-server --appendonly yes --cluster-enabled yes --cluster-config-file /data/nodes.conf --logfile /data/redis.log --cluster-node-timeout 5000 --bind 0.0.0.0 --requirepass redispwd
```

## 创建由3个redis master节点构成的集群

先查看redis节点ip

```sh
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' redis-node1
```

创建集群

```sh
docker run -it --rm --net redis-cluster-net redis:6.2 redis-cli --cluster create 172.19.0.3:6379 172.19.0.4:6379 172.19.0.5:6379 --cluster-replicas 0 --a redispwd
```

- --cluster-replicas 0 代表每个节点都没有备用节点
  备用节点会复制主节点数据，如果主节点挂掉，会重新启用备用节点升级为master节点

## 连接集群查看集群状态

```sh
docker run -it --rm --net redis-cluster-net redis redis-cli -c -h 172.18.0.2 -p 6379
```

cluster nodes：这将显示集群中所有节点的详细信息，包括它们的角色（如主节点或从节点）、状态、分片等。
cluster info：提供集群的一般信息。
cluster slots：显示关于键空间分片的信息。

## crc16简介

redis集群校验和
计算crc16校验和与16384（集群的 hash slot 总数）进行模运算，得到的结果决定了 key 应该存储在哪个 hash slot 中。

## 使用golang连接

```go
package main

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
)

var ctx = context.Background()

func main() {
	rdb := redis.NewClusterClient(&redis.ClusterOptions{
		Addrs:    []string{"172.19.0.3:6379", "172.19.0.4:6379", "172.19.0.5:6379"},
		Password: "redispwd",
	})
	defer rdb.Close()

	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "Welcome")
	})

	r.GET("/ping", func(c *gin.Context) {
		err := rdb.Set(ctx, "ping", "pong", 0).Err()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		val, err := rdb.Get(ctx, "ping").Result()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
		}
		c.JSON(http.StatusOK, gin.H{"message": val})
	})
	r.Run(":8080")
}
```

## docker中启动

### dockerfile

```dockerfile
FROM golang:1.21-alpine as builder 

ENV http_proxy http://proxy-addr:proxy-port
ENV https_proxy http://proxy-addr:proxy-port

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download -x

COPY . . 

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o my-gin-web .


FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /root/

COPY --from=builder /app/my-gin-web .

EXPOSE 8080

CMD ["./my-gin-web"]
```

### 构建dockerfile

```sh
docker build -t my-gin-web .
```

### 启动go服务

```sh
docker run --rm -d -p 10080:8080 --net redis-cluster-net my-gin-web:latest
```
