import{_ as a,o as e,c as s,e as t}from"./app-BLeSCfhf.js";const o={},r=t(`<h3 id="protoc命令详解" tabindex="-1"><a class="header-anchor" href="#protoc命令详解"><span>protoc命令详解</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># --go_out=.会在当前目录生成一个命令空间的文件夹 加paths=source_relative则生成到当前目录i</span>
protoc <span class="token parameter variable">-I</span><span class="token operator">=</span>.  <span class="token parameter variable">--go_out</span><span class="token operator">=</span>paths<span class="token operator">=</span>source_relative:. --go-grpc_out<span class="token operator">=</span>paths<span class="token operator">=</span>source_relative:.  greeter.proto
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),n=[r];function p(c,l){return e(),s("div",null,n)}const d=a(o,[["render",p],["__file","protoc.html.vue"]]),h=JSON.parse('{"path":"/posts/go/protoc.html","title":"protoc命令","lang":"zh-CN","frontmatter":{"layout":"posts","title":"protoc命令","date":"2024-01-09T14:47:49.000Z","tags":["protoc"]},"headers":[{"level":3,"title":"protoc命令详解","slug":"protoc命令详解","link":"#protoc命令详解","children":[]}],"git":{"updatedTime":1712251162000,"contributors":[{"name":"yushen","email":"85443289+yushenw@users.noreply.github.com","commits":1}]},"filePathRelative":"posts/go/protoc.md","excerpt":"<h3>protoc命令详解</h3>\\n<div class=\\"language-bash\\" data-ext=\\"sh\\" data-title=\\"sh\\"><pre class=\\"language-bash\\"><code><span class=\\"token comment\\"># --go_out=.会在当前目录生成一个命令空间的文件夹 加paths=source_relative则生成到当前目录i</span>\\nprotoc <span class=\\"token parameter variable\\">-I</span><span class=\\"token operator\\">=</span>.  <span class=\\"token parameter variable\\">--go_out</span><span class=\\"token operator\\">=</span>paths<span class=\\"token operator\\">=</span>source_relative:. --go-grpc_out<span class=\\"token operator\\">=</span>paths<span class=\\"token operator\\">=</span>source_relative:.  greeter.proto\\n</code></pre></div>"}');export{d as comp,h as data};