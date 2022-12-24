---
title: JavaScript
---

# JavaScript


## `require`与`import`的区别
- 1.require是CommonJS规范的模块化语法，import是ECMAScript 6规范的模块化语法；
- 2.require是运行时加载，import是编译时加载；
- 3.require可以写在代码的任意位置，import只能写在文件的最顶端且不可在条件语句或函数作用域中使用；
- 4.require通过module.exports导出的值就不能再变化，import通过export导出的值可以改变；

```js
// m1.js
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);
// m2.js
import {foo} from './m1.js';
console.log(foo); //bar
setTimeout(() => console.log(foo), 500); //baz
```

## js 中操作符 `!` `~~` 和 `!!`[参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_NOT#double_not_!!)
- ! 会将后面的数据先转成布尔值，然后取反；
- ~~ 利用符号进行的类型转换，转换成数字类型；
- ~~ 取整的方式比`Math.floor()`方法更快，正数向下取整，负数向上取整；
```js{5,6}
var a; //a = undefined
var r = !!a; 
console.log(r) //false

!!{} // true  对象类型转为布尔值为true
!![] // true
!!'' //false
!!undefined // false
!!null // false
!!NaN //false

~~undefined //0
~~null //0
~~!undefined //1
~~!null //1

~~true //1
~~false //0
~~"" //0
~~[] //0

~~1.2 //1
~~1.8 //1
~~-1.2 //-1
// | 0 也可以取整,实际就是2进制取或的操作
1.2 | 0 //1
```

## `==` `+` 的隐式类型转换
- 类型相同
  - 基本类型，直接比较值
  - 引用类型比较指针
- 类型不同，尝试转成number类型
  - 先调用valueOf()转成number
  - 不行就再用toString()方法转成string
- null、NaN、undefined单独一套规则
  - undefined和null与任何有有意义的值比较都是false
    - `undefined/null == 0/false/''` ===> false（不会再进行转换）
  - 但`null == undefined // true` (undefined值是通过null派生出来的，== 时它会自动转化为null，所以返回true。)
- 补充：+[] 隐式转换为Number 0

```js
//请听题
console.log(new String('abc') == true)//问题1
console.log({} == true)//问题2
console.log([] == ![])//问题3

//问题1：
console.log(new String('abc') == true)
//step1:右侧转成数字1,变成：
new String('abc')==1
//step2 new String('abc').valueOf()不是数字也不是字符串，再调用toString()
'abc' == 1
//step3:字符串转数字
NaN == 1 //false,NaN和任何类型比较都为false

//问题2：
console.log({}==true)
//step1:右侧转成数字
{} == 1
//step2 {}.valueOf()不是数字也不是字符串，再调用toString()
'[object Object]' ==1 
//step3:字符串转数字
NaN == 1 //false,NaN和任何类型比较都为false

//问题3:
console.log([]==![])
//step1:!优先级比==高，先转右边,[]是对象类型，转成布尔值为true,!true就是false
[]==false
//step2:右侧转成数字为0
[]==0
//step3:左侧是一个对象，valueOf()转出来不是字符也不是字符串，调用toString()，得到空字符串
'' == 0
//step4:字符串转成数字
0 == 0 //true

//null、NaN、undefined
console.log(NaN==NaN) //false
console.log(undefined==null) //true
console.log(null==null) //true
undefined == undefined //true
```


## `valueOf()` 和 `toString()`的特殊调用
```js
/**
 * []重写了toString()方法，默认调用join()，{}未重写toString()返回数据类型
 */
console.log([].valueOf(), [].toString()) // [] ,  ''
console.log({}.valueOf(), {}.toString()) // {}, [object Object] 
```


## typeof 
:::warning
typeof返回的类型:number、string、boolean、undefined、function、object共6种。后ES6新又增 symbol
注意：
- 其中 Array 与 null 返回的都是 object
- function(){} 与 class{}(类的本质是函数，是构造函数的另一种写法) 返回的都是 function
- `typeof NaN // 'number'`
:::
```js
// 判断数组类型的方式
[] instanceof Array // true
Array.isArray([]) // true
[].constructor.name // 'Array'
```


