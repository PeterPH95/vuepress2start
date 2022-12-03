---
title: TypeScript
---

# TypeScript [学习笔记](https://www.tslang.cn/docs/handbook/basic-types.html)

## 准备工作

- TypeScript 是 javascript 的超集

``` bash
// 全局安装ts
npm install typescript -g
// typescript compiler(tsc)执行 .ts 文件指令 
tsc hello.ts // 编译生成 hello.js

// 安装可直接执行 .ts 文件的库
npm install @types/node -D
npm install ts-node -g
// 直接运行 .ts 文件
ts-node hello.ts
// 自动编译 -w: watch
tsc -w

// 初始化TypeScript项目并创建一个 tsconfig.json文件
tsc --init
```

## 其它

- [tsconfig.json 文件](https://blog.csdn.net/qq1195566313/article/details/122525099?spm=1001.2014.3001.5501)
-  [命名空间namespace](https://blog.csdn.net/qq1195566313/article/details/122544685?spm=1001.2014.3001.5501)
- [三斜线指令](https://blog.csdn.net/qq1195566313/article/details/122554824?spm=1001.2014.3001.5501)`///<reference path="./index2.ts" />`
- [声明文件declare](https://blog.csdn.net/qq1195566313/article/details/122558474?spm=1001.2014.3001.5501)
- [Mixins混入](https://blog.csdn.net/qq1195566313/article/details/122602896?spm=1001.2014.3001.5501)


## 使用核心
::: warning
1. 定义任何数据的时候请标明类型
2. 调用任何数据时需检查类型
:::

## 类型

### number, string, boolean

```typescript
// 声明关键字 变量名 : 类型 = 值
let isDone: boolean = false
let num: number = 1024
// 模板字符串
let str: string = 'haha'
let sentence: string = `hello, ${str}`
```

### Null 和 Undefined

> 默认情况下`null`和`undefined`是所有类型的子类型。 就是说你可以把 `null`和`undefined`赋值给`number`类型的变量。

### Object

> 除`number`，`string`，`boolean`，`symbol`，`null`或`undefined`之外的类型

```typescript
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error
```

### any

> 所有类型（包括`unknown`）都可以赋值个`any`类型

```typescript
// 处理不确定类型时，可代替所有类型，移除类型检查
let notSure: any = 1024
notSure = 'I can be a string'
notSure = false
// 
let anys;// 未指定类型，默认为any
```

### unknown（顶级类型，TypeScript3.0引入）

> 类似于父类型，与 any 一样，所有类型都可以分配给unknown
>
> - unknow类型不能作为子类型（它不能赋值给其它类型）只能作为父类型（其它类型可以给他赋值） any可以作为父类型和子类型
> - unknow 是不能调用属性和方法

```typescript
// unknow类型不能作为子类型（它不能赋值给其它类型除any）只能作为父类型（其它类型可以给他赋值） any可以作为父类型和子类型
// 与 any 的区别一：unknown类型不能赋值给其他类型
let names:unknown = '123'
let names2:string = names//报错
// any类型是可以的
let names:any = '123'
let names2:string = names  

// 区别二
let obj:unknown = {b:1,ccc:():number=>213}
obj.b// 报错
obj.ccc()// 报错
```

### void

> `void`不能赋值给非`void`类型

```typescript
// 函数没有返回值
function warnUser(): void {
    console.log("This is my warning message")
}
// void 类型的变量，只能为它赋予undefined和null
let unusable: void = undefined
let unusable: void = null
let str: string = 'haha'
str = unusable // 报错
```


### Symbol

- 构造函数只接收 **string** 和 **number**类型的参数
- 返回值是唯一的标识（内存地址不同），每个都互不相同，❗❗❗不支持语法 `new Symbol()`
- symbol类型作对象的键值的时候，无法通过一般的遍历方法

```typescript
// s1 ≠ s2
const s1 = Symbol()
const s2 = Symbol()
```

#### Symbol做键值

```typescript
// 做对象的键值
const symbol1 = Symbol('666')
const symbol2 = Symbol('777')
const obj1= {
   [symbol1]: '小满',
   [symbol2]: '二蛋',
   age: 19,
   sex: '女'
}

// 普通的遍历方法拿不到 symbol 的键值
// 1 for in 遍历
for (const key in obj1) {
   // 注意在console看key,是不是没有遍历到symbol1
   console.log(key)
}
// 2 Object.keys 遍历
Object.keys(obj1)
console.log(Object.keys(obj1))
// 3 getOwnPropertyNames
console.log(Object.getOwnPropertyNames(obj1))
// 4 JSON.stringfy
console.log(JSON.stringify(obj1))

// 可以拿到键值的遍历方法
// 1 拿到具体的symbol 属性,对象中有几个就会拿到几个
Object.getOwnPropertySymbols(obj1)
console.log(Object.getOwnPropertySymbols(obj1))
// 2 es6 的 Reflect 拿到对象的所有属性
Reflect.ownKeys(obj1)
console.log(Reflect.ownKeys(obj1))
```

#### Symbol迭代器

- `Symbol.iterator` 在 类数组：`arguments，NodeList  `或者  `Array，Map，Set` 等都实现了迭代器，for of 是迭代器的语法糖

```typescript
let arr: Array<number> = [1,3,5,7]
const generate = (erg: any) => {
    let it: Iterator<any> = erg[Symbol.iterator]()
    let next: any = { done: false }
    while ( !next.done ){
        next = it.next()
        if ( !next.done ){
            console.log(next.value)
        }
    }  
}
/* 实际被迭代的对象，done作为结束的标识符
{ value: 1, done: false }
{ value: 3, done: false }
{ value: 5, done: false }
{ value: 7, done: false }
{ value: undefined, done: true }*/

generate(arr)// 1 3 5 7
```



### 数组

```typescript
let list: number[] = [1, 2, 3]
let list1: Array<number> = [1, 2, 3]// 使用泛型
let arr: Array<Array<number>> = [[1,2],[3,4]]// 多维数组1
let arr: number[][] = [[1,2],[3,4]]// 多维数组2

// 接口来表示数组
interface NumberArray{
    // 索引的类型为数字时，值类型必须为数字
    [index: number]: number
}
let fibo: NumberArray = [1,2,3]
```

#### arguments类数组

```typescript
function Arr(...args:any): void {
    console.log(arguments)
    //错误的arguments 是类数组不能这样定义
    let arr:number[] = arguments
}
Arr(111, 222, 333)
 
function Arr(...args:any): void {
    console.log(arguments) 
    //ts内置对象IArguments 定义
    let arr:IArguments = arguments
}
Arr(111, 222, 333)
 
//其中 IArguments 是 TypeScript 中定义好了的类型，它实际上就是：
interface IArguments {
    [index: number]: any;
    length: number;
    callee: Function;
}
```

#### any在数组中

```typescript
// any 可以在数组中存放任何类型
let list: any[] = ['test', 1, [],{a:1}]
```

#### 元组

```typescript
// 元组(表示已知元素个数和类型的数组)
let x: [string, number]
x = ['hello', 1024]
x.push(true)// 报错，x 只接受 string或number类型

// excel 多维数据
let excel: [string, string, number][] = [
    ['title', 'name', 1024],
    ['ts', 'js', '1111']// 报错
]
```



### 枚举

- 定义中的每个元素都是一种类型，未编号赋值则为递增类型（从0开始编号）

```typescript
// 默认情况下，从0开始为元素编号。
enum Color {Red, Green, Blue}
let c: Color = Color.Blue
let colorName: string = Color[1]
console.log(colorName)// 'Green'
```

#### 字符串枚举

```typescript
enum Types{
   Red = 'red',
   Green = 'green',
   BLue = 'blue'
}
```

#### 接口枚举

```typescript
enum Types {
    yyds,
    dddd
}
interface A {
	red:Types.yyds
}

let obj:A = {
	red:Types.yyds
}
obj.red // 0
```

#### const 枚举

- let var 均不能声明枚举
- const 声明的枚举，编译结果为常量；普通枚举编译成对象

```typescript
const enum Types{
   No,
   Yes
}
let code: number = 0
if( code === Types.No ){}

// 加 const 编译结果 常量
var code = 0;
if (code === 0 /* Types.No */) {
}

// 普通枚举的编译结果为 对象
var Types;
(function (Types) {
    Types[Types["No"] = 0] = "No";
    Types[Types["Yes"] = 1] = "Yes";
})(Types || (Types = {}));
var code = 0;
if (code === Types.No) {
}
```

#### 反向映射

- 正向映射： key ---> value；反向映射：value ---> key
- 注意❗：不会为**字符串**枚举成员生成反向映射

```typescript
enum Enum {
   fall
}
let a = Enum.fall;
console.log(a); // 0
let nameOfA = Enum[a]; // a类似于索引，返回 key 的 string 类型
console.log(nameOfA); // fall
```


### type 关键字声明类型
- 在项目问题中自定义类型
```ts
type Mode = {
  development: object,
  test: object,
  prod: object
}
// 将上述的'development','test','prod'转为key类型
let env: keyof Mode
```


### never

> `never`类型是那些总是会**抛出异常**或**根本就不会有返回值**的函数表达式或箭头函数表达式的返回值类型
>
> `never`类型是任何类型的子类型，也可以赋值给任何类型；
>
> 然而，没有类型是`never`的子类型或可以赋值给`never`类型（除了`never`本身之外）。 即使 `any`也不可以赋值给`never`。

```typescript
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}

// 其它确定的类型不能赋值给 never
let str: string = "hahah"
let nv: never = str// 报错
```

### interface（接口）

> 约束数据的类型

```typescript
interface Person {
	readonly name: stirng,// readonly关键字表示只读属性
    age?: number,// ? 关键字表示可有可无的属性
    fn(): void, // 定义函数类型，必须无返回值
    [propName: string]: any // 接收未知的属性，属性的类型任意
}

const person: Person = {
    name: 'Peter',
    fn: () => {
        console.log(1024)
    },
    lalala: 'hhhh'// 未知属性
}
person.name = 'Jerry'//报错，name为只读属性
```

### class

- 引入了关键字 `public`, `protected`,  `private`,  `static` 同 **Java** 中的定义，默认为`public`
- `protected`修饰的变量只能通过子类访问，实例无法访问
- 与**接口**和**抽象类**联动

```typescript
interface PersonClass {
    get(type: boolean): boolean
}
 
interface PersonClass2{
    set():void,
    asd:string
}

abstract class A {
    name: string
    constructor() {
        this.name = "123"
    }
    abstract getName(): string // 抽象方法
}


class Person extends A implements PersonClass,PersonClass2 {
    asd: string
    constructor() {
        super()
        this.asd = '123'
    }
    get(type:boolean) {
        return type
    }
    set () {}
    // 必须实现抽象方法
    getName(): string {
        return this.name
    }
}
```

## 泛型

```typescript
// 1. 单类泛型
function add<T>(a: T, b: T): Array<T> {
    return [a, b]
}
add<number>(1,3)
// 可简写，TS会类型断言 
add(1,3)
add<string>('1','2')

// 2. 多类泛型
function exam<T, U>(a: T, b: U): Array<T | U> {
    return [a, b]
}
exam<boolean, number>(false, 12)
```

### 接口对泛型约束

```typescript
// 限制传入的参数必须有 length 属性
interface Len {
    length: number
}
function getLength<T extends Len>(arg: T): number{
    return arg.length
}
getLength("123465")
```

### keyof 约束对象

```typescript
// 限制传入的 key 值
function prop<T, K extends keyof T>(obj: T, key: K){	}
let o = {a:1, b:2, c:3}

prop(o, 'a')
prop(o, 'd')// 报错 K 的类型为联合类型 "a" | "b" | "c"
```

### 泛型类

```typescript
// 实例化时传入类型
class Sub<T>{
    //attr: T[] = []
    attr: Array<T> = []
    add(a: T): T[] {
        return [a]
    }
}

let s = new Sub<number>()
s.attr = [1,2,3]
s.add(123)
 
let str = new Sub<string>()
str.attr = ['1','2','3']
str.add('123')
```



## 联合类型

```typescript
// 常见的手机号13xxxxxxxxx是数字类型，也有座机010-56459897等字符串类型
let phone: number | string = '010-56563232'
// 函数
const fn = (type: number | boolean): boolean {// 数据库不能返回布尔类型，需自行转换类型
    return !!type
}
```

### 类型别名

```typescript
// 1. 类型推论
let str = "ppp" // 自动推论 str 为字符串
str = 123 // 报错

// 2. 类型别名
type str = string // str 代替 string
let s: str = 'ppp'

// 3. 函数别名
type fn = () => string
let f: fn = () => "lala"

// 4. 联合类型别名
type ss = string | number |boolean
let mm: ss = 123
let gg: ss = false

// 5. 字面量别名
type val = "off" | "on" | boolean
let v: val = true
```



## 交叉类型

```typescript
interface People {
  age: number,
  height： number
}
interface Man{
  sex: string
}
const xiaoman = (man: People & Man) => { // 类型与 extends 关键字，需要同时满足两个接口
  console.log(man.age)
  console.log(man.height)
  console.log(man.sex)
}
xiaoman({age: 18,height: 180,sex: 'male'});
```

## 类型断言

> 你比编译器更清楚数据的类型，自己可手动写上数据的类型

```typescript
/* 写法 */
let someValue: any = "this is a string";
// 写法一
let strLength: number = (<string>someValue).length;
// 写法二 在 JSX 中仅支持 as 方式
let strLength: number = (someValue as string).length;

/* 实际用法 */ 
interface A {
    run: string
}
interface B {
    build: string
}
const fn = (type: A | B): string => {
    //return type.run// 报错，我们知道传入的肯定为 A 类型，则使用类型断言
    return (type as A).run// 断言传入的类型为 A
    return (<A>type).run// 写法二
}
```

### 在window上挂属性

```typescript
/* ts中在window上挂属性 */
window.aaa = 111// 报错
(window as any).aaa = 111// 可以使用 any 临时断言，在 any 类型的变量上，访问任何属性都是允许的
```

### as const

- 对字面值的**断言**，与`const`直接定义常量是有区别的
- 如果是普通类型跟直接`const `声明是一样的

```typescript
/* 普通类型 */ 
const names = '小满'
names = 'aa' //无法修改
let names2 = '小满' as const
names2 = 'aa' //无法修改

/* 字面值 */
// 数组
let a1 = [10, 20] as const;
const a2 = [10, 20];
a1.unshift(30); // 错误，此时已经断言字面量为[10, 20],数据无法做任何修改
a2.unshift(30); // 通过，没有修改指针
```

#### 字面量和常量区分

- 字面量：是指由字母，数字等构成的字符串或者数值，它只能作为**右值**出现，所谓右值是指等号右边的值
- 常量：常量和变量都属于变量，只不过常量是赋过值后不能再改变的变量，而普通的变量可以再进行赋值操作

```typescript
let a: number;//a 变量
const b: string = 'haha'// b为常量，'haha'为字面量
```



<hr/>



## 函数

### 普通定义

```typescript
const fn = (name: string, age?:number): string => {}// 可选参数
const fn = (name: string = "我是默认值"): string => {}// 默认值
// 接口定义函数参数和返回值的类型
interface Add {
    (num:  number, num2: number): number
}
const fn: Add = (num: number, num2: number): number => {
    return num + num2
}
// 定义剩余参数
const fn = (array:number[], ...items:any[]):any[] => {
       console.log(array,items)
       return items
}
let a:number[] = [1,2,3]
fn(a,'4','5','6') // [ 1, 2, 3 ] [ '4', '5', '6' ]
```

### 重载

```typescript
/* 重载是方法名字相同，而参数不同，返回类型可以相同也可以不同。
	1. 如果参数类型不同，则参数类型应设置为 any。
	2. 参数数量不同你可以将不同的参数设置为可选。*/

function fn(params: number): void// 规则1
function fn(params: string, params2: number): void// 规则2
function fn(params: any, params2?: any): void {// 需包含上面所有规则，实际执行的逻辑
    console.log(params)
    console.log(params2)
}

fn(123)// 123 undefined
fn('123',456)// 123 456
```



<hr/>



## 内置对象

### ECMAScript 的内置对象

- **`Boolean`、`Number`、`string`、`RegExp`、`Date`、`Error`**

```typescript
let b: Boolean = new Boolean(1)
console.log(b)
let n: Number = new Number(true)
console.log(n)
let s: String = new String('哔哩哔哩关注小满zs')
console.log(s)
let d: Date = new Date()
console.log(d)
let r: RegExp = /^1/
console.log(r)
let e: Error = new Error("error!")
console.log(e)
```

### [DOM 和 BOM 的内置对象](https://github.com/microsoft/TypeScript/blob/main/src/lib/es2015.promise.d.ts)

- `Document`、`HTMLElement`、`Event`、`NodeList`等

```typescript
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
//读取div 这种需要类型断言 或者加个判断应为读不到返回null
let div: HTMLDivElement = document.querySelector("div")// 报错，因为右边结果可能为null
let div: HTMLElement = document.querySelector('div') as HTMLDivElement// 方式一
let div: HTMLDivElement | null= document.querySelector("div")// 方式二

// 事件
document.addEventListener('click', function (e: MouseEvent) {});

//dom元素的映射表
interface HTMLElementTagNameMap {
    "a": HTMLAnchorElement;
    "abbr": HTMLElement;
    "address": HTMLElement;
    "applet": HTMLAppletElement;
    "area": HTMLAreaElement;
    "article": HTMLElement;
    "aside": HTMLElement;
    "audio": HTMLAudioElement;
    "b": HTMLElement;
    "base": HTMLBaseElement;
    "bdi": HTMLElement;
    "bdo": HTMLElement;
    "blockquote": HTMLQuoteElement;
    "body": HTMLBodyElement;
    "br": HTMLBRElement;
    "button": HTMLButtonElement;
    "canvas": HTMLCanvasElement;
    "caption": HTMLTableCaptionElement;
    "cite": HTMLElement;
    "code": HTMLElement;
    "col": HTMLTableColElement;
    "colgroup": HTMLTableColElement;
    "data": HTMLDataElement;
    "datalist": HTMLDataListElement;
    "dd": HTMLElement;
    "del": HTMLModElement;
    "details": HTMLDetailsElement;
    "dfn": HTMLElement;
    "dialog": HTMLDialogElement;
    "dir": HTMLDirectoryElement;
    "div": HTMLDivElement;
    "dl": HTMLDListElement;
    "dt": HTMLElement;
    "em": HTMLElement;
    "embed": HTMLEmbedElement;
    "fieldset": HTMLFieldSetElement;
    "figcaption": HTMLElement;
    "figure": HTMLElement;
    "font": HTMLFontElement;
    "footer": HTMLElement;
    "form": HTMLFormElement;
    "frame": HTMLFrameElement;
    "frameset": HTMLFrameSetElement;
    "h1": HTMLHeadingElement;
    "h2": HTMLHeadingElement;
    "h3": HTMLHeadingElement;
    "h4": HTMLHeadingElement;
    "h5": HTMLHeadingElement;
    "h6": HTMLHeadingElement;
    "head": HTMLHeadElement;
    "header": HTMLElement;
    "hgroup": HTMLElement;
    "hr": HTMLHRElement;
    "html": HTMLHtmlElement;
    "i": HTMLElement;
    "iframe": HTMLIFrameElement;
    "img": HTMLImageElement;
    "input": HTMLInputElement;
    "ins": HTMLModElement;
    "kbd": HTMLElement;
    "label": HTMLLabelElement;
    "legend": HTMLLegendElement;
    "li": HTMLLIElement;
    "link": HTMLLinkElement;
    "main": HTMLElement;
    "map": HTMLMapElement;
    "mark": HTMLElement;
    "marquee": HTMLMarqueeElement;
    "menu": HTMLMenuElement;
    "meta": HTMLMetaElement;
    "meter": HTMLMeterElement;
    "nav": HTMLElement;
    "noscript": HTMLElement;
    "object": HTMLObjectElement;
    "ol": HTMLOListElement;
    "optgroup": HTMLOptGroupElement;
    "option": HTMLOptionElement;
    "output": HTMLOutputElement;
    "p": HTMLParagraphElement;
    "param": HTMLParamElement;
    "picture": HTMLPictureElement;
    "pre": HTMLPreElement;
    "progress": HTMLProgressElement;
    "q": HTMLQuoteElement;
    "rp": HTMLElement;
    "rt": HTMLElement;
    "ruby": HTMLElement;
    "s": HTMLElement;
    "samp": HTMLElement;
    "script": HTMLScriptElement;
    "section": HTMLElement;
    "select": HTMLSelectElement;
    "slot": HTMLSlotElement;
    "small": HTMLElement;
    "source": HTMLSourceElement;
    "span": HTMLSpanElement;
    "strong": HTMLElement;
    "style": HTMLStyleElement;
    "sub": HTMLElement;
    "summary": HTMLElement;
    "sup": HTMLElement;
    "table": HTMLTableElement;
    "tbody": HTMLTableSectionElement;
    "td": HTMLTableDataCellElement;
    "template": HTMLTemplateElement;
    "textarea": HTMLTextAreaElement;
    "tfoot": HTMLTableSectionElement;
    "th": HTMLTableHeaderCellElement;
    "thead": HTMLTableSectionElement;
    "time": HTMLTimeElement;
    "title": HTMLTitleElement;
    "tr": HTMLTableRowElement;
    "track": HTMLTrackElement;
    "u": HTMLElement;
    "ul": HTMLUListElement;
    "var": HTMLElement;
    "video": HTMLVideoElement;
    "wbr": HTMLElement;
}
```

### Promise

- 如果我们不指定返回的类型 `TS` 是推断不出来返回的是什么类型

```typescript
 // 报错无法推断返回值的类型
// function promise():Promise{
function promise():Promise<number>{
    return new Promise((resolve,reject)=>{
        resolve(1)
    })
}
promise().then(res=>{
    console.log(res)
})
```

## 装饰器Decorator

- 装饰器使用类似注解的方式，获取类原型，并且给类增加属性或者方法，正如其名**"装饰器"**
- 装饰器是一种特殊类型的声明，它能够被附加到[类声明](https://www.tslang.cn/docs/handbook/decorators.html#class-decorators)，[方法](https://www.tslang.cn/docs/handbook/decorators.html#method-decorators)， [访问符](https://www.tslang.cn/docs/handbook/decorators.html#accessor-decorators)，[属性](https://www.tslang.cn/docs/handbook/decorators.html#property-decorators)或[参数](https://www.tslang.cn/docs/handbook/decorators.html#parameter-decorators)上。
  

## `ts`项目遇到的问题

### `string`不能作为对象的`key`
- [参考](https://blog.csdn.net/m0_47670683/article/details/124025972)
```ts
const env = import.meta.env.MODE || 'prod'
const EnvConfig: Mode = {
  development: {
    baseApi: '/api',
    mockApi: ''
  },
  test: {
    baseApi: '/api',
    mockApi: ''
  },
  prod: {
    baseApi: '/api',
    mockApi: ''
  },
}

export default {
    // 报错 `string`不能作为对象的`key`
  ...EnvConfig[env]
}

// 解决方式
// 1.定义新类型 Mode
type Mode = {
  development: object,
  test: object,
  prod: object
}
// 2.修改 env 的类型
const env: keyof Mode = (import.meta.env.MODE as keyof Mode) || 'prod'
```
