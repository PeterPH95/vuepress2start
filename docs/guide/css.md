---
lang: zh-CN
title: CSS
description: CSS学习
---

# CSS学习笔记


## CSS 元素百分比参照问题
- 参照父元素**宽度**的元素: padding(-top) margin(-top) width text-indent(高度可能被子元素撑开，出现一个无限循环)
- 参照父元素**高度**的元素: height
- 参照父元素属性: font-size line-height

特殊：相对定位的时候，top(bottom) left(right)参照的是父元素的内容区域的高度与宽度，而绝对定位的时候参照的是最近的定位元素包含padding的高度与宽度


## CSS 可继承属性
- 继承是指子节点默认使用父节点的样式属性。(作为样式继承的优先级为0,子元素自定义元素优先)
- 可以继承的属性很少，只有颜色`color`，文字`font`，字体间距行高对齐方式，和列表的样式可以继承。
  - 所有元素可继承：visibility和cursor。
  - 内联元素可继承：letter-spacing、word-spacing、white-space、line-height、color、font、font-family、font-size、font-style、font-variant、font-weight、text-decoration、text-transform、direction。
  - 终端块状元素可继承：text-indent和text-align。
  - 列表元素可继承：list-style、list-style-type、list-style-position、list-style-image。


## 形成 BFC 的方式
- float的值不能为none(浮动元素内部子元素的主要受该浮动元素影响，两个浮动元素之间是互不影响的)
- overflow的值不能为visible
- display的值为table-cell, table-caption, inline-block中的任何一个
- position的值不为relative和static
[图解](assets/BFC.PNG)

## 父子盒子的宽度计算
- 当子盒子不设置width，或者设置width为auto时，子盒子的宽度=父盒子宽度-子盒子左右margin值-子盒子左右padding值
```CSS
/** 计算子盒子的宽度width? (190px)*/
.father {
  width: 200px;
  height: 200px;
  background-color: pink;
}
.son {
  margin:0  -5px;
  padding:0  10px;
  height:100px;
  background-color: red;
}

<div class="father">
  <div class="son"></div>
</div>
```

## 如何用`css`缩短两个`span`的距离
- 两个`span`元素之间有间距的原因：<strong>空格</strong>[参考](https://frontend.devrank.cn/traffic-information/7081724984867063822)
```html
<!-- 解决方式一 设置 font-size -->
<div style="font-size: 0;">
  <span style="font-size: 20px;">hello</span>
  <span style="font-size: 20px;">world</span>
</div>

<!-- 方式二 设置间隔 -->
<span>hello</span>
<span style="margin-left: -5px;">world</span>

<div style="word-spacing: -40px;">
  <span>hello</span>
  <span>world</span>
</div>
```

## 如何给盒子设置两侧阴影
```CSS
/* 单独给两边偏移量赋值 */
div {
  box-shadow: 10px 0 10px -4px rgb(26, 26, 26), -10px 0 10px -4px rgb(26, 26, 26);
}
```

## HTML5
[图解](assets/html5.PNG)

## `div`的位置
[图解](assets/div.jpeg)

## 清除浮动
[图解](assets/clear_float.PNG)