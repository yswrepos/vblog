import{_ as n,o as s,c as a,e as t}from"./app-Du_kiChf.js";const o={},e=t(`<h1 id="encoding-gob-简介" tabindex="-1"><a class="header-anchor" href="#encoding-gob-简介"><span><code>encoding/gob</code> 简介</span></a></h1><p><code>encoding/gob</code> 是 Go 语言标准库中的一个包，用于进行 Go 对象的编码和解码（即序列化和反序列化）。&quot;gob&quot; 是 &quot;Go binary&quot; 的缩写，指的是 Go 语言特定的二进制编码格式。</p><p><code>encoding/gob</code> 包提供了以下功能：</p><ol><li><p><strong>序列化和反序列化</strong>：<code>encoding/gob</code> 提供了 <code>Encoder</code> 和 <code>Decoder</code> 结构体，可以将 Go 对象编码为字节流（序列化），以及将字节流解码为 Go 对象（反序列化）。</p></li><li><p><strong>自定义类型支持</strong>：可以注册自定义类型，以便正确地进行序列化和反序列化。</p></li><li><p><strong>高效性</strong>：<code>encoding/gob</code> 采用了一些技术来提高性能，例如采用了高效的二进制编码格式，以及一些内部优化策略。</p></li><li><p><strong>跨语言兼容性</strong>：虽然 <code>encoding/gob</code> 是针对 Go 对象的，但是也提供了一些支持，使得可以将 Go 对象序列化为二进制格式，然后与其他语言进行通信。</p></li></ol><p>总的来说，<code>encoding/gob</code> 是 Go 语言中用于处理对象序列化和反序列化的标准库包，它提供了一种高效、易用的方式来进行数据编码和解码。</p><h1 id="使用场景和示例" tabindex="-1"><a class="header-anchor" href="#使用场景和示例"><span>使用场景和示例</span></a></h1><p>以下是 <code>encoding/gob</code> 包的一些使用示例和使用场景：</p><h3 id="使用示例" tabindex="-1"><a class="header-anchor" href="#使用示例"><span>使用示例：</span></a></h3><ol><li><strong>序列化和反序列化 Go 对象</strong>：</li></ol><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;bytes&quot;</span>
	<span class="token string">&quot;encoding/gob&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name <span class="token builtin">string</span>
	Age  <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 创建一个 Person 对象</span>
	person <span class="token operator">:=</span> Person<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">&quot;Alice&quot;</span><span class="token punctuation">,</span> Age<span class="token punctuation">:</span> <span class="token number">30</span><span class="token punctuation">}</span>

	<span class="token comment">// 创建一个字节缓冲区用于存储序列化后的数据</span>
	<span class="token keyword">var</span> buffer bytes<span class="token punctuation">.</span>Buffer

	<span class="token comment">// 创建编码器并将数据编码到缓冲区</span>
	encoder <span class="token operator">:=</span> gob<span class="token punctuation">.</span><span class="token function">NewEncoder</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>buffer<span class="token punctuation">)</span>
	err <span class="token operator">:=</span> encoder<span class="token punctuation">.</span><span class="token function">Encode</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Encode error:&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 创建解码器并从缓冲区解码数据</span>
	<span class="token keyword">var</span> decodedPerson Person
	decoder <span class="token operator">:=</span> gob<span class="token punctuation">.</span><span class="token function">NewDecoder</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>buffer<span class="token punctuation">)</span>
	err <span class="token operator">=</span> decoder<span class="token punctuation">.</span><span class="token function">Decode</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>decodedPerson<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Decode error:&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 打印解码后的 Person 对象</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>decodedPerson<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li><strong>自定义类型的序列化和反序列化</strong>：</li></ol><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;bytes&quot;</span>
	<span class="token string">&quot;encoding/gob&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Point <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	X<span class="token punctuation">,</span> Y <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 注册自定义类型</span>
	gob<span class="token punctuation">.</span><span class="token function">Register</span><span class="token punctuation">(</span>Point<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// 创建一个 Point 对象</span>
	point <span class="token operator">:=</span> Point<span class="token punctuation">{</span>X<span class="token punctuation">:</span> <span class="token number">10</span><span class="token punctuation">,</span> Y<span class="token punctuation">:</span> <span class="token number">20</span><span class="token punctuation">}</span>

	<span class="token comment">// 创建一个字节缓冲区用于存储序列化后的数据</span>
	<span class="token keyword">var</span> buffer bytes<span class="token punctuation">.</span>Buffer

	<span class="token comment">// 创建编码器并将数据编码到缓冲区</span>
	encoder <span class="token operator">:=</span> gob<span class="token punctuation">.</span><span class="token function">NewEncoder</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>buffer<span class="token punctuation">)</span>
	err <span class="token operator">:=</span> encoder<span class="token punctuation">.</span><span class="token function">Encode</span><span class="token punctuation">(</span>point<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Encode error:&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 创建解码器并从缓冲区解码数据</span>
	<span class="token keyword">var</span> decodedPoint Point
	decoder <span class="token operator">:=</span> gob<span class="token punctuation">.</span><span class="token function">NewDecoder</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>buffer<span class="token punctuation">)</span>
	err <span class="token operator">=</span> decoder<span class="token punctuation">.</span><span class="token function">Decode</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>decodedPoint<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Decode error:&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 打印解码后的 Point 对象</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>decodedPoint<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景"><span>使用场景：</span></a></h3><ol><li><p><strong>RPC（远程过程调用）</strong>：<code>encoding/gob</code> 可以用于在客户端和服务器之间传输 Go 对象，例如在使用 Go 的标准库中的 <code>net/rpc</code> 或者一些第三方的 RPC 框架时。</p></li><li><p><strong>持久化存储</strong>：可以使用 <code>encoding/gob</code> 将 Go 对象序列化后存储到文件或者数据库中，以及从文件或者数据库中读取并反序列化为 Go 对象。</p></li><li><p><strong>消息队列</strong>：<code>encoding/gob</code> 也可以用于消息队列系统中，例如将消息以二进制格式编码后发送到消息队列，然后从消息队列中接收并解码消息。</p></li><li><p><strong>跨语言通信</strong>：虽然 <code>encoding/gob</code> 主要针对 Go 对象，但是也可以将 Go 对象序列化为二进制格式，然后与其他语言进行通信，尤其适用于使用 Go 编写的服务与其他服务进行通信时。</p></li></ol><h1 id="跨语言通信示例" tabindex="-1"><a class="header-anchor" href="#跨语言通信示例"><span>跨语言通信示例</span></a></h1><p>在使用 <code>encoding/gob</code> 进行跨语言通信时，需要将 Go 对象序列化成二进制格式，然后通过网络传输给其他语言的系统或服务。接收方可以根据其所使用的语言和框架，使用相应的反序列化方法将二进制数据转换回原始数据格式。下面是一个简单的示例：</p><p>假设我们有一个 Go 程序，它将一个结构体 <code>Person</code> 序列化成二进制数据并通过网络传输给另一个程序，另一个程序使用 Python 来接收并反序列化这个数据。</p><p>Go 程序示例：</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;bytes&quot;</span>
	<span class="token string">&quot;encoding/gob&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;net&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name <span class="token builtin">string</span>
	Age  <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 创建一个 Person 对象</span>
	person <span class="token operator">:=</span> Person<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">&quot;Alice&quot;</span><span class="token punctuation">,</span> Age<span class="token punctuation">:</span> <span class="token number">30</span><span class="token punctuation">}</span>

	<span class="token comment">// 创建一个字节缓冲区用于存储序列化后的数据</span>
	<span class="token keyword">var</span> buffer bytes<span class="token punctuation">.</span>Buffer

	<span class="token comment">// 创建编码器并将数据编码到缓冲区</span>
	encoder <span class="token operator">:=</span> gob<span class="token punctuation">.</span><span class="token function">NewEncoder</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>buffer<span class="token punctuation">)</span>
	err <span class="token operator">:=</span> encoder<span class="token punctuation">.</span><span class="token function">Encode</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Encode error:&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 创建一个 TCP 连接并将序列化后的数据发送给接收方</span>
	conn<span class="token punctuation">,</span> err <span class="token operator">:=</span> net<span class="token punctuation">.</span><span class="token function">Dial</span><span class="token punctuation">(</span><span class="token string">&quot;tcp&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;localhost:12345&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Dial error:&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> conn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>buffer<span class="token punctuation">.</span><span class="token function">Bytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Write error:&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Data sent successfully&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Python 程序示例：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> socket
<span class="token keyword">import</span> pickle

<span class="token keyword">class</span> <span class="token class-name">Person</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> name<span class="token punctuation">,</span> age<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>name <span class="token operator">=</span> name
        self<span class="token punctuation">.</span>age <span class="token operator">=</span> age

<span class="token comment"># 创建一个 TCP 服务器来接收数据</span>
server_socket <span class="token operator">=</span> socket<span class="token punctuation">.</span>socket<span class="token punctuation">(</span>socket<span class="token punctuation">.</span>AF_INET<span class="token punctuation">,</span> socket<span class="token punctuation">.</span>SOCK_STREAM<span class="token punctuation">)</span>
server_socket<span class="token punctuation">.</span>bind<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token string">&#39;localhost&#39;</span><span class="token punctuation">,</span> <span class="token number">12345</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
server_socket<span class="token punctuation">.</span>listen<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Waiting for connection...&quot;</span><span class="token punctuation">)</span>

conn<span class="token punctuation">,</span> addr <span class="token operator">=</span> server_socket<span class="token punctuation">.</span>accept<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Connection established with&quot;</span><span class="token punctuation">,</span> addr<span class="token punctuation">)</span>

<span class="token comment"># 接收数据</span>
data <span class="token operator">=</span> conn<span class="token punctuation">.</span>recv<span class="token punctuation">(</span><span class="token number">4096</span><span class="token punctuation">)</span>

<span class="token comment"># 反序列化数据</span>
received_person <span class="token operator">=</span> pickle<span class="token punctuation">.</span>loads<span class="token punctuation">(</span>data<span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Received data:&quot;</span><span class="token punctuation">,</span> received_person<span class="token punctuation">.</span>name<span class="token punctuation">,</span> received_person<span class="token punctuation">.</span>age<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，Go 程序通过 <code>encoding/gob</code> 序列化了一个 <code>Person</code> 对象，并通过 TCP 连接发送了序列化后的数据。Python 程序通过 <code>pickle</code> 模块接收并反序列化了这个数据，并打印了接收到的 <code>Person</code> 对象的属性值。</p>`,22),p=[e];function c(i,l){return s(),a("div",null,p)}const r=n(o,[["render",c],["__file","go encoding glob的使用场景和实例.html.vue"]]),d=JSON.parse('{"path":"/posts/go/go%20encoding%20glob%E7%9A%84%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF%E5%92%8C%E5%AE%9E%E4%BE%8B.html","title":"go encoding glob的使用场景和实例","lang":"zh-CN","frontmatter":{"title":"go encoding glob的使用场景和实例","date":"2024-02-28T18:50:14.000Z","tags":["go","序列化反序列化"],"categories":"go"},"headers":[{"level":3,"title":"使用示例：","slug":"使用示例","link":"#使用示例","children":[]},{"level":3,"title":"使用场景：","slug":"使用场景","link":"#使用场景","children":[]}],"git":{"updatedTime":1712251162000,"contributors":[{"name":"yushen","email":"85443289+yushenw@users.noreply.github.com","commits":1}]},"filePathRelative":"posts/go/go encoding glob的使用场景和实例.md","excerpt":"\\n<p><code>encoding/gob</code> 是 Go 语言标准库中的一个包，用于进行 Go 对象的编码和解码（即序列化和反序列化）。\\"gob\\" 是 \\"Go binary\\" 的缩写，指的是 Go 语言特定的二进制编码格式。</p>\\n<p><code>encoding/gob</code> 包提供了以下功能：</p>\\n<ol>\\n<li>\\n<p><strong>序列化和反序列化</strong>：<code>encoding/gob</code> 提供了 <code>Encoder</code> 和 <code>Decoder</code> 结构体，可以将 Go 对象编码为字节流（序列化），以及将字节流解码为 Go 对象（反序列化）。</p>\\n</li>\\n<li>\\n<p><strong>自定义类型支持</strong>：可以注册自定义类型，以便正确地进行序列化和反序列化。</p>\\n</li>\\n<li>\\n<p><strong>高效性</strong>：<code>encoding/gob</code> 采用了一些技术来提高性能，例如采用了高效的二进制编码格式，以及一些内部优化策略。</p>\\n</li>\\n<li>\\n<p><strong>跨语言兼容性</strong>：虽然 <code>encoding/gob</code> 是针对 Go 对象的，但是也提供了一些支持，使得可以将 Go 对象序列化为二进制格式，然后与其他语言进行通信。</p>\\n</li>\\n</ol>\\n<p>总的来说，<code>encoding/gob</code> 是 Go 语言中用于处理对象序列化和反序列化的标准库包，它提供了一种高效、易用的方式来进行数据编码和解码。</p>\\n<h1>使用场景和示例</h1>\\n<p>以下是 <code>encoding/gob</code> 包的一些使用示例和使用场景：</p>\\n<h3>使用示例：</h3>\\n<ol>\\n<li><strong>序列化和反序列化 Go 对象</strong>：</li>\\n</ol>\\n<div class=\\"language-go\\" data-ext=\\"go\\" data-title=\\"go\\"><pre class=\\"language-go\\"><code><span class=\\"token keyword\\">package</span> main\\n\\n<span class=\\"token keyword\\">import</span> <span class=\\"token punctuation\\">(</span>\\n\\t<span class=\\"token string\\">\\"bytes\\"</span>\\n\\t<span class=\\"token string\\">\\"encoding/gob\\"</span>\\n\\t<span class=\\"token string\\">\\"fmt\\"</span>\\n<span class=\\"token punctuation\\">)</span>\\n\\n<span class=\\"token keyword\\">type</span> Person <span class=\\"token keyword\\">struct</span> <span class=\\"token punctuation\\">{</span>\\n\\tName <span class=\\"token builtin\\">string</span>\\n\\tAge  <span class=\\"token builtin\\">int</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">func</span> <span class=\\"token function\\">main</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n\\t<span class=\\"token comment\\">// 创建一个 Person 对象</span>\\n\\tperson <span class=\\"token operator\\">:=</span> Person<span class=\\"token punctuation\\">{</span>Name<span class=\\"token punctuation\\">:</span> <span class=\\"token string\\">\\"Alice\\"</span><span class=\\"token punctuation\\">,</span> Age<span class=\\"token punctuation\\">:</span> <span class=\\"token number\\">30</span><span class=\\"token punctuation\\">}</span>\\n\\n\\t<span class=\\"token comment\\">// 创建一个字节缓冲区用于存储序列化后的数据</span>\\n\\t<span class=\\"token keyword\\">var</span> buffer bytes<span class=\\"token punctuation\\">.</span>Buffer\\n\\n\\t<span class=\\"token comment\\">// 创建编码器并将数据编码到缓冲区</span>\\n\\tencoder <span class=\\"token operator\\">:=</span> gob<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">NewEncoder</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">&amp;</span>buffer<span class=\\"token punctuation\\">)</span>\\n\\terr <span class=\\"token operator\\">:=</span> encoder<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Encode</span><span class=\\"token punctuation\\">(</span>person<span class=\\"token punctuation\\">)</span>\\n\\t<span class=\\"token keyword\\">if</span> err <span class=\\"token operator\\">!=</span> <span class=\\"token boolean\\">nil</span> <span class=\\"token punctuation\\">{</span>\\n\\t\\tfmt<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Println</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Encode error:\\"</span><span class=\\"token punctuation\\">,</span> err<span class=\\"token punctuation\\">)</span>\\n\\t\\t<span class=\\"token keyword\\">return</span>\\n\\t<span class=\\"token punctuation\\">}</span>\\n\\n\\t<span class=\\"token comment\\">// 创建解码器并从缓冲区解码数据</span>\\n\\t<span class=\\"token keyword\\">var</span> decodedPerson Person\\n\\tdecoder <span class=\\"token operator\\">:=</span> gob<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">NewDecoder</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">&amp;</span>buffer<span class=\\"token punctuation\\">)</span>\\n\\terr <span class=\\"token operator\\">=</span> decoder<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Decode</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">&amp;</span>decodedPerson<span class=\\"token punctuation\\">)</span>\\n\\t<span class=\\"token keyword\\">if</span> err <span class=\\"token operator\\">!=</span> <span class=\\"token boolean\\">nil</span> <span class=\\"token punctuation\\">{</span>\\n\\t\\tfmt<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Println</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Decode error:\\"</span><span class=\\"token punctuation\\">,</span> err<span class=\\"token punctuation\\">)</span>\\n\\t\\t<span class=\\"token keyword\\">return</span>\\n\\t<span class=\\"token punctuation\\">}</span>\\n\\n\\t<span class=\\"token comment\\">// 打印解码后的 Person 对象</span>\\n\\tfmt<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Println</span><span class=\\"token punctuation\\">(</span>decodedPerson<span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div><ol start=\\"2\\">\\n<li><strong>自定义类型的序列化和反序列化</strong>：</li>\\n</ol>\\n<div class=\\"language-go\\" data-ext=\\"go\\" data-title=\\"go\\"><pre class=\\"language-go\\"><code><span class=\\"token keyword\\">package</span> main\\n\\n<span class=\\"token keyword\\">import</span> <span class=\\"token punctuation\\">(</span>\\n\\t<span class=\\"token string\\">\\"bytes\\"</span>\\n\\t<span class=\\"token string\\">\\"encoding/gob\\"</span>\\n\\t<span class=\\"token string\\">\\"fmt\\"</span>\\n<span class=\\"token punctuation\\">)</span>\\n\\n<span class=\\"token keyword\\">type</span> Point <span class=\\"token keyword\\">struct</span> <span class=\\"token punctuation\\">{</span>\\n\\tX<span class=\\"token punctuation\\">,</span> Y <span class=\\"token builtin\\">int</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">func</span> <span class=\\"token function\\">main</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n\\t<span class=\\"token comment\\">// 注册自定义类型</span>\\n\\tgob<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Register</span><span class=\\"token punctuation\\">(</span>Point<span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span>\\n\\n\\t<span class=\\"token comment\\">// 创建一个 Point 对象</span>\\n\\tpoint <span class=\\"token operator\\">:=</span> Point<span class=\\"token punctuation\\">{</span>X<span class=\\"token punctuation\\">:</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">,</span> Y<span class=\\"token punctuation\\">:</span> <span class=\\"token number\\">20</span><span class=\\"token punctuation\\">}</span>\\n\\n\\t<span class=\\"token comment\\">// 创建一个字节缓冲区用于存储序列化后的数据</span>\\n\\t<span class=\\"token keyword\\">var</span> buffer bytes<span class=\\"token punctuation\\">.</span>Buffer\\n\\n\\t<span class=\\"token comment\\">// 创建编码器并将数据编码到缓冲区</span>\\n\\tencoder <span class=\\"token operator\\">:=</span> gob<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">NewEncoder</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">&amp;</span>buffer<span class=\\"token punctuation\\">)</span>\\n\\terr <span class=\\"token operator\\">:=</span> encoder<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Encode</span><span class=\\"token punctuation\\">(</span>point<span class=\\"token punctuation\\">)</span>\\n\\t<span class=\\"token keyword\\">if</span> err <span class=\\"token operator\\">!=</span> <span class=\\"token boolean\\">nil</span> <span class=\\"token punctuation\\">{</span>\\n\\t\\tfmt<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Println</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Encode error:\\"</span><span class=\\"token punctuation\\">,</span> err<span class=\\"token punctuation\\">)</span>\\n\\t\\t<span class=\\"token keyword\\">return</span>\\n\\t<span class=\\"token punctuation\\">}</span>\\n\\n\\t<span class=\\"token comment\\">// 创建解码器并从缓冲区解码数据</span>\\n\\t<span class=\\"token keyword\\">var</span> decodedPoint Point\\n\\tdecoder <span class=\\"token operator\\">:=</span> gob<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">NewDecoder</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">&amp;</span>buffer<span class=\\"token punctuation\\">)</span>\\n\\terr <span class=\\"token operator\\">=</span> decoder<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Decode</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">&amp;</span>decodedPoint<span class=\\"token punctuation\\">)</span>\\n\\t<span class=\\"token keyword\\">if</span> err <span class=\\"token operator\\">!=</span> <span class=\\"token boolean\\">nil</span> <span class=\\"token punctuation\\">{</span>\\n\\t\\tfmt<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Println</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"Decode error:\\"</span><span class=\\"token punctuation\\">,</span> err<span class=\\"token punctuation\\">)</span>\\n\\t\\t<span class=\\"token keyword\\">return</span>\\n\\t<span class=\\"token punctuation\\">}</span>\\n\\n\\t<span class=\\"token comment\\">// 打印解码后的 Point 对象</span>\\n\\tfmt<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Println</span><span class=\\"token punctuation\\">(</span>decodedPoint<span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>"}');export{r as comp,d as data};
