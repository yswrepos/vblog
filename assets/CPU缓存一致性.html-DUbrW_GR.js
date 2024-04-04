import{_ as e,o as s,c as t,e as c}from"./app-BLeSCfhf.js";const a="/vblog/static/img/posts/cpu-cache-coherency-1.png",i="/vblog/static/img/posts/cpu-cache-coherency-2.png",p={},l=c('<p>CPU的缓存一致性问题指的是在多核CPU系统中，确保各个CPU核心的缓存中存储的相同内存地址的数据是一致的问题。这是并发计算中一个非常重要的概念，因为现代计算机系统中通常有多个处理器或核心，每个处理器都有自己的本地缓存。如果多个处理器同时对同一内存位置进行读写操作，而不进行适当的同步，就会导致数据不一致的问题。</p><p>**MESI协议：**MESI是最常用的缓存一致性协议之一，它的名字来源于四种缓存行状态：Modified（修改）、Exclusive（独占）、Shared（共享）和Invalid（无效）。这个协议确保了当某个CPU核心修改了数据时，其他核心中的相同数据会被标记为无效，必要时更新它们的缓存行。</p><h2 id="举例" tabindex="-1"><a class="header-anchor" href="#举例"><span>举例</span></a></h2><p>假设有两个CPU L0和L1, 它们有自己的告诉缓存C0和C1。</p><p><img src="'+a+'" alt=""></p><p>CPU和主存（内存）交互时，有三个总线：</p><ul><li>地址总线(Address bus)</li><li>数据总线(Data Bus)</li><li>共享总线(Shared bus): 在多个CPU高速缓存中共享信息</li></ul><p>当cpu0读取x=3的时候，会先查找自己的告诉缓存c0，如果没有命中就会将x的地址发送到地址总线，主内存读取到了这个地址，根据地址找到值后，将数据通过data bus发会，在此过程中cpu0监听的地址总线没有其他CPU操作这个地址，于是拿到数据后将x=3写到自己的缓存中，并标记为独占（Exclusive）状态。</p><p>当cpu1读取x=3的时候，c1未命中，于是从主存拿，此时cpu0监听到了所持有的x地址的读取动作，于是通过shared bus通知其他cpu该变量是共享变量，于是l0和l1都将自己的c0和c1里的x变量标记为共享状态(Shared)。</p><p>当cpu0再次更改x的时候，c0命中，发现x状态为共享态，此时l0需要（Write-Through）操作，即既要修改c0还要修改主存，并将x状态标记为独占（Exclusive）, 其它CPU监听到Address Bus的x地址变化自己缓存中的x值标记为无效（Invalid）态。 以后cpu0再要修改x的时候，由于自己独占了这个x，所以只需要修改c0，不需要写主存，这种操作成为写回(Write-Back)，并将x状态标记为已修改(Modified)状态，在这个状态中，x的值和更新与主存，由独占态而来。</p><p>在修改状态，一旦cpu0监听的address bus上有x地址读取或变动，就会将自己的x状态重新标记为共享态（Shared）, 并通过shared bus传递自己的值同时（或者通过内存管理器）将当前的x值写入主存。</p><h2 id="状态变化" tabindex="-1"><a class="header-anchor" href="#状态变化"><span>状态变化</span></a></h2><p><img src="'+i+'" alt=""></p>',13),r=[l];function o(n,d){return s(),t("div",null,r)}const u=e(p,[["render",o],["__file","CPU缓存一致性.html.vue"]]),x=JSON.parse('{"path":"/posts/theory/CPU%E7%BC%93%E5%AD%98%E4%B8%80%E8%87%B4%E6%80%A7.html","title":"CPU缓存一致性","lang":"zh-CN","frontmatter":{"title":"CPU缓存一致性","date":"2024-03-01T15:43:17.000Z","tags":["cpu","缓存一致性"],"categories":"theory"},"headers":[{"level":2,"title":"举例","slug":"举例","link":"#举例","children":[]},{"level":2,"title":"状态变化","slug":"状态变化","link":"#状态变化","children":[]}],"git":{"updatedTime":1712251162000,"contributors":[{"name":"yushen","email":"85443289+yushenw@users.noreply.github.com","commits":1}]},"filePathRelative":"posts/theory/CPU缓存一致性.md","excerpt":"<p>CPU的缓存一致性问题指的是在多核CPU系统中，确保各个CPU核心的缓存中存储的相同内存地址的数据是一致的问题。这是并发计算中一个非常重要的概念，因为现代计算机系统中通常有多个处理器或核心，每个处理器都有自己的本地缓存。如果多个处理器同时对同一内存位置进行读写操作，而不进行适当的同步，就会导致数据不一致的问题。</p>\\n<p>**MESI协议：**MESI是最常用的缓存一致性协议之一，它的名字来源于四种缓存行状态：Modified（修改）、Exclusive（独占）、Shared（共享）和Invalid（无效）。这个协议确保了当某个CPU核心修改了数据时，其他核心中的相同数据会被标记为无效，必要时更新它们的缓存行。</p>\\n"}');export{u as comp,x as data};
