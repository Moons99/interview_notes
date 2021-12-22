/**
 * throttle:不管事件触发频率多高，只在单位时间内执行一次。
 * @param callback
 * @param wait
 * @returns {(function(*): void)|*}
 *
 * 首节流（时间戳版），第一次会马上执行，之后的操作不一定会执行。
 * 尾节流(定时器版)，第一次不会马上执行，而是一段时间后在执行。
 * 兼顾型节流，第一次会马上执行，最后一次也会执行。也相当于节流和防抖的结合版
 */
//时间戳版
function throttle_timestamp(callback, wait=300) {
  let start = 0;
  return function (){
    let current = Date.now()
    if (current - start > wait){
      callback.apply(this,arguments)
      start = current
    }
  }
}
//定时器实现
function throttle_timer(callback, wait=300) {
  let timer = null;
  return function (){
    if (!timer){
      timer = setTimeout(() =>{
        callback.apply(this,arguments)
        timer = null
      },wait)
    }else {
      console.log('上一个事件未完成')
    }
  }
}

//结合版
function throttle(event, time) {
  let pre = 0;
  let timer = null;
  return function () {
    if (Date.now() - pre > time) {
      clearTimeout(timer);
      timer = null;
      pre = Date.now();
      event.apply(this, arguments);
    } else if (!timer) {
      timer = setTimeout(() => {
        event.apply(this, arguments);
      }, time);
    }
  }
}

