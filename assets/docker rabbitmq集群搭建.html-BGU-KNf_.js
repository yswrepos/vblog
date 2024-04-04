import{_ as a,o as s,c as n,e}from"./app-Du_kiChf.js";const t={},i=e(`<p>要使用Docker创建一个RabbitMQ集群，并将日志等重要文件映射到本机，你可以遵循以下步骤。这个过程涉及到使用Docker Compose来配置和启动RabbitMQ容器的集群，以及如何设置数据卷以映射重要文件。</p><h3 id="_1-准备docker-compose文件" tabindex="-1"><a class="header-anchor" href="#_1-准备docker-compose文件"><span>1. 准备Docker Compose文件</span></a></h3><p>首先，你需要创建一个<code>docker-compose.yml</code>文件来定义你的RabbitMQ集群。以下是一个简单示例，它启动了一个三节点的RabbitMQ集群。此配置还包括了如何映射数据卷来存储日志和其他重要文件。</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">rabbitmq1</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token string">&quot;rabbitmq:3-management&quot;</span>
    <span class="token key atrule">hostname</span><span class="token punctuation">:</span> <span class="token string">&quot;rabbitmq1&quot;</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">RABBITMQ_ERLANG_COOKIE</span><span class="token punctuation">:</span> <span class="token string">&quot;SWQOKODSQALRPCLNMEQG&quot;</span>
      <span class="token key atrule">RABBITMQ_DEFAULT_USER</span><span class="token punctuation">:</span> <span class="token string">&quot;user&quot;</span>
      <span class="token key atrule">RABBITMQ_DEFAULT_PASS</span><span class="token punctuation">:</span> <span class="token string">&quot;password&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./rabbitmq1/data<span class="token punctuation">:</span>/var/lib/rabbitmq
      <span class="token punctuation">-</span> ./rabbitmq1/log<span class="token punctuation">:</span>/var/log/rabbitmq
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;15672:15672&quot;</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;5672:5672&quot;</span>
  
  <span class="token key atrule">rabbitmq2</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token string">&quot;rabbitmq:3-management&quot;</span>
    <span class="token key atrule">hostname</span><span class="token punctuation">:</span> <span class="token string">&quot;rabbitmq2&quot;</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">RABBITMQ_ERLANG_COOKIE</span><span class="token punctuation">:</span> <span class="token string">&quot;SWQOKODSQALRPCLNMEQG&quot;</span>
      <span class="token key atrule">RABBITMQ_DEFAULT_USER</span><span class="token punctuation">:</span> <span class="token string">&quot;user&quot;</span>
      <span class="token key atrule">RABBITMQ_DEFAULT_PASS</span><span class="token punctuation">:</span> <span class="token string">&quot;password&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./rabbitmq2/data<span class="token punctuation">:</span>/var/lib/rabbitmq
      <span class="token punctuation">-</span> ./rabbitmq2/log<span class="token punctuation">:</span>/var/log/rabbitmq
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> rabbitmq1

  <span class="token key atrule">rabbitmq3</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token string">&quot;rabbitmq:3-management&quot;</span>
    <span class="token key atrule">hostname</span><span class="token punctuation">:</span> <span class="token string">&quot;rabbitmq3&quot;</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">RABBITMQ_ERLANG_COOKIE</span><span class="token punctuation">:</span> <span class="token string">&quot;SWQOKODSQALRPCLNMEQG&quot;</span>
      <span class="token key atrule">RABBITMQ_DEFAULT_USER</span><span class="token punctuation">:</span> <span class="token string">&quot;user&quot;</span>
      <span class="token key atrule">RABBITMQ_DEFAULT_PASS</span><span class="token punctuation">:</span> <span class="token string">&quot;password&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./rabbitmq3/data<span class="token punctuation">:</span>/var/lib/rabbitmq
      <span class="token punctuation">-</span> ./rabbitmq3/log<span class="token punctuation">:</span>/var/log/rabbitmq
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> rabbitmq1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-启动rabbitmq集群" tabindex="-1"><a class="header-anchor" href="#_2-启动rabbitmq集群"><span>2. 启动RabbitMQ集群</span></a></h3><p>在同一目录下保存你的<code>docker-compose.yml</code>文件。然后，打开终端或命令提示符，运行以下命令来启动你的RabbitMQ集群：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将基于你的<code>docker-compose.yml</code>文件配置来启动RabbitMQ的容器。</p><h3 id="_3-设置集群节点" tabindex="-1"><a class="header-anchor" href="#_3-设置集群节点"><span>3. 设置集群节点</span></a></h3><p>默认情况下，启动的RabbitMQ节点将作为独立节点运行。你需要配置它们，使其成为集群的一部分。你可以通过执行以下命令在容器内部进行操作，以将<code>rabbitmq2</code>和<code>rabbitmq3</code>节点加入到<code>rabbitmq1</code>创建的集群中：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> rabbitmq2 rabbitmqctl stop_app
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> rabbitmq2 rabbitmqctl reset
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> rabbitmq2 rabbitmqctl join_cluster rabbit@rabbitmq1
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> rabbitmq2 rabbitmqctl start_app

<span class="token function">docker</span> <span class="token builtin class-name">exec</span> rabbitmq3 rabbitmqctl stop_app
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> rabbitmq3 rabbitmqctl reset
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> rabbitmq3 rabbitmqctl join_cluster rabbit@rabbitmq1
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> rabbitmq3 rabbitmqctl start_app
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-验证集群状态" tabindex="-1"><a class="header-anchor" href="#_4-验证集群状态"><span>4. 验证集群状态</span></a></h3><p>你可以通过执行以下命令来检查RabbitMQ集群的状态：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> rabbitmq1 rabbitmqctl cluster_status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将显示集群中的节点以及它们的状态。</p><p>通过以上步骤，你将成功创建一个RabbitMQ集群，并将日志等重要文件映射到本机上。这样，你就可以更方便地管理和访问这些文件了。</p><h2 id="rabbitmq-erlang-cookie" tabindex="-1"><a class="header-anchor" href="#rabbitmq-erlang-cookie"><span>RABBITMQ_ERLANG_COOKIE</span></a></h2><p><code>RABBITMQ_ERLANG_COOKIE</code>是RabbitMQ和Erlang分布式系统中用于节点之间认证的一个重要概念。RabbitMQ是用Erlang语言编写的，它依赖于Erlang的分布式特性来实现其集群功能。为了安全地进行节点间通信，Erlang使用了一个被称为&quot;cookie&quot;的机制。</p><h3 id="erlang-cookie的作用" tabindex="-1"><a class="header-anchor" href="#erlang-cookie的作用"><span>Erlang Cookie的作用：</span></a></h3><ul><li><strong>节点认证</strong>：Erlang的节点（在RabbitMQ的背景下，即RabbitMQ的服务器实例）使用这个cookie来认证尝试与它们通信的其他节点。只有当两个节点共享相同的cookie时，它们才能够相互通信。</li><li><strong>集群安全性</strong>：这个机制确保了只有拥有正确cookie的节点才能加入到集群中，从而防止未授权的访问或加入到集群。</li></ul><h3 id="如何使用" tabindex="-1"><a class="header-anchor" href="#如何使用"><span>如何使用：</span></a></h3><ul><li><strong>配置</strong>：在配置RabbitMQ集群时，所有的节点必须配置相同的<code>RABBITMQ_ERLANG_COOKIE</code>值。这通常在每个节点的配置文件中设置，或者通过环境变量<code>RABBITMQ_ERLANG_COOKIE</code>来设置，确保所有集群节点使用相同的cookie值。</li><li><strong>环境变量</strong>：通过将<code>RABBITMQ_ERLANG_COOKIE</code>设置为环境变量，可以在启动RabbitMQ服务的容器或服务器时指定cookie的值。这使得在Docker或其他容器化环境中部署RabbitMQ集群变得更加容易。</li></ul><h3 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项"><span>注意事项：</span></a></h3><ul><li><strong>安全性</strong>：cookie应该是一个只有集群管理者知道的秘密值。不应该公开分享或在不安全的地方存储这个值，因为拥有cookie的任何人都可以尝试加入到你的RabbitMQ集群。</li><li><strong>一致性</strong>：集群中所有节点的cookie必须一致。如果节点之间的cookie不匹配，它们将无法通信，导致集群功能失败。</li></ul><p>总的来说，<code>RABBITMQ_ERLANG_COOKIE</code>是RabbitMQ集群安全通信的关键，确保了集群的稳定性和安全性。</p><h2 id="rabbitmq-docker-run-方式" tabindex="-1"><a class="header-anchor" href="#rabbitmq-docker-run-方式"><span>RabbitMQ Docker Run 方式</span></a></h2><p>如果你想使用命令行的<code>docker run</code>来启动RabbitMQ集群，并将日志等重要文件映射到本地，而不是使用Docker Compose，你可以按照以下步骤操作。这里，我们将创建一个三节点的RabbitMQ集群，每个节点运行在不同的Docker容器中。</p><h3 id="步骤1-创建网络" tabindex="-1"><a class="header-anchor" href="#步骤1-创建网络"><span>步骤1: 创建网络</span></a></h3><p>首先，创建一个网络，以便RabbitMQ容器可以相互通信。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker</span> network create rabbitmq_cluster_network
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="步骤2-启动rabbitmq节点" tabindex="-1"><a class="header-anchor" href="#步骤2-启动rabbitmq节点"><span>步骤2: 启动RabbitMQ节点</span></a></h3><p>接下来，我们将启动三个RabbitMQ节点。对于每个节点，我们使用<code>docker run</code>命令，并设置环境变量以及映射日志和数据目录到宿主机。</p><h4 id="启动第一个节点-rabbitmq1" tabindex="-1"><a class="header-anchor" href="#启动第一个节点-rabbitmq1"><span>启动第一个节点（rabbitmq1）</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--hostname</span> rabbitmq1 <span class="token parameter variable">--name</span> rabbitmq1 <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">RABBITMQ_ERLANG_COOKIE</span><span class="token operator">=</span><span class="token string">&#39;SWQOKODSQALRPCLNMEQG&#39;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">RABBITMQ_DEFAULT_USER</span><span class="token operator">=</span><span class="token string">&#39;user&#39;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">RABBITMQ_DEFAULT_PASS</span><span class="token operator">=</span><span class="token string">&#39;password&#39;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-p</span> <span class="token number">15672</span>:15672 <span class="token parameter variable">-p</span> <span class="token number">5672</span>:5672 <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/rabbitmq1/data:/var/lib/rabbitmq <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/rabbitmq1/log:/var/log/rabbitmq <span class="token punctuation">\\</span>
<span class="token parameter variable">--network</span> rabbitmq_cluster_network <span class="token punctuation">\\</span>
rabbitmq:3-management
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="启动第二个节点-rabbitmq2" tabindex="-1"><a class="header-anchor" href="#启动第二个节点-rabbitmq2"><span>启动第二个节点（rabbitmq2）</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--hostname</span> rabbitmq2 <span class="token parameter variable">--name</span> rabbitmq2 <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">RABBITMQ_ERLANG_COOKIE</span><span class="token operator">=</span><span class="token string">&#39;SWQOKODSQALRPCLNMEQG&#39;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">RABBITMQ_DEFAULT_USER</span><span class="token operator">=</span><span class="token string">&#39;user&#39;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">RABBITMQ_DEFAULT_PASS</span><span class="token operator">=</span><span class="token string">&#39;password&#39;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/rabbitmq2/data:/var/lib/rabbitmq <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/rabbitmq2/log:/var/log/rabbitmq <span class="token punctuation">\\</span>
<span class="token parameter variable">--network</span> rabbitmq_cluster_network <span class="token punctuation">\\</span>
rabbitmq:3-management
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="启动第三个节点-rabbitmq3" tabindex="-1"><a class="header-anchor" href="#启动第三个节点-rabbitmq3"><span>启动第三个节点（rabbitmq3）</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--hostname</span> rabbitmq3 <span class="token parameter variable">--name</span> rabbitmq3 <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">RABBITMQ_ERLANG_COOKIE</span><span class="token operator">=</span><span class="token string">&#39;SWQOKODSQALRPCLNMEQG&#39;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">RABBITMQ_DEFAULT_USER</span><span class="token operator">=</span><span class="token string">&#39;user&#39;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">RABBITMQ_DEFAULT_PASS</span><span class="token operator">=</span><span class="token string">&#39;password&#39;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/rabbitmq3/data:/var/lib/rabbitmq <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/rabbitmq3/log:/var/log/rabbitmq <span class="token punctuation">\\</span>
<span class="token parameter variable">--network</span> rabbitmq_cluster_network <span class="token punctuation">\\</span>
rabbitmq:3-management
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="步骤3-配置rabbitmq集群" tabindex="-1"><a class="header-anchor" href="#步骤3-配置rabbitmq集群"><span>步骤3: 配置RabbitMQ集群</span></a></h3><p>在启动所有节点后，你需要配置它们，使其成为集群的一部分。使用<code>docker exec</code>命令来停止、重置、加入集群并重新启动每个节点（除了作为主节点的rabbitmq1）。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> rabbitmq2 rabbitmqctl stop_app
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> rabbitmq2 rabbitmqctl reset
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> rabbitmq2 rabbitmqctl join_cluster rabbit@rabbitmq1
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> rabbitmq2 rabbitmqctl start_app

<span class="token function">docker</span> <span class="token builtin class-name">exec</span> rabbitmq3 rabbitmqctl stop_app
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> rabbitmq3 rabbitmqctl reset
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> rabbitmq3 rabbitmqctl join_cluster rabbit@rabbitmq1
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> rabbitmq3 rabbitmqctl start_app
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="步骤4-验证集群状态" tabindex="-1"><a class="header-anchor" href="#步骤4-验证集群状态"><span>步骤4: 验证集群状态</span></a></h3><p>最后，验证集群状态确保一切正常。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> rabbitmq1 rabbitmqctl cluster_status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过这些步骤，你将使用<code>docker run</code>命令行方式成功创建一个RabbitMQ集群，并将日志等重要文件映射到本地。</p>`,45),l=[i];function p(c,r){return s(),n("div",null,l)}const b=a(t,[["render",p],["__file","docker rabbitmq集群搭建.html.vue"]]),d=JSON.parse('{"path":"/posts/theory/docker%20rabbitmq%E9%9B%86%E7%BE%A4%E6%90%AD%E5%BB%BA.html","title":"docker rabbitmq集群搭建","lang":"zh-CN","frontmatter":{"title":"docker rabbitmq集群搭建","date":"2024-03-02T23:20:46.000Z","tags":["docker","rabbitmq"],"categories":"theory"},"headers":[{"level":3,"title":"1. 准备Docker Compose文件","slug":"_1-准备docker-compose文件","link":"#_1-准备docker-compose文件","children":[]},{"level":3,"title":"2. 启动RabbitMQ集群","slug":"_2-启动rabbitmq集群","link":"#_2-启动rabbitmq集群","children":[]},{"level":3,"title":"3. 设置集群节点","slug":"_3-设置集群节点","link":"#_3-设置集群节点","children":[]},{"level":3,"title":"4. 验证集群状态","slug":"_4-验证集群状态","link":"#_4-验证集群状态","children":[]},{"level":2,"title":"RABBITMQ_ERLANG_COOKIE","slug":"rabbitmq-erlang-cookie","link":"#rabbitmq-erlang-cookie","children":[{"level":3,"title":"Erlang Cookie的作用：","slug":"erlang-cookie的作用","link":"#erlang-cookie的作用","children":[]},{"level":3,"title":"如何使用：","slug":"如何使用","link":"#如何使用","children":[]},{"level":3,"title":"注意事项：","slug":"注意事项","link":"#注意事项","children":[]}]},{"level":2,"title":"RabbitMQ Docker Run 方式","slug":"rabbitmq-docker-run-方式","link":"#rabbitmq-docker-run-方式","children":[{"level":3,"title":"步骤1: 创建网络","slug":"步骤1-创建网络","link":"#步骤1-创建网络","children":[]},{"level":3,"title":"步骤2: 启动RabbitMQ节点","slug":"步骤2-启动rabbitmq节点","link":"#步骤2-启动rabbitmq节点","children":[]},{"level":3,"title":"步骤3: 配置RabbitMQ集群","slug":"步骤3-配置rabbitmq集群","link":"#步骤3-配置rabbitmq集群","children":[]},{"level":3,"title":"步骤4: 验证集群状态","slug":"步骤4-验证集群状态","link":"#步骤4-验证集群状态","children":[]}]}],"git":{"updatedTime":1712251162000,"contributors":[{"name":"yushen","email":"85443289+yushenw@users.noreply.github.com","commits":1}]},"filePathRelative":"posts/theory/docker rabbitmq集群搭建.md","excerpt":"<p>要使用Docker创建一个RabbitMQ集群，并将日志等重要文件映射到本机，你可以遵循以下步骤。这个过程涉及到使用Docker Compose来配置和启动RabbitMQ容器的集群，以及如何设置数据卷以映射重要文件。</p>\\n<h3>1. 准备Docker Compose文件</h3>\\n<p>首先，你需要创建一个<code>docker-compose.yml</code>文件来定义你的RabbitMQ集群。以下是一个简单示例，它启动了一个三节点的RabbitMQ集群。此配置还包括了如何映射数据卷来存储日志和其他重要文件。</p>\\n"}');export{b as comp,d as data};
