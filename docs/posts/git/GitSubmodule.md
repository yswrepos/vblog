---
title: Git子模块简单使用
toc: true
keywords: git,github
tags:
  - git
  - github
categories:
  - 开发工具
abbrlink: 8e690a6a
date: 2020-12-17 13:01:16
---
## 导读
> 有时候我们需要在一个项目中依赖一个更新中的公共库，或者在一个大型仓库中给不同的开发人员分配各自独立的仓库，这个时候Git的子模块就很有用了。

## 添加一个子模块

我们假设你已经创建了一个远端仓库`greet.git`
那么可以添加这个仓库到主项目，使之成为一个子模块：
```git
git submodule add <remote_url> <path> 
```

<!-- more -->


添加子模块并切换分支：
```git
git submodule add -b <branch> <url> <path>
```

举例：
```shell
// 添加远程greet仓库到当前项目为greet子模块
git submodule add https://github.com/<username>/greet.git greet
```
此时在主项目中会多处一个`.gitmodules`的文件记录子模块的信息：
```
[submodule "greet"]
	path = greet
	url = https://github.com/<username>/greet.git
```


## 初始化和拉取子模块更新

```
git submodule update --init --recursive
```
或
```
<!-- 拉取主repo和子repo -->
git clone main --recursive
```
或
```
git clone <main_repository>
git submodule init
git submodule update
```

## 批量操作所有子模块

可以使用`git submodule foreach [--recursive] <git command>`对所有子模块进行批量操作, 如
```
git submodule foreach git pull
```
