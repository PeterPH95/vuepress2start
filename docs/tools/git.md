---
title: Git
---

# git 基础指令
- [参考](https://juejin.cn/post/6844903586120335367)

### 远程`git clone`仓库
``` bash
git clone ---
cd /docs
# 在cmd环境中使用yarn安装依赖 
yarn

# 公司电脑 yarn deploy 时出错, 修改了一下配置 
git config --global http.sslVerify "false"
```

### 拉取更新
``` bash
git pull
# 文件冲突 
CONFLICT (modify/delete): docs/git/README.md
admin@PC-3d4bfe MINGW64 ~/Desktop/docs (main|MERGING)
# 删除文件 docs/git/README.md
git rm docs/git/README.md
git committed -m "冲突解决"
```
### 检测修改
> 我来监测github跟踪，显示当前修改时间，通过以下代码查看和提交
``` bash
git status //查看文件跟踪情况
git commit -m "about" //提交修改
git config -l //查看配置项
```

### 提交代码
``` bash
# 暂存当前路径下工作区中的文件(除去 .git 文件夹)
git add .
# 提交到本地仓库
git commit -m"信息说明"
# 提交到远程仓库
git push
```

### `commit`的注释前缀
::: tip
- feat：     新功能（feature）
- fix：      修补bug
- docs：     文档（documentation）
- style：    格式（不影响代码运行的变动）
- refactor： 重构（即不是新增功能，也不是修改bug的代码变动）
- test：     增加测试
- chore：    构建过程或辅助工具的变动
:::

### `checkout` 切换分支
``` bash
# 从最后一次提交的代码中恢复 xxx.md 文件
git checkout HEAD xxx.md
# 查看修改日志
git log
# 退出日志
q // 按住
```

### 合并分支
- 假设线上代码的分支是master，本地修复bug的分支为fix，上线时下列哪些git操作是正确的
- merge 合并（拉代码或者push代码都可使用）
- rebase 合并（拉公共分支最新代码的时候使用）
```bash
# 方式一
git checkout master
git merge fix
git push origin master

# 方式二
git checkout fix
git rebase master
git checkout master
git merge fix
git push origin master
```

### 查看账户，修改账户，多终端配置
> [参考](https://blog.csdn.net/helloasimo/article/details/123778112?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522166374032816781432996870%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=166374032816781432996870&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_click~default-1-123778112-null-null.142^v48^pc_rank_34_queryrelevant25,201^v3^control_1&utm_term=git%40github.com%3A%20Permission%20denied%20%28publickey%29.&spm=1018.2226.3001.4187)

``` bash 
# 首先，确定自己的账户邮箱是否正确
git config --global --list
git config --global user.name 'PeterPH95'
git config --global user.email '1269894219@qq.com'

# 其次，在本地生成 SSH 密钥，一路回车
ssh-keygen -t rsa -C 1269894219@qq.com

# 而后，在/c/Users/admin/.ssh/id_rsa.pub路径下生成一个.ssh\id_rsa.pub文件

# 将id_rsa.pub中的密钥添加到github中

# 最后，测试 SSH 设置是否成功
ssh -T git@github.com
```
