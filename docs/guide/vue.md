---
title: Vue2项目笔记
sidebar: auto
---

# Vue2 项目遇到的问题

## @click.native.prevent
> 给vue组件绑定事件时候，必须加上native ，不然不会生效（监听根元素的原生事件，使用 .native 修饰符）(element-ui(el-button)组件中碰到)


### `Vue2` 中设置别名 `@` 的方式
```js{6}
// src/build/webpack.base.conf.js 中进行配置
resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
```


## `Vue` 路由独有的生命周期钩子函数
- 当路由匹配到404页面时，会触发什么钩子函数，离开时触发什么钩子函数？[参考](https://v2.cn.vuejs.org/v2/api/#activated)
```js
// App.vue，被 keep-alive 缓存的组件激活时调用 
<keep-alive include="NotFound">
  <router-view></router-view>
</keep-alive>
// NotFount.vue
data() {
  return {
    timer: null,
    count: 50,
  }
},
// 路由组件展示在页面中调用
activated(){
  console.log('组件被激活了')
  // 可以设置定时器
  this.timer = window.setInterval(() => {
    this.count--;
    console.log(this.count);
    if (this.count <= 0) {
      this.left();
    }
  }, 1000);
},
// 路由组件不展示在页面时调用
deactivated(){
  console.log('组件失活了')
  this.left()
}
```


## 登录时获取登录的地理位置
- [Node 代理解决跨域](https://blog.csdn.net/qq_46302247/article/details/123200329)[官方文档](https://cli.vuejs.org/zh/config/#devserver-proxy)
- [接口地址](http://myip.ipip.net/)
```js
// vue.config.js配置
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: {
      // https://www.bilibili.com/index/ding.json  
      '/aa': {
        target: 'https://www.bilibili.com',
        ws: true, //如果要代理 websockets，配置这个参数
        changeOrigin: true, //用于控制代理服务器请求头中的host值；
        // 若changeOrigin: true时发送请求，代理服务器请求头中的host值与后端服务器的host值一样
        // 若changeOrigin: false时发送请求，代理服务器请求头中的host值不变（即：http://localhost:8080）
        // ws 和 changeOrigin的默认值都是true，一般都把changeOrigin设置为true
        pathRewrite: {
          '^/aa': ''
        }
      },
      '/address': {
        target: 'http://myip.ipip.net',//获取地址的域名
        ws: true,
        changOrigin: true,//允许跨域
        pathRewrite: {
            '^/address': ''//以'/address'标识请求用代理，实际请求时重写去掉'/address'
        }
      }
    }
  }
})

// 请求文件 api/index.js 中设置
// 实际访问 http://myip.ipip.net
export const getAddr = (params) => {
  return axios.request({
      url: '/address'
  })
}
```


## 页面刷新的后果(白屏)
- `Vue`实例会重走生命周期
- `Vuex`会丢失数据，因为数据都在缓存中，未持久化
- `router`路由也会重置，通过路由表返回的动态路由丢失，可以在`vue`实例中的钩子函数`crated()`里重新获取


## 对 `Vue` 中请求和数据的理解
- 保存在 Vuex store 中的数据和方法
  - 数据：保存状态的数据，比如**侧边栏的折叠状态**，**面包屑**
  - 方法：驱动视图变化的，**动态的**，会修改数据的方法
- 保存在 Mock 中的数据方法
  - 数据：这里面主要包含定死的，模拟后端返回的数据（大量）
  - 方法：对前端发送`axios`请求接口的拦截，同时设置回调函数，通过回调函数传入`axios`请求的参数，返回特定的数据
  - 数据类别：图表和表格数据，根据登录信息返回确定的不同的**路由表**，模拟数据库的**增删改查**操作


## 不同请求方式获取数据的方式
- `GET`：参数通过`params:{name:'',page:4,limit:20}`对象传递，通过`url`中获取，需设置`param2Obj(url)`函数将字符串转换成对象
  - 例如：`/api/user/getUser?name=&page=4&limit=20 `
- `POST`：参数通过`data`对象传递，通过`JSON.parse(config.body)`获取


## `Token`在项目中的应用场景
- 路由跳转：对未登录的无`token`的跳转行为进行拦截
- 向后端请求数据：拒绝未授权的请求，通过请求拦截器将`token`设置在请求头的`config.headers['Authorization'] = token`中


## `i18n`国际化
:::tip
适用场景：表格的表头信息，固定的按钮
注意：如果是动态数据的话，一般是不适合国际化的；如果数据是写死的，就在数据源头将其替换为国际化写法即可
:::


## 事件总线和`vuex`的区别？
