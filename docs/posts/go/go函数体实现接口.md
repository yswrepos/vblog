---
layout: posts
title: go函数体实现接口
date: 2024-01-09 14:47:49
tags:
 - go
categories:
 - go
---


```go

type Invoker interface {
    Call(p interface{})
}

type FnCaller func(interface{})


func (f FnCaller) Call(p interface{}){
    f(p)
}

```

<!-- more -->

```go
// main.go

var i Invoker 

i = FnCaller(func(v interface{}){
    log.Printf("%v", v)
}())

i.Call("Hello go func")

```

