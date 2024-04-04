---
title: go常用写法
date: 2024-02-22 17:58:25
tags:
 - go
---

# 使用path.Base和filepath.Base取得路径中的文件名

```go
// 使用path.Base提取文件名 硬编码的字符串足够了
baseName := path.Base(p)
fmt.Println("Using path.Base:", baseName)


// 使用filepath.Base提取文件名; 会自动处理不同操作系统中的路径分隔符差异。在处理用户输入的路径或者从操作系统获取的路径更合适
filepathBaseName := filepath.Base(p)
fmt.Println("Using filepath.Base:", filepathBaseName)
```

# 结构体实现接口约束

```go
var _ SomeInterface = (*MyService)(nil)
```
<!-- more -->


