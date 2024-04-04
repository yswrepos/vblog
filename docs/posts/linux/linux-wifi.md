---
title: linux设置wifi
date: 2023-11-05 17:17:56
  - linux
  - 运维
  - 网络
  - wifi
categories:
  - linux
---
## 连接

### 查看无线设备

```shell
iwconfig
```

### 使用netplan连接wifi

```shell
sudo apt update
# 安装必要软件
sudo apt install wpasupplicant net-tools
```

<!-- more -->

```shell 
sudo vi /etc/netplan/01-netcfg.yaml
# 配置
network:
  version: 2
  renderer: networkd
  wifis:
    wlan0:
      dhcp4: true
      optional: true
      access-points:
        "your-ssid-name":
          password: "your-wifi-password"
```

```shell
sudo netplan apply #将配置生效
# 连接wifi
sudo ifconfig wlan0 up
sudo iwconfig wlan0 essid "your-ssid-name"
sudo dhclient wlan0
```

## 加密

1. 使用hash:

```sh
# 得到的psk即为密码
wpa_passphrase your-ssid-name your-wifi-password
```

2. 使用环境变量

```sh
export YOUR_PASSWORD="your-wifi-password"
# 修改netplan配置
access-points:
        "test-ssid":
          password: $YOUR_PASSWORD
# 使配置生效
sudo netplan apply
```

3. 使用 network-manager 连接wifi

```sh
sudo apt install -y network-manager
sudo nmcli device wifi connect test-ssid password your-wifi-password
```

## 重启wlan0

```sh
sudo netplan apply

# 禁用wlan0设备
sudo ip link set wlan0 down
# 启用
sudo ip link set wlan0 up
```

## 查看

```sh
ifconfig 
# or
ipaddress

# 只显示 wlan0设备
ip addr show dev wlan0

```
