---
title: 一致性哈希的Go实现
date: 2024-02-24 17:24:59
tags:
 - go
 - 哈希
categories:
 - go
---

# 基本概念
一致性哈希算法是为了解决分布式系统中的动态伸缩问题而提出的。它的基本思想是将哈希空间组织成一个虚拟的圆环，假设哈希函数的范围是0到2^32-1（构成一个圆环），每个服务器在这个圆环上占据一个位置，这个位置根据服务器的哈希值决定。每个要存储的键也会被哈希到这个圆环上的某个位置，然后从这个位置顺时针找到的第一个服务器就是该键所属的服务器。

# 一致性哈希解决方案
当系统需要添加或移除服务器时，只会影响到环上顺时针方向紧邻的下一个服务器，而其他服务器存储的数据不会受到影响。这样就大大减少了因服务器增减导致的数据迁移量，只有少部分数据需要迁移。


# 基本实现

```go 
package main

import (
    "crypto/sha1"
    "sort"
    "strconv"
    "fmt"
)

// 定义一致性哈希的结构
type ConsistentHashing struct {
    nodes  []int          // 存储所有节点的哈希值
    circle map[int]string // 哈希值到节点名称的映射
}

// 创建一致性哈希实例
func NewConsistentHashing() *ConsistentHashing {
    return &ConsistentHashing{
        circle: make(map[int]string),
    }
}

// 生成哈希值
func (ch *ConsistentHashing) generateHash(key string) int {
    h := sha1.New()
    h.Write([]byte(key))
    hash := h.Sum(nil)
    return int(hash[0])<<24 | int(hash[1])<<16 | int(hash[2])<<8 | int(hash[3])
}

// 添加节点
func (ch *ConsistentHashing) AddNode(node string) {
    hash := ch.generateHash(node)
    ch.nodes = append(ch.nodes, hash)
    ch.circle[hash] = node
    sort.Ints(ch.nodes) // 保持哈希值有序
}

// 移除节点
func (ch *ConsistentHashing) RemoveNode(node string) {
    hash := ch.generateHash(node)
    index := sort.SearchInts(ch.nodes, hash)
    if index < len(ch.nodes) && ch.circle[ch.nodes[index]] == node {
        ch.nodes = append(ch.nodes[:index], ch.nodes[index+1:]...)
        delete(ch.circle, hash)
    }
}

// 获取键的节点
func (ch *ConsistentHashing) GetNode(key string) string {
    if len(ch.nodes) == 0 {
        return ""
    }
    hash := ch.generateHash(key)
    index := sort.Search(len(ch.nodes), func(i int) bool {
        return ch.nodes[i] >= hash
    })
    if index == len(ch.nodes) { // 如果超过范围，表示应该映射到第一个节点
        index = 0
    }
    return ch.circle[ch.nodes[index]]
}

func main() {
    ch := NewConsistentHashing()
    ch.AddNode("Node1")
    ch.AddNode("Node2")
    ch.AddNode("Node3")

    fmt.Println("存储在节点：", ch.GetNode("myKey1"))
    fmt.Println("存储在节点：", ch.GetNode("myKey2"))
    fmt.Println("存储在节点：", ch.GetNode("myKey3"))

    ch.AddNode("Node4")
    fmt.Println("添加Node4后，存储在节点：", ch.GetNode("myKey1"))
    ch.RemoveNode("Node2")
    fmt.Println("移除Node2后，存储在节点：", ch.GetNode("myKey1"))
}

```

<!-- more -->

`generateHash`函数的作用是将一个字符串（可以是节点名称或者键值）转换成一个整数哈希值。这个哈希值用于在一致性哈希算法中确定字符串在环上的位置。


在提供的一致性哈希示例代码中，`generateHash`函数的作用是将一个字符串（可以是节点名称或者键值）转换成一个整数哈希值。这个哈希值用于在一致性哈希算法中确定字符串在环上的位置。这里是如何实现的：

```go
func (ch *ConsistentHashing) generateHash(key string) int {
    h := sha1.New()                  // 创建一个新的SHA-1哈希器
    h.Write([]byte(key))             // 将key转换为字节序列并添加到哈希器中
    hash := h.Sum(nil)               // 计算哈希值，得到一个字节切片
    return int(hash[0])<<24 | int(hash[1])<<16 | int(hash[2])<<8 | int(hash[3]) // 将哈希值的前4个字节转换为一个整数
}
```

这个函数首先使用SHA-1算法对输入的字符串`key`进行哈希，生成一个160位（或20字节）的哈希值。SHA-1是一种广泛使用的加密哈希函数，它可以接受任意大小的数据，并输出一个固定大小（160位）的哈希值。

然后，函数取这个哈希值的前4个字节（`hash[0]`到`hash[3]`），并将它们组合成一个32位的整数作为函数的返回值。这是通过位移和按位或操作来实现的：

