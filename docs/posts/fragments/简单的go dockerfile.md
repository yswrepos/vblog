---
title: 简单的go dockerfile
toc: true
tags:
  - fragments
  - dockerfile
categories:
  - fragments
date: 2021-9-30 13:01:16
---


简单的go dockerfile
<!-- more -->

```go
# 使用 Alpine Linux 作为基础镜像
FROM alpine:latest

# 安装 Go 和 redis-cli
RUN apk add --no-cache go redis

# 设置工作目录
WORKDIR /app

# 将本地的 Go 项目代码复制到镜像中
COPY . /app

# 编译 Go 项目
RUN go build -o my-web-server

# 暴露你的 web 服务所使用的端口
EXPOSE 8080

# 运行 web 服务
CMD ["/app/my-web-server"]

```