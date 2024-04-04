---
title: python requirements记录依赖
date: 2024-02-22 19:47:21
tags:
 - python
---


在Python中，使用`pip install`安装依赖不会在您的项目目录中创建任何文件来记录依赖。Python与Node.js不同，它没有一个与`package.json`直接对应的文件来跟踪项目依赖。不过，您可以通过创建一个`requirements.txt`文件来手动管理依赖。

### 创建 `requirements.txt`

1. **记录依赖**：您可以手动创建一个`requirements.txt`文件，在其中列出项目所需的所有包及其版本。例如：

    ```
    beautifulsoup4==4.9.3
    requests==2.25.1
    ```

2. **自动生成依赖列表**：您也可以通过以下命令自动生成当前环境中所有已安装包的列表：

    ```bash
    pip freeze > requirements.txt
    ```

   这将创建一个`requirements.txt`文件，其中包含了所有通过pip安装的包及其精确版本号。

<!-- more -->
### 理解 `pip install`

当您使用`pip install`安装包时，这些包被安装到您当前激活的Python环境中，而不是您的项目目录中。这意味着：

- **全局环境安装**：如果您在没有激活任何虚拟环境的情况下安装包，它们将被安装到全局Python环境中。
- **虚拟环境安装**：如果您在激活了虚拟环境的情况下安装包，它们将仅在该特定虚拟环境中可用。

### 使用虚拟环境

为了更好地管理依赖和避免与系统级别的Python环境冲突，建议在虚拟环境中工作。您可以使用Conda或`venv`（Python内置的虚拟环境工具）来创建和管理虚拟环境。

1. **创建虚拟环境（使用`venv`）**：

    ```bash
    python -m venv myenv
    ```

2. **激活虚拟环境**：

    - 在Windows上：

        ```bash
        myenv\Scripts\activate
        ```

    - 在Linux或macOS上：

        ```bash
        source myenv/bin/activate
        ```

3. **在虚拟环境中安装包**：

    ```bash
    pip install beautifulsoup4 requests
    ```

通过这种方式，您可以确保项目的依赖与其他项目或全局环境隔离，从而避免版本冲突和其他问题。