---
title: go内存泄漏的几种可能
date: 2023-11-23 22:49:37
tags:
  - go
  - memory leak
categories:
  - go
---


## 长期存在的goroutine引用对象

```go
func leakyFunction(){
  data := make([]int, 1000)
  go func() {
    // 这个goroutine不会退出，因此它引用的data永远不会被回收
    for {
      time.Sleep(time.Hour)
      _ = data[0] // 保持对data的引用
    }
  }
}
```
<!-- more -->
goroutine中添加退出机制，避免goroutine不退出造成的长时间引用
```go
func nonLeakyFunction() {
    data := make([]int, 1000)
    go func() {
        // 添加退出机制
        for {
            select {
            case <-time.After(time.Hour):
                _ = data[0]
            case <-exitChan:
                return
            }
        }
    }()
}
```

## 全局变量引起的内存占用
以下示例`globalData`申请了一个1000个整数的内存空间，知道程序结束，会造成程序占用，
当需要申请大量内存时，最好局部（按需）声明变量引用。

```go
var globalData = make([]int, 1000)

func doSomething() {
    // 操作全局变量
    globalData[0] = 1
}

```

使用局部变量，按需申请内存

```go
func doSomething() {
    localData := make([]int, 1000)
    // 使用局部变量代替全局变量
    localData[0] = 1
}
```

## 未关闭的channel

未关闭的channel会导致潜在的内存占用，以下例子没有关闭内部的ch，channel内部的数据可能得不到释放，
另外接收方的goroutine因为发送没有关闭channel而可能会永久的等待channel数据，这回造成相关资源得不到回收。

```go
func leakyChan(){
  ch := make(chan int)
  go func(){
    for i := 0; i < 10; i++ {
      ch <- i
    }
    // 没有关闭channel
    // close(ch)
  }()
}
```

## 循环引用

```go
type Node struct {
  data String
  next *Node
}

func createCycle(){
  node1 := &Node{data: "node1"}
  node2 := &Nod{data: "node2"}
  node1.next = node2
  node2.next = node1
}
```
Go的垃圾收集器能处理大多数循环引用，但在某些复杂的情况下，循环引用可能导致内存泄漏。
所以要注意设计清晰的数据结构，避免不必要的循环引用。


## 未关闭的context


```go
func leakyContext() {
    ctx, _ := context.WithCancel(context.Background())
    go func(ctx context.Context) {
        for {
            select {
            case <-ctx.Done():
                return
            default:
                // 执行一些操作
            }
        }
    }(ctx)
    // 忘记调用cancel函数
}
```

忘记调用由`context.WithCancel(context.Background())`创建的cancel函数会导致一些潜在的资源无法得到释放。这些资源主要包括与context对象关联的资源和可能被阻塞的goroutine。

- Context的内部结构：
每个通过context.WithCancel创建的context对象内部都有一些结构，用于处理取消操作和传递取消信号。这些结构包括用于通知取消的channel和与此相关的数据。如果cancel函数没有被调用，这些结构可能不会被及时清理。

- 阻塞的goroutine 
goroutine在ctx.Done()上等待取消信号。如果取消函数（cancel）没有被调用，这个goroutine将永远等待，因此不会退出。这意味着goroutine占用的所有资源（如栈内存）都不会被释放。


所以在不再需要context时，应该调用其对应的cancel函数。这是良好的编程实践，可以确保资源得到正确释放。
也可以使用defer保证调用：在可能的情况下，可以在创建context的同一作用域中使用defer来调用cancel，以确保即使在发生错误或提前返回的情况下也能保证调用cancel。

在这个例子中，合理的做法是在创建context后立即使用defer来安排调用其cancel函数，或者在不再需要context时显式调用cancel。这样可以确保相关资源被及时清理，防止潜在的资源泄漏。


## defer语句在运行时间较长的函数中

```go
func leakyDefer() {
    f, _ := os.Open("file.txt")
    // 应该直接调用f.Close() 及时关闭文件
    defer f.Close() // 延迟关闭文件，文件在函数运行期间一直打开

    // 长时间执行的操作
    time.Sleep(time.Hour)
}
```

在Go中，由于其自动垃圾回收机制，内存通常在没有任何有效引用时被自动回收。但是，即使在Go中，良好的内存管理仍然是重要的，特别是在处理大型数据结构或在并发环境中。例如，长时间运行的goroutine如果保持对大型数据结构的引用，即使这些数据结构实际上已不再需要，也可能导致内存占用不必要地高。
由于编程错误，一块内存仍被错误地引用（即使它实际上已不再需要），垃圾回收器就不会回收这块内存。这就是内存泄漏的典型情况，其中内存实际上对程序的其余部分是无用的，但由于错误地保留了对它的引用，它无法被回收。

为了避免这些问题，建议进行仔细的代码审查，使用工具（如pprof）进行性能分析和内存分析，以及编写有效的测试来监测和防止内存泄漏的发生。

## 其它

有些语言没有自动GC，开发人员可能需要手动回收内存，否则内存不可访问和管理后会造成内存泄漏，比如c

```c
//定义两个指针分别指向两块内存
char * p1 = (char *)malloc(10);
char * p2 = (char *)malloc(10);
//将p1指向p2指向的内存
p1 = p2
```

此举会造成p1原来指向的内存泄口

除了c语言，还有c++、Rust、Fortran、Pascal和汇编语言没有真正意义上的自动GC
