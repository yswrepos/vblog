---
title: go接口指针的一些注意点
date: 2024-02-23 02:53:01
tags:
 - go
---


## 值接收者和指针接收者的一点区别

在Go语言中值接收者和指针接收者有一些区别：方法可以通过指针接收者（Pointer Receiver）或值接收者（Value Receiver）来定义。这两种接收者在使用时有本质的不同，主要体现在对原始数据的操作方式和效率上。

### 值接收者

- 值接收者在方法调用时，使用的是原始值的一个副本。
- 对于值接收者的任何修改都不会影响到原始数据。
- 适用于小结构体或基本数据类型的情况，因为这样做的开销较小。
- **使用值接收者定义的方法，可以通过值调用也可以通过指针调用，Go会自动进行转换。**

### 指针接收者

- 指针接收者在方法调用时，使用的是原始值的内存地址。
- 通过指针接收者做的任何修改都会直接影响到原始数据。
- 适用于大结构体或需要修改接收者中数据的情况，因为这样可以避免大量的数据复制，提高效率。
- **使用指针接收者定义的方法，同样可以通过值调用（如果是可寻址的）和指针调用，Go会自动进行转换。**

### 本质区别

1. **修改能力**：指针接收者允许直接修改原始数据，而值接收者的修改是在副本上进行，不会影响原始数据。
2. **性能考虑**：对于大型结构体或需要频繁修改的场景，使用指针接收者可以减少数据复制的开销，提高性能。
3. **自动转换**：Go语言在调用方法时，会根据方法定义的接收者类型（值接收者或指针接收者），自动转换调用方式，这提高了语言的灵活性和易用性。

总结来说，选择值接收者还是指针接收者，需要根据实际情况考虑数据的大小、是否需要修改原始数据以及性能影响等因素。在实际开发中，推荐根据具体需求灵活选择。

### 使用示例

```go
type MyService struct{}

// 值实现
func (ms MyService) Run() error {
	log.Println("Run method called")
	return nil
}

func main(){
    ms := MyService{}
    ms.Run() 
    pms := &MyService{}
    pms.Run()
}

// 指针实现
func (ms *MyService) Run() error {
	log.Println("Run method called")
	return nil
}
 ms := MyService{}
 ms.Run() 
 pms := &MyService{}
 pms.Run()
```

## 两者实现的一点影响

虽然不管调用主体是值还是指针，GO会自动转换调用方式。
但是在使用上还是有一点影响和区别：

### 确保结构体实现接口

```go
var _ CrawlerServiceServer = (*MyService)(nil)
```

以上代码强转`(*MyService)`确保了`MyService` 或 `*MyService`必须实现`CrawlerServiceServer`接口, 但反过来不行，即：

- **值接收者方法：**
**当你为一个类型定义了一个方法，该方法的接收者是非指针类型（即值接收者），那么这个方法既属于这个类型，也属于这个类型的指针。**
- **指针接收者方法：**
**如果一个方法的接收者是指针类型，那么这个方法只属于指针类型，不属于非指针类型。**

<!-- more -->
### 指针类型实现接口的限制

以下代码 值实现了`Run`，则无论指针还是值都实现了`Run`

```go

type MyStruct struct {
	Handler CrawlerServiceServer
}

type CrawlerServiceServer interface {
	Run() error
}

type MyService struct{}

func (ms MyService) Run() error {
	log.Println("Run method called")
	return nil
}

func main() {
	ms := MyService{}
    // myStruct := MyStruct{
	// 	Handler: ms,
	// }
	myStruct := MyStruct{
		Handler: &ms,
	}
	fmt.Println(myStruct)
}
```

如果Run是指针接收实现的，那么实例没有实现Run方法

```go
func (ms *MyService) Run() error {
	log.Println("Run method called")
	return nil
}

func main() {
	ms := MyService{}
	myStruct := MyStruct{
        // ms编译报错： MyService does not implement CrawlerServiceServer (method Run has pointer receiver)
	    Handler: ms,
        // 正确
        // Handler: &ms
	}
	fmt.Println(myStruct)
}

```

### 接口指针的使用

如果一个方法是指针接收者方法实现，在接口使用和判断上会有一些局限，即传入的必须是指针类型。

```go
package main

import "fmt"

type RunnerManager struct {
	runnerHandler Runner
}

type Runner interface {
	run() error
}

type Man struct{}

func (m *Man) run() error {
	fmt.Println("Man run called")
	return nil
}

func main() {

	m := Man{}
	rm := RunnerManager{
        // m 编译报错, 因为m的指针才实现了Runner接口
		runnerHandler: m,
	}

}

```

### 结构体成员为接口的指针的使用示例

#### 传递接口指针类型给结构体
```go
// 如果这里改为*Runner类型
type RunnerManager struct {
	runnerHandler *Runner
}

// ...

m := Man{}
rm := RunnerManager{
    // 这里的&m会报错，因为*Man实现了Runner，但是runnerHandler是一个Runner接口的指针
    runnerHandler: &m,
}

// 正确方法是
var mr Runner = &m // 先转换为Runner接口类型
rm := RunnerManager{ 
    runnerHandler: &mr, // 去传递*Runner
}

```

#### 使用结构体成员的接口指针

```go
// 调用
var m Man
var mr Runner = &m //转为Runner接口类型
rm := RunnerManager{runnerHandler: &mr} // 初始化结构体 传入Runner接口的指针类型

(*rm.runnerHandler).run() // 解引用，调用接口的Run方法

// 类型断言: 断定接口是*MyService类型
if v, ok := (*rm.runnerHandler).(*Man); ok {
		fmt.Println(v, ok)
} 
```
