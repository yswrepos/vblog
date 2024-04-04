---
title: Java <T> T 和 T的区别
toc: true
keywords: 'java <T>,java <T> T和T区别,java泛型'
tags:
  - java
  - 泛型
categories:
  - 后端
  - java
abbrlink: 2cc6c3c4
date: 2021-9-30 13:01:16
---

## 导读
最近在看Java的过程中对形如`public <T> T get(...)`的写法感到困惑，在网上很难找到合理解释。


## 分析

```java
public <T> T readObjectData(ByteBuffer buffer, Class<T> type) 
```

<!-- more -->


在上面这个方法中
`<T>`代表声明了一个 通用的泛型参数`T`
`T`作为一个实际的占位符，代表返回值为`T`类型，实际返回类型只会在使用`非泛型`类型参数调用时才会确定。
如果这里不定义`<T>`,那么编译器将认为类型`T`不存在。
举例来说：
如果你传递`Class<String>`类型则返回的就是`String类型`、传递`Class<Double>`则返回`Dubbo`类型：
```java
String obj1 = clazz.readObjectData(buffer, String.class);
MyClass obj2 = clazz.readObjectData(buffer, MyClass.class);
```
## 扩展
大多数初学者有这样的疑惑，估计是还有以下这种类似让人迷惑的写法：
```java
class MyClass<T> {
   private T myMethod(T a){
       return  a;
   }
}
```
这样写因为在类上已经定义了`<T>`泛型参数，所以无需重复定义，如果你这样写：
```java
class MyClass<T> {
   private <T> T myMethod(T a){
       return  a;
   }
}
```
那么`myMethod`将返回的泛型类型可能不与`MyClass`相同，实际上像以下这样定义可能更加清晰：
```java
class MyClass<T1> {
   private <T2> T2 myMethod(T2 a){
       return  a;
   }
}
```

## 参考
[How to interpret "public \<T\> T" in Java](https://stackoverflow.com/questions/15888551/how-to-interpret-public-t-t-readobjectdata-classt-type-in-java)
[Class Literals as Runtime-Type Tokens](https://docs.oracle.com/javase/tutorial/extra/generics/literals.html)
[How to interpret Java generics like \<T\> T , \<T,V\> Query\<T\> , Class\<T\>?](https://stackoverflow.com/questions/6503942/how-to-interpret-java-generics-like-t-t-t-v-queryt-classt)
[What does "\<T\> T get()" mean?](https://stackoverflow.com/questions/36363078/what-does-t-t-get-mean-and-is-it-useful)



