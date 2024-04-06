import request from '@/http/request'
import { ElNotification } from 'element-plus'
import dayjs from "dayjs";
import { useDateFormat } from '@vueuse/core'
import handleWeatherUrl from '@/assets/icon/weather/import'
import { useStore } from '@/store/index';
import { ipGetType, WeatherData } from '@/store/type'

// 此函数获取一个数组并将其拆分为更小的块
export const splitArray = (array: any, size) => {
  // 创建一个空数组以容纳较小的块
  let data: any[] = [];
  // 在原始阵列上循环
  for (let i = 0; i < array.length; i += size) {
    // 对于每个迭代，向新数组添加一个新块
    data.push(array.slice(i, i + size))
  }
  // return 一个新数组
  return data
}

//时间格式化为字符串 比如说前天 几天前，几小时前
export const timeAgo = (time) => {
  const t = dayjs().unix() - time // Y-m-d H:i:s
  let i = 60
  let h = i * 60
  let d = h * 24
  let m = d * 30
  let y = m * 12
  const mp: any = new Map([
    //n是时间戳（key），t是当前时间戳 ,>>0 是向下取整
    [n => n < i, () => '一分钟'],
    [n => n < h, n => (n / i >> 0) + '分钟'],
    [n => n < d, n => (n / h >> 0) + '小时'],
    [n => n < m, n => (n / d >> 0) + '天'],
    [n => n < y, n => (n / m >> 0) + '月'],
    [() => true, n => (n / y >> 0) + '年'],
  ])
  return ([...mp].find(([n]) => n(t)).pop())(t) + '前'
}

//将数据存进localStorage和pinia里
export function setLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value))
  const state = useStore();
  state.setWeather(value)
}


//获取当前ip以及天气
export const getIpWeather = (): Promise<WeatherData> => {

  return new Promise((resolve, reject) => {
    try {
      request({
        method: 'GET',
        url: '/api/common/ipConfig',
      }).then((res: WeatherData) => {
        //将个人信息存入localStorage，避免每次刷新都要请求接口
        setLocalStorage('weatherData', res)
        resolve(res)
      }).catch((err) => {
        setLocalStorage('weatherData', err)
        reject(err)
      })
    } catch (e) {
      allFunction.LNotification("网络连接出现故障 请稍后尝试")
    }
  })

}
/*
    避免当前使用的ip为国外ip 导致的获取不到ip
    sougou的查询ip方法不支持国外ip
  */
// if (!cid) {
//   console.warn('当前网络环境不支持获取天气信息(把梯子关了才行)')
//   return `/src/assets/icon/weather/undefind.svg`
// }

//尝试方法  mutationObserver 监听dom变化
const testFunction = () => {
  const observer = new MutationObserver((mutationsList: MutationRecord[], observer: MutationObserver) => {
    console.log(mutationsList)
    console.log(observer)
  })
  const test = document.createTextNode('test')
  observer.observe(test, { characterData: true })
  test.textContent = 'test2'
}

export const getWeather = (): String => {
  const state = useStore();
  const data: WeatherData = state.weatherData

  const formatted: any = useDateFormat(data.reporttime, 'HH');
  const isdark = formatted >= 19 || formatted <= 6;
  let result = handleWeatherUrl({ ...data }, isdark)
  return result;
}


export function base64toBlob(dataurl) {
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
// 二进制流转换为base64 格式。
export function getBase64(data, type) {
  return new Promise((resolve, reject) => {
    const blob = new Blob([data], { type: type }); // 必须指定type类型
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}



//上传图片，图片太大，如何在前端实现图片压缩后上传
export function compressPic(file, quality) {
  return new Promise((resolve, reject) => {
    getBase64(file, file.type).then((res) => {
      // 这里quality的范围是（0-1）
      const canvas = document.createElement("canvas") as HTMLCanvasElement;
      const ctx: any = canvas.getContext("2d");
      const img: any = new Image();
      img.src = res;
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // 转换成base64格式 quality为图片压缩质量 0-1之间  值越小压缩的越大 图片质量越差
        const base64 = canvas.toDataURL(file.type, quality);
        const fileCompress = base64toBlob(base64);
        resolve({ base64, fileCompress })
        reject('压缩失败')
      }
    })
  })
}

//提示弹窗
export const LNotification = (val: string, time: number = 2000, postion: any = 'bottom-right') => {
  ElNotification.closeAll()
  ElNotification({
    dangerouslyUseHTMLString: true,
    message: val,
    position: postion,
    duration: time,
    customClass: 'copy-success',
  })
}

// 复制内容提示版权信息
import { useEventListener } from "@vueuse/core";
import { log } from 'console';

export const copyTip = () => {
  useEventListener(window, 'keydown', e => {
    if (e.ctrlKey && e.key === 'c') {
      LNotification(`<i class="fa fa-copy"></i> 复制成功,转载请声明来源！`)
    }
  })
}

//获取cookie
export const getCookie = (name: string) => {
  let cookie = document.cookie.split('; ').map((item) => {
    return item.split('=')
  })
  cookie = Object.fromEntries(cookie)
  return cookie[name]
}

//设置cookie
export const setCookie = (name: string, value: string, time: number) => {
  let date = dayjs()
  date = date.add(time, 'day')
  document.cookie = `${name}=${value};expires=${date}`
}

/* 数组去重 arr: 要处理数组, key: 去重的key值 单一数组不需要key */
export const unique = (arr: any[], key?: string) => {
  const res = new Map();
  return arr.filter((a) => {
    const arrKey = key ? a[key] : a
    // has判断当前值是否在map对象中存在 ,如果不存在则将当前值添加进map对象中
    return !res.has(arrKey) && res.set(arrKey, 1)
  })
}

/* 页面滚动到指定位置XY轴 */
export const scrollTo = (x: number, y: number) => {
  window.scrollTo({ left: x, top: y, behavior: 'smooth' })
}

/* 同步延时函数 */
export const awaitTime = (fn: Function, time: number | string = 1000) => {
  const tense = typeof time === 'string' ? parseInt(time) : time
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fn()
      resolve("成功")
    }, tense)
  })
}

// 数字跳动
export const numberJump = (num: any, sum: any) => {
  /* 
    const data = ref<any[]>([
      {
        name: "新增用户",
        icon: "typcn:user-add",
        value: 0,
        click: () => {},
      },
    ]);
  */
  let timer: any = [];
  for (const key in num) {
    num[key].value = 0;
    timer[key] = setInterval(() => {
      //去除小数点
      num[key].value += Math.ceil(sum[key] / 10);

      if (num[key].value >= sum[key]) {
        num[key].value = sum[key];
        clearInterval(timer[key]);
      }
    }, 60);
  }
}


export const allFunction = {
  splitArray,//把一个数组拆分成几个数组
  timeAgo,//时间转换
  getIpWeather,//获取当前ip以及天气
  getWeather, //获取当前天气图标
  base64toBlob,//base64转二进制流
  getBase64,//二进制流转换为base64 格式。
  compressPic,//上传图片，图片太大，如何在前端实现图片压缩后上传
  copyTip,//复制内容提示版权信息
  LNotification,//提示弹窗
  getCookie,//获取cookie
  setCookie,//设置cookie
  unique,//数组对象去重（区别单数组以及数组中嵌套一层对象）
  scrollTo,//页面滚动到指定位置XY轴
  awaitTime,//延迟函数
  numberJump,//数字跳动
}
