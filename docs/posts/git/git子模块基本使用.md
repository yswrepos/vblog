---
title: git子模块基本使用
date: 2024-02-23 17:28:47
tags:
 - git
---

通过使用Git的子模块（submodule）功能来管理这种结构。子模块允许在一个Git仓库中包含并管理指向其他Git仓库的引用。`base`仓库可以包含两个子模块：`project1`和`project2`。

以下是具体步骤：

### 1. 创建并推送`project1`和`project2`到GitHub

首先确保`project1`和`project2`各自已经是独立的Git仓库，并且已经推送到GitHub上。比如，您可能已经有了两个仓库的URL：
- `https://github.com/yourusername/project1.git`
- `https://github.com/yourusername/project2.git`

### 2. 在`base`仓库中添加子模块

在您的本地`base`仓库中，您可以使用以下命令添加子模块：

```bash
# 切换到base仓库的目录
cd path/to/base

# 为project1添加子模块
git submodule add https://github.com/yourusername/project1.git project1

# 为project2添加子模块
git submodule add https://github.com/yourusername/project2.git project2

# 提交更改
git commit -m "Added project1 and project2 as submodules."

# 推送到GitHub
git push
```
<!-- more -->

### 3. 克隆`base`仓库及其子模块

当其他人或您在另一台机器上需要克隆`base`仓库及其包含的所有子模块时，可以使用以下命令：

```bash
# 克隆base仓库
git clone --recurse-submodules https://github.com/yourusername/base.git

# 如果已经克隆了base仓库但忘记了--recurse-submodules
cd base
git submodule update --init --recursive
```

### 注意事项

- 子模块是指向特定提交的引用，这意味着如果您在`project1`或`project2`中做了更改并推送到了GitHub，您还需要在`base`仓库中更新子模块引用到最新的提交，然后再次提交和推送这些更改。
- 使用子模块时，需要记住运行`git submodule update --init --recursive`来确保子模块是最新的，尤其是在克隆或者拉取了包含子模块的仓库更新后。

通过这种方式，您可以在GitHub的`base`项目中独立管理`project1`和`project2`，它们可以位于不同的位置，且不会相互影响。
