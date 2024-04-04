---
title: 使用OpenSSL自签名证书
toc: true
keywords: 'openssl,https,ssl/tsl,自签名,证书,数字证书,cert,csr,crt,pem'
tags:
  - web安全
  - 密码学
categories:
  - web安全
abbrlink: 8e14ac7c
date: 2021-03-17 13:01:21
---
## 导读
> 网上关于自签证书的博客资料可以说是很多了，但其中的很多写的都是含糊不清的，此篇文章将会尽量清晰的描述自签名证书和创建CA为自己的服务器颁发证书。

## 什么是数字证书和数字签名
对于这个问题，阮一峰有一篇 **[文章](http://www.ruanyifeng.com/blog/2011/08/what_is_a_digital_signature.html)** 比较形象的解释了这个问题，此处，我们主要记录如何生成。

## 创建CA颁发数字证书
要给我们的服务器颁发一个`数字证书`，我们首先需要自己创建一个证书颁发机构 `CA` ，通常情况下，这个CA是真实的颁发机构，我们使用Chrome访问的`https`网页时会出现一把锁，这些都是真实的CA颁发的，因此浏览器对此是信任的。


**为CA生成一个长度为1024的私钥**
```c
openssl genrsa -out ca.key 1024
```
<!-- more -->

**生成CA机构自己的证书申请文件(.csr)**
```c
openssl req -new -key ca.key -out ca.csr
```

**使用私钥和证书申请文件为CA生成一个自己签名的证书，俗称自签名证书，这里也叫根证书**
```c
openssl x509 -req -in ca.csr -signkey ca.key -out ca.crt
```
> 第二个命令中，`req`是一个`openssl`的一个关于证书请求文件的子命令，可以运行`openssl req --help`查看帮助。最后一个命令的`x509`是在 **[ASN.1](https://baike.baidu.com/item/ASN.1/498523)** 中定义的 **[一种格式](https://baike.baidu.com/item/X.509/2817050)**，X.509证书里含有公钥、身份信息(比如网络主机名，组织的名称或个体名称等)和签名信息(可以是证书签发机构CA的签名，也可以是自签名)，证书的拥有者就可以用证书及相应的私钥来创建安全的通信，对文档进行数字签名。
在nginx使用https，nginx配置好后只需将`ca.crt`颁发给客户端电脑，客户端电脑信任后，浏览器浏览即可看到一把绿锁状态。

### 生成服务器私钥
```sh
openssl genrsa -out server.key 1024
```

### 生成服务器证书申请文件
```sh
openssl req -new -key server.key -out server.csr
```
### 使用CA证书签名服务器证书文件
```sh
openssl x509 -req -in server.csr -out server.crt -CA ca.crt -CAkey ca.key -CAcreateserial
```

## 自签名证书
自签名证书顾名思义无需CA参与，自己给自己颁发一个证书，流程相对简单
```sh
openssl genrsa -out server.key 1024
openssl req -new -key server.key -out server.csr
openssl x509 -req -in server.csr -signkey server.key -out ca.crt
```
也可以省略生成密钥过程，让系统自动生成
```
openssl req -x509 -nodes -days 365 -newkey rsa:1024 \
-keyout /tmp/server.key -out /tmp/server.crt
```
> `-nodes` 选项禁止加密私钥文件。
`-days` 指定过期时间

然后输入一些信息：
```
Country Name (2 letter code) [AU]:
State or Province Name (full name) [Some-State]:
Locality Name (eg, city) []:
Organization Name (eg, company) [Internet Widgits Pty Ltd]:
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []: 这个是你的域名或ip
Email Address []:
```
另外也可以只省略证书请求文件，让系统在签署过程中在内存中自动创建证书请求文件
```
openssl req -new -x509 -key pri.pem -out server.crt -days 365
```
这样一个证书就申请好了。

## 其它命令
### 查看证书申请文件
一个服务器申请文件可通过`openssl req -in req1.csr -noout -text`来输出文件头部分，如下:
```sh
Certificate Request:
    Data:
        Version: 0 (0x0)
        Subject: C=AU, ST=Some-State, O=Internet Widgits Pty Ltd //个人信息
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption  //使用的公钥算法
                Public-Key: (2048 bit)
                Modulus:
                    00:cf:a2:a6:65:ab:e0:38:73:25:8c:d6:33:94:ba:
                    d9:4f:6c:93:28:bc:05:81:b9:4c:07:02:93:e2:07:
                    c3:0f:57:92:ad:16:e9:57:6f:05:93:44:66:5b:2a:
                    1a:54:5f:80:96:3f:b0:5a:b6:fe:70:fb:a1:4d:f5:
                    cf:d3:fb:10:ec:8a:1c:3b:53:6c:dd:49:a8:d7:61:
                    52:b9:9d:06:e3:94:7a:6f:73:4d:f6:7d:7b:ad:55:
                    bf:85:28:0d:8c:dc:50:72:5d:bb:9d:f8:ed:2a:18:
                    82:f2:03:b6:00:61:7f:ad:ea:36:57:00:8e:77:df:
                    06:00:97:d3:fe:09:35:a6:3d:0d:47:71:24:03:26:
                    3b:b6:37:f3:24:1d:d9:2f:c7:d8:7e:d2:db:08:b2:
                    49:35:6d:4c:d2:d6:57:0d:e8:6f:4c:ae:5e:50:1c:
                    f4:bf:42:df:f1:fb:19:88:eb:0f:05:ad:69:32:da:
                    89:2e:ef:61:e2:95:58:11:27:ba:1c:9f:f4:7f:83:
                    03:de:2f:a6:73:2b:18:b5:46:82:c5:8b:85:19:c0:
                    f4:25:d4:d8:ad:b6:81:9f:e1:b2:6d:ab:eb:ef:ba:
                    2d:f3:06:fa:65:54:8c:14:81:65:4b:d2:48:b4:32:
                    fd:ae:f7:71:6d:8e:dc:9d:a6:87:47:ee:a7:11:3f:
                    ab:a9
                Exponent: 65537 (0x10001)
        Attributes:
            a0:00
    Signature Algorithm: sha256WithRSAEncryption   //请求文件使用的数字签名算法
         95:68:5f:6a:6e:f0:b6:7c:bc:97:c7:c5:ce:76:c0:a8:3f:2a:
         07:61:5f:75:ee:f0:c3:73:51:c9:b9:d7:59:68:67:06:ca:e5:
         a8:d3:68:19:32:27:ff:18:5f:4b:eb:02:6f:7c:f6:85:db:76:
         36:56:90:3f:b6:f9:45:4a:1a:4c:74:a9:28:b1:f9:e9:f2:af:
         2e:4f:d6:38:d5:72:b0:ba:11:36:92:55:9c:a3:48:61:6f:66:
         73:7b:f6:35:91:cf:8a:23:aa:e1:e1:fd:ed:b1:ea:78:6c:0d:
         1b:bf:6c:19:4c:a7:1c:dc:09:bb:a5:3f:2f:b2:aa:77:cb:d5:
         2b:e4:57:bc:14:14:7d:ed:ec:a3:d5:b4:50:93:d3:b0:3a:07:
         49:0b:fa:e7:42:b8:a6:bf:39:ae:bf:c6:66:37:f3:40:2b:59:
         75:ce:c4:08:f4:b1:18:2c:48:17:a8:2c:6d:41:1e:5a:a8:86:
         34:53:a7:ff:fd:e0:95:64:b7:69:9b:86:b7:66:4d:db:74:dc:
         c6:52:18:e9:dc:2a:b0:b1:f9:33:10:a8:d6:0d:1a:ef:0c:ac:
         1b:fc:c7:61:30:ab:80:01:62:21:06:f1:7b:a7:0c:7c:bf:20:
         e8:d2:b6:24:a3:9a:93:ae:94:02:cf:06:23:74:1f:54:ec:16:
         a7:7e:44:b4
```
输出subject部分
```
openssl req -in req.csr -subject -noout
```
使用`-pubkey`输出请求文件中的公钥
```
openssl req -in req1.csr -pubkey -noout
```
如果是从申请证书请求时所提供的私钥中提取出公钥，那么以下输出的公钥和上面相同。
```
 openssl rsa -in server.key -pubout
```
### 指定证书请求文件中的签名算法
如果不指定此项，默认为`sha256`，也支持其它很多签名算法，可以通过使用`openssl dgst --help`查看
```
openssl req -new -key server.key -out server.csr -md5
openssl req -in server.csr -noout -text | grep Algo
```
### 验证请求文件的数字签名（验证文件是否被篡改）
```
openssl req -verify -in server.csr //未被篡改会打印verify OK
```







