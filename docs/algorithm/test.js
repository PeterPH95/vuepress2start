/**
 * @method deepCopy
 * @param {Object} target
 * @return {Object}
 * @description 深拷贝
 */
function deepCopy(target) {
  // 非对象类型
  if (typeof target !== 'object') {
    return target;
  } else {
    // 对象类型
    let clone = Array.isArray(target) ? [] : {}
    for (let key in target) {
      if (target.hasOwnProperty(key)) {
        clone[key] = deepCopy(target[key]);
      }
    }
    return clone;
  }
}

// let a = [1,2,[3,4],{b:5,c:{d:6}}]
// console.log(deepCopy(a));
// console.log(JSON.parse(JSON.stringify(a)))

/**
 * 
 * @param {*} fn 待执行函数
 * @param {*} delay 延时
 * @returns void
 * @description 防抖
 */
function debounce(fn, delay) {
  let timer;
  return function (){
    let context = this;// 修改事件的指向
    let args = arguments;// 接收参数
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function(){
      fn.apply(context, args)
    }, delay)
  }
}

/**
 * 
 * @param {*} target 传入的This
 * @param  {...any} args1 
 * @returns 
 */
function myBind(target, ...args1) {
  const self = this
  return function(...args2) {
    let result = target.apply(self, args1.concat(args2))
    return result
  }
}