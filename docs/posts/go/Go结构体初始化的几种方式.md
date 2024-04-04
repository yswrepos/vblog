---
title: Go结构体初始化的几种方式
date: 2023-12-14 19:17:32
tags:
  - go
categories:
  - go
---

在Go语言（又称Golang）中，初始化结构体的方式多样，以下是一些常用的方法：

1. 使用类型字面量：

   ```go
   type MyStruct struct {
       Field1 int
       Field2 string
   }
   // 初始化一个结构体实例，字段使用零值
   var s1 MyStruct
   ```
<!-- more -->

2. 使用类型字面量并赋值：

   ```go
   // 初始化一个结构体实例并提供字段值
   s2 := MyStruct{Field1: 10, Field2: "Hello"}
   ```

3. 使用`new`关键字：

   ```go
   // 使用new分配内存，返回指向结构体的指针，字段使用零值
   s3 := new(MyStruct)
   ```

4. 使用`&`运算符：

   ```go
   // 使用&获取结构体实例的地址，可与类型字面量结合用于初始化字段
   s4 := &MyStruct{Field1: 10, Field2: "Hello"}
   ```

5. 使用构造函数模式（非官方语言特性，但为一种通行的习惯用法）：

   ```go
   // 定义一个构造函数
   func NewMyStruct(f1 int, f2 string) *MyStruct {
       return &MyStruct{Field1: f1, Field2: f2}
   }
   // 使用构造函数初始化结构体
   s5 := NewMyStruct(10, "Hello")
   ```

6. 使用变量：

   ```go
   // 声明一个结构体变量
   var myStruct MyStruct
   // 分别初始化字段
   myStruct.Field1 = 10
   myStruct.Field2 = "Hello"
   ```

7. 使用键值对初始化（当结构体字段很多时，可以只初始化部分字段）：

   ```go
   s6 := MyStruct{
       Field1: 10, // 只初始化Field1，Field2使用零值
   }
   ```

这些方法可以根据不同的场景和需要进行选择。通常，在需要显式初始化字段值时，会选择使用类型字面量进行初始化；而当结构体的零值就是所需状态时，使用`new`或者直接声明变量的方式会更简洁。构造函数模式通常用在需要封装初始化过程或者有额外逻辑处理时。