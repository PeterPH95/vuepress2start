---
title: 一些指令
---

# npm 和 yarn 一些操作指令

## `npm` 和 `yarn` 指令对应
```sh
npm install  => yarn install
npm install --save [package] => yarn add [package]
npm install --save-dev [package] => yarn add [package] --dev
npm install --global [package] => yarn global add [package]
npm uninstall --save [package] => yarn remove [package]
npm uninstall --save-dev [package] => yarn remove [package]
```

## 切换镜像源

### npm
```sh
//切换为淘宝镜像命令（安装一些package容易报错）
npm config set registry https://registry.npm.taobao.org
npm install -g cnpm --registry=https://registry.npm.taobao.org
//新域名
npm config set registry https://registry.npmmirror.com
npm install -g cnpm --registry=https://registry.npmmirror.com
//查看当前使用的镜像地址命令
npm config get registry

//安装 nrm 管理镜像源
npm install nrm
nrm ls

/*
* npm ---- https://registry.npmjs.org/
  cnpm --- http://r.cnpmjs.org/
  taobao - https://registry.npm.taobao.org/
  nj ----- https://registry.nodejitsu.com/
  npmMirror  https://skimdb.npmjs.com/registry/
  edunpm - http://registry.enpmjs.org/
*/

nrm use taobao
```
### yarn

```sh
//安装yarn
npm i -g yarn
// 查询源
yarn config get registry
// 更换国内源
yarn config set registry https://registry.npmmirror.com
// 恢复官方源
yarn config set registry https://registry.yarnpkg.com
// 删除注册表
yarn config delete registry
```

## 安装指定版本的`vue-cli`
```sh
// 安装最新版
npm uninstall -g @vue/cli
// 安装指定版
npm install -g @vue/cli@3.11.0
yarn global add @vue/cli@3.11.0
```

## 关于vuepress无法热更新的问题
> 在根目录的`package.json`中配置如下
```js
"scripts": {
    "dev": "vuepress dev docs --temp .temp",
    "build": "vuepress build docs"
  }
```

## `clone` 的项目版本兼容问题排坑

### `node` 版本控制 `nvm` 安装，解决 `sass` 与 `node` 版本冲突问题
> [参考](https://www.bilibili.com/read/cv16108420/)<br/>
> [nodejs版本下载](https://nodejs.org/download/release/)
```sh
nvm list [available] ：显示已安装的列表。可选参数available，显示可安装的所有版本。list可简化为ls。
nvm install <version> [arch] ：安装node， version是特定版本也可以是最新稳定版本latest。可选参数arch指定安装32位还是64位版本，默认是系统位数。可以添加--insecure绕过远程服务器的SSL。(建议安装长期支持版 LTS)
nvm uninstall <version> ：卸载指定版本node。
nvm on ：开启node.js版本管理。
nvm off ：关闭node.js版本管理。
nvm use [version] [arch] ：使用制定版本node。可指定32/64位。需在 Windows PowerShell 下切换

nvm arch ：显示node是运行在32位还是64位。
nvm proxy [url] ：设置下载代理。不加可选参数url，显示当前代理。将url设置为none则移除代理。
nvm node_mirror [url] ：设置node镜像。默认是https://nodejs.org/dist/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。
nvm npm_mirror [url] ：设置npm镜像。https://github.com/npm/cli/archive/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。
nvm root [path] ：设置存储不同版本node的目录。如果未设置，默认使用当前目录。
nvm version ：显示nvm版本。version可简化为v。
```

### 报缺少`Python`环境的错,用`cnpm`解决
```sh
/** 如：import sys; print "%s.%s.%s" % sys.version_info[:3]; */
cnpm i
```