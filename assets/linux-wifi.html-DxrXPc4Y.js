import{_ as n,o as s,c as a,e}from"./app-Du_kiChf.js";const i={},l=e(`<h2 id="连接" tabindex="-1"><a class="header-anchor" href="#连接"><span>连接</span></a></h2><h3 id="查看无线设备" tabindex="-1"><a class="header-anchor" href="#查看无线设备"><span>查看无线设备</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>iwconfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="使用netplan连接wifi" tabindex="-1"><a class="header-anchor" href="#使用netplan连接wifi"><span>使用netplan连接wifi</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> update
<span class="token comment"># 安装必要软件</span>
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> wpasupplicant net-tools
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">vi</span> /etc/netplan/01-netcfg.yaml
<span class="token comment"># 配置</span>
network:
  version: <span class="token number">2</span>
  renderer: networkd
  wifis:
    wlan0:
      dhcp4: <span class="token boolean">true</span>
      optional: <span class="token boolean">true</span>
      access-points:
        <span class="token string">&quot;your-ssid-name&quot;</span><span class="token builtin class-name">:</span>
          password: <span class="token string">&quot;your-wifi-password&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">sudo</span> netplan apply <span class="token comment">#将配置生效</span>
<span class="token comment"># 连接wifi</span>
<span class="token function">sudo</span> <span class="token function">ifconfig</span> wlan0 up
<span class="token function">sudo</span> iwconfig wlan0 essid <span class="token string">&quot;your-ssid-name&quot;</span>
<span class="token function">sudo</span> dhclient wlan0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="加密" tabindex="-1"><a class="header-anchor" href="#加密"><span>加密</span></a></h2><ol><li>使用hash:</li></ol><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 得到的psk即为密码</span>
wpa_passphrase your-ssid-name your-wifi-password
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>使用环境变量</li></ol><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">YOUR_PASSWORD</span><span class="token operator">=</span><span class="token string">&quot;your-wifi-password&quot;</span>
<span class="token comment"># 修改netplan配置</span>
access-points:
        <span class="token string">&quot;test-ssid&quot;</span><span class="token builtin class-name">:</span>
          password: <span class="token variable">$YOUR_PASSWORD</span>
<span class="token comment"># 使配置生效</span>
<span class="token function">sudo</span> netplan apply
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>使用 network-manager 连接wifi</li></ol><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> network-manager
<span class="token function">sudo</span> nmcli device wifi connect test-ssid password your-wifi-password
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="重启wlan0" tabindex="-1"><a class="header-anchor" href="#重启wlan0"><span>重启wlan0</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">sudo</span> netplan apply

<span class="token comment"># 禁用wlan0设备</span>
<span class="token function">sudo</span> <span class="token function">ip</span> <span class="token function">link</span> <span class="token builtin class-name">set</span> wlan0 down
<span class="token comment"># 启用</span>
<span class="token function">sudo</span> <span class="token function">ip</span> <span class="token function">link</span> <span class="token builtin class-name">set</span> wlan0 up
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="查看" tabindex="-1"><a class="header-anchor" href="#查看"><span>查看</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">ifconfig</span> 
<span class="token comment"># or</span>
ipaddress

<span class="token comment"># 只显示 wlan0设备</span>
<span class="token function">ip</span> addr show dev wlan0

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18),t=[l];function d(c,o){return s(),a("div",null,t)}const u=n(i,[["render",d],["__file","linux-wifi.html.vue"]]),r=JSON.parse('{"path":"/posts/linux/linux-wifi.html","title":"linux设置wifi","lang":"zh-CN","frontmatter":{"title":"linux设置wifi","date":"2023-11-05 17:17:56 - linux - 运维 - 网络 - wifi","categories":["linux"]},"headers":[{"level":2,"title":"连接","slug":"连接","link":"#连接","children":[{"level":3,"title":"查看无线设备","slug":"查看无线设备","link":"#查看无线设备","children":[]},{"level":3,"title":"使用netplan连接wifi","slug":"使用netplan连接wifi","link":"#使用netplan连接wifi","children":[]}]},{"level":2,"title":"加密","slug":"加密","link":"#加密","children":[]},{"level":2,"title":"重启wlan0","slug":"重启wlan0","link":"#重启wlan0","children":[]},{"level":2,"title":"查看","slug":"查看","link":"#查看","children":[]}],"git":{"updatedTime":1712251162000,"contributors":[{"name":"yushen","email":"85443289+yushenw@users.noreply.github.com","commits":1}]},"filePathRelative":"posts/linux/linux-wifi.md","excerpt":"<h2>连接</h2>\\n<h3>查看无线设备</h3>\\n<div class=\\"language-bash\\" data-ext=\\"sh\\" data-title=\\"sh\\"><pre class=\\"language-bash\\"><code>iwconfig\\n</code></pre></div><h3>使用netplan连接wifi</h3>\\n<div class=\\"language-bash\\" data-ext=\\"sh\\" data-title=\\"sh\\"><pre class=\\"language-bash\\"><code><span class=\\"token function\\">sudo</span> <span class=\\"token function\\">apt</span> update\\n<span class=\\"token comment\\"># 安装必要软件</span>\\n<span class=\\"token function\\">sudo</span> <span class=\\"token function\\">apt</span> <span class=\\"token function\\">install</span> wpasupplicant net-tools\\n</code></pre></div>"}');export{u as comp,r as data};
