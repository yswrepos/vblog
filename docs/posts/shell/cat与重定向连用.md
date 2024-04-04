---
title: cat与重定向连用
date: 2024-02-27 18:16:53
tags:
 - shell
categories: shell
# sticky: true
# sticky: 1
# excerpt: <p>A sticky article demo.</p>
---

看到一段cat的用法：

```sh
cat >>$HOME/.bash_profile <<EOF 
alias test="sudo /sbin/ifconfig en0 ether \\\`openssl rand -hex 6 | sed 's/\(..\)/\1:/g; s /.$//'\\\`" 
EOF
```


```sh
cat >/etc/sudoers.d/test <<EOF 
Cmnd_Alias CMD_TEST = /sbin/ifconfig en0 ether * 
ALL ALL=NOPASSWD: CMD_TEST 
EOF
```

<!-- more -->
其中cat跟`>`表示覆盖到某个文件，覆盖内容为EOF后面的一段。