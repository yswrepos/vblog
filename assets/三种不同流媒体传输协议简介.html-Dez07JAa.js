import{_ as e,o as t,c as a,e as i}from"./app-CinGCuEv.js";const s={},r=i(`<p>RTMP、HLS和MPEG-DASH是三种流行的流媒体传输协议，它们各自有不同的特点和应用场景。下面是对这三种协议的简要介绍以及它们的地址格式示例：</p><h3 id="rtmp-real-time-messaging-protocol" tabindex="-1"><a class="header-anchor" href="#rtmp-real-time-messaging-protocol"><span>RTMP (Real-Time Messaging Protocol)</span></a></h3><ul><li><strong>特点</strong>：RTMP是由Adobe开发的一种设计用于高性能传输音频、视频和数据的协议，主要用于实时直播。RTMP基于TCP，能够提供稳定的连接和低延迟传输，但由于它不是基于HTTP，因此可能会被某些防火墙或网络设备阻挡。</li><li><strong>应用场景</strong>：主要用于直播流的推送（从编码器到服务器）和一些要求低延迟的应用。</li><li><strong>地址格式</strong>：<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>rtmp://server-address/app/stream
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>例如: <code>rtmp://example.com/live/stream123</code></li></ul><h3 id="hls-http-live-streaming" tabindex="-1"><a class="header-anchor" href="#hls-http-live-streaming"><span>HLS (HTTP Live Streaming)</span></a></h3><ul><li><strong>特点</strong>：HLS是由Apple开发的基于HTTP的流媒体传输协议，支持动态比特率适配，这意味着视频可以根据用户的网络速度动态调整质量。HLS通过将视频分割成一系列小的基于HTTP的文件来工作，每个文件包含一小段视频内容。</li><li><strong>应用场景</strong>：广泛用于各种设备和浏览器的视频点播和直播，特别是在需要适应不同网络条件和跨平台兼容性的场景。</li><li><strong>地址格式</strong>：<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>http://server-address/path/playlist.m3u8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>例如: <code>http://example.com/live/stream123.m3u8</code></li></ul><h3 id="mpeg-dash-dynamic-adaptive-streaming-over-http" tabindex="-1"><a class="header-anchor" href="#mpeg-dash-dynamic-adaptive-streaming-over-http"><span>MPEG-DASH (Dynamic Adaptive Streaming over HTTP)</span></a></h3><ul><li><strong>特点</strong>：MPEG-DASH是一个国际标准，支持从简单的视频点播到高质量的直播。与HLS类似，DASH也是基于HTTP的自适应比特率流媒体传输协议，允许高质量的流媒体通过互联网传输。</li><li><strong>应用场景</strong>：适用于需要高度自定义和支持广泛设备的视频点播和直播服务。</li><li><strong>地址格式</strong>：<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>http://server-address/path/manifest.mpd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>例如: <code>http://example.com/live/stream123.mpd</code></li></ul><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3><ul><li><strong>RTMP</strong> 适合实时直播场景，特别是在对延迟敏感的应用中，但由于不是基于HTTP，兼容性和穿透防火墙能力不如基于HTTP的协议。</li><li><strong>HLS</strong> 和 <strong>MPEG-DASH</strong> 都是基于HTTP的自适应比特率流媒体传输协议，支持通过普通的Web服务器分发，更容易穿透防火墙，且兼容性好。HLS由于其在iOS设备上的原生支持和广泛的应用，成为了直播和点播的主流选择之一。而MPEG-DASH作为一个开放的国际标准，提供了更多的灵活性和自定义能力，逐渐在各种应用中得到采用。</li></ul>`,9),n=[r];function l(o,d){return t(),a("div",null,n)}const m=e(s,[["render",l],["__file","三种不同流媒体传输协议简介.html.vue"]]),c=JSON.parse('{"path":"/posts/media/%E4%B8%89%E7%A7%8D%E4%B8%8D%E5%90%8C%E6%B5%81%E5%AA%92%E4%BD%93%E4%BC%A0%E8%BE%93%E5%8D%8F%E8%AE%AE%E7%AE%80%E4%BB%8B.html","title":"三种不同流媒体传输协议简介","lang":"zh-CN","frontmatter":{"title":"三种不同流媒体传输协议简介","date":"2024-02-26T17:13:55.000Z","tags":["hls","rtmp"],"categories":"media","description":"RTMP、HLS和MPEG-DASH是三种流行的流媒体传输协议，它们各自有不同的特点和应用场景。下面是对这三种协议的简要介绍以及它们的地址格式示例： RTMP (Real-Time Messaging Protocol) 特点：RTMP是由Adobe开发的一种设计用于高性能传输音频、视频和数据的协议，主要用于实时直播。RTMP基于TCP，能够提供稳定的...","head":[["meta",{"property":"og:url","content":"https://b.yongzhenxin.com/posts/media/%E4%B8%89%E7%A7%8D%E4%B8%8D%E5%90%8C%E6%B5%81%E5%AA%92%E4%BD%93%E4%BC%A0%E8%BE%93%E5%8D%8F%E8%AE%AE%E7%AE%80%E4%BB%8B.html"}],["meta",{"property":"og:site_name","content":"Yunshenw"}],["meta",{"property":"og:title","content":"三种不同流媒体传输协议简介"}],["meta",{"property":"og:description","content":"RTMP、HLS和MPEG-DASH是三种流行的流媒体传输协议，它们各自有不同的特点和应用场景。下面是对这三种协议的简要介绍以及它们的地址格式示例： RTMP (Real-Time Messaging Protocol) 特点：RTMP是由Adobe开发的一种设计用于高性能传输音频、视频和数据的协议，主要用于实时直播。RTMP基于TCP，能够提供稳定的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-04T17:19:22.000Z"}],["meta",{"property":"article:tag","content":"hls"}],["meta",{"property":"article:tag","content":"rtmp"}],["meta",{"property":"article:published_time","content":"2024-02-26T17:13:55.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-04T17:19:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"三种不同流媒体传输协议简介\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-02-26T17:13:55.000Z\\",\\"dateModified\\":\\"2024-04-04T17:19:22.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":3,"title":"RTMP (Real-Time Messaging Protocol)","slug":"rtmp-real-time-messaging-protocol","link":"#rtmp-real-time-messaging-protocol","children":[]},{"level":3,"title":"HLS (HTTP Live Streaming)","slug":"hls-http-live-streaming","link":"#hls-http-live-streaming","children":[]},{"level":3,"title":"MPEG-DASH (Dynamic Adaptive Streaming over HTTP)","slug":"mpeg-dash-dynamic-adaptive-streaming-over-http","link":"#mpeg-dash-dynamic-adaptive-streaming-over-http","children":[]},{"level":3,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"updatedTime":1712251162000,"contributors":[{"name":"yushen","email":"85443289+yushenw@users.noreply.github.com","commits":1}]},"autoDesc":true,"filePathRelative":"posts/media/三种不同流媒体传输协议简介.md","excerpt":"<p>RTMP、HLS和MPEG-DASH是三种流行的流媒体传输协议，它们各自有不同的特点和应用场景。下面是对这三种协议的简要介绍以及它们的地址格式示例：</p>\\n<h3>RTMP (Real-Time Messaging Protocol)</h3>\\n<ul>\\n<li><strong>特点</strong>：RTMP是由Adobe开发的一种设计用于高性能传输音频、视频和数据的协议，主要用于实时直播。RTMP基于TCP，能够提供稳定的连接和低延迟传输，但由于它不是基于HTTP，因此可能会被某些防火墙或网络设备阻挡。</li>\\n<li><strong>应用场景</strong>：主要用于直播流的推送（从编码器到服务器）和一些要求低延迟的应用。</li>\\n<li><strong>地址格式</strong>：<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>rtmp://server-address/app/stream\\n</code></pre></div>例如: <code>rtmp://example.com/live/stream123</code></li>\\n</ul>\\n<h3>HLS (HTTP Live Streaming)</h3>\\n<ul>\\n<li><strong>特点</strong>：HLS是由Apple开发的基于HTTP的流媒体传输协议，支持动态比特率适配，这意味着视频可以根据用户的网络速度动态调整质量。HLS通过将视频分割成一系列小的基于HTTP的文件来工作，每个文件包含一小段视频内容。</li>\\n<li><strong>应用场景</strong>：广泛用于各种设备和浏览器的视频点播和直播，特别是在需要适应不同网络条件和跨平台兼容性的场景。</li>\\n<li><strong>地址格式</strong>：<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>http://server-address/path/playlist.m3u8\\n</code></pre></div>例如: <code>http://example.com/live/stream123.m3u8</code></li>\\n</ul>\\n<h3>MPEG-DASH (Dynamic Adaptive Streaming over HTTP)</h3>\\n<ul>\\n<li><strong>特点</strong>：MPEG-DASH是一个国际标准，支持从简单的视频点播到高质量的直播。与HLS类似，DASH也是基于HTTP的自适应比特率流媒体传输协议，允许高质量的流媒体通过互联网传输。</li>\\n<li><strong>应用场景</strong>：适用于需要高度自定义和支持广泛设备的视频点播和直播服务。</li>\\n<li><strong>地址格式</strong>：<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>http://server-address/path/manifest.mpd\\n</code></pre></div>例如: <code>http://example.com/live/stream123.mpd</code></li>\\n</ul>\\n"}');export{m as comp,c as data};
