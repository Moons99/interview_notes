/**
 * 思路
 * 根据call的规则设置上下文对象,也就是this的指向。
 * 通过设置context的属性,将函数的this指向隐式绑定到context上
 * 通过隐式绑定执行函数并传递参数。
 * 删除临时属性，返回函数执行结果
 * @param context
 * @param args
 * @returns {*}
 */
Function.prototype.myCall = function (context, ...args) {
  // context = context || window //这个不能判断原生值 给'' 0 false就会绑定到Windows上去
  if (context === null || context === undefined) {
    // 指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中为window)
    context = window
  } else {
    context = Object(context) // 值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的实例对象
  }

  const fn = Symbol()  //用于临时储存函数 Symbol是唯一的，防止重名key
  context[fn] = this  // 函数的this指向隐式绑定到context上
  const result = context[fn](...args)  // 通过隐式绑定执行函数并传递参数
  delete context[fn]  // 删除上下文对象的属性
  return  result // 返回函数执行结果
}

/**
 * 思路：
 * 传递给函数的参数处理，不太一样，其他部分跟call一样。
 * @param context
 * @param args
 * @returns {*}
 */
Function.prototype.myApply = function (context, args){
  if (context === null || context === undefined) {
    // 指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中为window)
    context = window
  } else {
    context = Object(context) // 值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的实例对象
  }
  args = args ? args : []
  const fn = Symbol()
  context[fn] = this
  let result = context[fn](...args)
  delete context[fn]
  return result
}

//第二个参数为类数组对象, 这里用了JavaScript权威指南中判断是否为类数组对象的方法。
//了解即可
Function.prototype.myApply_complete = function (context, args){
  if (context === null || context === undefined) {
    // 指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中为window)
    context = window
  } else {
    context = Object(context) // 值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的实例对象
  }
  //JavaScript权威指南判断是否为类数组对象
  function isArrayLike(o) {
    if (o &&                                  // o不是null、undefined等
      typeof o === 'object' &&                // o是对象
      isFinite(o.length) &&                   // o.length是有限数值
      o.length >= 0 &&                        // o.length为非负值
      o.length === Math.floor(o.length) &&    // o.length是整数
      o.length < 4294967296)                  // o.length < 2^32
      return true
    else
      return false
  }

  const fn = Symbol()
  context[fn] = this
  let result;
  if (args) {
    // 是否传递第二个参数
    if (!Array.isArray(args) && !isArrayLike(args)) {
      throw new TypeError('myApply 第二个参数不为数组并且不为类数组对象抛出错误');
    } else {
      args = Array.from(args) // 转为数组
      result = context[fn](...args); // 执行函数并展开数组，传递函数参数
    }
  } else {
    result = context[fn](); // 执行函数
  }
  delete context[fn]
  return result
}

/**
 * 1.拷贝源函数:
 *    通过变量储存源函数
 *    使用Object.create复制源函数的prototype给fToBind
 * 2.返回拷贝的函数
 * 3.调用拷贝的函数：
 *    new调用判断：通过instanceof判断函数是否通过new调用，来决定绑定的context
 *    绑定this+传递参数
 *    返回源函数的执行结果
 * @param context
 * @param args
 * @returns {(function(...[*]): (*))|*}
 */
Function.prototype.myBind = function (context, ...args) {
  const thisFn = this // 存储源函数以及上方的args(函数参数)
  // 对返回的函数 newArgs 二次传参
  const fToBind = function (...newArgs) {
    //  确定target 上下文
    const isNew = this instanceof fToBind // this是否是fToBind的实例 也就是返回的fToBind是否通过new调用
    const target = isNew ? this : Object(context) // new调用就绑定到this上,否则就绑定到传入的target上
    //  绑定this的指向并传递参数,返回执行结果
    return thisFn.call(target, ...args, ...newArgs)
  }
  //  复制源函数的prototype给fToBind 一些情况下函数没有prototype，比如箭头函数
  if (thisFn.prototype) {
    fToBind.prototype = Object.create(thisFn.prototype)
  }
  return fToBind // 返回拷贝的函数
}


//examples
const testobj = {
  name: 'xxxx',
  testFn(age) {
    console.log(this)
    console.log(`${this}${age}岁了`)
  }
}
const testobj2 = {
  name: '张三'
}

// testobj.testFn.bind()()
testobj.testFn.myBind(1)()