- `int(hash[0])<<24`：将`hash[0]`转换为整数并左移24位，这样`hash[0]`就位于结果整数的最高8位。
- `int(hash[1])<<16`：将`hash[1]`转换为整数并左移16位，这样`hash[1]`就位于结果整数的次高8位。
- `int(hash[2])<<8`：将`hash[2]`转换为整数并左移8位，这样`hash[2]`就位于结果整数的次低8位。
- `int(hash[3])`：将`hash[3]`转换为整数，它就位于结果整数的最低8位。

通过`|`（按位或）操作，这四个部分合并成一个整数。这个整数既代表了输入字符串的哈希值，也用于在一致性哈希算法中确定该字符串对应的环上的位置。

通过这种方式，`generateHash`函数将任意长度的字符串映射到一个较小的、有限的整数范围内，从而使得字符串可以在一致性哈希的环形空间中找到一个明确的位置。


# 增加虚拟节点的基本实现


```go
package main

import (
    "crypto/sha1"
    "sort"
    "strconv"
    "fmt"
)

// 定义一致性哈希的结构
type ConsistentHashing struct {
    nodes  []int          // 存储所有节点（包括虚拟节点）的哈希值
    circle map[int]string // 哈希值到实际节点名称的映射
    virtualNodeCount int  // 每个实际节点对应的虚拟节点数量
}

// 创建一致性哈希实例
func NewConsistentHashing(virtualNodeCount int) *ConsistentHashing {
    return &ConsistentHashing{
        circle: make(map[int]string),
        virtualNodeCount: virtualNodeCount,
    }
}

// 生成哈希值
func (ch *ConsistentHashing) generateHash(key string) int {
    h := sha1.New()
    h.Write([]byte(key))
    hash := h.Sum(nil)
    return int(hash[0])<<24 | int(hash[1])<<16 | int(hash[2])<<8 | int(hash[3])
}

// 添加节点
func (ch *ConsistentHashing) AddNode(node string) {
    for i := 0; i < ch.virtualNodeCount; i++ {
        virtualNodeName := fmt.Sprintf("%s#%d", node, i)
        hash := ch.generateHash(virtualNodeName)
        ch.nodes = append(ch.nodes, hash)
        ch.circle[hash] = node // 映射到实际节点名称
    }
    sort.Ints(ch.nodes) // 保持哈希值有序
}

// 移除节点
func (ch *ConsistentHashing) RemoveNode(node string) {
    for i := 0; i < ch.virtualNodeCount; i++ {
        virtualNodeName := fmt.Sprintf("%s#%d", node, i)
        hash := ch.generateHash(virtualNodeName)
        index := sort.SearchInts(ch.nodes, hash)
        if index < len(ch.nodes) && ch.circle[ch.nodes[index]] == node {
            ch.nodes = append(ch.nodes[:index], ch.nodes[index+1:]...)
            delete(ch.circle, hash)
        }
    }
}

// 获取键的节点
func (ch *ConsistentHashing) GetNode(key string) string {
    if len(ch.nodes) == 0 {
        return ""
    }
    hash := ch.generateHash(key)
    index := sort.Search(len(ch.nodes), func(i int) bool {
        return ch.nodes[i] >= hash
    })
    if index == len(ch.nodes) { // 如果超过范围，表示应该映射到第一个节点
        index = 0
    }
    return ch.circle[ch.nodes[index]]
}

func main() {
    ch := NewConsistentHashing(3) // 假设每个实际节点有3个虚拟节点
    ch.AddNode("Node1")
    ch.AddNode("Node2")
    ch.AddNode("Node3")

    fmt.Println("存储在节点：", ch.GetNode("myKey1"))
    fmt.Println("存储在节点：", ch.GetNode("myKey2"))
    fmt.Println("存储在节点：", ch.GetNode("myKey3"))

    ch.AddNode("Node4")
    fmt.Println("添加Node4后，存储在节点：", ch.GetNode("myKey1"))
    ch.RemoveNode("Node2")
    fmt.Println("移除Node2后，存储在节点：", ch.GetNode("myKey1"))
}

```

# 节点变化带来的数据迁移
在实际应用中，当节点发生变化（如添加或移除节点）时，确实需要进行数据迁移以保持数据的一致性和可用性。这通常意味着以下几点：

1. **节点添加**：当新节点加入时，它会从其他节点接管部分数据。这部分数据是之前映射到它顺时针方向最近的旧节点上的。

2. **节点移除**：当节点被移除时，其上的数据需要迁移到其他节点上。通常，这些数据会迁移到这个节点顺时针方向的下一个节点上。

要实现数据迁移，需要在系统中维护更多的状态信息，并在节点变化时执行数据重分配。这通常涉及到以下几个步骤：

- **确定受影响的数据**：首先，需要识别哪些数据需要被迁移。这可以通过比较节点变化前后数据项应该存储的位置来实现。

- **执行数据迁移**：然后，将需要迁移的数据从原节点移动到新节点。这个过程可能需要网络传输，并且要确保数据的一致性和完整性。

- **更新状态信息**：完成迁移后，需要更新系统中关于数据位置的状态信息，以反映新的数据分布。
