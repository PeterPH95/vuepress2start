---
title: Vue3学习笔记
---

# Vue3 学习笔记

## `Vue3`相对于`Vue2`的改变

## `watch`

### `Vue3`竟然无法watch`oldValue`?[参考](https://www.bilibili.com/video/BV1Zy4y1K7SH?p=152&spm_id_from=pageDriver&vd_source=3222fe640ca9017c65847877e892e557)

```js
setup(){
	watch(person,(newValue,oldValue)=>{
		console.log('person变化了',newValue,oldValue)// 打印结果都是新值
	},{immediate:true}) 
}
```

### ❗❗监测`ref`和`reactive`数据的不同写法

```js
// `ref`数据 
let person = ref({// 内部对象实际借助 reactive
    name: 'Peter',
    age: 20
})
// 监视 refimpl 对象，这种方式无效(控制台不输出)，监视的仅仅是person地址
watch(person, (newValue,oldValue)=>{
		console.log('person变化了',newValue,oldValue)
})// 解决办法1 {deep: true}
// 解决办法2
watch(person.value, (newValue,oldValue)=>{
		console.log('person变化了',newValue,oldValue)
})

// `reactive`数据
let person = reactive({// 内部对象实际借助 reactive
    name: 'Peter',
    age: 20
})
// 直接监视 Proxy 对象
watch(person, (newValue,oldValue)=>{
		console.log('person变化了',newValue,oldValue)
})// 有效
```

### `shallowReactive`浅响应式的坑

- ❗虽然下面的`salary`属性不是响应式的，但是数据可以被修改，只是数据不是响应式的，修改第一层的`name`会间接改变`salary`
- ![图示](./assets/shallowReactive.gif)

```vue
<template>
  <p>{{ person }}</p>
  <p>姓名：{{ name }}</p>
  <p>年龄：{{ age }}</p>
  <p>薪资： {{ job.j1.salary }} K</p>
  <button @click="name += '!'">修改姓名</button>
  <button @click="age++">修改年龄</button>
  <button @click="job.j1.salary++">修改薪资</button>
</template>

<script>
import { toRefs, shallowReactive} from 'vue'
export default {
  name: 'App',
  setup() {
    let person = shallowReactive({
      name: 'Peter',
      age: 22,
      job: { j1: { salary: 22 } }
    })

    return {
      person,
      ...toRefs(person)
    }
  }
}
</script>
```

## `Vue3`项目笔记

### `Vue3`加`ts`出现 --找不到模块
- 看图：
[模块导入错误](./assets/vue3_@.png)
- 问题一：`ts`只支持导出导入模块，但是`vue`不是模块(我们需要申明一下`vue`是个模块，让你的`ts`可以导入)
  - 解决方式：在`src`目录下新建`env.d.ts`文件，声明`.vue`文件是模块
  ```ts
  declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
  }
  ``` 
- 问题二：`@`别名的方式模块无法识别