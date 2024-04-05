import{_ as i,r as l,o as c,c as p,a as t,b as e,d as o,w as s,e as r}from"./app-CinGCuEv.js";const h={},d=t("h2",{id:"导读",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#导读"},[t("span",null,"导读")])],-1),T=t("blockquote",null,[t("p",null,"HTTPS是HTTP基于TLS/SSL安全套阶层的安全通信标准，关于它的定义、结构不在本文讨论范围之内，HTTPS的精髓在于理解它是如何工作的，在这一点上网上多数博文长篇阔论，给人一种好像看了很多，但还是在很多细节上没有彻底理解的错觉。而本文主要就是要解决这些细节问题。")],-1),g=t("h2",{id:"场景需求",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#场景需求"},[t("span",null,"场景需求")])],-1),u={href:"http://www.ruanyifeng.com/blog/2011/08/what_is_a_digital_signature.html",target:"_blank",rel:"noopener noreferrer"},_=r('<h2 id="https通信过程" tabindex="-1"><a class="header-anchor" href="#https通信过程"><span>HTTPS通信过程</span></a></h2><p>HTTPS使用了<code>对称加密</code>、<code>非对称加密</code>、<code>哈希算法</code>三种算法用于保证通信数据的安全，下面简要说明为什么这样</p><ul><li><strong>对称加密</strong> 因为 对称加密 相对于 非对称加密 加密速度更快，为了保证效率使用了对称加密。</li><li><strong>非对称加密</strong> 非对称加密较之对称加密更安全，所以HTTPS使用非对称加密来进行部分初始化加密。</li><li><strong>哈希算法</strong> 哈希主要用来做数字签名，签名能保证数据不被篡改。</li></ul><p>由此可见，HTTPS结合了以上几种优点，在安全的同时保证了效率。</p><h3 id="交流过程" tabindex="-1"><a class="header-anchor" href="#交流过程"><span>交流过程</span></a></h3><ol><li><strong>客户端向服务器发起请求</strong>: 当在浏览器中输入一个HTTPS网址（例如https://www.example.com）时，您的浏览器（客户端）会向服务器发送一个请求，请求建立一个安全连接。</li><li><strong>服务器响应并发送证书</strong>: 服务器收到客户端请求后，会将自己由<code>CA</code>颁发的数字证书返回给客户端。这个证书包含了服务器的公钥以及证书颁发机构（CA）的签名。</li><li><strong>证书验证</strong>: 客户端收到证书后，会验证证书的合法性。浏览器会根据自己或系统自带的受信任的<code>CA</code>机构验证数字证书是否受信任，然后会使用CA对应公钥解密证书（也称根证书），拿到服务器公钥，同时加密明文生成数字摘要，对比数字签名以确定拿到的数据未被篡改。（此步骤客户端通过CA的参与安全的拿到了服务器的公钥</li></ol>',6),m=r('<ol start="4"><li><p><strong>客户端响应</strong>: 一旦证书验证通过，客户端会生成一个随机的对称加密密钥。这个密钥将用于此次会话的加密通信。然后<strong>客户端会用服务器的公钥加密这个对称密钥</strong>，并发送给服务器。</p></li><li><p><strong>服务器解密</strong>: 服务器拿到加密后的会话密钥，用自己的私钥解密后获取到会话密钥。</p></li><li><p><strong>加密通信</strong>: 一旦双方都有了对称加密密钥，它们就可以开始安全的加密通信了。所有传输的数据都将使用这个对称密钥进行加密和解密。</p></li><li><p><strong>会话结束</strong>: 一旦会话结束，双方将废弃用于此次通信的对称密钥。</p></li></ol><h2 id="如何生成服务器证书" tabindex="-1"><a class="header-anchor" href="#如何生成服务器证书"><span>如何生成服务器证书？</span></a></h2>',2),S=t("h2",{id:"总结",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#总结"},[t("span",null,"总结")])],-1),E=t("p",null,[t("code",null,"数字签名"),e("其实就是为了保证双方通信而使用了哈希算法，以确保收到的内容不被篡改。 但是中途可能有人伪造了你以为对的加密公钥，会造成和 "),t("code",null,'"假的对方"'),e(" 通信。 为了解决这个问题就引入了一个"),t("code",null,"权威的中间人（CA）"),e("做证明，证明后的可信公钥就叫"),t("code",null,"数字证书"),e("。")],-1);function A(P,H){const a=l("ExternalLinkIcon"),n=l("RouteLink");return c(),p("div",null,[d,T,g,t("p",null,[e("阮一峰 在自己的博文 "),t("a",u,[e("什么是数字签名"),o(a)]),e(" 非常形象的引用了一个场景，在看本篇文章之前，建议先阅读此篇博文。")]),_,t("blockquote",null,[t("p",null,[e("证书验证过程详见 >> "),o(n,{to:"/2024/02/21/https(ssl)%E8%AF%81%E4%B9%A6%E9%AA%8C%E8%AF%81%E8%BF%87%E7%A8%8B/"},{default:s(()=>[e("https(ssl)证书验证过程")]),_:1})])]),m,t("p",null,[e("可参照我的另一片文章 "),o(n,{to:"/2021/03/17/web%E5%AE%89%E5%85%A8/%E4%BD%BF%E7%94%A8OpensSSL%E8%87%AA%E7%AD%BE%E5%90%8D%E8%AF%81%E4%B9%A6/"},{default:s(()=>[e("使用OpenSSL自签名证书")]),_:1})]),S,E])}const f=i(h,[["render",A],["__file","HTTPS精要讲解.html.vue"]]),y=JSON.parse('{"path":"/posts/theory/HTTPS%E7%B2%BE%E8%A6%81%E8%AE%B2%E8%A7%A3.html","title":"HTTPS精要讲解","lang":"zh-CN","frontmatter":{"title":"HTTPS精要讲解","toc":true,"keywords":"https,tls/ssl,数字签名，数字证书","tags":["https","tls/ssl"],"categories":["web安全"],"abbrlink":"1a14933b","date":"2021-06-23T13:01:01.000Z","description":"导读 HTTPS是HTTP基于TLS/SSL安全套阶层的安全通信标准，关于它的定义、结构不在本文讨论范围之内，HTTPS的精髓在于理解它是如何工作的，在这一点上网上多数博文长篇阔论，给人一种好像看了很多，但还是在很多细节上没有彻底理解的错觉。而本文主要就是要解决这些细节问题。 场景需求 阮一峰 在自己的博文 什么是数字签名 非常形象的引用了一个场景，在...","head":[["meta",{"property":"og:url","content":"https://b.yongzhenxin.com/posts/theory/HTTPS%E7%B2%BE%E8%A6%81%E8%AE%B2%E8%A7%A3.html"}],["meta",{"property":"og:site_name","content":"Yunshenw"}],["meta",{"property":"og:title","content":"HTTPS精要讲解"}],["meta",{"property":"og:description","content":"导读 HTTPS是HTTP基于TLS/SSL安全套阶层的安全通信标准，关于它的定义、结构不在本文讨论范围之内，HTTPS的精髓在于理解它是如何工作的，在这一点上网上多数博文长篇阔论，给人一种好像看了很多，但还是在很多细节上没有彻底理解的错觉。而本文主要就是要解决这些细节问题。 场景需求 阮一峰 在自己的博文 什么是数字签名 非常形象的引用了一个场景，在..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-04T17:19:22.000Z"}],["meta",{"property":"article:tag","content":"https"}],["meta",{"property":"article:tag","content":"tls/ssl"}],["meta",{"property":"article:published_time","content":"2021-06-23T13:01:01.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-04T17:19:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"HTTPS精要讲解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-06-23T13:01:01.000Z\\",\\"dateModified\\":\\"2024-04-04T17:19:22.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"导读","slug":"导读","link":"#导读","children":[]},{"level":2,"title":"场景需求","slug":"场景需求","link":"#场景需求","children":[]},{"level":2,"title":"HTTPS通信过程","slug":"https通信过程","link":"#https通信过程","children":[{"level":3,"title":"交流过程","slug":"交流过程","link":"#交流过程","children":[]}]},{"level":2,"title":"如何生成服务器证书？","slug":"如何生成服务器证书","link":"#如何生成服务器证书","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"updatedTime":1712251162000,"contributors":[{"name":"yushen","email":"85443289+yushenw@users.noreply.github.com","commits":1}]},"autoDesc":true,"filePathRelative":"posts/theory/HTTPS精要讲解.md","excerpt":"<h2>导读</h2>\\n<blockquote>\\n<p>HTTPS是HTTP基于TLS/SSL安全套阶层的安全通信标准，关于它的定义、结构不在本文讨论范围之内，HTTPS的精髓在于理解它是如何工作的，在这一点上网上多数博文长篇阔论，给人一种好像看了很多，但还是在很多细节上没有彻底理解的错觉。而本文主要就是要解决这些细节问题。</p>\\n</blockquote>\\n<h2>场景需求</h2>\\n<p>阮一峰 在自己的博文 <a href=\\"http://www.ruanyifeng.com/blog/2011/08/what_is_a_digital_signature.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">什么是数字签名</a> 非常形象的引用了一个场景，在看本篇文章之前，建议先阅读此篇博文。</p>\\n"}');export{f as comp,y as data};
