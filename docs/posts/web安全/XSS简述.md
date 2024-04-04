---
title: XSS攻击介绍
toc: true
keywords: "xss,前端xss攻击,防范xss攻击"
tags:
    - web安全
    - 网络安全
categories:
    - web安全
abbrlink: ec76a593
date: 2021-3-1 23:01:26
---

## 导读

> XSS 攻击是非常常见的网页攻击了，网上有很多资料，但我始终想写一个简单的总结。

## 何为 XSS?

XSS(Cross site script)指利用浏览器的特性，像指定网页提交特殊字符造成浏览器解析运行的一种攻击手段。XSS 有几种，个人觉得记这些意义不大，因此这里不再赘述，有兴趣的朋友可以在网上搜一下。

## 如何产生 XSS

XSS 攻击主要来自于用户的输入，如果你的站点存在着 XSS 漏洞，那么用户就可以进行 XSS 攻击，通过运行脚本代码，用户可以获取譬如 Cookie 等较为敏感的信息。

## 一个 XSS 攻击的例子

这里我引用[LearnKu](https://learnku.com/)的两张图来说明 XSS 攻击事如何发生的
在原文中，作者使用了 所见即所得 编辑器，指出虽然所见即所得编辑器过滤了特殊的字符，但依然可能发生 XSS 攻击，原因在于非法用户可能通过其它手段提交数据：

-   **使用 Chrome devtools 提交数据 刷新页面发生 XSS 攻击**

![xss-demo-1](/static/img/posts/xss-demo1.gif)

<!-- more -->

-   **数据库已经有了特殊字符的数据**

![xss-demo-2](/static/img/posts/xss-demo2.gif)

Chrome Devtools 示例攻击提交

```javascript
fetch("http://xss.test/demo", {
    headers: { "content-type": "application/x-www-form-urlencoded", "upgrade-insecure-requests": "1" },
    body:
        "_token=AGL1jSjzX152b71UEAQiTzwbYdRGYnECRI17WRiG&title=dangerous%20content+&category_id=2&body=%3Cscript%3Ealert%28%27%E5%AD%98%E5%9C%A8%20XSS%20%E5%AE%89%E5%85%A8%E5%A8%81%E8%83%81%EF%BC%81%27%29%3C%2Fscript%3E",
    method: "POST",
    mode: "cors",
});
```

## 监测XSS漏洞
可以使用[XSS Polylot](https://github.com/0xsobky/HackVault/wiki/Unleashing-an-Ultimate-XSS-Polyglot)监测XSS漏洞，文章进行了说明并有很多demo.
也可以使用一些第三方检测工具[Arachni](https://github.com/Arachni/arachni)、[http-observatory](https://github.com/mozilla/http-observatory/)

## 防范 XSS 攻击

以上的例子说明，虽然各种开源的编辑器已经做了 XSS 过滤，但依然发生 XSS 攻击，这是因为后端和网页展示没有对 XSS 做过滤，因此需要前后端都对特殊字符进行过滤，以确保没有 XSS 漏洞。
XSS 攻击的本质是浏览器解析了特殊字符的脚本，因此我们只需要在用户输入、页面展示、参数传输这些地方过滤这些特殊字符就可以了：
```zsh
字符	转义后的字符
&	 => &amp;
<	 => &lt;
>	 => &gt;
"	 => &quot;
'	 => &#x27;
/	 => &#x2F;
```
同时JS中应注意使用`innerHTML`,`outerHTML`，如果使用他们渲染，将有可能出现XSS漏洞。  如果使用了React、Vue等框架，使用`v-html`,`dangerouslySetInnerHTML`也应小心谨慎。


- **使用JQuery**
```js
return $('<div/>').text(t).html();
```
- **prototype.js的escabeHTML()**
```js
function escapeHTML() {
    return this.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
}
```
- **Underscope中的escape**
```js
// List of HTML entities for escaping.
var htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;'
};

// Regex containing the keys listed immediately above.
var htmlEscaper = /[&<>"'\/]/g;

// Escape a string for HTML interpolation.
_.escape = function(string) {
  return ('' + string).replace(htmlEscaper, function(match) {
    return htmlEscapes[match];
  });
};

// examples
_.escape('Curly, Larry & Moe');
// => "Curly, Larry &amp; Moe"
```

## 其它安全措施
- **使用Content Security Policy**
[CSP](https://www.ruanyifeng.com/blog/2016/09/csp.html)是一个浏览器的特性，能从根本上解决XSS漏洞问题
- **设置Cookie为HTTP-only**
这可能防止部分信息泄漏

## 参考
> [Escape HTML with Javascript](https://coderwall.com/p/ostduq/escape-html-with-javascript)
> [URL encoding the space character + or %20](https://stackoverflow.com/questions/1634271/url-encoding-the-space-character-or-20)
