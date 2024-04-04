---
title: mac挂载额外盘符
date: 2024-01-24 20:00:01
tags:
  - mac
categories:
  - mac
---
在 macOS 上，外部硬盘通常只有在用户登录并进入桌面后才自动挂载。为了实现在启动时即使没有用户登录也能挂载外部硬盘，你需要进行一些额外的配置。请注意，这些方法可能需要对系统级的设置进行更改，因此需要谨慎操作。

### 方法 1：使用 `fstab` 文件

1. **识别硬盘**：
   - 首先，你需要找出外置硬盘的唯一标识符。可以通过 `diskutil` 命令来实现：

     ```bash
     diskutil info /Volumes/YourVolumeName
     ```

     查找 “Volume UUID” 字段。
<!-- more -->

2. **编辑 `fstab` 文件**：
   - 使用 `sudo vifs` 命令来安全地编辑 `/etc/fstab` 文件。这是一个系统级文件，用于控制磁盘挂载。
   - 添加一行如下格式的内容：

     ```
     UUID=硬盘的UUID none ntfs rw,auto,nobrowse
     ```

     其中，替换 `硬盘的UUID` 为你之前找到的 UUID，如果硬盘不是 NTFS 格式，请相应更改 `ntfs`。

3. **挂载硬盘**：
   - 使用 `diskutil mount` 命令挂载硬盘。由于添加了 `nobrowse` 选项，硬盘不会在 Finder 中显示，但可以在 `/Volumes` 目录下访问。

### 方法 2：创建启动脚本

1. **创建脚本**：
   - 编写一个脚本，使用 `diskutil` 命令来挂载硬盘。
   - 将脚本保存在某个位置，例如 `/usr/local/bin/mount_external.sh`。

2. **设置脚本权限**：
   - 使用 `chmod` 命令给予脚本执行权限：

     ```bash
     sudo chmod +x /usr/local/bin/mount_external.sh
     ```

3. **配置启动项**：
   - 创建一个 `.plist` 文件，用于在启动时运行脚本。
   - 将 `.plist` 文件放置在 `/Library/LaunchDaemons/` 目录下。

4. **启动服务**：
   - 使用 `launchctl` 加载并启动服务：

     ```bash
     sudo launchctl load /Library/LaunchDaemons/your.plist
     ```

### 注意事项

- 这些操作涉及到系统级的更改，可能会影响系统的稳定性和安全性。
- 在进行更改前，请确保完全理解每个步骤的意义，并备份重要数据。
- 如果你不熟悉命令行操作或系统配置，建议在专业人士的指导下进行。

以上方法可以实现在 macOS 启动时自动挂载外部硬盘，即使没有用户登录。但请注意，由于这些操作涉及较高权限的系统更改，所以建议在充分了解其风险和细节后再行操作。
