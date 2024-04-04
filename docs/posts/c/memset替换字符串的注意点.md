---
title: memset替换字符串的注意点
toc: true
keywords: memset,c/c++
tags: 
 - c/c++ 
 - 内存
categories:
  - c/c++
abbrlink: d8689c7b
date: 2020-10-17 19:13:16
---

## 字符串只读

- memset 原型
  `void * memset( void * ptr, int value, size_t num )`

  > 其中 size_t 即是 unsigned int

- 参数说明
  ptr 为要操作的内存的指针。
  value 为要设置的值。你既可以向 value 传递 int 类型的值，也可以传递 char 类型的值，因为 int 和 char 可以根据 ASCII 码相互转换。
  num 为 ptr 的前 num 个字节。
> 注意：参数 value 虽声明为 int，但必须是 unsigned char，所以范围在0 到255 之间。

<!-- more -->

- 使用

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main()
{
    char str[] = "https://github.com";
    memset(str, '-', 7);
    puts(str);
    return EXIT_SUCCESS;
}
```
> 输出 -------github.com

- 错误使用
由于字符串是只读的，不能被修改。而memset必须修改目标，所以不能直接将字符指针直接指向字符串，以下使用将在运行时报错

```c
int main()
{
    char *str = "https://github.com";
    memset(str, '-', 7);
    puts(str);
    return EXIT_SUCCESS;
}
```
报错信息：
```shell
Bus error: 10
```

