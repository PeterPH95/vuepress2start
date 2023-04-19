import{_ as e,r as o,o as p,c as t,a as s,b as n,d as l,e as c}from"./app.cf875173.js";const r={},i=s("h1",{id:"数据库学习笔记",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#数据库学习笔记","aria-hidden":"true"},"#"),n(" 数据库学习笔记")],-1),d=s("h2",{id:"数据库关键词顺序",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#数据库关键词顺序","aria-hidden":"true"},"#"),n(" 数据库关键词顺序")],-1),u=s("li",null,[n("sql中关键字出现的顺序是："),s("code",null,"select/from/wshere/group by/having/order by/limit")],-1),k={href:"https://blog.csdn.net/qq_26442553/article/details/79467243",target:"_blank",rel:"noopener noreferrer"},m=c(`<div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token keyword">DISTINCT</span> <span class="token operator">&lt;</span>select_list<span class="token operator">&gt;</span>
<span class="token keyword">FROM</span> <span class="token operator">&lt;</span>left_table<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>join_type<span class="token operator">&gt;</span> <span class="token keyword">JOIN</span> <span class="token operator">&lt;</span>right_table<span class="token operator">&gt;</span>
<span class="token keyword">ON</span> <span class="token operator">&lt;</span>join_condition<span class="token operator">&gt;</span>
<span class="token keyword">WHERE</span> <span class="token operator">&lt;</span>where_condition<span class="token operator">&gt;</span>
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span> <span class="token operator">&lt;</span>group_by_list<span class="token operator">&gt;</span>
<span class="token keyword">HAVING</span> <span class="token operator">&lt;</span>having_condition<span class="token operator">&gt;</span>
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span> <span class="token operator">&lt;</span>order_by_condition<span class="token operator">&gt;</span>
<span class="token keyword">LIMIT</span> <span class="token operator">&lt;</span>limit_number<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="基础指令" tabindex="-1"><a class="header-anchor" href="#基础指令" aria-hidden="true">#</a> 基础指令</h2><h3 id="select" tabindex="-1"><a class="header-anchor" href="#select" aria-hidden="true">#</a> <code>SELECT</code></h3><ul><li><code>distinct</code>去重, <code>as</code>改名</li><li>函数：<code>sum()</code>(求和),<code>max(price)</code>(最大值),<code>avg(price)</code>(均值),<code>*</code>(乘法)</li><li><code>count(*)</code>(所有记录)/<code>count(列)</code>(列中非空记录),<code>substring()</code>(字符串字串)</li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 去重</span>
<span class="token keyword">select</span> <span class="token keyword">distinct</span> university <span class="token keyword">from</span> user_profile
<span class="token keyword">select</span> university <span class="token keyword">from</span> user_profile <span class="token keyword">group</span> <span class="token keyword">by</span> university
<span class="token comment">-- 改名</span>
<span class="token keyword">select</span> university <span class="token keyword">as</span> college
<span class="token comment">-- 求和</span>
<span class="token keyword">select</span> <span class="token function">sum</span><span class="token punctuation">(</span>quantity<span class="token punctuation">)</span> <span class="token keyword">as</span> items_ordered
<span class="token keyword">from</span> OrderItems
<span class="token comment">-- 打折（乘法）</span>
<span class="token keyword">select</span> prod_price<span class="token punctuation">,</span>prod_price <span class="token operator">*</span> <span class="token number">0.9</span> <span class="token keyword">as</span> sale_price
<span class="token keyword">from</span> Products 
<span class="token comment">-- 最大值（确定 Products 表中价格不超过 10 美元的最贵产品的价格（prod_price））</span>
<span class="token keyword">select</span> <span class="token function">max</span><span class="token punctuation">(</span>prod_price<span class="token punctuation">)</span> max_price
<span class="token keyword">from</span> Products
<span class="token keyword">where</span> prod_price <span class="token operator">&lt;=</span> <span class="token number">10</span>
<span class="token comment">-- 计数（返回每个订单号（order_num）各有多少行数（order_lines））</span>
<span class="token keyword">select</span> order_num<span class="token punctuation">,</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">as</span> order_lines
<span class="token keyword">from</span> OrderItems
<span class="token keyword">group</span> <span class="token keyword">by</span> order_num
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="join-on" tabindex="-1"><a class="header-anchor" href="#join-on" aria-hidden="true">#</a> <code>JOIN ... ON</code></h3><ul><li>内联结，多表联结</li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 方法一：将Customers和Orders联结一起</span>
<span class="token keyword">select</span> cust_name<span class="token punctuation">,</span>order_num
<span class="token keyword">from</span> Customers
<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> Orders <span class="token keyword">ON</span> Orders<span class="token punctuation">.</span>cust_id<span class="token operator">=</span>Customers<span class="token punctuation">.</span>cust_id
<span class="token keyword">order</span> <span class="token keyword">by</span> cust_name<span class="token punctuation">,</span>order_num<span class="token punctuation">;</span>

<span class="token comment">-- 方法二：使用where进行联结</span>
<span class="token keyword">select</span> cust_name<span class="token punctuation">,</span>order_num
<span class="token keyword">from</span> Customers<span class="token punctuation">,</span>Orders
<span class="token keyword">where</span> Customers<span class="token punctuation">.</span>cust_id<span class="token operator">=</span>Orders<span class="token punctuation">.</span>cust_id
<span class="token keyword">order</span> <span class="token keyword">by</span> cust_name<span class="token punctuation">,</span>order_num<span class="token punctuation">;</span>

<span class="token comment">-- 三表联结查询</span>
<span class="token keyword">select</span> c<span class="token punctuation">.</span>cust_name<span class="token punctuation">,</span>os<span class="token punctuation">.</span>order_num<span class="token punctuation">,</span><span class="token function">sum</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>quantity<span class="token operator">*</span>os<span class="token punctuation">.</span>item_price<span class="token punctuation">)</span> OrderTotal 
<span class="token keyword">from</span> Orders o
<span class="token comment">-- 联结表二 OrderItems</span>
<span class="token keyword">join</span> OrderItems os
<span class="token keyword">on</span> os<span class="token punctuation">.</span>order_num<span class="token operator">=</span>o<span class="token punctuation">.</span>order_num
<span class="token comment">-- 联结表三 Customers</span>
<span class="token keyword">join</span> Customers c
<span class="token keyword">on</span> c<span class="token punctuation">.</span>cust_id<span class="token operator">=</span>o<span class="token punctuation">.</span>cust_id

<span class="token keyword">group</span> <span class="token keyword">by</span> c<span class="token punctuation">.</span>cust_name<span class="token punctuation">,</span>os<span class="token punctuation">.</span>order_num
<span class="token keyword">order</span> <span class="token keyword">by</span> c<span class="token punctuation">.</span>cust_name<span class="token punctuation">,</span>os<span class="token punctuation">.</span>order_num<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="where" tabindex="-1"><a class="header-anchor" href="#where" aria-hidden="true">#</a> <code>WHERE</code></h3><ul><li><code>null</code>,<code>like</code>,<code>in</code>,<code>=</code>,<code>&gt;=</code>,<code>&lt;=</code>,<code>!=</code>,<code>between a and b</code>,<code>or</code>的用法</li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 不为空(年龄不为空)</span>
<span class="token keyword">where</span> age <span class="token operator">is</span> <span class="token operator">not</span> <span class="token boolean">null</span>

<span class="token comment">-- 包含,相等,相似,在一个范围内</span>
<span class="token keyword">where</span> university <span class="token operator">in</span> <span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;b&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">where</span> university <span class="token operator">=</span> <span class="token string">&#39;a&#39;</span>
<span class="token keyword">where</span> university <span class="token operator">like</span> <span class="token string">&#39;a%&#39;</span><span class="token comment">/* 以 a 开始*/</span>
<span class="token comment">-- 定位价格在 3 美元到 6 美元之间</span>
<span class="token keyword">where</span> price <span class="token operator">between</span> <span class="token number">3</span> <span class="token operator">and</span> <span class="token number">6</span>

<span class="token comment">-- 不包含 </span>
<span class="token keyword">where</span> university <span class="token operator">not</span> <span class="token operator">in</span> <span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;b&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">where</span> university <span class="token operator">!=</span> <span class="token string">&#39;a&#39;</span>
<span class="token keyword">where</span> university <span class="token operator">not</span> <span class="token operator">like</span> <span class="token string">&#39;a%&#39;</span>

<span class="token comment">-- or(找到学校为北大或GPA在3.7以上)</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> user_profile 
<span class="token keyword">where</span> gpa<span class="token operator">&gt;</span><span class="token number">3.7</span> <span class="token operator">or</span> university<span class="token operator">=</span><span class="token string">&quot;北京大学&quot;</span>

<span class="token comment">-- 找到gpa在3.5以上(不包括3.5)的山东大学用户 或 gpa在3.8以上(不包括3.8)的复旦大学同学</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> user_profile
<span class="token keyword">where</span> <span class="token punctuation">(</span>university<span class="token operator">=</span><span class="token string">&#39;山东大学&#39;</span> <span class="token operator">and</span> gpa<span class="token operator">&gt;</span><span class="token number">3.5</span> <span class="token punctuation">)</span>
<span class="token operator">or</span> <span class="token punctuation">(</span>university<span class="token operator">=</span><span class="token string">&quot;复旦大学&quot;</span> <span class="token operator">and</span> gpa<span class="token operator">&gt;</span><span class="token number">3.8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="group-by-having" tabindex="-1"><a class="header-anchor" href="#group-by-having" aria-hidden="true">#</a> <code>GROUP BY</code> + <code>HAVING</code></h3><ul><li>基于分组之后计算总量</li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> order_num
<span class="token keyword">from</span> OrderItems
<span class="token keyword">group</span> <span class="token keyword">by</span> order_num
<span class="token keyword">having</span> <span class="token function">sum</span><span class="token punctuation">(</span>quantity<span class="token punctuation">)</span> <span class="token operator">&gt;=</span> <span class="token number">100</span>

<span class="token comment">-- 多组分组，先基于性别后学校</span>
<span class="token keyword">group</span> <span class="token keyword">by</span> gender<span class="token punctuation">,</span> university
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="order-by" tabindex="-1"><a class="header-anchor" href="#order-by" aria-hidden="true">#</a> <code>ORDER BY</code></h3><ul><li><code>ASC</code>：升序，<code>DESC</code>：降序，<strong>多属性联合排列</strong></li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> cust_id<span class="token punctuation">,</span>order_num 
<span class="token keyword">from</span> Orders 
<span class="token keyword">order</span> <span class="token keyword">by</span> cust_id <span class="token keyword">asc</span><span class="token punctuation">,</span>order_date <span class="token keyword">desc</span>

<span class="token keyword">select</span> quantity<span class="token punctuation">,</span>item_price
<span class="token keyword">from</span> OrderItems
<span class="token comment">-- 可以用1，2代替列名quantity,item_price</span>
<span class="token keyword">order</span> <span class="token keyword">by</span> <span class="token number">1</span> <span class="token keyword">desc</span><span class="token punctuation">,</span><span class="token number">2</span> <span class="token keyword">desc</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="limit" tabindex="-1"><a class="header-anchor" href="#limit" aria-hidden="true">#</a> <code>LIMIT</code></h3><ul><li>LIMIT 子句可以被用于强制 SELECT 语句返回指定的记录数。 <ul><li>LIMIT 接受一个或两个数字参数。参数必须是一个整数常量。</li><li>如果只给定一个参数，它表示返回最大的记录行数目。</li><li>如果给定两个参数，第一个参数指定第一个返回记录行的偏移量，第二个参数指定返回记录行的最大数目。</li><li>为了检索从某一个偏移量到记录集的结束所有的记录行，可以指定第二个参数为 -1。</li></ul></li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 记录行6-10</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token keyword">table</span> <span class="token keyword">LIMIT</span> <span class="token number">5</span><span class="token punctuation">,</span><span class="token number">5</span>
<span class="token comment">-- 记录行11-last</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token keyword">table</span> <span class="token keyword">LIMIT</span> <span class="token number">10</span><span class="token punctuation">,</span><span class="token operator">-</span><span class="token number">1</span>
<span class="token comment">-- 记录前五个</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token keyword">table</span> <span class="token keyword">LIMIT</span> <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="进阶" tabindex="-1"><a class="header-anchor" href="#进阶" aria-hidden="true">#</a> 进阶</h2><h3 id="子查询" tabindex="-1"><a class="header-anchor" href="#子查询" aria-hidden="true">#</a> 子查询</h3><ul><li>a表依据b表的结果查询</li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 多表结合</span>
<span class="token keyword">SELECT</span> <span class="token keyword">DISTINCT</span> cust_id
<span class="token keyword">FROM</span> Orders
<span class="token comment">-- where和下一级的select的内容一致</span>
<span class="token keyword">WHERE</span> order_num <span class="token operator">IN</span> <span class="token punctuation">(</span>
    <span class="token keyword">SELECT</span> order_num
    <span class="token keyword">FROM</span> OrderItems
    <span class="token keyword">WHERE</span> item_price <span class="token operator">&gt;=</span> <span class="token number">10</span>
<span class="token punctuation">)</span>

<span class="token comment">-- 两表分属两列</span>
<span class="token keyword">select</span>
  prod_name<span class="token punctuation">,</span>
  <span class="token punctuation">(</span>
    <span class="token keyword">select</span>
      <span class="token function">sum</span><span class="token punctuation">(</span>quantity<span class="token punctuation">)</span>
    <span class="token keyword">from</span>
      OrderItems b
    <span class="token keyword">where</span>
      a<span class="token punctuation">.</span>prod_id <span class="token operator">=</span> b<span class="token punctuation">.</span>prod_id
  <span class="token punctuation">)</span> <span class="token keyword">as</span> quant_sold
<span class="token keyword">from</span>
  Products a
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,24);function v(b,y){const a=o("ExternalLinkIcon");return p(),t("div",null,[i,d,s("ul",null,[u,s("li",null,[s("a",k,[n("参考"),l(a)])])]),m])}const h=e(r,[["render",v],["__file","sql.html.vue"]]);export{h as default};
