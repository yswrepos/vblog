import{_ as n,o as s,c as a,e as t}from"./app-Du_kiChf.js";const p={},c=t(`<p>这是一个js类的写法：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Router</span> <span class="token punctuation">{</span>
	<span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">callBack</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token parameter">callBack</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>callBack <span class="token keyword">instanceof</span> <span class="token class-name">Function</span><span class="token punctuation">)</span> <span class="token keyword">this</span><span class="token punctuation">.</span>callBack <span class="token operator">=</span> callBack<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token function">push</span><span class="token punctuation">(</span><span class="token parameter">to</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">callBack</span><span class="token punctuation">(</span><span class="token string">&#39;navigateTo&#39;</span><span class="token punctuation">,</span> to<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token function">redirectTo</span><span class="token punctuation">(</span><span class="token parameter">to</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">callBack</span><span class="token punctuation">(</span><span class="token string">&#39;redirectTo&#39;</span><span class="token punctuation">,</span> to<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token function">reLaunch</span><span class="token punctuation">(</span><span class="token parameter">to</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">callBack</span><span class="token punctuation">(</span><span class="token string">&#39;reLaunch&#39;</span><span class="token punctuation">,</span> to<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token function">switchTab</span><span class="token punctuation">(</span><span class="token parameter">to</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">callBack</span><span class="token punctuation">(</span><span class="token string">&#39;switchTab&#39;</span><span class="token punctuation">,</span> to<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token function">back</span><span class="token punctuation">(</span><span class="token parameter">delta</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// #ifdef H5</span>
		history<span class="token punctuation">.</span><span class="token function">back</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// #endif</span>
		<span class="token comment">// #ifndef H5</span>
		uni<span class="token punctuation">.</span><span class="token function">navigateBack</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
			delta
		<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// #endif</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">new</span> <span class="token class-name">Router</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将这个类转换为函数形式可以是这样的：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createRouter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">let</span> <span class="token function-variable function">callBack</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token keyword">function</span> <span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token parameter">cb</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> cb <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> callBack <span class="token operator">=</span> cb<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">function</span> <span class="token function">push</span><span class="token punctuation">(</span><span class="token parameter">to</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">callBack</span><span class="token punctuation">(</span><span class="token string">&#39;navigateTo&#39;</span><span class="token punctuation">,</span> to<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">function</span> <span class="token function">redirectTo</span><span class="token punctuation">(</span><span class="token parameter">to</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">callBack</span><span class="token punctuation">(</span><span class="token string">&#39;redirectTo&#39;</span><span class="token punctuation">,</span> to<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">function</span> <span class="token function">reLaunch</span><span class="token punctuation">(</span><span class="token parameter">to</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">callBack</span><span class="token punctuation">(</span><span class="token string">&#39;reLaunch&#39;</span><span class="token punctuation">,</span> to<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">function</span> <span class="token function">switchTab</span><span class="token punctuation">(</span><span class="token parameter">to</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">callBack</span><span class="token punctuation">(</span><span class="token string">&#39;switchTab&#39;</span><span class="token punctuation">,</span> to<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">function</span> <span class="token function">back</span><span class="token punctuation">(</span><span class="token parameter">delta</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// #ifdef H5</span>
        history<span class="token punctuation">.</span><span class="token function">back</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// #endif</span>
        <span class="token comment">// #ifndef H5</span>
        uni<span class="token punctuation">.</span><span class="token function">navigateBack</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            delta
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// #endif</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        beforeEach<span class="token punctuation">,</span>
        push<span class="token punctuation">,</span>
        redirectTo<span class="token punctuation">,</span>
        reLaunch<span class="token punctuation">,</span>
        switchTab<span class="token punctuation">,</span>
        back
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token function">createRouter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> router<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中的let callBack = () =&gt; {};的callback就是私有变量</p><h2 id="js函数的-私有变量-和-静态变量" tabindex="-1"><a class="header-anchor" href="#js函数的-私有变量-和-静态变量"><span>js函数的“私有变量”和“静态变量”</span></a></h2><p>在JavaScript中，函数的&quot;私有变量&quot;和&quot;静态变量&quot;可以通过以下方式来定义：</p><ol><li><p><strong>私有变量</strong>: 这些是在函数内部定义的变量，不能从函数外部访问。它们只存在于函数的执行上下文中。</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">myFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> privateVar <span class="token operator">=</span> <span class="token string">&quot;I&#39;m private!&quot;</span><span class="token punctuation">;</span>
    <span class="token comment">// 这里可以使用 privateVar，但是在函数外部不能访问它。</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>静态变量</strong>: JavaScript函数没有像其他语言那样的内置静态变量。但你可<strong>以使用函数的属性来模拟静态变量</strong>。函数在JavaScript中是对象，所以你可以给它们添加属性。</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">myFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>myFunction<span class="token punctuation">.</span>staticVar<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        myFunction<span class="token punctuation">.</span>staticVar <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        myFunction<span class="token punctuation">.</span>staticVar<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myFunction<span class="token punctuation">.</span>staticVar<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">myFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 输出: 1</span>
<span class="token function">myFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 输出: 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，<code>staticVar</code> 行为就像一个静态变量，因为它维持了它的值，即使在多次调用 <code>myFunction</code> 之间。</p></li></ol><p>另一个模拟静态变量的方法是使用闭包：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">const</span> myFunction <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> staticVar <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        staticVar<span class="token operator">++</span><span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>staticVar<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">myFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 输出: 1</span>
<span class="token function">myFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 输出: 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，外部的自执行函数创建了一个闭包，使得内部的 <code>staticVar</code> 能够在多次调用 <code>myFunction</code> 之间保持它的值。</p><h2 id="prototype和-静态变量" tabindex="-1"><a class="header-anchor" href="#prototype和-静态变量"><span>prototype和“静态变量”</span></a></h2><ol><li><p><strong>myFunction.staticVar</strong>:</p><p>这种实际上是在函数对象 <code>myFunction</code> 上直接添加了一个属性。这是一个静态属性，可以直接通过函数名来访问它，但它与函数的实例无关。这是模拟静态变量的常见方法。</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">myFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

myFunction<span class="token punctuation">.</span>staticVar <span class="token operator">=</span> <span class="token string">&quot;I&#39;m a static variable&quot;</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myFunction<span class="token punctuation">.</span>staticVar<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 输出: &quot;I&#39;m a static variable&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>myFunction.prototype.staticVar</strong>:</p><p>表示向 <code>myFunction</code> 的原型添加一个属性。这意味着这个属性将被 <code>myFunction</code> 的所有实例所共享。当你创建一个新的实例并尝试访问这个属性时，如果该实例本身没有这个属性，它会查找原型链并找到它。</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">myFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

myFunction<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>staticVar <span class="token operator">=</span> <span class="token string">&quot;I&#39;m a prototype variable&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> instance1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">myFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> instance2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">myFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>instance1<span class="token punctuation">.</span>staticVar<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 输出: &quot;I&#39;m a prototype variable&quot;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>instance2<span class="token punctuation">.</span>staticVar<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 输出: &quot;I&#39;m a prototype variable&quot;</span>

instance1<span class="token punctuation">.</span>staticVar <span class="token operator">=</span> <span class="token string">&quot;Changed for instance1&quot;</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>instance1<span class="token punctuation">.</span>staticVar<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 输出: &quot;Changed for instance1&quot;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>instance2<span class="token punctuation">.</span>staticVar<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 仍然输出: &quot;I&#39;m a prototype variable&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，当我们修改 <code>instance1</code> 的 <code>staticVar</code> 属性时，它实际上是在 <code>instance1</code> 上创建了一个新的属性，而原型上的属性仍然没有改变。因此，其他实例（如 <code>instance2</code>）的 <code>staticVar</code> 属性仍然指向原型上的值。</p></li></ol><h2 id="构造函数" tabindex="-1"><a class="header-anchor" href="#构造函数"><span>构造函数</span></a></h2><p>在JavaScript中，函数可以用作构造函数来创建对象。当你使用 <code>new</code> 关键字调用函数时，该函数将作为构造函数执行。在构造函数内部，<code>this</code> 关键字引用新创建的对象。</p><p>以下是如何定义 <code>myFunction</code> 作为一个构造函数并使用它的示例：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">MyFunction</span><span class="token punctuation">(</span><span class="token parameter">param1<span class="token punctuation">,</span> param2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>param1 <span class="token operator">=</span> param1<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>param2 <span class="token operator">=</span> param2<span class="token punctuation">;</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">showParams</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>param1<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>param2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 使用 new 关键字创建一个新的对象</span>
<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyFunction</span><span class="token punctuation">(</span><span class="token string">&#39;value1&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;value2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span><span class="token function">showParams</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 输出: value1 value2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中：</p><ul><li><code>MyFunction</code> 是一个构造函数，它接受两个参数：<code>param1</code> 和 <code>param2</code>。</li><li>在构造函数内部，我们定义了一个方法 <code>showParams</code> 来显示这两个参数的值。</li><li>使用 <code>new MyFunction(&#39;value1&#39;, &#39;value2&#39;)</code> 创建了一个新的对象，并将构造函数中的 <code>param1</code> 和 <code>param2</code> 设置为 <code>value1</code> 和 <code>value2</code>。</li></ul><p>注意，按照约定，构造函数的名称通常以大写字母开头，以区分它们和普通函数。所以，<code>MyFunction</code> 的首字母是大写的。</p><p>此外，为了避免在每次创建新对象时都为 <code>showParams</code> 分配新的内存，你可以将其移动到构造函数的原型上：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">MyFunction</span><span class="token punctuation">(</span><span class="token parameter">param1<span class="token punctuation">,</span> param2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>param1 <span class="token operator">=</span> param1<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>param2 <span class="token operator">=</span> param2<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name">MyFunction</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">showParams</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>param1<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>param2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyFunction</span><span class="token punctuation">(</span><span class="token string">&#39;value1&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;value2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span><span class="token function">showParams</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 输出: value1 value2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样，所有 <code>MyFunction</code> 的实例都会共享同一个 <code>showParams</code> 方法，而不是每个实例都有自己的复制。</p><h2 id="函数私有变量-vs-this" tabindex="-1"><a class="header-anchor" href="#函数私有变量-vs-this"><span>函数私有变量 vs this</span></a></h2><p>在 <code>myFunction</code> 函数中，使用 <code>let</code> 和 <code>this</code> 关键字定义变量的方式有本质上的不同：</p><ol><li><strong>使用 <code>let</code> 定义的变量（<code>test1</code>）</strong>: <ul><li><code>test1</code> 是一个局部变量，它只在 <code>myFunction</code> 函数的作用域内可见。它是一个块级作用域的变量，这意味着它的作用域限制在声明它的函数或代码块内。</li><li>在函数外部无法访问 <code>test1</code>。</li><li>如果 <code>myFunction</code> 被当作普通函数调用（即非构造函数调用），<code>test1</code> 将在函数执行结束后被销毁。</li></ul></li><li><strong>使用 <code>this</code> 关键字定义的变量（<code>test2</code>）</strong>: <ul><li><code>this.test2</code> 是将 <code>test2</code> 属性添加到 <code>this</code> 关键字引用的对象上。<code>this</code> 的值取决于如何调用 <code>myFunction</code>。</li><li>如果 <code>myFunction</code> 作为构造函数使用（即使用 <code>new myFunction()</code>），<code>this</code> 将指向新创建的对象实例，<code>test2</code> 将成为这个新对象的一个属性。</li><li>如果 <code>myFunction</code> 作为普通函数调用，<code>this</code> 的值取决于运行时上下文（在严格模式下，<code>this</code> 会是 <code>undefined</code>；在非严格模式下，它通常会是全局对象，例如 <code>window</code> 在浏览器环境中）。</li><li><code>this.test2</code> 的值在函数执行结束后依然存在，只要 <code>this</code> 引用的对象依然存在。</li></ul></li></ol>`,26),o=[c];function e(i,l){return s(),a("div",null,o)}const k=n(p,[["render",e],["__file","js模拟私有变量和静态变量.html.vue"]]),d=JSON.parse(`{"path":"/posts/js/js%E6%A8%A1%E6%8B%9F%E7%A7%81%E6%9C%89%E5%8F%98%E9%87%8F%E5%92%8C%E9%9D%99%E6%80%81%E5%8F%98%E9%87%8F.html","title":"js模拟私有变量和静态变量","lang":"zh-CN","frontmatter":{"title":"js模拟私有变量和静态变量","toc":true,"keywords":["js私有变量,js静态变量"],"tags":["javascript"],"categories":["javascript"],"date":"2024-01-23T13:01:21.000Z"},"headers":[{"level":2,"title":"js函数的“私有变量”和“静态变量”","slug":"js函数的-私有变量-和-静态变量","link":"#js函数的-私有变量-和-静态变量","children":[]},{"level":2,"title":"prototype和“静态变量”","slug":"prototype和-静态变量","link":"#prototype和-静态变量","children":[]},{"level":2,"title":"构造函数","slug":"构造函数","link":"#构造函数","children":[]},{"level":2,"title":"函数私有变量 vs this","slug":"函数私有变量-vs-this","link":"#函数私有变量-vs-this","children":[]}],"git":{"updatedTime":1712251162000,"contributors":[{"name":"yushen","email":"85443289+yushenw@users.noreply.github.com","commits":1}]},"filePathRelative":"posts/js/js模拟私有变量和静态变量.md","excerpt":"<p>这是一个js类的写法：</p>\\n<div class=\\"language-javascript\\" data-ext=\\"js\\" data-title=\\"js\\"><pre class=\\"language-javascript\\"><code><span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Router</span> <span class=\\"token punctuation\\">{</span>\\n\\t<span class=\\"token function\\">constructor</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n\\t\\t<span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span><span class=\\"token function-variable function\\">callBack</span> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token punctuation\\">}</span>\\n\\n\\t<span class=\\"token function\\">beforeEach</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">callBack</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n\\t\\t<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>callBack <span class=\\"token keyword\\">instanceof</span> <span class=\\"token class-name\\">Function</span><span class=\\"token punctuation\\">)</span> <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>callBack <span class=\\"token operator\\">=</span> callBack<span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token punctuation\\">}</span>\\n\\n\\t<span class=\\"token function\\">push</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">to</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n\\t\\t<span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">callBack</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">'navigateTo'</span><span class=\\"token punctuation\\">,</span> to<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token punctuation\\">}</span>\\n\\n\\t<span class=\\"token function\\">redirectTo</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">to</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n\\t\\t<span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">callBack</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">'redirectTo'</span><span class=\\"token punctuation\\">,</span> to<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token punctuation\\">}</span>\\n\\n\\t<span class=\\"token function\\">reLaunch</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">to</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n\\t\\t<span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">callBack</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">'reLaunch'</span><span class=\\"token punctuation\\">,</span> to<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token punctuation\\">}</span>\\n\\n\\t<span class=\\"token function\\">switchTab</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">to</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n\\t\\t<span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">callBack</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">'switchTab'</span><span class=\\"token punctuation\\">,</span> to<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token punctuation\\">}</span>\\n\\n\\t<span class=\\"token function\\">back</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">delta</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n\\t\\t<span class=\\"token comment\\">// #ifdef H5</span>\\n\\t\\thistory<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">back</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t\\t<span class=\\"token comment\\">// #endif</span>\\n\\t\\t<span class=\\"token comment\\">// #ifndef H5</span>\\n\\t\\tuni<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">navigateBack</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">{</span>\\n\\t\\t\\tdelta\\n\\t\\t<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t\\t<span class=\\"token comment\\">// #endif</span>\\n\\t<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">export</span> <span class=\\"token keyword\\">default</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Router</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>"}`);export{k as comp,d as data};
