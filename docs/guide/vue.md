---
title: Vue2项目笔记
---

## Vue2 项目遇到的问题

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


### `Vue` 路由独有的生命周期钩子函数
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


### 登录时获取登录的地理位置
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


### 页面刷新的后果(白屏)
- `Vue`实例会重走生命周期
- `Vuex`会丢失数据，因为数据都在缓存中，未持久化
- `router`路由也会重置，通过路由表返回的动态路由丢失，可以在`vue`实例中的钩子函数`crated()`里重新获取


### 对 `Vue` 中请求和数据的理解
- 保存在 Vuex store 中的数据和方法
  - 数据：保存状态的数据，比如**侧边栏的折叠状态**，**面包屑**
  - 方法：驱动视图变化的，**动态的**，会修改数据的方法
- 保存在 Mock 中的数据方法
  - 数据：这里面主要包含定死的，模拟后端返回的数据（大量）
  - 方法：对前端发送`axios`请求接口的拦截，同时设置回调函数，通过回调函数传入`axios`请求的参数，返回特定的数据
  - 数据类别：图表和表格数据，根据登录信息返回确定的不同的**路由表**，模拟数据库的**增删改查**操作


### 不同请求方式获取数据的方式
- `GET`：参数通过`params:{name:'',page:4,limit:20}`对象传递，通过`url`中获取，需设置`param2Obj(url)`函数将字符串转换成对象
  - 例如：`/api/user/getUser?name=&page=4&limit=20 `
- `POST`：参数通过`data`对象传递，通过`JSON.parse(config.body)`获取


### `Token`在项目中的应用场景
- 路由跳转：对未登录的无`token`的跳转行为进行拦截
- 向后端请求数据：拒绝未授权的请求，通过请求拦截器将`token`设置在请求头的`config.headers['Authorization'] = token`中


### `i18n`国际化
:::tip
适用场景：表格的表头信息，固定的按钮
注意：如果是动态数据的话，一般是不适合国际化的；如果数据是写死的，就在数据源头将其替换为国际化写法即可
:::


### @click.native.prevent
- 给vue的组件绑定事件时候，若不加上`native`关键字 ，会被`vue`判断为自定义事件（`code1`）,

- 如果监听根元素的原生事件，需使用 .native 修饰符(element-ui(el-button)组件中碰到)

```vue
<template>
  <!--1. 子组件点击鼠标，不会触发show函数 -->
  <Student @click="show"/>
  <!-- 子组件点击鼠标可以触发show函数 -->
  <Student @click.native="show"/>
</template>
```

### 父组件给子组件传值，父组件更新数据，子组件数据不更新
- 原因：子组件只会在第一次初始化时拿到值并赋值，(注意：直接对象赋值则不受影响，若是非对象属性，则会发生上述情况)，当父组件传给子组件的值改变时，并没有重新给子组件中的变量赋值。
- 解决方法一：使用`computed`或者`watch`来检测传入的`props`的改变
- 解决方法二：当父组件传给子组件的值改变时，重新渲染子组件：给子组件动态绑定`key`值，当前时间戳为新的`key`传给子组件，子组件的因为`key`的改变被重新渲染(`key`直接绑定子组件标签那一行)
```vue
<template>
  <div id="app">
    <button @click="addAge">点我age++</button>
    <button @click="addCar">点我+car</button>
    <button @click="addNum">点我n++</button>
    <HelloWorld :msg="message" :num="myNum" :key="key" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  data() {
    return {
      message: { name: "peter", age: 25, },
      myNum: 1,
      key: 10086,
    };
  },
  methods: {
    addAge(){
      this.key = Date.now()
      this.message.age += 1
    },
    addCar() {
      this.key = Date.now()
      this.message["car"] = "奔驰";
    },
    addNum(){
      this.key = Date.now()
      this.myNum += 1
    }
  },
};
</script>
```

<hr/>
<hr/>


## `Vue2` 组件通信
### vue中组件通信的方式

