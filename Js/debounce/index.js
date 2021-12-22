/**
 * debounce：不管事件触发频率多高，一定在事件触发n秒后才执行，
 * 如果你在一个事件触发的 n 秒内又触发了这个事件，就以新的事件的时间为准，n秒后才执行，总之，触发完事件 n 秒内不再触发事件，n秒后再执行。
 * @param callback
 * @param wait
 * @param flag 是否立即执行
 * @returns {(function(...[*]=): void)|*}
 */
function debounce(callback, wait, flag) {
  let timer = null;
  return function (){
    if(timer) clearTimeout(timer)
    if (flag && !timer){
      callback.apply(this, arguments);
    }
    timer = setTimeout(() =>{
      callback.apply(this, arguments)
    },wait)
  }
}
