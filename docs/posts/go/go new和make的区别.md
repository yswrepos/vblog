---
layout: posts
title: go new和make的区别
date: 2024-01-23 16:49:49
categories:
 - go
tags:
 - go
---


在 Go 语言中，`new` 和 `make` 都是用来分配内存的，但它们用于不同类型并且行为有所不同。

### new

- `new(T)` 用于创建一个 T 类型的新项，并返回指向它的指针（`*T`）。
- **分配的是零值。对于结构体，意味着每个字段都被初始化为其类型的零值。**
- 适用于**所有类型**，包括基本类型（如 int、float）、复合类型（如 array、struct）、指针、接口等。

```go
str := new(string) // 分配一个字符串，初始化为零值 ""，返回 *string
```
<!-- more -->

### make

- `make` 仅用于创建`切片（slice）`、`映射（map`）和`通道（channel）`这三种内建的引用类型。
- 它不仅分配内存，还**初始化这些类型的内部数据结构**，比如切片的长度和容量、映射的哈希表等。
- **返回的是初始化后的（非零）值，而不是指针。**

```go
sli := make([]int, 10, 15) // 创建一个长度为 10，容量为 15 的切片，返回 []int
```

### 区别

- **本质**：`new` 返回指针，`make` 返回初始化的值。
- **使用类型**：`new` 可用于所有类型，`make` 仅用于切片、映射和通道。
- **行为**：`new` 分配内存并初始化为零值，`make` 分配并初始化特定类型的内部结构。

### 选择使用哪一个

- 当您需要分配一个零值变量并获得指向它的指针时，使用 `new`。
- 当您需要初始化一个切片、映射或通道时，使用 `make`。

### 示例

```go
var p *[]int = new([]int)       // 分配切片本身（指针），但切片指向的数组为 nil
var v  []int = make([]int, 100) // 切片 v 引用了一个具有 100 个 int 的新数组

// 假设你要分配一个结构体并获得一个指向它的指针
type MyStruct struct {
    A int
    B string
}
ms := new(MyStruct) // ms 是一个指向新分配的结构体的指针，其字段被初始化为零值
```

在这个示例中，`ms` 指向一个 `MyStruct` 类型的新实例，而 `p` 是一个指向 `nil` 切片的指针，`v` 是一个具有 100 个 int 的切片。


## 切片本身指针的作用

### 修改切片本身
在 Go 中，`var p *[]int = new([]int)` 创建了一个指向切片的指针，其中该切片的初始值为 `nil`。
当您想在函数内部修改切片本身（即改变切片头的指针、长度和容量），而不仅仅是修改切片的内容时，您可能会用到指向切片的指针。例如：

```go
func modifySlice(s *[]int) {
    *s = append(*s, 100) // 修改 s 指向的切片本身
}

func main() {
    var p *[]int = new([]int) // p 是一个指向 nil 切片的指针
    modifySlice(p)
    fmt.Println(*p) // 输出: [100]
}
```

在这个例子中，`modifySlice` 函数接受一个指向切片的指针，并修改了这个切片本身。这是因为切片是引用类型，但切片本身的更改（如通过 `append` 扩容）并不会反映回原来的切片变量，除非通过指针操作。

### JSON反序列化

在处理 JSON 反序列化时，有时可能会用到指向切片的指针，特别是**需要区分空切片和未设置的切片时：**

```go
type Response struct {
    Data *[]int `json:"data"`
}

func main() {
    jsonStr := `{"data": [1, 2, 3]}`
    resp := Response{}
    json.Unmarshal([]byte(jsonStr), &resp)
    fmt.Println(*(resp.Data)) // 输出: [1 2 3]
}
```

在这种情况下，`Data` 字段作为一个指向切片的指针，可以区分 `data` 字段未出现在 JSON 中（`Data` 为 `nil`）和 `data` 字段为空数组（`Data` 指向一个空切片）的情况

## GO中数据结构常用定义和使用的区别

### append操作

使用 append 向切片添加元素时，如果切片的底层数组还有足够的容量来容纳新元素，append 会在切片的末尾添加这个元素。如果容量不足以容纳新元素，append 会创建一个新的、更大的数组，将现有元素和新元素复制到这个新数组中，然后返回这个新数组的切片。

- 使用make
**这会创建一个长度和容量都为0的空切片，而不是nil切片，它已经有了一个底层数组，只是这个数组的长度是 0。**

```go
s := make([]int, 0)
s = append(s, 100)
```

- 使用new
**这里的切片相当于零值, 数组指针为nil**

```go
s1 := new([]int, 0, 5)
s1 = append(s1, 100)
```

- 只声明
**这里的切片相当于一个零值的（nil）切片，指针也指向nil, 当append操作后才会为其分配底层数组**，
与上面的区别主要是内存分配位置（栈和堆）不同和返回类型不同

```go
var s2 []int
s2 = append(s2, 100)
```

在实际编程中，var s []int 由于其简洁性通常是首选方法，特别是当您不需要立即指定切片的初始容量时。使用 make([]int, 0) 对于需要明确指出切片已经被初始化但当前为空的情况比较有用，而 new([]int) 在需要切片指针的情况下使用。

## string.Builder中 var vs new


一般来说，选择 `var builder strings.Builder` 还是 `builder := new(strings.Builder)` 主要取决于具体需求和上下文，但从内存效率的角度来看，它们有些差异。

### var builder strings.Builder

```go
var builder strings.Builder
```

使用 `var` 声明的 `builder` 会在栈上分配内存。栈上的内存分配和回收通常比堆上的操作更快，因为栈是线性分配的，且生命周期通常由编译器自动管理。**对于栈上的局部变量，一旦它们超出作用域，相关内存会被立即回收。**因此，如果 `builder` 是一个局部变量，不需要跨多个函数使用，那么使用 `var` 声明通常是一个好的选择。

### builder := new(strings.Builder)

```go
builder := new(strings.Builder)
```

使用 `new` 函数创建的 `builder` 是一个指向 `strings.Builder` 的指针，指针本身在栈上分配，但它指向的 `strings.Builder` 实例在堆上分配。堆上的内存分配可能比栈上的分配稍慢，且需要通过垃圾回收器来管理。如果您需要在多个函数间共享 `builder` 或者作为返回值传递 `builder`，使用 `new` 可以更方便地实现。

### 总结

- 如果 `builder` 只在一个函数内部使用，且没有跨函数传递的需求，`var builder strings.Builder` 通常是更高效的选择。
- 如果 `builder` 需要在多个函数间共享或作为函数返回值，`builder := new(strings.Builder)` 可以提供更多的灵活性。

在实际编程中，`strings.Builder` 通常不涉及大量的数据或复杂的生命周期管理，所以这两种方式在性能上的差异通常是微不足道的。选择哪一种更多地取决于代码风格和具体场景。对于 `strings.Builder` 这样的小型结构，优先考虑代码的可读性和简洁性通常是个不错的选择