- `props`与`emit`
- 使用`ref`与`$parent`/`$children` [vue2](https://v2.cn.vuejs.org/v2/api/#parent)
- 事件总线`EventBus`与`emit`/`on`
- `$attrs`/`$listeners` [参考](https://www.cnblogs.com/vickylinj/p/13376391.html) [vue2](https://v2.cn.vuejs.org/v2/api/#vm-attrs)
  - `$attrs`接收除了props声明外的所有绑定属性（class、style除外）
  - `$listeners`接收除了带有.native事件修饰符的所有事件监听器
- `Provide`和`inject`
- `Vuex`


### 事件总线和`vuex`的区别？[参考](https://blog.csdn.net/shadowfall/article/details/112005980)
- 相同点
> 都能实现任意组件（父-子，爷-孙，兄弟组件）间的通信
> 本质上都是一个方法，都是在vue这个实例上去实现的
```js
 /*--------事件总线-----------*/

// 事件总线绑定事件
this.$bus.$on('handleAdd',handleAdd)
// 事件总线触发事件
this.$bus.$emit('handleAdd',this.count)
 
/*--------状态管理-----------*/
// 获取状态
this.$store.state.count
// 修改状态
this.$store.dispatch('increment',this.count)
this.$store.commit('INCREMENT',this.count)
```

- 不同点[参考](https://blog.csdn.net/shadowfall/article/details/112005980)
> bus利用事件抛发(发布订阅)的原理进行传递数据而vuex通过数据劫持


## `Vue2`底层
### `Vue2`生命周期
- [图解](assets/vue2_lifetime.png)

### `Vue2`双向绑定原理，代码复现
- [参考](https://www.bilibili.com/video/BV1934y1a7MN)
- [原理图](assets/Vue2双向绑定原理.png)
- 代码
```js
// Vue2 双向绑定原理

class Vue {
  // 参数为对象实例 这个对象用于告知vue需要挂载到哪个元素并挂载数据
  constructor(obj_instance) {
    // 给实例赋值对象的data属性
    this.$data = obj_instance.data;
    // 进行数据劫持 监听对象里属性的变化
    Observer(this.$data);
    Complie(obj_instance.el, this);
  }
}

//数据劫持 —— 监听实例里的数据
function Observer(data_instance) {
  // 递归出口
  if (!data_instance || typeof data_instance !== "object") return;
  // 每次数据劫持一个对象时都创建Dependency实例 用于区分哪个对象对应哪个依赖实例和收集依赖
  const dependency = new Dependency();
  Object.keys(data_instance).forEach((key) => {
    // 使用defineProperty后属性里的值会被修改 需要提前保存属性的值
    let value = data_instance[key];
    // 递归劫持data里的子属性
    Observer(value);
    Object.defineProperty(data_instance, key, {
      enumerable: true,
      configurable: true,
      // 收集数据依赖
      get() {
        console.log(`获取了属性值 ${value}`);
        Dependency.temp && dependency.addSub(Dependency.temp);
        return value;
      },
      // 触发视图更新
      set(newVal) {
        console.log(`修改了属性值`);
        value = newVal;
        // 处理赋值是对象时的情况
        Observer(newVal);
        dependency.notify();
      },
    });
  });
}

//模板解析 —— 替换DOM内容 把vue实例上的数据解析到页面上
// 接收两个参数 1.vue实例挂载的元素<div id="app"> 2.vue实例
function Complie(element, vm) {
  vm.$el = document.querySelector(element);
  // 使用文档碎片来临时存放DOM元素 减少DOM更新
  const fragment = document.createDocumentFragment();
  let child;
  // 将页面里的子节点循环放入文档碎片
  while ((child = vm.$el.firstChild)) {
    fragment.appendChild(child);
  }
  fragment_compile(fragment);
  // 替换fragment里文本节点的内容
  function fragment_compile(node) {
    // 使用正则表达式去匹配并替换节点里的{{}}
    const pattern = /\{\{\s*(\S+)\s*\}\}/;
    if (node.nodeType === 3) {
      // 提前保存文本内容 否则文本在被替换一次后 后续的操作都会不生效
      // 打工人: {{name}}  => 打工人：西维 如果不保存后续修改name会匹配不到{{name}} 因为已经被替换
      const texts = node.nodeValue;
      // 获取正则表达式匹配文本字符串获得的所有结果
      const result_regex = pattern.exec(node.nodeValue);
      if (result_regex) {
        const arr = result_regex[1].split("."); // more.salary => ['more', 'salary']
        // 使用reduce归并获取属性对应的值 = vm.$data['more'] => vm.$data['more']['salary']
        const value = arr.reduce((total, current) => total[current], vm.$data);
        node.nodeValue = texts.replace(pattern, value);
        // 在节点值替换内容时 即模板解析的时候 添加订阅者
        // 在替换文档碎片内容时告诉订阅者如何更新 即告诉Watcher如何更新自己
        new Watcher(vm, result_regex[1], (newVal) => {
          node.nodeValue = texts.replace(pattern, newVal);
        });
      }
    }
    // 替换绑定了v-model属性的input节点的内容
    if (node.nodeType === 1 && node.nodeName === "INPUT") {
      const attr = Array.from(node.attributes);
      attr.forEach((item) => {
        if (item.nodeName === "v-model") {
          const value = item.nodeValue
            .split(".")
            .reduce((total, current) => total[current], vm.$data);
          node.value = value;
          new Watcher(vm, item.nodeValue, (newVal) => {
            node.value = newVal;
          });
          node.addEventListener("input", (e) => {
            // ['more', 'salary']
            const arr1 = item.nodeValue.split(".");
            // ['more']
            const arr2 = arr1.slice(0, arr1.length - 1);
            // vm.$data.more
            const final = arr2.reduce(
              (total, current) => total[current],
              vm.$data
            );
            // vm.$data.more['salary'] = e.target.value
            final[arr1[arr1.length - 1]] = e.target.value;
          });
        }
      });
    }
    // 对子节点的所有子节点也进行替换内容操作
    node.childNodes.forEach((child) => fragment_compile(child));
  }
  // 操作完成后将文档碎片添加到页面
  // 此时已经能将vm的数据渲染到页面上 但还未实现数据变动的及时更新
  vm.$el.appendChild(fragment);
}

//依赖 —— 实现发布-订阅模式 用于存放订阅者和通知订阅者更新
class Dependency {
  constructor() {
    this.subscribers = []; // 用于收集依赖data的订阅者信息
  }
  addSub(sub) {
    this.subscribers.push(sub);
  }
  notify() {
    this.subscribers.forEach((sub) => sub.update());
  }
}

// 订阅者
class Watcher {
  // 需要vue实例上的属性 以获取更新什么数据
  constructor(vm, key, callback) {
    this.vm = vm;
    this.key = key;
    this.callback = callback;
    //临时属性 —— 触发getter 把订阅者实例存储到Dependency实例的subscribers里面
    Dependency.temp = this;
    key.split(".").reduce((total, current) => total[current], vm.$data);
    Dependency.temp = null; // 防止订阅者多次加入到依赖实例数组里
  }
  update() {
    const value = this.key
      .split(".")
      .reduce((total, current) => total[current], this.vm.$data);
    this.callback(value);
  }
}

```

