---
title: C内存分配
toc: true
keywords: nodejs,GC
tags: c/c++ 内存
categories:
  - c/c++
abbrlink: a1501c1d
date: 2020-09-17 19:13:16
---

> C 内存分配主要有 malloc、calloc、realoc 三个函数，以下简要介绍

## 内存分区

内存里主要有几个划分，用一张表格表示
| 内存分区 | 内容 | 权限 |
| ---------- | -------------------- | -------- |
| 栈区 | 函数中的普通变量 | 可读可写 |
| 堆区 | 动态申请的内存 | 可读可写 |
| 静态变量区 | static 修饰的变量 | 可读可写 |
| 数据区 | 用于初始化变量的常量 | 只读 |
| 代码区 | 代码指令 | 只读 |

<!-- more -->


## malloc、calloc、realoc

C\C++允许我们使用这三个函数直接操作内存，具体就是对堆（Heap）的操作，那么这几种有哪些不同呢？

### malloc

- 函数原型
  `void* malloc (size_t size);`
- 头文件
  `头文件：#include <stdlib.h>`
- 说明
  `malloc`在 Heap 区域分配一块长度为`size`字节的连续区域并返回该区域的地址，malloc() 函数不能为所分配的空间初始化值，需要使用 memset()，。在程序结束前，需要使用 free() 进行内存释放。
- 例子

```c
  int *p  = (int *) malloc(sizeof(int));
  memset(p, 100, 1);
  printf("%d\n", *p); //输出100
  free(p);
```

> 注意： memset 只能给 int 类型赋值的范围为 0x00 - 0xff (即 0 - 255)，超过将按位赋值。[memset 使用介绍>>](/posts/d8689c7b#字符串只读)

### calloc

- 函数原型
  `void* calloc (size_t num, size_t size)`
- 头文件
  `#include <stdlib.h>`
- 说明
  `calloc`和`malloc`类似，在内存中动态地分配 num 个长度为 size 的连续空间，并将每一个字节都初始化为 0。所以它的结果是分配了 num\*size 个字节长度的内存空间，并且每个字节的值都是 0。
- 使用

```c
char *ptr = (char *)calloc(10, 10);  // 分配100个字节的内存空间
```

> 注意 由于返回的指针类型未知，所以在使用 calloc() 时通常需要进行强制类型转换，将 void 指针转换成我们希望的类型。

- 比较
  以下两种使用等效

```c
char *str1 = (char *)calloc(10, 2);
// malloc() 分配内存空间并用 memset() 初始化
char *str2 = (char *)malloc(20);
memset(str2, 0, 20);
```

### realoc

- 函数原型
  `void* realloc (void* ptr, size_t size)`
- 头文件
  `#include <stdlib.h>`
- 说明
  ptr 为需要重新分配的内存空间指针，size 为新的内存空间的大小，`relloc`为指定内存指针的动态内存（通常指 malloc 和 calloc 分配的）重新分配大小。
- 注意

1. 如果 ptr 为 NULL，它的效果和 malloc() 相同，即分配 size 字节的内存空间。
2. 如果 size 的值为 0，那么 ptr 指向的内存空间就会被释放，但是由于没有开辟新的内存空间，所以会返回空指针，类似于调用 free()。
3. 指针 ptr 必须是在动态内存空间分配成功的指针，形如如下的指针是不可以的：int \*i; int a[2]；会导致运行时错误，可以简单的这样记忆：用 malloc()、calloc()、realloc() 分配成功的指针才能被 realloc() 函数接受。
4. 成功分配内存后 ptr 将被系统回收，不可再对 ptr 指针做任何操作，包括 free()。相反的，可以对 realloc() 函数的返回值进行正常操作。
5. 如果是扩大内存操作会把 ptr 指向的内存中的数据复制到新地址（新地址也可能会和原地址相同，但依旧不能对原指针进行任何操作）；如果是缩小内存操作，原始据会被复制并截取新长度。

- 返回值
  分配成功返回新的内存地址，可能与 ptr 相同，也可能不同。失败则返回 NULL。

```c
  #define SIZE 5
  int *p = (int *)calloc(SIZE, sizeof(int));
  int *rp;
  for (int i = 0; i < SIZE; ++i)
  {
      p[i] = i;
  }
  // 扩容为之前的两倍
  // 注意这里使用了新指针(rp)而不是(p)，可在realloc分配失败时，防止p指向的内存泄漏
  rp = (int *)realloc(p, SIZE * 2);
  free(p);
  free(rp);
  return 0;
```

## 总结
- `malloc` 和 `colloc` 都是动态分配内存，但colloc会在初始化的同时将每个字节的内存值初始化为0。
- `realoc` 主要功能是对 `malloc` 和 `colloc` 分配的内存容量进行调整。
