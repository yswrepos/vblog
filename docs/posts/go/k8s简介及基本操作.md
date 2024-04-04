---
title: go/k8s简介及基本操作.md
date: 2024-01-30 22:44:07
tags:
 - go
 - k8s
categories:
 - go
 - k8s
---
Kubernetes（通常简称为 K8s）是一个开源的容器编排系统，用于自动化部署、扩展和管理容器化应用程序。它最初由 Google 设计并捐赠给了 Cloud Native Computing Foundation。下面我会简要介绍 Kubernetes 的主要组件，并提供在 macOS 系统上使用 Kubernetes 的基本指导。

### Kubernetes 的主要组件

1. **控制平面（Control Plane）**:
   - **API 服务器（API Server）**: Kubernetes API 的核心，是控制平面与其他组件交互的接口。
   - **调度器（Scheduler）**: 负责调度 Pod 到合适的节点上。
   - **控制器管理器（Controller Manager）**: 管理控制器，负责节点、Pod、服务等的状态。
   - **etcd**: 一种轻量级的分布式键值存储，用于存储集群的配置和状态。

<!-- more -->

2. **节点（Nodes）**:
   - **Kubelet**: 运行在每个节点上，与 API 服务器通信，管理 Pod 和容器。
   - **容器运行时（Container Runtime）**: 负责运行容器，例如 Docker、containerd。
   - **kube-proxy**: 网络代理，实现 Kubernetes 服务的网络规则。

3. **其他组件**:
   - **Pod**: Kubernetes 的最小部署单位，通常包含一个或多个容器。
   - **服务（Service）**: 定义一组 Pod 的访问规则和策略。
   - **部署（Deployment）**: 管理 Pod 的创建、更新和扩展。

### 在 macOS 上使用 Kubernetes

在 macOS 上，您可以使用 Minikube 或 Docker Desktop 来运行 Kubernetes 集群。

#### 使用 Minikube

1. **安装 Minikube**:
   - 安装 [Homebrew](https://brew.sh/)，一个 macOS 的包管理器。
   - 通过 Homebrew 安装 Minikube：`brew install minikube`

2. **启动 Minikube**:
   - 运行 `minikube start` 启动一个本地的 Kubernetes 集群。

3. **使用 kubectl**:
   - `kubectl` 是 Kubernetes 的命令行工具，用于与集群交互。
   - 安装 `kubectl`：`brew install kubectl`
   - 通过 `kubectl` 运行命令与集群交互，如 `kubectl get nodes` 查看节点状态。

#### 使用 Docker Desktop

如果您已经安装了 Docker Desktop for Mac，可以直接在其设置中启用 Kubernetes。

1. 打开 Docker Desktop 设置。
2. 在 "Kubernetes" 选项卡中，勾选 "Enable Kubernetes"。
3. 点击 "Apply & Restart" 应用更改。