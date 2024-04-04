---
title: docker rabbitmq集群搭建
date: 2024-03-02 23:20:46
tags:
 - docker 
 - rabbitmq
categories: theory
---
要使用Docker创建一个RabbitMQ集群，并将日志等重要文件映射到本机，你可以遵循以下步骤。这个过程涉及到使用Docker Compose来配置和启动RabbitMQ容器的集群，以及如何设置数据卷以映射重要文件。

### 1. 准备Docker Compose文件

首先，你需要创建一个`docker-compose.yml`文件来定义你的RabbitMQ集群。以下是一个简单示例，它启动了一个三节点的RabbitMQ集群。此配置还包括了如何映射数据卷来存储日志和其他重要文件。
<!-- more -->
```yaml
version: '3'

services:
  rabbitmq1:
    image: "rabbitmq:3-management"
    hostname: "rabbitmq1"
    environment:
      RABBITMQ_ERLANG_COOKIE: "SWQOKODSQALRPCLNMEQG"
      RABBITMQ_DEFAULT_USER: "user"
      RABBITMQ_DEFAULT_PASS: "password"
    volumes:
      - ./rabbitmq1/data:/var/lib/rabbitmq
      - ./rabbitmq1/log:/var/log/rabbitmq
    ports:
      - "15672:15672"
      - "5672:5672"
  
  rabbitmq2:
    image: "rabbitmq:3-management"
    hostname: "rabbitmq2"
    environment:
      RABBITMQ_ERLANG_COOKIE: "SWQOKODSQALRPCLNMEQG"
      RABBITMQ_DEFAULT_USER: "user"
      RABBITMQ_DEFAULT_PASS: "password"
    volumes:
      - ./rabbitmq2/data:/var/lib/rabbitmq
      - ./rabbitmq2/log:/var/log/rabbitmq
    depends_on:
      - rabbitmq1

  rabbitmq3:
    image: "rabbitmq:3-management"
    hostname: "rabbitmq3"
    environment:
      RABBITMQ_ERLANG_COOKIE: "SWQOKODSQALRPCLNMEQG"
      RABBITMQ_DEFAULT_USER: "user"
      RABBITMQ_DEFAULT_PASS: "password"
    volumes:
      - ./rabbitmq3/data:/var/lib/rabbitmq
      - ./rabbitmq3/log:/var/log/rabbitmq
    depends_on:
      - rabbitmq1
```

### 2. 启动RabbitMQ集群

在同一目录下保存你的`docker-compose.yml`文件。然后，打开终端或命令提示符，运行以下命令来启动你的RabbitMQ集群：

```bash
docker-compose up -d
```

这将基于你的`docker-compose.yml`文件配置来启动RabbitMQ的容器。

### 3. 设置集群节点

默认情况下，启动的RabbitMQ节点将作为独立节点运行。你需要配置它们，使其成为集群的一部分。你可以通过执行以下命令在容器内部进行操作，以将`rabbitmq2`和`rabbitmq3`节点加入到`rabbitmq1`创建的集群中：

```bash
docker exec rabbitmq2 rabbitmqctl stop_app
docker exec rabbitmq2 rabbitmqctl reset
docker exec rabbitmq2 rabbitmqctl join_cluster rabbit@rabbitmq1
docker exec rabbitmq2 rabbitmqctl start_app

docker exec rabbitmq3 rabbitmqctl stop_app
docker exec rabbitmq3 rabbitmqctl reset
docker exec rabbitmq3 rabbitmqctl join_cluster rabbit@rabbitmq1
docker exec rabbitmq3 rabbitmqctl start_app
```

### 4. 验证集群状态

你可以通过执行以下命令来检查RabbitMQ集群的状态：

```bash
docker exec rabbitmq1 rabbitmqctl cluster_status
```

这将显示集群中的节点以及它们的状态。

通过以上步骤，你将成功创建一个RabbitMQ集群，并将日志等重要文件映射到本机上。这样，你就可以更方便地管理和访问这些文件了。


## RABBITMQ_ERLANG_COOKIE

`RABBITMQ_ERLANG_COOKIE`是RabbitMQ和Erlang分布式系统中用于节点之间认证的一个重要概念。RabbitMQ是用Erlang语言编写的，它依赖于Erlang的分布式特性来实现其集群功能。为了安全地进行节点间通信，Erlang使用了一个被称为"cookie"的机制。

### Erlang Cookie的作用：

- **节点认证**：Erlang的节点（在RabbitMQ的背景下，即RabbitMQ的服务器实例）使用这个cookie来认证尝试与它们通信的其他节点。只有当两个节点共享相同的cookie时，它们才能够相互通信。
- **集群安全性**：这个机制确保了只有拥有正确cookie的节点才能加入到集群中，从而防止未授权的访问或加入到集群。

