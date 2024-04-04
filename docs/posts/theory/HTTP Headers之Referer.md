---
title: HTTP Headers之Referer
toc: true
keywords: 'referer,referrer-policy,headers,meta'
tags:
  - headers
categories:
  - 前端基础
abbrlink: 30eac58d
date: 2021-01-17 13:01:21
---

## 导读
> 本文主要记录一下 Headers 中 Referer 和 Referrer-Policy 等相关字段介绍

<!-- more -->

## Referer

> Referer 字段标记了访问来源，广泛应用于分析、日志、优化缓存等作用。
> Referer 字段是 Referrer 单词的错误拼写，由于历史原因沿用至今。
> 当点击一个链接的时候，`Referer`包含了拥有这个链接的页面地址，而在对其它域名发起资源请求时，则包含了请求页面的地址。


###   构成

`Referer`由 `origin, path, querystring`字段构成，`fragment`(e.g. "#section") 或者 `username:password` 信息将不会包含在其中。

###   语法

> Referer: `<url>`

###   例子

"https://username:password@example.com/foo/bar/"将不会包含在Referer中
诸如一下的例子会包含在 Referer 中

```javascript
Referer: https://developer.mozilla.org/en-US/docs/Web/JavaScript
Referer: https://example.com/page?q=123
Referer: https://example.com/
```

> 注意：Referer 可能包含以上域名的全部或部分，这取决于 [Referrer Policy](#Referrer-Policy)

## Referrer-Policy

Referrer-Policy 字段主要控制将要展示哪些 Referer 信息

有一下几个选项：

```javascript
Referrer-Policy: no-referrer
Referrer-Policy: no-referrer-when-downgrade
Referrer-Policy: origin
Referrer-Policy: origin-when-cross-origin
Referrer-Policy: same-origin
Referrer-Policy: strict-origin
Referrer-Policy: strict-origin-when-cross-origin
Referrer-Policy: unsafe-url
```

-   **no-referrer**
    省略 Referer 字段，发送请求将不会包含任何头字段
-   **no-referrer-when-downgrade**
    这个选项的主要意思是当从 https 访问到 http 中时不展示 referer 信息
-   **origin**
    只展示 Origin
-   **origin-when-cross-origin**
    表示同源且相同级别协议（https => https, http => http）下，展示 Referer 所有信息，但在跨域和降级（https => http）访问时只展示 origin 信息。
-   **same-origin**
    仅在同源下展示 referer 信息
-   **strict-origin**
    仅在安全(https)协议下展示 referer 信息
-   **strict-origin-when-cross-origin (默认)**
    同源请求展示全部 referer 信息, 跨域请求且安全协议下（https => https）仅展示 origin
-   **unsafe-url**
    任何情况下都展示完整 referer

### 在 HTML 里设置 referer Policy 信息

也可以在 HTML 中设置 referer 策略信息，如

```html
<meta name="referrer" content="origin" />
```

在 `<a>, <area>, <img>, <iframe>, <script>, <link>` 标签中可以使用`referrerpolicy`选项设置 referer policy 信息：

```html
<a href="http://example.com" referrerpolicy="origin">
```

或者在一个 a, area, 或 link 元素中设置 `rel` 为 noreferer

> 注意：上面的 noreferrer 链接关系是不带破折号的。当您使用 `<meta>` 元素为整个文档指定引用策略时，应使用短划线编写：`<meta name="referrer" content="no-referrer">`。

### 与 CSS 集成

CSS 可以从样式表中获取引用的资源。这些资源也遵循推荐人政策：

-   外部 CSS 样式表使用默认策略 (strict-origin-when-cross-origin)，除非它被 CSS 样式表响应中的 Referrer-Policy HTTP 标头覆盖。
-   对于 `<style>` 元素或样式属性，使用所有者文档的引用策略。

## 参考

> [Referrer-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy#integration_with_html)
[Referer](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer)
[Content Security Policy 入门教程](https://www.ruanyifeng.com/blog/2016/09/csp.html)

