---
title: 创建vlan并连接到bridge
date: 2024-02-27 23:46:15
tags:
---

要在一个基于Linux的系统上（比如OpenWrt）新建一个名为`br3`的桥接接口，并创建一个虚拟局域网（VLAN），你需要执行几个步骤。这些步骤包括创建桥接接口、将物理接口或已有的虚拟接口添加到桥接中，以及配置VLAN。以下是一个基本的指南：

### 1. 创建桥接接口

首先，你需要安装`bridge-utils`包（如果尚未安装），它提供了管理桥接接口的工具。在OpenWrt上，你通常不需要手动安装，因为它内置了相应的功能。

```bash
opkg update
opkg install bridge-utils
```

然后，创建桥接接口`br3`：

```bash
ip link add name br3 type bridge
ip link set br3 up
```

这些命令创建了一个新的桥接接口`br3`并启动了它。

### 2. 添加接口到桥接中

如果你想将一个或多个物理接口（比如`eth0`）或已有的虚拟接口（比如一个已配置的VLAN接口`eth0.100`）加入到桥接中，使用如下命令：

```bash
ip link set eth0 master br3
# 或者对于一个VLAN接口
ip link set eth0.100 master br3
```

### 3. 创建并配置VLAN

创建VLAN通常意味着你在物理接口上创建一个带VLAN ID的虚拟接口。例如，如果你想在`eth0`接口上创建VLAN ID为100的VLAN，可以这样做：

```bash
ip link add link eth0 name eth0.100 type vlan id 100
```

然后，你可以将这个VLAN接口添加到桥接中：

```bash
ip link set eth0.100 master br3
```

### 4. 配置IP地址（可选）

你可能还想为`br3`接口配置一个IP地址，使其能够在网络中通信：

```bash
ip addr add 192.168.3.1/24 dev br3
```

这里，`192.168.3.1/24`是桥接接口`br3`的IP地址和子网掩码，你应该根据你的网络配置来调整这个地址。

### 5. 保存配置

在OpenWrt上，你需要使用`/etc/config/network`文件或`uci`命令来保存这些更改，以确保在重启后配置仍然有效。例如，使用`uci`命令设置桥接接口和VLAN：

```bash
uci set network.br3=interface
uci set network.br3.type='bridge'
uci set network.br3.ifname='eth0.100'
uci commit network
/etc/init.d/network restart
```

请注意，具体的命令和步骤可能会根据你的系统和版本有所不同。上述步骤提供了一个基本的指导，你可能需要根据你的具体需求调整命令。

## 网桥间的访问

创建一个新的桥接接口`br3`并设置一个虚拟局域网（VLAN）本身不会自动产生一个新的SSID（Service Set Identifier，服务集标识符）。SSID通常与无线网络相关，是无线局域网的名称。要在OpenWrt等路由器操作系统上创建一个新的SSID并将其与特定的桥接接口（比如`br3`）关联，你需要进行一些额外的配置。

### 创建新SSID并关联到桥接接口

1. **配置无线网络**：在OpenWrt上，你可以通过编辑`/etc/config/wireless`文件或使用`uci`命令来配置无线网络。你需要为新的SSID指定无线接口配置，并将其绑定到你的新桥接接口`br3`。

2. **无线接口与桥接**：无线接口配置中，你可以通过设置`option network 'br3'`来指定该无线网络应该关联的桥接接口，确保无线客户端连接到这个SSID时，其流量会通过`br3`进行路由。

### 控制桥接接口之间的访问

是否一个桥接接口（比如`br3`）能访问其他桥接接口（比如`br0`或`br1`）主要由路由和防火墙规则决定：

- **路由规则**：控制数据包从一个网络接口到另一个网络接口的流动。如果没有特定的路由规则来禁止或允许流量，那么这些桥接接口之间的通信将取决于默认的路由策略。

- **防火墙规则**：在OpenWrt等系统中，防火墙规则是用来细致控制网络间通信的。你可以设置规则来允许或阻止来自某个桥接接口的流量访问另一个接口。通过配置这些规则，你可以实现网络隔离，比如阻止访客网络（通过新的SSID连接的设备）访问内部网络。

### 示例：设置防火墙规则以隔离网络

你可以使用OpenWrt的`/etc/config/firewall`文件或`uci`命令来创建防火墙规则，以防止`br3`上的设备访问`br0`上的设备。例如，创建一个规则禁止从`br3`到`br0`的所有流量：

```bash
uci add firewall rule
uci set firewall.@rule[-1].name="Deny-Access-From-br3-to-br0"
uci set firewall.@rule[-1].src="br3"
uci set firewall.@rule[-1].dest="br0"
uci set firewall.@rule[-1].proto="all"
uci set firewall.@rule[-1].target="REJECT"
uci commit firewall
/etc/init.d/firewall restart
```

请注意，具体的配置可能需要根据你的网络设置和OpenWrt版本进行调整。确保在应用任何改动之前备份相关配置文件。