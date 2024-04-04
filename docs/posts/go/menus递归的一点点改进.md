---
layout: posts
title: menus递归的一点点改进
date: 2024-01-22 14:47:49
tags:
 - go
 - 优化
categories:
 - go
---

一般的menus递归我们采用以下函数:


```go 

type Item struct {
	id       int
	pid      int
	name     string
	children []Item
}

func genTree(menus []Item, id int) []Item {
	var items = make([]Item, 0)
	for _, i := range menus {
		if i.pid == id {
			iChildren := genTree(menus, i.id)
			i.children = iChildren
			items = append(items, i)
		}
	}
	return items
}

```
<!-- more -->

这种递归方法在处理大量数据时可能会导致性能问题，尤其是当树的深度非常大时。此外，每次递归调用都会遍历整个 menus 列表，这导致了一些不必要的重复遍历。
减少重复遍历和避免过多递归优化后的函数如下:

```go

type Item struct {
	id       int
	pid      int
	name     string
	children []Item
}

//  现将原始数据转换为以menu的pid为key的map类型
func toMapData(menus []Item ){
    childrenMap := make(map[int][]Item)
    for _, i := range menus {
        childrenMap[i.pid] = append(childrenMap[i.pid], i)
    }
    return childrenMap
}

func genTree(menus map[int][]Item, id int) []Item {
    if children, ok := menus[id]; ok {
        var items []Item
        for _, i := range children {
            i.children := genTree(menus, i.id)
            items := append(items, i)
        }
        return items;
    }
}

func main(){
    var menus []Item
    genTree(toMapData(menus), 0)
}

```
这种方法减少了重复的遍历，可能会在处理大型数据集时提供更好的性能。然而，对于小型或中等规模的数据集，原始的递归方法已经足够高效，并且更易于理解和维护。