## 原型链继承问题
```js
function F(){};
Object.prototype.a = function(){console.log('a')};
Function.prototype.b = function(){console.log('b')};
var f = new F();
//f.a()?
//f.b()?

// F instanceof Function ---> true
// f instanceof Function ---> false
// f instanceof Object ---> true

/*
f.__proto__ === [f 构造函数的].prototype === F.prototype
F.prototype.__proto__ === [F.prototype 构造函数的].prototype === Object.prototype ---> 所以 a 可以通过 f.a()访问
f.constructor === F
F.__proto__ === [F 构造函数的].prototype === Function.prototype ---> 所以 b 能通过f.constructor.b()访问
Function.prototype.__proto__ === [Function.prototype 构造函数的].prototype === Object.prototype ---> 所以 a 可以通过 f.constructor.a()访问

综上：f 能取到 a 取不到 b; F 能取到 a,b
*/
```


## 连等 var a=b=1 声明问题
> 语句 var a=b=1 是语句 b = 1 和 var a = b 的简写， b 成为一个全局变量（**没有var前缀**）
```js{3-5}
function fn(){
   var a= b = 1;
 //等于var a = b ,b = 1
 //不加var b就是全局变量了(window.b=1)，可以直接访问
 //var a是局部变量，在fn里面，外面访问不到
} 
fn();   
console.log(b);//windows全局作用域下找到window.b=1
console.log(a);//a在fn里面的作用域，外面访问不了，报错
```


## `this` 指向问题?
> - 对于箭头函数：this指向取决于该箭头函数**同级作用域**的this指向，又由于**对象不能形成自己的作用域**，因此其作用域为全局作用域，箭头函数的this初始绑定Window对象
> - 对于普通函数：this绑定了它的调用者
```js
var o = {
    sayHi:()=>{
      console.log(this);// window
    }
}
o.sayHi();
var o2 = {
    sayHi:function(){
      console.log(this);// {sayHi:f}
    }
}
o2.sayHi();
```

