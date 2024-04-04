import{_ as e,o as a,c as s,e as h}from"./app-Du_kiChf.js";const n={},t=h('<p>HTTPS证书验证是确保网络通信安全的关键步骤，主要涉及以下几个阶段：</p><h3 id="_1-证书获取" tabindex="-1"><a class="header-anchor" href="#_1-证书获取"><span>1. 证书获取</span></a></h3><p>当用户通过浏览器访问一个HTTPS网站时，浏览器首先会向服务器请求其SSL/TLS证书。</p><h3 id="_2-证书检查" tabindex="-1"><a class="header-anchor" href="#_2-证书检查"><span>2. 证书检查</span></a></h3><p>浏览器收到证书后进行以下检查：</p><h4 id="a-证书的有效期" tabindex="-1"><a class="header-anchor" href="#a-证书的有效期"><span>a. 证书的有效期</span></a></h4><p>浏览器检查证书的有效期，确保证书当前是有效的，没有过期。</p><h4 id="b-证书颁发机构-ca" tabindex="-1"><a class="header-anchor" href="#b-证书颁发机构-ca"><span>b. 证书颁发机构（CA）</span></a></h4><p>浏览器检查证书是否由一个受信任的证书颁发机构（CA）签发。浏览器和操作系统内置了受信任的CA列表。</p><h4 id="c-域名匹配" tabindex="-1"><a class="header-anchor" href="#c-域名匹配"><span>c. 域名匹配</span></a></h4><p>浏览器检查证书中的主题备用名称（SAN）或者通用名称（CN）是否与请求的域名匹配。这确保了证书是为当前正在访问的网站颁发的。</p><h4 id="d-证书撤销列表-crl-和在线证书状态协议-ocsp" tabindex="-1"><a class="header-anchor" href="#d-证书撤销列表-crl-和在线证书状态协议-ocsp"><span>d. 证书撤销列表（CRL）和在线证书状态协议（OCSP）</span></a></h4><p>浏览器可能会检查证书是否被撤销。这可以通过查询证书撤销列表（CRL）或使用在线证书状态协议（OCSP）来完成。</p><h3 id="_3-证书链验证" tabindex="-1"><a class="header-anchor" href="#_3-证书链验证"><span>3. 证书链验证</span></a></h3><p>SSL/TLS证书可能由一个证书链组成，其中包括多个证书，从网站的证书（叶节点）到根CA证书。浏览器需要验证整个证书链，确保每个证书都由上一级证书签发。最顶层的根证书需要是浏览器内置信任的根证书。</p><h3 id="_4-数字签名验证" tabindex="-1"><a class="header-anchor" href="#_4-数字签名验证"><span>4. 数字签名验证</span></a></h3><p>一旦证书链验证通过，浏览器将验证证书的数字签名。这是通过使用证书链中上一级证书的公钥来完成的。通过验证数字签名，浏览器可以确保证书是由CA签发的，并且自签发以来没有被篡改。</p><ul><li>使用CA的公钥解密证书中的签名，得到一个哈希值。</li><li>浏览器对证书中除签名外的所有内容进行同样的哈希运算。</li><li>比较这两个哈希值，如果它们相同，证书就是合法的。</li></ul><h3 id="_5-加密通信" tabindex="-1"><a class="header-anchor" href="#_5-加密通信"><span>5. 加密通信</span></a></h3><p>一旦证书验证成功，浏览器和服务器就会使用证书中的公钥来协商一个对称加密密钥。之后的通信将使用这个密钥加密，保证数据传输的安全性。</p><p>如果在任何验证步骤中失败，浏览器将警告用户，表明存在安全风险。这可能是因为证书过期、证书不受信任、证书和域名不匹配，或者证书被撤销等原因。</p>',21),l=[t];function p(i,r){return a(),s("div",null,l)}const d=e(n,[["render",p],["__file","https(ssl)证书验证过程.html.vue"]]),_=JSON.parse('{"path":"/posts/theory/https(ssl)%E8%AF%81%E4%B9%A6%E9%AA%8C%E8%AF%81%E8%BF%87%E7%A8%8B.html","title":"https(ssl)证书验证过程","lang":"zh-CN","frontmatter":{"title":"https(ssl)证书验证过程","toc":true,"keywords":"https,tls/ssl,数字签名，数字证书","tags":["https","tls/ssl"],"categories":["web安全"],"date":"2024-02-21T13:01:01.000Z"},"headers":[{"level":3,"title":"1. 证书获取","slug":"_1-证书获取","link":"#_1-证书获取","children":[]},{"level":3,"title":"2. 证书检查","slug":"_2-证书检查","link":"#_2-证书检查","children":[]},{"level":3,"title":"3. 证书链验证","slug":"_3-证书链验证","link":"#_3-证书链验证","children":[]},{"level":3,"title":"4. 数字签名验证","slug":"_4-数字签名验证","link":"#_4-数字签名验证","children":[]},{"level":3,"title":"5. 加密通信","slug":"_5-加密通信","link":"#_5-加密通信","children":[]}],"git":{"updatedTime":1712251162000,"contributors":[{"name":"yushen","email":"85443289+yushenw@users.noreply.github.com","commits":1}]},"filePathRelative":"posts/theory/https(ssl)证书验证过程.md","excerpt":"<p>HTTPS证书验证是确保网络通信安全的关键步骤，主要涉及以下几个阶段：</p>\\n<h3>1. 证书获取</h3>\\n<p>当用户通过浏览器访问一个HTTPS网站时，浏览器首先会向服务器请求其SSL/TLS证书。</p>\\n<h3>2. 证书检查</h3>\\n<p>浏览器收到证书后进行以下检查：</p>\\n<h4>a. 证书的有效期</h4>\\n<p>浏览器检查证书的有效期，确保证书当前是有效的，没有过期。</p>\\n<h4>b. 证书颁发机构（CA）</h4>\\n<p>浏览器检查证书是否由一个受信任的证书颁发机构（CA）签发。浏览器和操作系统内置了受信任的CA列表。</p>\\n<h4>c. 域名匹配</h4>\\n<p>浏览器检查证书中的主题备用名称（SAN）或者通用名称（CN）是否与请求的域名匹配。这确保了证书是为当前正在访问的网站颁发的。</p>\\n<h4>d. 证书撤销列表（CRL）和在线证书状态协议（OCSP）</h4>\\n<p>浏览器可能会检查证书是否被撤销。这可以通过查询证书撤销列表（CRL）或使用在线证书状态协议（OCSP）来完成。</p>\\n<h3>3. 证书链验证</h3>\\n<p>SSL/TLS证书可能由一个证书链组成，其中包括多个证书，从网站的证书（叶节点）到根CA证书。浏览器需要验证整个证书链，确保每个证书都由上一级证书签发。最顶层的根证书需要是浏览器内置信任的根证书。</p>\\n<h3>4. 数字签名验证</h3>\\n<p>一旦证书链验证通过，浏览器将验证证书的数字签名。这是通过使用证书链中上一级证书的公钥来完成的。通过验证数字签名，浏览器可以确保证书是由CA签发的，并且自签发以来没有被篡改。</p>\\n<ul>\\n<li>使用CA的公钥解密证书中的签名，得到一个哈希值。</li>\\n<li>浏览器对证书中除签名外的所有内容进行同样的哈希运算。</li>\\n<li>比较这两个哈希值，如果它们相同，证书就是合法的。</li>\\n</ul>\\n"}');export{d as comp,_ as data};
