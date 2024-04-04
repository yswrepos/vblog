---
title: SpringBoot提示"Cannot resolve symbol RestController"
toc: true
keywords: 'java,springboot,spring'
tags:
  - java
  - springboot
  - debug
categories:
  - 后端
  - java
abbrlink: 8d993f72
date: 2021-06-17 19:13:16
---

> 最近在用`maven`生成`springboot`项目时，会报一个Cannot resolve symbol RestController的简单错误，但是对于初学者来说，Java的重量级配置错误常常会让人抓狂，这里记录如何解决这个报错。


## 可能原因

### 未引入相关依赖
这是最常见的原因，`@ResetController`定义在`springboot`中的`spring-boot-starter-web`这个`artifact`中,但是我的`pom.xml`里已经有了这个依赖却依然报错。
### 缓存出错
由于之前`idea`可能发生配置错误，编辑器缓存了一些配置，导致idea一直提示此错误，我就是这种情况，折腾了很久才发现这个问题。
方法是点击菜单中的`"File" >> "Invalidate Caches" >> 勾选"file system cache and local history"`确定后重启`idea`报错消失。

 

