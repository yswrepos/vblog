---
title: gitlab和runner如何配置
date: 2023-10-22 14:57:43
tags: 
 - gitlab
 - gitlab-runner 
 - ci/cd 
 - docker
categories: 运维
---

## gitlab 和 gitlab-runner 简介

GitLab 和 GitLab Runner 是 GitLab CI/CD（持续集成/持续交付）平台中的两个关键组件。

### GitLab

GitLab 是一个基于 Web 的 Git 仓库管理工具和协作平台。它提供了一个完整的 DevOps 平台，包括代码托管、问题跟踪、持续集成/持续交付、容器注册表、监控和协作等功能。GitLab 具有自托管的优势，你可以在自己的服务器上安装和管理 GitLab 实例，也可以选择 GitLab 提供的托管服务。GitLab 采用 Ruby on Rails 开发，拥有强大的版本控制和代码审查功能，并与许多其他工具和服务集成。

<!-- more -->

### Gitlab Runner

GitLab Runner 是一个用于执行 GitLab CI/CD 作业的执行代理。它是一个轻量级的应用程序，可以安装在不同的操作系统上，包括 Linux、Windows 和 macOS。GitLab Runner 负责接收 GitLab 的持续集成/持续交付作业，并在执行过程中与 GitLab 进行通信。它可以在本地计算机、虚拟机、容器等环境中执行作业。GitLab Runner 支持多种执行器，包括 Shell、Docker、Kubernetes 等，使你能够根据需求选择适合的执行环境。它还提供了丰富的配置选项，可以根据项目的需要进行自定义配置。


## 搭建Gitlab

### 使用docker run运行Gitlab

我们可以直接使用Docker来启动一个Gitlab容器：

```sh
docker run -d \
  --hostname ${ip} \
  --publish 8443:443 --publish 8080:80 --publish 8022:22 \
  --name gitlab \
  --restart always \
  --volume /root/docker/gitlab/config:/etc/gitlab \
  --volume /root/docker/gitlab/log:/var/log/gitlab \
  --volume /root/docker/gitlab/data:/var/opt/gitlab \
  gitlab/gitlab-ce:latest
```

这样，容器就运行在后台了，我们可以通过`http://${ip}:8080`来访问Gitlab。

### 配置Gitlab
  有的时候我们需要对gitlab配置进行修改，比如修改端口，修改域名等，这时候我们可以通过修改配置文件来实现。
  我们可以通过进入容器内部运行`gitlab-ctl`实现
    ```sh
    docker exec -it gitlab /bin/bash

    sudo gitlab-ctl reconfigure -external-url 'https://gitlab.example.com'
    ```
 这个操作通常不需要重启，因为gitlab-ctl reconfigure 命令会自动检测配置更改并重新启动相关的服务，以使更改生效。这包括 GitLab Web 服务器、数据库、后台任务处理器等。

 不过有的时候可能需要重启服务，这时可以通过`gitlab-ctl restart`来重启服务。
 > 比如：gitlab-ctl reconfigure 执行期间出现了错误，或者你对 GitLab 的某些自定义配置进行了更改

###  使用docker-compose启动Gitlab
 一个典型的docker-compose文件如下：
 ```yaml
#  docker-compose.yml
version: '3.6'
services:
  gitlab:
    container_name: gitlab
    image: 'gitlab/gitlab-ce:latest'
    hostname: '${hostname}'
    environment:
      GITLAB_OMNIBUS_CONFIG: |
        external_url 'http://${ip}:8089'
        gitlab_rails['gitlab_shell_ssh_port'] = 8022
        nginx['listen_port'] = 8089
    ports:
      - '8089:8089'
      - '8022:22'
      - '1443:443'
    volumes:
      - '/root/docker/gitlab/config:/etc/gitlab'
      - '/root/docker/gitlab/log:/var/log/gitlab'
      - '/root/docker/gitlab/data:/var/opt/gitlab'
    shm_size: '256m'

 ```

上述docker-compose文件中我们对`external_url`和`port`等参数进行了修改，这样我们就可以通过`http://${ip}:8089`来访问Gitlab了。

> external_url 是一个配置选项，用于指定 GitLab 实例的外部访问 URL。它定义了用户在浏览器或其他客户端中访问 GitLab 的地址。



## 搭建Gitlab-Runner

我们可以直接使用docker run来运行一个Gitlab-Runner服务：

```sh
docker run -d --name gitlab-runner \
--restart always \
-v /root/docker/gitlab/gitlab-runner/config:/etc/gitlab-runner \
-v /var/run/docker.sock:/var/run/docker.sock  \
-v /usr/bin/docker:/usr/bin/docker \
gitlab/gitlab-runner:latest
```

gitlab-runner服务启动以后，我们需要注册gitlab-runner，这样gitlab才能识别到gitlab-runner。
注册gitlab-runner 需要访问gitlab token。我们可以通过以下步骤获取gitlab token：

gitlab地址->找到CI/CD->找到Runners->注册Runner->复制token->拿到token

拿到token之后我们可以通过两种方法注册gitlab-runner：

- 进入gitlab-runner容器运行gitlab-runner register 命令
  该命令会要求我们输入gitlab地址，token，以及gitlab-runner的描述等信息。


- 通过修改gitlab-runner的配置文件来注册gitlab-runner


- 使用docker重新run一个runner来注册，如下：
  
```sh
docker run --rm -v /root/docker/gitlab/gitlab-runner/config:/etc/gitlab-runner gitlab/gitlab-runner register \
    --non-interactive \
    --executor "docker" \
    --docker-image alpine:latest \
    --url "http://${ip}:8089/" \
    --registration-token "${token}" \
    --name "common-runner"
    --description "common runner" \
    --tag-list "common" \
    --run-untagged="true" \
    --locked="false" \
    --access-level="not_protected"
```
上述通过docker直接运行了gitlab-runner register命令，并且直接指定了要配置的参数，这样我们就不必进入容器中配置了，非常方便。
注册号runner后，我们可以在gitlab的CI/CD->Runners中看到我们刚刚注册的runner了。
![](/static/img/posts/gitlab和runner如何配置-1.png)