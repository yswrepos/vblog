---
title: linux设置dns
date: 2023-11-05 17:18:19
tags:
  - linux
  - 运维
  - dns
categories:
  - linux
---



```bash
resolvectl status
```


使用 systemd-resolve 命令：

```bash
systemd-resolve --status | grep "DNS Servers"
```
<!-- more -->
这将显示当前系统正在使用的 DNS 服务器的 IP 地址。

查看 /etc/resolv.conf 文件：
```bash
cat /etc/resolv.conf
```

在该文件中，你可以找到当前配置的 DNS 服务器列表。

使用 nmcli 命令（仅适用于使用 NetworkManager 的系统）：
```bash
nmcli dev show | grep DNS
```
可以通过在浏览器中访问 "https://dnsleaktest.com" 或类似的在线工具来检测 DNS 泄漏，并查看当前系统的 DNS 配置和正在使用的 DNS 服务器。