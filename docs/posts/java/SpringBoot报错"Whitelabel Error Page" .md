---
title: SpringBoot报错"Whitelabel Error Page"
toc: true
keywords: 'java,springboot,spring'
tags:
  - java
  - springboot
  - debug
categories:
  - 后端
  - java
abbrlink: f9569758
date: 2021-06-21 19:13:16
---

> 今天在调试Spring的时候出现了一个"`Whitelabel Error Page`"页面，如图
  
![](/static/img/posts/whitespace.png)

## 原因
### Spring无法找到对应`controller`
主应用程序(`Main application class`)默认情况下只会扫描到同一包下的`class`文件 [官方文档说明](https://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle/#using.structuring-your-code)。
<!-- more -->

![](/static/img/posts/componentScan.png)
所以解决方法有两个：
1.将`controller`写在Main application class同包下。
2.在Main application class下使用`@ComponentScan`注解：
```java
@ComponentScan(basePackages={"com.egsee.demo"})  
@SpringBootApplication
public class Demo1Application {

    public static void main(String[] args) {
        SpringApplication.run(Demo1Application.class, args);
    }
}
```

### 书写错误
因为我是个springboot初学者，在`Main Application Class`下定义了一个方法，想在浏览器下访问
```java
@RequestMapping(value = "/", produces = "text/plain;charset=UTF-8")
    public String index(){
        return "Hello Spring Boot!";
    }
```
但是我并没有在类中写`@ResetController`这种类似的注解，导致报错，加上注解后运行成功。
```java
@RestController
@SpringBootApplication
public class Demo1Application {
  // ...
}
```



 


