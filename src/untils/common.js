

// 防抖
export function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this;
    var args = arguments;
    /*  
      arguments 每个函数里面都有一个Arguments对象，它引用着函数的实参，
      可以用数组下标的方式"[]"引用arguments的元素
      模拟重载函数 它是一个对象  与函数中的形参一一映射（相当于等于形参）
     */
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}





