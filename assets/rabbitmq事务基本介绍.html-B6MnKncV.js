import{_ as n,o as s,c as a,e as t}from"./app-Du_kiChf.js";const e={},o=t(`<p>RabbitMQ 提供了基本的事务机制，允许生产者保证消息的发布过程中的原子性。这意味着你可以在发送消息之前开始一个事务，然后发送多条消息，并在最后提交这个事务。如果在事务中的任何点发生错误，你可以回滚事务，这样就好像这些消息从未被发送过一样。</p><h3 id="rabbitmq-事务的基本操作" tabindex="-1"><a class="header-anchor" href="#rabbitmq-事务的基本操作"><span>RabbitMQ 事务的基本操作</span></a></h3><p>RabbitMQ 事务机制包含三个基本操作：</p><ol><li><strong>txSelect</strong>：用于将当前channel（通道）标记为事务模式。</li><li><strong>txCommit</strong>：用于提交事务，确保所有在事务内发送的消息都被确认。</li><li><strong>txRollback</strong>：用于回滚事务，取消事务内进行的所有消息发送。</li></ol><h3 id="使用事务的步骤" tabindex="-1"><a class="header-anchor" href="#使用事务的步骤"><span>使用事务的步骤</span></a></h3><ol><li><strong>开启事务</strong>：首先，通过调用<code>txSelect</code>方法在一个channel上开启事务。</li><li><strong>发送消息</strong>：在事务模式下，你可以发送一条或多条消息到队列。</li><li><strong>提交或回滚</strong>：如果消息成功发送，你可以通过调用<code>txCommit</code>提交事务，这时消息会被实际发送到队列中。如果在发送消息时遇到任何问题，或者你出于某种原因需要取消发送的消息，可以调用<code>txRollback</code>来回滚事务，这样事务中的所有消息发送操作都会被取消。</li></ol><h3 id="事务的性能影响" tabindex="-1"><a class="header-anchor" href="#事务的性能影响"><span>事务的性能影响</span></a></h3><p>虽然事务提供了一种保证消息发送原子性的方法，但是它也有一定的性能影响。每次事务提交时，RabbitMQ 都需要将事务中的所有消息写入磁盘，这会导致相比非事务发送操作有较大的延迟。因此，如果你追求高吞吐量，使用事务可能不是最佳选择。</p><h3 id="替代方案-确认模式" tabindex="-1"><a class="header-anchor" href="#替代方案-确认模式"><span>替代方案：确认模式</span></a></h3><p>作为事务的替代方案，RabbitMQ 还提供了发布确认（publisher confirms）模式。这种模式提供了一种轻量级的方式来确认消息是否已经被RabbitMQ接收。相比于事务，发布确认模式在保证消息可靠性的同时，对性能的影响较小，因此在需要高性能的场景下更受推荐。</p><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3><p>RabbitMQ 的事务功能提供了一种保证消息发送原子性的机制，适用于需要严格消息发送一致性的场景。然而，由于其性能开销，对于高吞吐量需求，建议使用发布确认模式作为替代方案。在设计分布式系统和消息传递策略时，需要根据具体的业务需求和性能要求选择合适的消息确认机制。</p><h2 id="go使用rabbitmq的例子" tabindex="-1"><a class="header-anchor" href="#go使用rabbitmq的例子"><span>Go使用RabbitMq的例子</span></a></h2><p>首先，确保已经安装了RabbitMQ服务器，并且Go的amqp包也已经安装。如果还没有安装amqp包，可以通过以下命令安装：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>go get github.com/streadway/amqp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>下面是一个使用RabbitMQ事务的Go示例：</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;log&quot;</span>
    <span class="token string">&quot;github.com/streadway/amqp&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">failOnError</span><span class="token punctuation">(</span>err <span class="token builtin">error</span><span class="token punctuation">,</span> msg <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;%s: %s&quot;</span><span class="token punctuation">,</span> msg<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    conn<span class="token punctuation">,</span> err <span class="token operator">:=</span> amqp<span class="token punctuation">.</span><span class="token function">Dial</span><span class="token punctuation">(</span><span class="token string">&quot;amqp://guest:guest@localhost:5672/&quot;</span><span class="token punctuation">)</span>
    <span class="token function">failOnError</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">&quot;Failed to connect to RabbitMQ&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">defer</span> conn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    ch<span class="token punctuation">,</span> err <span class="token operator">:=</span> conn<span class="token punctuation">.</span><span class="token function">Channel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">failOnError</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">&quot;Failed to open a channel&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">defer</span> ch<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// 将channel设置为事务模式</span>
    err <span class="token operator">=</span> ch<span class="token punctuation">.</span><span class="token function">Tx</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">failOnError</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">&quot;Failed to set channel to transaction mode&quot;</span><span class="token punctuation">)</span>

    q<span class="token punctuation">,</span> err <span class="token operator">:=</span> ch<span class="token punctuation">.</span><span class="token function">QueueDeclare</span><span class="token punctuation">(</span>
        <span class="token string">&quot;task_queue&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 队列名称</span>
        <span class="token boolean">true</span><span class="token punctuation">,</span>         <span class="token comment">// 持久化</span>
        <span class="token boolean">false</span><span class="token punctuation">,</span>        <span class="token comment">// 自动删除</span>
        <span class="token boolean">false</span><span class="token punctuation">,</span>        <span class="token comment">// 独占</span>
        <span class="token boolean">false</span><span class="token punctuation">,</span>        <span class="token comment">// 不等待</span>
        <span class="token boolean">nil</span><span class="token punctuation">,</span>          <span class="token comment">// 参数</span>
    <span class="token punctuation">)</span>
    <span class="token function">failOnError</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">&quot;Failed to declare a queue&quot;</span><span class="token punctuation">)</span>

    messages <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;First message&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Second message&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Third message&quot;</span><span class="token punctuation">}</span>

    <span class="token comment">// 在事务中发布多条消息</span>
    <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> body <span class="token operator">:=</span> <span class="token keyword">range</span> messages <span class="token punctuation">{</span>
        err <span class="token operator">=</span> ch<span class="token punctuation">.</span><span class="token function">Publish</span><span class="token punctuation">(</span>
            <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>     <span class="token comment">// 交换机</span>
            q<span class="token punctuation">.</span>Name<span class="token punctuation">,</span> <span class="token comment">// 队列名称</span>
            <span class="token boolean">false</span><span class="token punctuation">,</span>  <span class="token comment">// 强制性</span>
            <span class="token boolean">false</span><span class="token punctuation">,</span>  <span class="token comment">// 立即</span>
            amqp<span class="token punctuation">.</span>Publishing<span class="token punctuation">{</span>
                DeliveryMode<span class="token punctuation">:</span> amqp<span class="token punctuation">.</span>Persistent<span class="token punctuation">,</span> <span class="token comment">// 消息持久化</span>
                ContentType<span class="token punctuation">:</span>  <span class="token string">&quot;text/plain&quot;</span><span class="token punctuation">,</span>
                Body<span class="token punctuation">:</span>         <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>body<span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token function">failOnError</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">&quot;Failed to publish a message&quot;</span><span class="token punctuation">)</span>

        <span class="token comment">// 设置回滚条件（示例条件）</span>
        <span class="token keyword">if</span> body <span class="token operator">==</span> <span class="token string">&quot;Second message&quot;</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Rollback condition met, rolling back transaction&quot;</span><span class="token punctuation">)</span>
            err <span class="token operator">=</span> ch<span class="token punctuation">.</span><span class="token function">TxRollback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 回滚事务</span>
            <span class="token function">failOnError</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">&quot;Failed to rollback transaction&quot;</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 提交事务</span>
    err <span class="token operator">=</span> ch<span class="token punctuation">.</span><span class="token function">TxCommit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">failOnError</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">&quot;Failed to commit transaction&quot;</span><span class="token punctuation">)</span>
    log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Transaction committed&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个示例首先创建了一个连接到RabbitMQ的连接，然后开启一个channel，并将这个channel设置为事务模式。接下来，声明一个队列并尝试向这个队列发送三条消息。在发送第二条消息时，我们设置了一个“回滚条件”，如果满足这个条件（在这个例子中，当消息内容是&quot;Second message&quot;时），则执行事务回滚操作并退出函数。如果所有消息都成功发送，且没有触发回滚条件，那么会提交事务。</p><p>请注意，这个例子中的回滚条件是硬编码的，仅用于演示如何使用RabbitMQ的事务功能。在实际应用中，你需要根据具体的业务逻辑来确定回滚条件。</p>`,19),p=[o];function i(c,l){return s(),a("div",null,p)}const r=n(e,[["render",i],["__file","rabbitmq事务基本介绍.html.vue"]]),d=JSON.parse('{"path":"/posts/MQ/rabbitmq%E4%BA%8B%E5%8A%A1%E5%9F%BA%E6%9C%AC%E4%BB%8B%E7%BB%8D.html","title":"rabbitmq事务基本介绍和go的使用示例","lang":"zh-CN","frontmatter":{"title":"rabbitmq事务基本介绍和go的使用示例","date":"2024-02-25T01:37:57.000Z","tags":["rabbitmq","消息队列"],"categories":["mq"]},"headers":[{"level":3,"title":"RabbitMQ 事务的基本操作","slug":"rabbitmq-事务的基本操作","link":"#rabbitmq-事务的基本操作","children":[]},{"level":3,"title":"使用事务的步骤","slug":"使用事务的步骤","link":"#使用事务的步骤","children":[]},{"level":3,"title":"事务的性能影响","slug":"事务的性能影响","link":"#事务的性能影响","children":[]},{"level":3,"title":"替代方案：确认模式","slug":"替代方案-确认模式","link":"#替代方案-确认模式","children":[]},{"level":3,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"Go使用RabbitMq的例子","slug":"go使用rabbitmq的例子","link":"#go使用rabbitmq的例子","children":[]}],"git":{"updatedTime":1712251162000,"contributors":[{"name":"yushen","email":"85443289+yushenw@users.noreply.github.com","commits":1}]},"filePathRelative":"posts/MQ/rabbitmq事务基本介绍.md","excerpt":"<p>RabbitMQ 提供了基本的事务机制，允许生产者保证消息的发布过程中的原子性。这意味着你可以在发送消息之前开始一个事务，然后发送多条消息，并在最后提交这个事务。如果在事务中的任何点发生错误，你可以回滚事务，这样就好像这些消息从未被发送过一样。</p>\\n<h3>RabbitMQ 事务的基本操作</h3>\\n<p>RabbitMQ 事务机制包含三个基本操作：</p>\\n<ol>\\n<li><strong>txSelect</strong>：用于将当前channel（通道）标记为事务模式。</li>\\n<li><strong>txCommit</strong>：用于提交事务，确保所有在事务内发送的消息都被确认。</li>\\n<li><strong>txRollback</strong>：用于回滚事务，取消事务内进行的所有消息发送。</li>\\n</ol>\\n<h3>使用事务的步骤</h3>\\n<ol>\\n<li><strong>开启事务</strong>：首先，通过调用<code>txSelect</code>方法在一个channel上开启事务。</li>\\n<li><strong>发送消息</strong>：在事务模式下，你可以发送一条或多条消息到队列。</li>\\n<li><strong>提交或回滚</strong>：如果消息成功发送，你可以通过调用<code>txCommit</code>提交事务，这时消息会被实际发送到队列中。如果在发送消息时遇到任何问题，或者你出于某种原因需要取消发送的消息，可以调用<code>txRollback</code>来回滚事务，这样事务中的所有消息发送操作都会被取消。</li>\\n</ol>\\n<h3>事务的性能影响</h3>\\n<p>虽然事务提供了一种保证消息发送原子性的方法，但是它也有一定的性能影响。每次事务提交时，RabbitMQ 都需要将事务中的所有消息写入磁盘，这会导致相比非事务发送操作有较大的延迟。因此，如果你追求高吞吐量，使用事务可能不是最佳选择。</p>\\n<h3>替代方案：确认模式</h3>\\n<p>作为事务的替代方案，RabbitMQ 还提供了发布确认（publisher confirms）模式。这种模式提供了一种轻量级的方式来确认消息是否已经被RabbitMQ接收。相比于事务，发布确认模式在保证消息可靠性的同时，对性能的影响较小，因此在需要高性能的场景下更受推荐。</p>\\n"}');export{r as comp,d as data};
