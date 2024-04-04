---
title: C/C++编译过程
toc: true
keywords: c/c++
tags:
  - c/c++
categories:
  - 后端
  - c/c++
abbrlink: e58902ff
date: 2021-02-03 13:01:16
---

### 预处理/预编译
对目标代码进行文本处理和翻译，包括：
  
头部文件(`#include`)
条件编译指令(`#ifdef、#endif`等)、宏(`#define`)
删除注释
添加行号和文件名标识  

<!-- more -->

  
例：
```c++
#include <iostream> //预编译处理
// #define DEBUG //预编译处理
using namespace std;

int main(){
  string name;
  cout << "Enter your name:";
  cin >> name;
  cout << "Hey!" << name << "Welcome to my blog\n";
  #ifdef DEBUG //预编译处理
  cout << name << endl;
  #endif
  return 0;
}
```
> 预处理字符都是以#开头
### 编译
编译将原文件`.cpp`编译为汇编语言，这一步主要做语法分析、检查语法是否错误、词法分析产生汇编文件。
### 汇编
讲编译完的文件翻译成机器码，每一条汇编几乎可以直接翻译成一条对应的机器指令，这一步无需语义分析和优化，生成的`.o`或`.obj`后缀的二进制对象文件。
### 链接
链接是将生成的一个或者多个中间的文件联合生成可执行文件。链接程序的各个目标文件和库文件`(.a)`，成为一个能被操作系统执行的可执行文件。
## g++相关命令
Preprocessing - 由预处理器cpp完成，得到`.i`后缀的文件
```sh
g++ -E demo.cpp -o demo.i
```
Compilation - 由编译器ccplus完成，得到`.s`后缀的汇编文件
```sh
g++ -S demo.i -o demo.s
```
Assembly - 由汇编器as处理，得到`.o`的二进制目标文件
```
g++ -c demo.s -o demo.o
```
Linking - 链接器ld来完成，将二进制文件链接后得到可执行文件`.out`
```sh
g++ demo.o -o demo.out
```
