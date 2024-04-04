---
title: etcd go的基本操作
date: 2024-02-22 14:53:29
tags: 
  - etcd 
  - go
---

## New

```go
package main

import (
	"context"
	"log"
	"time"

	clientv3 "go.etcd.io/etcd/client/v3"
)

cli, err := clientv3.New(clientv3.Config{
		Endpoints:   []string{"localhost:2379"},
		DialTimeout: 5 * time.Second,
	})
	if err != nil {
		log.Fatal(err)
	}
	defer cli.Close()
```

## 存储
```go
	// 存储
	_, err = cli.Put(context.Background(), "/temp-etcd-k", "temp-etcd-v")
	if err != nil {
		log.Fatal(err)
	}
```

## 获取
```go

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
    // 
	resp, err := cli.Get(ctx, "/temp-etcd-k")
	if err != nil {
		log.Fatal(err)
	}
    // 获取k,v的值
	for _, ev := range resp.Kvs {
		log.Printf("%s: %s\n", ev.Key, ev.Value)
	}
```
<!-- more -->

## watch

```go
	wctx, wcancel := context.WithTimeout(context.Background(), time.Minute*1)
	watchChan := cli.Watch(wctx, "/temp-etcd-k")
	defer wcancel()

	// wtimer := time.NewTimer(2 * time.Minute)

	// go func() {
	// 	select {
	// 	case <-wtimer.C:
	// 		wcancel()
	// 	}
	// }()

	log.Printf("Watching temp-etcd-k for changing...")
	for {
		select {
		case wresp, ok := <-watchChan:
			if !ok {
				log.Printf("Watch chan has closed.")
				return
			}
			for _, ev := range wresp.Events {
				log.Printf("KEY EVENT CHANGE Type: %s Key:%s Value:%s\n", ev.Type, ev.Kv.Key, ev.Kv.Value)
			}
		}
	}
```