### 如何使用：

- **配置**：在配置RabbitMQ集群时，所有的节点必须配置相同的`RABBITMQ_ERLANG_COOKIE`值。这通常在每个节点的配置文件中设置，或者通过环境变量`RABBITMQ_ERLANG_COOKIE`来设置，确保所有集群节点使用相同的cookie值。
- **环境变量**：通过将`RABBITMQ_ERLANG_COOKIE`设置为环境变量，可以在启动RabbitMQ服务的容器或服务器时指定cookie的值。这使得在Docker或其他容器化环境中部署RabbitMQ集群变得更加容易。

### 注意事项：

- **安全性**：cookie应该是一个只有集群管理者知道的秘密值。不应该公开分享或在不安全的地方存储这个值，因为拥有cookie的任何人都可以尝试加入到你的RabbitMQ集群。
- **一致性**：集群中所有节点的cookie必须一致。如果节点之间的cookie不匹配，它们将无法通信，导致集群功能失败。

总的来说，`RABBITMQ_ERLANG_COOKIE`是RabbitMQ集群安全通信的关键，确保了集群的稳定性和安全性。


## RabbitMQ Docker Run 方式

如果你想使用命令行的`docker run`来启动RabbitMQ集群，并将日志等重要文件映射到本地，而不是使用Docker Compose，你可以按照以下步骤操作。这里，我们将创建一个三节点的RabbitMQ集群，每个节点运行在不同的Docker容器中。

### 步骤1: 创建网络

首先，创建一个网络，以便RabbitMQ容器可以相互通信。

```bash
docker network create rabbitmq_cluster_network
```

### 步骤2: 启动RabbitMQ节点

接下来，我们将启动三个RabbitMQ节点。对于每个节点，我们使用`docker run`命令，并设置环境变量以及映射日志和数据目录到宿主机。

#### 启动第一个节点（rabbitmq1）

```bash
docker run -d --hostname rabbitmq1 --name rabbitmq1 \
-e RABBITMQ_ERLANG_COOKIE='SWQOKODSQALRPCLNMEQG' \
-e RABBITMQ_DEFAULT_USER='user' \
-e RABBITMQ_DEFAULT_PASS='password' \
-p 15672:15672 -p 5672:5672 \
-v $(pwd)/rabbitmq1/data:/var/lib/rabbitmq \
-v $(pwd)/rabbitmq1/log:/var/log/rabbitmq \
--network rabbitmq_cluster_network \
rabbitmq:3-management
```

#### 启动第二个节点（rabbitmq2）

```bash
docker run -d --hostname rabbitmq2 --name rabbitmq2 \
-e RABBITMQ_ERLANG_COOKIE='SWQOKODSQALRPCLNMEQG' \
-e RABBITMQ_DEFAULT_USER='user' \
-e RABBITMQ_DEFAULT_PASS='password' \
-v $(pwd)/rabbitmq2/data:/var/lib/rabbitmq \
-v $(pwd)/rabbitmq2/log:/var/log/rabbitmq \
--network rabbitmq_cluster_network \
rabbitmq:3-management
```

#### 启动第三个节点（rabbitmq3）

```bash
docker run -d --hostname rabbitmq3 --name rabbitmq3 \
-e RABBITMQ_ERLANG_COOKIE='SWQOKODSQALRPCLNMEQG' \
-e RABBITMQ_DEFAULT_USER='user' \
-e RABBITMQ_DEFAULT_PASS='password' \
-v $(pwd)/rabbitmq3/data:/var/lib/rabbitmq \
-v $(pwd)/rabbitmq3/log:/var/log/rabbitmq \
--network rabbitmq_cluster_network \
rabbitmq:3-management
```

### 步骤3: 配置RabbitMQ集群

在启动所有节点后，你需要配置它们，使其成为集群的一部分。使用`docker exec`命令来停止、重置、加入集群并重新启动每个节点（除了作为主节点的rabbitmq1）。

```bash
docker exec rabbitmq2 rabbitmqctl stop_app
docker exec rabbitmq2 rabbitmqctl reset
docker exec rabbitmq2 rabbitmqctl join_cluster rabbit@rabbitmq1
docker exec rabbitmq2 rabbitmqctl start_app

docker exec rabbitmq3 rabbitmqctl stop_app
docker exec rabbitmq3 rabbitmqctl reset
docker exec rabbitmq3 rabbitmqctl join_cluster rabbit@rabbitmq1
docker exec rabbitmq3 rabbitmqctl start_app
```

### 步骤4: 验证集群状态

最后，验证集群状态确保一切正常。

```bash
docker exec rabbitmq1 rabbitmqctl cluster_status
```

通过这些步骤，你将使用`docker run`命令行方式成功创建一个RabbitMQ集群，并将日志等重要文件映射到本地。