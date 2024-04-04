---
layout: posts
title: protoc命令
date: 2024-01-09 14:47:49
tags:
 - protoc
---

### protoc命令详解

```sh
# --go_out=.会在当前目录生成一个命令空间的文件夹 加paths=source_relative则生成到当前目录i
protoc -I=.  --go_out=paths=source_relative:. --go-grpc_out=paths=source_relative:.  greeter.proto
```
<!-- more -->






