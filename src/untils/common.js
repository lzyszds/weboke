function debounce(fn, delay) {
  var timer = 0;
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

function splitArray(array, size) {
  let data = [];
  for (let i = 0; i < array.length; i += size) {
    data.push(array.slice(i, i + size))
  }
  return data
}
export default {
  debounce,// 防抖
  splitArray,//把一个数组拆分成几个数组
}



