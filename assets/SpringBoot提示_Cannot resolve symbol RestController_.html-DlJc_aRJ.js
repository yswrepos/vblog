import{_ as e,o,c as t,e as n}from"./app-CinGCuEv.js";const r={},a=n('<blockquote><p>最近在用<code>maven</code>生成<code>springboot</code>项目时，会报一个Cannot resolve symbol RestController的简单错误，但是对于初学者来说，Java的重量级配置错误常常会让人抓狂，这里记录如何解决这个报错。</p></blockquote><h2 id="可能原因" tabindex="-1"><a class="header-anchor" href="#可能原因"><span>可能原因</span></a></h2><h3 id="未引入相关依赖" tabindex="-1"><a class="header-anchor" href="#未引入相关依赖"><span>未引入相关依赖</span></a></h3><p>这是最常见的原因，<code>@ResetController</code>定义在<code>springboot</code>中的<code>spring-boot-starter-web</code>这个<code>artifact</code>中,但是我的<code>pom.xml</code>里已经有了这个依赖却依然报错。</p><h3 id="缓存出错" tabindex="-1"><a class="header-anchor" href="#缓存出错"><span>缓存出错</span></a></h3><p>由于之前<code>idea</code>可能发生配置错误，编辑器缓存了一些配置，导致idea一直提示此错误，我就是这种情况，折腾了很久才发现这个问题。 方法是点击菜单中的<code>&quot;File&quot; &gt;&gt; &quot;Invalidate Caches&quot; &gt;&gt; 勾选&quot;file system cache and local history&quot;</code>确定后重启<code>idea</code>报错消失。</p>',6),l=[a];function s(c,i){return o(),t("div",null,l)}const d=e(r,[["render",s],["__file","SpringBoot提示_Cannot resolve symbol RestController_.html.vue"]]),m=JSON.parse('{"path":"/posts/java/SpringBoot%E6%8F%90%E7%A4%BA_Cannot%20resolve%20symbol%20RestController_.html","title":"SpringBoot提示\\"Cannot resolve symbol RestController\\"","lang":"zh-CN","frontmatter":{"title":"SpringBoot提示\\"Cannot resolve symbol RestController\\"","toc":true,"keywords":"java,springboot,spring","tags":["java","springboot","debug"],"categories":["后端","java"],"abbrlink":"8d993f72","date":"2021-06-17T19:13:16.000Z","description":"最近在用maven生成springboot项目时，会报一个Cannot resolve symbol RestController的简单错误，但是对于初学者来说，Java的重量级配置错误常常会让人抓狂，这里记录如何解决这个报错。 可能原因 未引入相关依赖 这是最常见的原因，@ResetController定义在springboot中的spring-bo...","head":[["meta",{"property":"og:url","content":"https://b.yongzhenxin.com/posts/java/SpringBoot%E6%8F%90%E7%A4%BA_Cannot%20resolve%20symbol%20RestController_.html"}],["meta",{"property":"og:site_name","content":"Yunshenw"}],["meta",{"property":"og:title","content":"SpringBoot提示\\"Cannot resolve symbol RestController\\""}],["meta",{"property":"og:description","content":"最近在用maven生成springboot项目时，会报一个Cannot resolve symbol RestController的简单错误，但是对于初学者来说，Java的重量级配置错误常常会让人抓狂，这里记录如何解决这个报错。 可能原因 未引入相关依赖 这是最常见的原因，@ResetController定义在springboot中的spring-bo..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-04T17:19:22.000Z"}],["meta",{"property":"article:tag","content":"java"}],["meta",{"property":"article:tag","content":"springboot"}],["meta",{"property":"article:tag","content":"debug"}],["meta",{"property":"article:published_time","content":"2021-06-17T19:13:16.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-04T17:19:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"SpringBoot提示\\\\\\"Cannot resolve symbol RestController\\\\\\"\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-06-17T19:13:16.000Z\\",\\"dateModified\\":\\"2024-04-04T17:19:22.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"可能原因","slug":"可能原因","link":"#可能原因","children":[{"level":3,"title":"未引入相关依赖","slug":"未引入相关依赖","link":"#未引入相关依赖","children":[]},{"level":3,"title":"缓存出错","slug":"缓存出错","link":"#缓存出错","children":[]}]}],"git":{"updatedTime":1712251162000,"contributors":[{"name":"yushen","email":"85443289+yushenw@users.noreply.github.com","commits":1}]},"autoDesc":true,"filePathRelative":"posts/java/SpringBoot提示\\"Cannot resolve symbol RestController\\".md","excerpt":"<blockquote>\\n<p>最近在用<code>maven</code>生成<code>springboot</code>项目时，会报一个Cannot resolve symbol RestController的简单错误，但是对于初学者来说，Java的重量级配置错误常常会让人抓狂，这里记录如何解决这个报错。</p>\\n</blockquote>\\n<h2>可能原因</h2>\\n<h3>未引入相关依赖</h3>\\n<p>这是最常见的原因，<code>@ResetController</code>定义在<code>springboot</code>中的<code>spring-boot-starter-web</code>这个<code>artifact</code>中,但是我的<code>pom.xml</code>里已经有了这个依赖却依然报错。</p>"}');export{d as comp,m as data};
