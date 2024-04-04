import{_ as n,o as s,c as a,e as t}from"./app-Du_kiChf.js";const e={},p=t(`<h2 id="长期存在的goroutine引用对象" tabindex="-1"><a class="header-anchor" href="#长期存在的goroutine引用对象"><span>长期存在的goroutine引用对象</span></a></h2><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">leakyFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  data <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
  <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 这个goroutine不会退出，因此它引用的data永远不会被回收</span>
    <span class="token keyword">for</span> <span class="token punctuation">{</span>
      time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Hour<span class="token punctuation">)</span>
      <span class="token boolean">_</span> <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token comment">// 保持对data的引用</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>goroutine中添加退出机制，避免goroutine不退出造成的长时间引用</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">nonLeakyFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    data <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
    <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 添加退出机制</span>
        <span class="token keyword">for</span> <span class="token punctuation">{</span>
            <span class="token keyword">select</span> <span class="token punctuation">{</span>
            <span class="token keyword">case</span> <span class="token operator">&lt;-</span>time<span class="token punctuation">.</span><span class="token function">After</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Hour<span class="token punctuation">)</span><span class="token punctuation">:</span>
                <span class="token boolean">_</span> <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
            <span class="token keyword">case</span> <span class="token operator">&lt;-</span>exitChan<span class="token punctuation">:</span>
                <span class="token keyword">return</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="全局变量引起的内存占用" tabindex="-1"><a class="header-anchor" href="#全局变量引起的内存占用"><span>全局变量引起的内存占用</span></a></h2><p>以下示例<code>globalData</code>申请了一个1000个整数的内存空间，知道程序结束，会造成程序占用， 当需要申请大量内存时，最好局部（按需）声明变量引用。</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">var</span> globalData <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 操作全局变量</span>
    globalData<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用局部变量，按需申请内存</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    localData <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
    <span class="token comment">// 使用局部变量代替全局变量</span>
    localData<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="未关闭的channel" tabindex="-1"><a class="header-anchor" href="#未关闭的channel"><span>未关闭的channel</span></a></h2><p>未关闭的channel会导致潜在的内存占用，以下例子没有关闭内部的ch，channel内部的数据可能得不到释放， 另外接收方的goroutine因为发送没有关闭channel而可能会永久的等待channel数据，这回造成相关资源得不到回收。</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">leakyChan</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
  <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
      ch <span class="token operator">&lt;-</span> i
    <span class="token punctuation">}</span>
    <span class="token comment">// 没有关闭channel</span>
    <span class="token comment">// close(ch)</span>
  <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="循环引用" tabindex="-1"><a class="header-anchor" href="#循环引用"><span>循环引用</span></a></h2><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">type</span> Node <span class="token keyword">struct</span> <span class="token punctuation">{</span>
  data String
  next <span class="token operator">*</span>Node
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">createCycle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  node1 <span class="token operator">:=</span> <span class="token operator">&amp;</span>Node<span class="token punctuation">{</span>data<span class="token punctuation">:</span> <span class="token string">&quot;node1&quot;</span><span class="token punctuation">}</span>
  node2 <span class="token operator">:=</span> <span class="token operator">&amp;</span>Nod<span class="token punctuation">{</span>data<span class="token punctuation">:</span> <span class="token string">&quot;node2&quot;</span><span class="token punctuation">}</span>
  node1<span class="token punctuation">.</span>next <span class="token operator">=</span> node2
  node2<span class="token punctuation">.</span>next <span class="token operator">=</span> node1
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Go的垃圾收集器能处理大多数循环引用，但在某些复杂的情况下，循环引用可能导致内存泄漏。 所以要注意设计清晰的数据结构，避免不必要的循环引用。</p><h2 id="未关闭的context" tabindex="-1"><a class="header-anchor" href="#未关闭的context"><span>未关闭的context</span></a></h2><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">leakyContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ctx<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">WithCancel</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">{</span>
            <span class="token keyword">select</span> <span class="token punctuation">{</span>
            <span class="token keyword">case</span> <span class="token operator">&lt;-</span>ctx<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
                <span class="token keyword">return</span>
            <span class="token keyword">default</span><span class="token punctuation">:</span>
                <span class="token comment">// 执行一些操作</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>
    <span class="token comment">// 忘记调用cancel函数</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>忘记调用由<code>context.WithCancel(context.Background())</code>创建的cancel函数会导致一些潜在的资源无法得到释放。这些资源主要包括与context对象关联的资源和可能被阻塞的goroutine。</p><ul><li><p>Context的内部结构： 每个通过context.WithCancel创建的context对象内部都有一些结构，用于处理取消操作和传递取消信号。这些结构包括用于通知取消的channel和与此相关的数据。如果cancel函数没有被调用，这些结构可能不会被及时清理。</p></li><li><p>阻塞的goroutine goroutine在ctx.Done()上等待取消信号。如果取消函数（cancel）没有被调用，这个goroutine将永远等待，因此不会退出。这意味着goroutine占用的所有资源（如栈内存）都不会被释放。</p></li></ul><p>所以在不再需要context时，应该调用其对应的cancel函数。这是良好的编程实践，可以确保资源得到正确释放。 也可以使用defer保证调用：在可能的情况下，可以在创建context的同一作用域中使用defer来调用cancel，以确保即使在发生错误或提前返回的情况下也能保证调用cancel。</p><p>在这个例子中，合理的做法是在创建context后立即使用defer来安排调用其cancel函数，或者在不再需要context时显式调用cancel。这样可以确保相关资源被及时清理，防止潜在的资源泄漏。</p><h2 id="defer语句在运行时间较长的函数中" tabindex="-1"><a class="header-anchor" href="#defer语句在运行时间较长的函数中"><span>defer语句在运行时间较长的函数中</span></a></h2><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">leakyDefer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    f<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token string">&quot;file.txt&quot;</span><span class="token punctuation">)</span>
    <span class="token comment">// 应该直接调用f.Close() 及时关闭文件</span>
    <span class="token keyword">defer</span> f<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 延迟关闭文件，文件在函数运行期间一直打开</span>

    <span class="token comment">// 长时间执行的操作</span>
    time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Hour<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Go中，由于其自动垃圾回收机制，内存通常在没有任何有效引用时被自动回收。但是，即使在Go中，良好的内存管理仍然是重要的，特别是在处理大型数据结构或在并发环境中。例如，长时间运行的goroutine如果保持对大型数据结构的引用，即使这些数据结构实际上已不再需要，也可能导致内存占用不必要地高。 由于编程错误，一块内存仍被错误地引用（即使它实际上已不再需要），垃圾回收器就不会回收这块内存。这就是内存泄漏的典型情况，其中内存实际上对程序的其余部分是无用的，但由于错误地保留了对它的引用，它无法被回收。</p><p>为了避免这些问题，建议进行仔细的代码审查，使用工具（如pprof）进行性能分析和内存分析，以及编写有效的测试来监测和防止内存泄漏的发生。</p><h2 id="其它" tabindex="-1"><a class="header-anchor" href="#其它"><span>其它</span></a></h2><p>有些语言没有自动GC，开发人员可能需要手动回收内存，否则内存不可访问和管理后会造成内存泄漏，比如c</p><div class="language-c line-numbers-mode" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token comment">//定义两个指针分别指向两块内存</span>
<span class="token keyword">char</span> <span class="token operator">*</span> p1 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">char</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token function">malloc</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">char</span> <span class="token operator">*</span> p2 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">char</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token function">malloc</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//将p1指向p2指向的内存</span>
p1 <span class="token operator">=</span> p2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此举会造成p1原来指向的内存泄口</p><p>除了c语言，还有c++、Rust、Fortran、Pascal和汇编语言没有真正意义上的自动GC</p>`,30),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","go-leaky.html.vue"]]),k=JSON.parse('{"path":"/posts/go/go-leaky.html","title":"go内存泄漏的几种可能","lang":"zh-CN","frontmatter":{"title":"go内存泄漏的几种可能","date":"2023-11-23T22:49:37.000Z","tags":["go","memory leak"],"categories":["go"]},"headers":[{"level":2,"title":"长期存在的goroutine引用对象","slug":"长期存在的goroutine引用对象","link":"#长期存在的goroutine引用对象","children":[]},{"level":2,"title":"全局变量引起的内存占用","slug":"全局变量引起的内存占用","link":"#全局变量引起的内存占用","children":[]},{"level":2,"title":"未关闭的channel","slug":"未关闭的channel","link":"#未关闭的channel","children":[]},{"level":2,"title":"循环引用","slug":"循环引用","link":"#循环引用","children":[]},{"level":2,"title":"未关闭的context","slug":"未关闭的context","link":"#未关闭的context","children":[]},{"level":2,"title":"defer语句在运行时间较长的函数中","slug":"defer语句在运行时间较长的函数中","link":"#defer语句在运行时间较长的函数中","children":[]},{"level":2,"title":"其它","slug":"其它","link":"#其它","children":[]}],"git":{"updatedTime":1712251162000,"contributors":[{"name":"yushen","email":"85443289+yushenw@users.noreply.github.com","commits":1}]},"filePathRelative":"posts/go/go-leaky.md","excerpt":"<h2>长期存在的goroutine引用对象</h2>\\n<div class=\\"language-go\\" data-ext=\\"go\\" data-title=\\"go\\"><pre class=\\"language-go\\"><code><span class=\\"token keyword\\">func</span> <span class=\\"token function\\">leakyFunction</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n  data <span class=\\"token operator\\">:=</span> <span class=\\"token function\\">make</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span><span class=\\"token builtin\\">int</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">1000</span><span class=\\"token punctuation\\">)</span>\\n  <span class=\\"token keyword\\">go</span> <span class=\\"token keyword\\">func</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token comment\\">// 这个goroutine不会退出，因此它引用的data永远不会被回收</span>\\n    <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">{</span>\\n      time<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Sleep</span><span class=\\"token punctuation\\">(</span>time<span class=\\"token punctuation\\">.</span>Hour<span class=\\"token punctuation\\">)</span>\\n      <span class=\\"token boolean\\">_</span> <span class=\\"token operator\\">=</span> data<span class=\\"token punctuation\\">[</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">]</span> <span class=\\"token comment\\">// 保持对data的引用</span>\\n    <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>"}');export{d as comp,k as data};
