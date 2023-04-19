import{_ as l,r as t,o as c,c as d,a as n,b as s,d as e,e as i}from"./app.cf875173.js";const o={},r=n("h1",{id:"git-基础指令",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#git-基础指令","aria-hidden":"true"},"#"),s(" git 基础指令")],-1),u={href:"https://juejin.cn/post/6844903586120335367",target:"_blank",rel:"noopener noreferrer"},p=i(`<h3 id="远程git-clone仓库" tabindex="-1"><a class="header-anchor" href="#远程git-clone仓库" aria-hidden="true">#</a> 远程<code>git clone</code>仓库</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> clone ---
<span class="token builtin class-name">cd</span> /docs
<span class="token comment"># 在cmd环境中使用yarn安装依赖 </span>
<span class="token function">yarn</span>

<span class="token comment"># 公司电脑 yarn deploy 时出错, 修改了一下配置 </span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> http.sslVerify <span class="token string">&quot;false&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="拉取更新" tabindex="-1"><a class="header-anchor" href="#拉取更新" aria-hidden="true">#</a> 拉取更新</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> pull
<span class="token comment"># 文件冲突 </span>
CONFLICT <span class="token punctuation">(</span>modify/delete<span class="token punctuation">)</span>: docs/git/README.md
admin@PC-3d4bfe MINGW64 ~/Desktop/docs <span class="token punctuation">(</span>main<span class="token operator">|</span>MERGING<span class="token punctuation">)</span>
<span class="token comment"># 删除文件 docs/git/README.md</span>
<span class="token function">git</span> <span class="token function">rm</span> docs/git/README.md
<span class="token function">git</span> committed <span class="token parameter variable">-m</span> <span class="token string">&quot;冲突解决&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="检测修改" tabindex="-1"><a class="header-anchor" href="#检测修改" aria-hidden="true">#</a> 检测修改</h3><blockquote><p>我来监测github跟踪，显示当前修改时间，通过以下代码查看和提交</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> status //查看文件跟踪情况
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;about&quot;</span> //提交修改
<span class="token function">git</span> config <span class="token parameter variable">-l</span> //查看配置项
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="提交代码" tabindex="-1"><a class="header-anchor" href="#提交代码" aria-hidden="true">#</a> 提交代码</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 暂存当前路径下工作区中的文件(除去 .git 文件夹)</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token comment"># 提交到本地仓库</span>
<span class="token function">git</span> commit -m<span class="token string">&quot;信息说明&quot;</span>
<span class="token comment"># 提交到远程仓库</span>
<span class="token function">git</span> push
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="commit的注释前缀" tabindex="-1"><a class="header-anchor" href="#commit的注释前缀" aria-hidden="true">#</a> <code>commit</code>的注释前缀</h3><div class="custom-container tip"><p class="custom-container-title">TIP</p><ul><li>feat： 新功能（feature）</li><li>fix： 修补bug</li><li>docs： 文档（documentation）</li><li>style： 格式（不影响代码运行的变动）</li><li>refactor： 重构（即不是新增功能，也不是修改bug的代码变动）</li><li>test： 增加测试</li><li>chore： 构建过程或辅助工具的变动</li></ul></div><h3 id="checkout-切换分支" tabindex="-1"><a class="header-anchor" href="#checkout-切换分支" aria-hidden="true">#</a> <code>checkout</code> 切换分支</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 从最后一次提交的代码中恢复 xxx.md 文件</span>
<span class="token function">git</span> checkout HEAD xxx.md
<span class="token comment"># 查看修改日志</span>
<span class="token function">git</span> log
<span class="token comment"># 退出日志</span>
q // 按住
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="合并分支" tabindex="-1"><a class="header-anchor" href="#合并分支" aria-hidden="true">#</a> 合并分支</h3><ul><li>假设线上代码的分支是master，本地修复bug的分支为fix，上线时下列哪些git操作是正确的</li><li>merge 合并（拉代码或者push代码都可使用）</li><li>rebase 合并（拉公共分支最新代码的时候使用）</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 方式一</span>
<span class="token function">git</span> checkout master
<span class="token function">git</span> merge fix
<span class="token function">git</span> push origin master

<span class="token comment"># 方式二</span>
<span class="token function">git</span> checkout fix
<span class="token function">git</span> rebase master
<span class="token function">git</span> checkout master
<span class="token function">git</span> merge fix
<span class="token function">git</span> push origin master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看账户-修改账户-多终端配置" tabindex="-1"><a class="header-anchor" href="#查看账户-修改账户-多终端配置" aria-hidden="true">#</a> 查看账户，修改账户，多终端配置</h3>`,17),m={href:"https://blog.csdn.net/helloasimo/article/details/123778112?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522166374032816781432996870%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=166374032816781432996870&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_click~default-1-123778112-null-null.142%5Ev48%5Epc_rank_34_queryrelevant25,201%5Ev3%5Econtrol_1&utm_term=git%40github.com%3A%20Permission%20denied%20%28publickey%29.&spm=1018.2226.3001.4187",target:"_blank",rel:"noopener noreferrer"},v=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 首先，确定自己的账户邮箱是否正确</span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> <span class="token parameter variable">--list</span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> user.name <span class="token string">&#39;PeterPH95&#39;</span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> user.email <span class="token string">&#39;1269894219@qq.com&#39;</span>

<span class="token comment"># 其次，在本地生成 SSH 密钥，一路回车</span>
ssh-keygen <span class="token parameter variable">-t</span> rsa <span class="token parameter variable">-C</span> <span class="token number">1269894219</span>@qq.com

<span class="token comment"># 而后，在/c/Users/admin/.ssh/id_rsa.pub路径下生成一个.ssh\\id_rsa.pub文件</span>

<span class="token comment"># 将id_rsa.pub中的密钥添加到github中</span>

<span class="token comment"># 最后，测试 SSH 设置是否成功</span>
<span class="token function">ssh</span> <span class="token parameter variable">-T</span> git@github.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function b(h,g){const a=t("ExternalLinkIcon");return c(),d("div",null,[r,n("ul",null,[n("li",null,[n("a",u,[s("参考"),e(a)])])]),p,n("blockquote",null,[n("p",null,[n("a",m,[s("参考"),e(a)])])]),v])}const f=l(o,[["render",b],["__file","git.html.vue"]]);export{f as default};
