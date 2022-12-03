---
title: 'JS手写'
---

# `JavaScript`手写算法

## 1. 😍手写任意类型判断函数getType?

```javascript
function getType(target) {
	return Object.prototype.toString.call(target).slice(8,-1);
}
```

## 2. 😊手写一个数据判等函数isEqual?

```javascript
function isEqual(a, b) {
  //如果a和b本来就全等
  if (a === b) {//0===-0 --> true
    //判断是否为0和-0
    return a !== 0 || 1 / a === 1 / b;
  }
  //判断是否为null和undefined
  if (a == null || b == null) {
    return a === b;
  }
  //接下来判断a和b的数据类型
  let classNameA = toString.call(a);
  let classNameB = toString.call(b);
  //如果数据类型不相等，则返回false
  if (classNameA !== classNameB) {
    return false;
  }
  //如果是对象类型
  if (classNameA == '[object Object]' || classNameA == 'object') {
    //获取a和b的属性长度
    let propsA = Object.getOwnPropertyNames(a);
    let propsB = Object.getOwnPropertyNames(b);
    if (propsA.length != propsB.length) {
      return false;
    }
    for (let i = 0; i < propsA.length; i++) {
      let propName = propsA[i];
      //如果对应属性对应值不相等，则返回false
      if (a[propName] !== b[propName]) {
        if (!isEqual(a[propName], b[propName])) {
          return false;
        }
      }
    }
    return true;
  }
  //如果是数组类型
  if (classNameA == '[object Array]') {

    for (let i = 0, length = a.length; i < length; i++) {
      if (!isEqual(a[i], b[i]))
        // 如果数组元素中具有不相同元素,返回false
        return false;
    }
    return true;
  }
}
```

## 3. 😉手写全相等函数isEqual ， 限制：{} ，[]

> 1. 不是对象，直接返回比较结果,return ===
>
> 2. 两个都是对象||[数组](https://so.csdn.net/so/search?q=数组&spm=1001.2101.3001.7020)
>
>    (1)地址相等的对象 return true
>
>    (2)比较两对象keys的个数
>
>    (3)以obj1的key为基准,和obj2依次递归比较
>    
>    注意：若对象属性中含有函数，如果两个对象引用的同一个函数，则判为相等

```javascript
// 判断obj是否为对象
function isObject(obj) {
  return (typeof obj === 'object' && obj !== null);
}
//全相等函数
function isEqual(obj1,obj2) {
  //如果其中一个不为对象，则判断两个是否严格相等
  if (!isObject(obj1) || !isObject(obj2)) {
    return obj1 === obj2;
  }
  // 到了这里说明两个都是对象
  // 先判断引用是否相等
  if (obj1 === obj2) {
    return true;
  }
  
  //判断两个对象中的键的个数是否相同
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }
  // 以obj1 为基准， 递归判断obj1和obj2中的元素是否相等
  for (let key in obj1) {
    const res = isEqual(obj1[key],obj2[key]);
    if (!res) {
      return false;
    }
  }
  // 全相等
  return true;
}
```

## 4. 😃清除浮动？

```css
.clearfix::after{
    content:"";
    /*height:0;*/
    /*overflow:hidden;*/
    clear:both;
    display:block;
}
```



## 5. 🤩浅拷贝和深拷贝、手写深拷贝?

> [参考](https://juejin.cn/post/6844903929705136141)

```javascript
// 1. []浅拷贝
let arr = [1,2,3,4]
let arr1 = arr.slice(0)
let arr2 = arr.concat()

//2. {}浅拷贝
let obj = {a:1,b:2}
let obj1 = Object.assign({}, obj)

/* 深拷贝，只考虑数组和对象类型 */
function clone(target, map = new WeakMap()){
    // 判断是否是对象
    if(typeof target !== 'object'){
        return target
    }else{
        let cloneTarget = Array.isArray(target) ? [] : {}
        /* 每次遍历对象属性时，判断是否循环引用 */
        if(map.has(target)){
            return map.get(target)
        }
        //cloneTarget是一个引用（不是空对象），后续对cloneTarget的修改均可同步
        map.set(target, cloneTarget)
        for(var key in target){
            cloneTarget[key] = clone(target[key], map)// map需传出共享，cloneTarget修改
        }
        return cloneTarget
    }
}
```



## 6. 😊手写new函数？

```javascript
function myNew(){/* new的作用就是调用构造器函数获取属性，然后绑定原型链 */
    // 1. 创建一个空实例
    const obj = {}
    // 2. 获取构造函数
    const Fn = [...arguments].shift()
    // 3. 改变实例的原型指向为构造器的原型对象
    obj.__proto__ = Fn.prototype
    // 4. 实例调用构造器的方法
    const res = Fn.apply(obj, arguments)
    // 5. 判断构造函数有无返回值，若返回对象则输出res，若没有则输出obj
    return res instanceof Object ? res : obj
}
```



## 7. 😳手写数组去重？

> [参考](https://juejin.cn/post/6844903602197102605)

```javascript
//reduce 实现, 注意：若没有初始值 []，pre=arr[0],cur=arr[1];有则 pre=[],cur=arr[0]
arr.reduce((pre, cur) => {
    if(!pre.includes(cur)){
        pre.push(cur);
    }
}, [])
// 普通实现
function unique(arr){
    let ar = [];
    arr.forEach( x => {
        if(!ar.includes(x)){
            ar.push(x);
        }
    })
    return ar;
}
```

## 8. 😺手写寄生组合继承?

```javascript
// 父类
function Father(name){
    this.name = name
    this.hobbies = ['fishing', 'majiang']
}
Father.prototype.sayHi = function(){
    console.log(this.name)
}
// 子类
function Son(name, age){
    //调用父类构造器继承属性
    Father.call(this, name)
    this.age = age
}

// 继承原型对象上的方法
function inherit(Son, Father){
    // 创建新对象，保留父类的原型对象备份
    let prototype = Object(Father.prototype)
    // 将子类的原型对象指向父类
    Son.prototype = prototype
    // 修复子类原型对象的constructor指向
    Son.prototype.constructor = Son
}
inherit(Son, Father)

Son.prototype.sayHello = function(){
    console.log(this.name, this.age)
}

let soo = new Son('peter', 20)
soo.sayHi()
soo.sayHello()
```

