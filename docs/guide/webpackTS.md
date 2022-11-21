---
title: webpack
sidebar: auto
---

# webpack构建TypeScript[项目](https://blog.csdn.net/qq1195566313/article/details/122708348?spm=1001.2014.3001.5501)

- [参考](https://www.bilibili.com/video/BV1wR4y1377K?p=25&vd_source=3222fe640ca9017c65847877e892e557)

## 1. npm 初始化

```javascript
// 指令
npm init -y

// 默认生成的 package.json
{
  "name": "webpackts",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "html-webpack-plugin": "^5.5.0",
    "ts-loader": "^9.4.1",
    "typescript": "^4.9.3",
    "webpack": "^5.75.0",
    "webpack-cli": "^5.0.0",
    "webpack-dev-server": "^4.11.1"
  }
}
```

## 2. 安装依赖

```
安装webpack   
npm install webpack -D

webpack4以上需要
npm install  webpack-cli -D

编译TS 
npm install ts-loader -D

TS环境
npm install typescript -D

热更新服务 
npm install  webpack-dev-server -D

HTML模板 
npm install html-webpack-plugin -D
```

## 3. 配置文件

```javascript
// webpack.config.js
const path = require("path")
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // 入口
    entry: "./src/index.ts",
    // 模式
    mode: "development",
    // 出口
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js'
    },
    // ?
    // stats: 'none',
    // 以下文件导入时不用写后缀名
    resolve: {
        extensions: ['.ts', '.js'],
        // 路径别名
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    // 各种loader
    module: {
        rules: [ 
            { test: /\.ts$/, use: "ts-loader" }
        ]
    },
    // 配置热更新，设置端口或者跨域
    devServer: {
        port: 2008,
        // 配置代理
        proxy: {}
    },
    // 热更新需要的插件
    plugins: [
        new htmlWebpackPlugin({
            // html 模板
            template: './public/index.html'
        })
    ]
}
```

## 4. 指令配置

```javascript
// package.json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server",
    "build": "webpack"
  },
```

