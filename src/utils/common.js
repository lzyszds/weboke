import dayjs from "dayjs";
import { getCurrentInstance } from 'vue';
import http from '@/http/http'

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
function timeAgo(time) {
  let date = dayjs(time).unix();
  const t = dayjs().unix() - date // Y-m-d H:i:s
  let i = 60
  let h = i * 60
  let d = h * 24
  let m = d * 30
  let y = m * 12
  const mp = new Map([
    [n => n < i, n => (n >> 0) + '秒'],
    [n => n < h, n => (n / i >> 0) + '分钟'],
    [n => n < d, n => (n / h >> 0) + '小时'],
    [n => n < m, n => (n / d >> 0) + '天'],
    [n => n < y, n => (n / m >> 0) + '月'],
    [n => true, n => (n / y >> 0) + '年'],
  ])
  return ([...mp].find(([n]) => n(t)).pop())(t) + '前'
}


//获取当前ip以及天气
function getIpWeather() {
  const { proxy } = getCurrentInstance()
  const { cid, cip, cname } = proxy.$getip || ''
  //{cip: '116.10.168.123', cid: '450000', cname: '广西壮族自治区'}

  const key = '78182b9b39355dc0ae4ce91dae7f0bbf	'
  return new Promise((resolve, reject) => {
    http('get', `/mapApi/weather/weatherInfo?key=${key}&city=${cid}`)
      .then(res => {
        resolve({ data: res, cid, cip, cname })
      })
  })
  // return { data, cid }
}
function base64toBlob(dataurl) {
  // base64 转 二进制流(blob)
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime,
  });
}

export default {
  debounce,// 防抖
  splitArray,//把一个数组拆分成几个数组
  timeAgo,//时间转换
  getIpWeather,//获取当前ip以及天气
  base64toBlob,//base64转二进制流
}



