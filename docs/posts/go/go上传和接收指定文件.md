---
title: go上传和接收指定文件
date: 2024-02-22 18:08:39
tags:
 - go
---



## 客户端

```go
package main

import (
	"bytes"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"path"
)

func main() {

	// 读取参数
	if len(os.Args) < 2 {
		fmt.Println("Usage: go run client.go <file_path>")
		return
	}
	filepath := os.Args[1] // 获取命令行输入的文件路径

	// 打开要上传的文件
	file, err := os.Open(filepath)
	if err != nil {
		panic(err)
	}
	defer file.Close()

    // var body bytes.Buffer
	// writer := multipart.NewWriter(&body)
	// 创建一个新的表单数据缓冲
	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)
	// field fileKey fileName
	part, err := writer.CreateFormFile("file", path.Base(filepath))
	if err != nil {
		panic(err)
	}

	// 将文件复制到表单
	io.Copy(part, file)
	writer.Close()

	// 发送POST请求
	request, err := http.NewRequest("POST", "http://localhost:8080/upload", body)
	if err != nil {
		panic(err)
	}
	request.Header.Add("Content-Type", writer.FormDataContentType())

	client := &http.Client{}
	response, err := client.Do(request)
	if err != nil {
		panic(err)
	}
	defer response.Body.Close()

	// 输出响应状态
	io.Copy(os.Stdout, response.Body)
}

```
<!-- more -->

## 服务端
```go
package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

const (
	KB int64 = 1024
	MB       = KB * 1024
	GB       = MB * 1024
)

func main() {

	http.HandleFunc("/upload", func(w http.ResponseWriter, r *http.Request) {
		// 只允许POST方法
		if r.Method != "POST" {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		maxFileSize := 200 * MB

		// 限制上传大小
		// 检查Content-Length头部 预先判断请求体的大小
		if r.ContentLength > maxFileSize {
			http.Error(w, "The uploaded file is too large. Please upload a file smaller than 200MB.", http.StatusBadRequest)
			return
		}

		// 内存限制大小 超出将写入临时文件
		// err := r.ParseMultipartForm(10 << 20)
		err := r.ParseMultipartForm(10 * MB)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		// 读取文件
		file, handler, err := r.FormFile("file")
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		defer file.Close()

		fmt.Printf("Uploaded File: %+v\n", handler.Filename)
		fmt.Printf("File Size: %+v\n", handler.Size)
		fmt.Printf("MIME Header: %+v\n", handler.Header)

		// 打开一个对应类型的文件用于保存上传的内容
		outFile, err := os.Create(handler.Filename)
		if err != nil {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}
		defer outFile.Close()

		// 写入接受到的文件
		_, err = io.Copy(outFile, file)

		// 直接将请求体写入文件
		// _, err = io.Copy(outFile, r.Body)
		if err != nil {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		w.Write([]byte("File uploaded successfully"))
	})

	http.ListenAndServe(":8080", nil)
}

```