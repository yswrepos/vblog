---
title: Java注解
toc: true
keywords: 
tags:
  - java注解
  - java annotation
categories:
  - 后端
  - java
abbrlink: a1501c1d
date: 2021-09-16 19:13:16
---
## 导读
Java的注解从JDK5引入，有的注解仅仅帮助IDE给出相应提示，有的注解在`runtime`时会被解析成字节码，通过反射获取注解内容，有的注解专门约束其它注解类，这样的`Anotation`被称为`元注解`，本文结合自己的理解将逐一对其进行介绍。

<!-- more -->

## 内置注解
Java的内置注解一共有7个，3个定义在`java.lang`中，另外4个定义在`java.lang.annotation`中，为了方便，我这里把`java.lang`中定义的注解称为`内置注解`，`java.lang.annotation`定义的注解成为`元注解`。
### @Override
检查该方法是否是重写方法。如果发现其父类，或者是引用的接口中并没有该方法时，会报编译错误。
### @Deprecated
标记过时方法，如果使用使用，编译器会给出相应警告。
### @SuppressWarnings
指示编译器去忽略注解中声明的警告。比如：`@SuppressWarnings("deprecation")`,`@SuppressWarnings({"deprecation", "unused", "unchecked"})`


## 元注解（作用于其它注解上的注解）
### @Retention
 标识这个注解怎么保存，是只在代码中，还是编入class文件中，或者是在运行时可以通过反射访问。
 它的值有以下几个构成：
 - **RetentionPolicy.SOURCE**: Annotation信息仅存在于编译器处理期间，编译器处理完之后就没有该Annotation信息了。
 - **RetentionPolicy.CLASS**: 编译器将Annotation存储于类对应的.class文件中。默认行为。
 - **RetentionPolicy.RUNTIME**: 编译器将Annotation存储于class文件中，并且可由JVM读入。


#### 例子：
假设有一个我们自定义了一个名叫`TestAnn`的注解
```java

// @Retention(RetentionPolicy.RUNTIME) #可通过反射获取注解内容

// @Retention(RetentionPolicy.SOURCE) #编译器将忽视TestAnn注释
public @interface TestAnn {
  // ...
}
```

## @Target
对一个自定义注解约束其使用范围，有如下值可选：
- ElementType.TYPE - 用在类，接口，枚举，注解的声明
- ElementType.FIELD - 用在字段的和枚举常量
- ElementType.METHOD - 用在方法的声明
- ElementType.PARAMETER - 用在参数的声明
- ElementType.CONSTRUCTOR - 在构造函数的声明
- ElementType.LOCAL_VARIABLE - 用在局部变量的声明
- ElementType.ANNOTATION_TYPE - 用在注释的声明
- ElementType.PACKAGE - 用在包的声明
### 例子：
```java
// 约束注释只能用在字段和方法上
@Target(value = { ElementType.FIELD, ElementType.METHOD })
public @interface TestAnn {
  // ...
}
```

## @Documented
标记这些注解是否包含在用户文档中。


## @Inherited
标记这个注解是继承于哪个注解类(默认 注解并没有继承于任何子类)

## @SafeVarargs (Java7支持)
忽略任何使用参数为泛型变量的方法或构造函数调用产生的警告。

## @FunctionalInterface（Java8支持）
标识一个匿名函数或函数式接口。

## @Repeatable（Java8支持）
标识某注解可以在同一个声明上使用多次。

## 注解的架构
![](/static/img/posts/annotation-schema.jpg)
Annotation 有许多实现类，包括：Deprecated, Documented, Inherited, Override 等。
![](/static/img/posts/annotation-schema1.jpg)

## 注解代码的组成
Annotation.java
```java
// Annotation.java
package java.lang.annotation;

public interface Annotation {

    boolean equals(Object obj);

    int hashCode();

    String toString();

    Class<? extends Annotation> annotationType();
}
```
ElementType.java
```java
// ElementType.java
package java.lang.annotation;

public enum ElementType {
    TYPE,               /* 类、接口（包括注释类型）或枚举声明  */

    FIELD,              /* 字段声明（包括枚举常量）  */

    METHOD,             /* 方法声明  */

    PARAMETER,          /* 参数声明  */

    CONSTRUCTOR,        /* 构造方法声明  */

    LOCAL_VARIABLE,     /* 局部变量声明  */

    ANNOTATION_TYPE,    /* 注释类型声明  */

    PACKAGE             /* 包声明  */
}
```
RetentionPolicy.java
```java
//RetentionPolicy.java
package java.lang.annotation;
public enum RetentionPolicy {
    SOURCE,            /* Annotation信息仅存在于编译器处理期间，编译器处理完之后就没有该Annotation信息了  */

    CLASS,             /* 编译器将Annotation存储于类对应的.class文件中。默认行为  */

    RUNTIME            /* 编译器将Annotation存储于class文件中，并且可由JVM读入 */
}
```

## 一个简单的例子
UlRenderBorder.java
```java
// UlRenderBorder
package com.example.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(value = { ElementType.TYPE })
public @interface UlBorderRender {
  public String border() default "border: 1px solid #000";
}
```

App.java
```java
package com.example;

import com.example.annotation.UlBorderRender;

public class App {
  public static void main(String[] args) {
    Class<?> draw = Draw.class;
    boolean hasUL = draw.isAnnotationPresent(UlBorderRender.class);
    // Method[] methods = draw.getMethods();
    if(hasUL){
      StringBuilder str = new StringBuilder();
      UlBorderRender ulAnn = draw.getAnnotation(UlBorderRender.class);
      str.append("<ul>" + ulAnn.border() + "</ul>");
      System.out.println(str);
    }
  }
}
```







