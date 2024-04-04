---
title: C语言常用类型占用大小
toc: true
keywords: c/c++,类型大小,类型占用字节
tags:
  - c/c++
categories:
  - 片段
abbrlink: 79491f72
date: 2021-04-02 20:13:16
---

### int
现代操作系统中，`int`一般占用`4`个字节(Byte), 共32位。若不考虑正负数，
当所有的位都为 1 时它的值最大，为 232-1 = 4,294,967,295 ≈ 43亿。
**int建议为一个机器字长，32位机器字长为4字节，64位机器字长为8字节**
16位环境下,int为2字节。
### short
短整型，占用2个字节
### long
长整型，16位和32位为4字节。
### char
占用1个字节

<!-- more -->

### 64位环境占用字节情况
操作系统	short	int	long
Win64	    2	    4	   4
类Unix系统 2	   4	  8

### 获取某数据类型长度：
```c
#include <stdio.h>
int main()
{
    short a = 10;
    int b = 100;
   
    int short_length = sizeof a;
    int int_length = sizeof(b);
    int long_length = sizeof(long);
    int char_length = sizeof(char);
   
    printf("short=%d, int=%d, long=%d, char=%d\n", short_length, int_length, long_length, char_length);
   
    return 0;
}
```
// 32 位环境以及 Win64 环境下的运行结果
short=2, int=4, long=4, char=1
// 64 位 Linux 和 Mac OS 下的运行结果
short=2, int=4, long=8, char=1

