import{_ as t,r as o,o as p,c as i,a,b as n,d as c,e as s}from"./app-CinGCuEv.js";const l="/static/img/posts/whitespace.png",r="/static/img/posts/componentScan.png",u={},d=s('<blockquote><p>今天在调试Spring的时候出现了一个&quot;<code>Whitelabel Error Page</code>&quot;页面，如图</p></blockquote><p><img src="'+l+'" alt=""></p><h2 id="原因" tabindex="-1"><a class="header-anchor" href="#原因"><span>原因</span></a></h2><h3 id="spring无法找到对应controller" tabindex="-1"><a class="header-anchor" href="#spring无法找到对应controller"><span>Spring无法找到对应<code>controller</code></span></a></h3>',4),g=a("code",null,"Main application class",-1),m=a("code",null,"class",-1),k={href:"https://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle/#using.structuring-your-code",target:"_blank",rel:"noopener noreferrer"},h=s('<p><img src="'+r+`" alt=""> 所以解决方法有两个： 1.将<code>controller</code>写在Main application class同包下。 2.在Main application class下使用<code>@ComponentScan</code>注解：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ComponentScan</span><span class="token punctuation">(</span>basePackages<span class="token operator">=</span><span class="token punctuation">{</span><span class="token string">&quot;com.egsee.demo&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>  
<span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Demo1Application</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">Demo1Application</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="书写错误" tabindex="-1"><a class="header-anchor" href="#书写错误"><span>书写错误</span></a></h3><p>因为我是个springboot初学者，在<code>Main Application Class</code>下定义了一个方法，想在浏览器下访问</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> produces <span class="token operator">=</span> <span class="token string">&quot;text/plain;charset=UTF-8&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">index</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Hello Spring Boot!&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是我并没有在类中写<code>@ResetController</code>这种类似的注解，导致报错，加上注解后运行成功。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Demo1Application</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7);function v(b,_){const e=o("ExternalLinkIcon");return p(),i("div",null,[d,a("p",null,[n("主应用程序("),g,n(")默认情况下只会扫描到同一包下的"),m,n("文件 "),a("a",k,[n("官方文档说明"),c(e)]),n("。")]),h])}const S=t(u,[["render",v],["__file","SpringBoot报错_Whitelabel Error Page_ .html.vue"]]),f=JSON.parse('{"path":"/posts/java/SpringBoot%E6%8A%A5%E9%94%99_Whitelabel%20Error%20Page_%20.html","title":"SpringBoot报错\\"Whitelabel Error Page\\"","lang":"zh-CN","frontmatter":{"title":"SpringBoot报错\\"Whitelabel Error Page\\"","toc":true,"keywords":"java,springboot,spring","tags":["java","springboot","debug"],"categories":["后端","java"],"abbrlink":"f9569758","date":"2021-06-21T19:13:16.000Z","description":"今天在调试Spring的时候出现了一个\\"Whitelabel Error Page\\"页面，如图 原因 Spring无法找到对应controller 主应用程序(Main application class)默认情况下只会扫描到同一包下的class文件 官方文档说明。 所以解决方法有两个： 1.将controller写在Main application ...","head":[["meta",{"property":"og:url","content":"https://b.yongzhenxin.com/posts/java/SpringBoot%E6%8A%A5%E9%94%99_Whitelabel%20Error%20Page_%20.html"}],["meta",{"property":"og:site_name","content":"Yunshenw"}],["meta",{"property":"og:title","content":"SpringBoot报错\\"Whitelabel Error Page\\""}],["meta",{"property":"og:description","content":"今天在调试Spring的时候出现了一个\\"Whitelabel Error Page\\"页面，如图 原因 Spring无法找到对应controller 主应用程序(Main application class)默认情况下只会扫描到同一包下的class文件 官方文档说明。 所以解决方法有两个： 1.将controller写在Main application ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://b.yongzhenxin.com/static/img/posts/whitespace.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-04T17:19:22.000Z"}],["meta",{"property":"article:tag","content":"java"}],["meta",{"property":"article:tag","content":"springboot"}],["meta",{"property":"article:tag","content":"debug"}],["meta",{"property":"article:published_time","content":"2021-06-21T19:13:16.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-04T17:19:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"SpringBoot报错\\\\\\"Whitelabel Error Page\\\\\\"\\",\\"image\\":[\\"https://b.yongzhenxin.com/static/img/posts/whitespace.png\\",\\"https://b.yongzhenxin.com/static/img/posts/componentScan.png\\"],\\"datePublished\\":\\"2021-06-21T19:13:16.000Z\\",\\"dateModified\\":\\"2024-04-04T17:19:22.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"原因","slug":"原因","link":"#原因","children":[{"level":3,"title":"Spring无法找到对应controller","slug":"spring无法找到对应controller","link":"#spring无法找到对应controller","children":[]},{"level":3,"title":"书写错误","slug":"书写错误","link":"#书写错误","children":[]}]}],"git":{"updatedTime":1712251162000,"contributors":[{"name":"yushen","email":"85443289+yushenw@users.noreply.github.com","commits":1}]},"autoDesc":true,"filePathRelative":"posts/java/SpringBoot报错\\"Whitelabel Error Page\\" .md","excerpt":"<blockquote>\\n<p>今天在调试Spring的时候出现了一个\\"<code>Whitelabel Error Page</code>\\"页面，如图</p>\\n</blockquote>\\n<p><img src=\\"/static/img/posts/whitespace.png\\" alt=\\"\\"></p>\\n<h2>原因</h2>\\n<h3>Spring无法找到对应<code>controller</code></h3>\\n<p>主应用程序(<code>Main application class</code>)默认情况下只会扫描到同一包下的<code>class</code>文件 <a href=\\"https://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle/#using.structuring-your-code\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">官方文档说明</a>。</p>\\n"}');export{S as comp,f as data};
