---
title: Git Submodule 简单使用
toc: true
keywords: 'url,url schema,url构成,url fragment,url query'
tags:
  - 前端基础
categories:
  - 前端基础
abbrlink: 8e690a6a
date: 2021-3-20 18:00:01
---
## 导读
> URL由多部分构成，不同的语言解析URL函数得到的名称并不完全相同，恰巧在网上看到一篇不错关于URL组成的图形化描述，在此记录。

## URL组成
```js
"https://bob:bobby@www.lunatech.com:8080/file;p=1?q=2#third"
```

<!-- more -->


一个这样的URL，可以提取到以下信息：
```zsh
+-------------------+---------------------+
|        Part       |       Data          |
+-------------------+---------------------+
|  Scheme           | https               |
|  User             | bob                 |
|  Password         | bobby               |
|  Host             | www.lunatech.com    |
|  Port             | 8080                |
|  Path             | /file;p=1           |
|  Path parameter   | p=1                 |
|  Query            | q=2                 |
|  Fragment         | third               |
+-------------------+---------------------+

https://bob:bobby@www.lunatech.com:8080/file;p=1?q=2#third
\___/   \_/ \___/ \______________/ \__/\_______/ \_/ \___/
  |      |    |          |          |      | \_/  |    |
Scheme User Password    Host       Port  Path |   | Fragment
        \_____________________________/       | Query
                       |               Path parameter
                   Authority
```
使用nodejs `URL`函数打印的URL信息：
```js
> const url = "https://bob:bobby@www.lunatech.com:8080/file;p=1?q=2#third"

> new URL(url)
URL {
  href: 'https://bob:bobby@www.lunatech.com:8080/file;p=1?q=2#third',
  origin: 'https://www.lunatech.com:8080',
  protocol: 'https:',
  username: 'bob',
  password: 'bobby',
  host: 'www.lunatech.com:8080',
  hostname: 'www.lunatech.com',
  port: '8080',
  pathname: '/file;p=1',
  search: '?q=2',
  searchParams: URLSearchParams { 'q' => '2' },
  hash: '#third'
}
```

## 参考
> [Url encoding the space character or %20](https://stackoverflow.com/questions/1634271/url-encoding-the-space-character-or-20)