## 动态加载`javascript`脚本
- [参考](https://juejin.cn/post/6844903567929638920)
```javascript
// 获取 Dom
var HEAD = document.getElementsByTagName('head')[0] || document.documentElement
var src = 'http://xxxxxx.com'
var script = document.createElement('script')
script.setAttribute('type','text/javascript')

// chrome成功回调
script.onload = function() {
  console.log('加载成功!')
}
// 失败回调
script.onerror = function() {
  console.log('加载失败!')
}

// IE 的写法
// script.onreadystatechange = function() {
//     if(this.readyState === 'loaded' || this.readyState === 'complete') {
//         console.log('加载成功！')
//     }
// }

// 插入文档
script.setAttribute('src', src)
HEAD.appendChild(script)
```

## call()方法的使用？

```javascript
/* call用来绑定this的指向 */
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  //当构造器未使用 new 时,可以当普通函数看待,下面的效果其实是 this.Product(name, price)
  //绑定了Product()内部 this 的指向 Food ---> Food.Product(name, price)
  Product.call(this, name, price);
  this.category = 'food';
}

function Toy(name, price) {
  Product.call(this, name, price);
  this.category = 'toy';
}

var cheese = new Food('feta', 5);
var fun = new Toy('robot', 40);
```

## null+1 和 undefined+1 的结果？

```js
null + 1 ----> 1
undefined + 1 ----> NaN	
```

## JS事件绑定的三种方式？

> 1. 使用内联
>
> 2. 使用`.onclick`的方式
>
> 3. 使用事件监听`addEventListener(参数1，参数1，参数3)`
>
>    参数1：事件类型(不需要添加上on)
>
>    参数2：事件函数
>
>    参数3：是否捕获（布尔值，默认false），true-->捕获方式(外层到内层)，false-->冒泡方式(内-->外)

**阻止事件冒泡**：

> 1. event.stopPropagation()：可以阻止事件冒泡，阻止触发父级元素的绑定事件
>
> 2. 事件委托：将元素的绑定事件写起其父元素上，防止事件冒泡
>
>    ​	> a. 可以大量节省内存占用，减少事件注册，比如在ul上代理所有li的click事件。
>
> ​		   > b. 可以实现当新增子对象时无需再次对其绑定（动态绑定事件）
>
> ```javascript
> // 事件委托具体实现
> <ul id="list">
>   <li>item 1</li>
>   <li>item 2</li>
>   <li>item 3</li>
>   ......
>   <li>item n</li>
> </ul>
> 
> var ul = document.getElementById("ul");
>     ul.onclick = function (event) {
>         event = event || window.event;
>         var target = event.target;
>         // 获取目标元素
>         if (target.nodeName == 'LI') {
>             alert(target.innerHTML);
>         }
>     }
>     // 为按钮绑定点击事件
>     var btn = document.getElementById('btn');
>     btn.onclick = function () {
>         var li = document.createElement('li');
>         // 新增li的内容为ul当前子元素的个数
>         li.textContent = ul.children.length;
>         ul.appendChild(li);
>     }
> ```

**事件绑定**：

```html
/* 1. 内联 */
<input type="button" value="按钮" onclick="alert(1);">

<input type="button" value="按钮">
<script type="text/javascript">
	var bt = document.getElementsBytagname("input")[0];
    /* 2. onclick */
	bt.onclick = function(){
		alert(2)
	}
    /* 3. addEventListener */
    bt.addEventListener('click', function(event){
        event.stopPropagation();//阻止冒泡
        alert(3)
    }, )
</script>

```

## JavaScript 中的变量声明提升？

> Var声明的变量声明提升、函数声明提升、let和const变量不提升[[参考](https://es6.ruanyifeng.com/#docs/let)]

```
> 变量提升是指JS的变量和函数声明会在代码编译期，提升到代码的最前面。 
> 变量提升成立的前提是使用 Var 关键字进行声明的变量，并且变量提升的时候只有声明被提升，赋值并不会被提升，同时函数的声明提升会比变量的提升优先。 
> 变量提升的结果，可以在变量初始化之前访问该变量，返回的是undefined。在函数声明前可以调用该函数。 

加分回答 
> 使用let和const声明的变量是创建提升，形成**暂时性死区**，在初始化之前访问let和const创建的变量会报错。
```

## for in 和 for of 的区别？

```js
> `for in`遍历的是数组的索引（即键名），而`for of`遍历的是数组元素值

> `for in`总是得到对象的`key`或数组、字符串的下标
            var arr = [1,2,3]
            for (let index in arr) {
              let res = index + 1
              console.log(res)
            }
            //01 11 21
> `for of`总是得到对象的`value`或数组、字符串的值
			var arr = [1,2,3]
            arr.a = 123
            Array.prototype.a = 123

            for (let value of arr) {
              console.log(value)
            }
            //1 2 3
```

[《for in 和 for of 的区别》](https://juejin.cn/post/6916058482231754765)

## Object.create()、new Object() 和 {} 的区别？

> 字面量和`new`关键字创建的对象是`Object`的实例，原型指向`Object.prototype`，继承内置对象`Object`
>
> `Object.create(arg, pro)`创建的对象的原型取决于`arg`，`arg`为`null`，新对象是空对象，没有原型，不继承任何对象；`arg`为指定对象，新对象的原型指向指定对象，继承指定对象。创建一个没有原型的对象：`Object.create(null)`
>
> [参考](https://juejin.cn/post/6844903917835436045)

```js
//{}
var objA = {};
objA.name = 'a';
objA.sayName = function() {
    console.log(`My name is ${this.name} !`);
}

console.log(objA.__proto__ === Object.prototype); // true
console.log(objA instanceof Object); // true

//new Object()
var objB = new Object();
// var objB = Object();
objB.name = 'b';
objB.sayName = function() {
    console.log(`My name is ${this.name} !`);
}

console.log(objB.__proto__ === Object.prototype); // true
console.log(objB instanceof Object); // true

//Object.create()
const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  }
};
const me = Object.create(person); // me.__proto__ === person
me.name = "Matthew"; // name属性被设置在新对象me上，而不是现有对象person上
me.isHuman = true; // 继承的属性可以被重写
me.printIntroduction(); // My name is Matthew. Am I human? true

```