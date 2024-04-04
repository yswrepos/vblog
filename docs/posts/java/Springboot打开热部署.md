---
title: Springboot打开热部署
toc: true
keywords: 'springboot,spring-boot-dev,spring热部署'
tags:
  - java
  - springboot
categories:
  - 后端
  - java
abbrlink: aa953346
date: 2021-08-21 19:13:16
---

> 最近在使用`Springboot`热启动的时候，参照了网上很多方法，但发现很多不全。

## 如何使用`Springboot`热启动

1. `pom.xml`添加依赖`spring-boot-devtools`
```xml
  <!--  spring-boot hot refresh  -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
        </dependency>
```
2. `spring-boot-maven-plugin`添加配置项`fork: true`
```xml
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <!--    set ture to enable hot start of devtools    -->
    <configuration>
        <fork>true</fork>
    </configuration>
</plugin>
```

3. 打开`Preferences`(Mac cmd + ，)找到`Build, Exception, Deployme`下的`compiler`,单击`Compiler`,在右边`Build project automatically`选项框内打勾。

 ![](/static/img/posts/spring-devtools1.png)
<!-- more -->


4. 打开auto-make,操作如下：
(IDEA 2021.2版本以后)
`cmd + ,`（Mac）打开`Preferences`，找到`Advanced Settings`,勾选右边的`Allow auto-make to start...`选项卡。

 ![](/static/img/posts/spring-devtools2.png)
(IDEA 2021.2版本以前)
`option+cmd+shift+/`(windows `ctrl+alt+shift + /` ) 选择 `Registry` 勾选`compiler.automake.allow.when.app.running`

5.`application.properties`中添加`spring.devtools.restart.enabled=true`

