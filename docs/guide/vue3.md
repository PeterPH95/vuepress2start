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

