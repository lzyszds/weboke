import dayjs from "dayjs";

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

//获取用户本地ip的方法
function getUserIP(onNewIP) { // 获取ip地址
  let MyPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection
  let pc = new MyPeerConnection({ iceServers: [] })
  let noop = function () { }
  let localIPs = {}
  let ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g
  function iterateIP(ip) {
    if (!localIPs[ip]) onNewIP(ip)
    localIPs[ip] = true
  }
  pc.createDataChannel('')
  pc.createOffer().then(function (sdp) {
    sdp.sdp.split('\n').forEach(function (line) {
      if (line.indexOf('candidate') < 0) return
      line.match(ipRegex).forEach(iterateIP)
    })
    pc.setLocalDescription(sdp, noop, noop)
  }).catch(function (reason) {
    // An error occurred, so handle the failure to connect
  })
  // seen for candidate events
  pc.onicecandidate = function (ice) {
    if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return
    ice.candidate.candidate.match(ipRegex).forEach(iterateIP)
  }
}

export default {
  debounce,// 防抖
  splitArray,//把一个数组拆分成几个数组
  timeAgo,//时间转换
  getUserIP,//获取ip
}



