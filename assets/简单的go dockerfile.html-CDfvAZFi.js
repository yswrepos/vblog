import{_ as e,o as n,c as s,e as a}from"./app-Du_kiChf.js";const i={},o=a(`<p>简单的go dockerfile</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code># 使用 Alpine Linux 作为基础镜像
FROM alpine<span class="token punctuation">:</span>latest

# 安装 Go 和 redis<span class="token operator">-</span>cli
RUN apk add <span class="token operator">--</span>no<span class="token operator">-</span>cache <span class="token keyword">go</span> redis

# 设置工作目录
WORKDIR <span class="token operator">/</span>app

# 将本地的 Go 项目代码复制到镜像中
COPY <span class="token punctuation">.</span> <span class="token operator">/</span>app

# 编译 Go 项目
RUN <span class="token keyword">go</span> build <span class="token operator">-</span>o my<span class="token operator">-</span>web<span class="token operator">-</span>server

# 暴露你的 web 服务所使用的端口
EXPOSE <span class="token number">8080</span>

# 运行 web 服务
CMD <span class="token punctuation">[</span><span class="token string">&quot;/app/my-web-server&quot;</span><span class="token punctuation">]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),l=[o];function t(r,c){return n(),s("div",null,l)}const p=e(i,[["render",t],["__file","简单的go dockerfile.html.vue"]]),v=JSON.parse('{"path":"/posts/fragments/%E7%AE%80%E5%8D%95%E7%9A%84go%20dockerfile.html","title":"简单的go dockerfile","lang":"zh-CN","frontmatter":{"title":"简单的go dockerfile","toc":true,"tags":["fragments","dockerfile"],"categories":["fragments"],"date":"2021-09-30T13:01:16.000Z"},"headers":[],"git":{"updatedTime":1712251162000,"contributors":[{"name":"yushen","email":"85443289+yushenw@users.noreply.github.com","commits":1}]},"filePathRelative":"posts/fragments/简单的go dockerfile.md","excerpt":"<p>简单的go dockerfile</p>\\n"}');export{p as comp,v as data};
