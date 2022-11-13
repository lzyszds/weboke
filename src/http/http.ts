// 一、配置axios
import axios from 'axios'
import { ElMessageBox } from 'element-plus'
import { ref } from 'vue';
// import store from '@/store/index' 如果使用vuex，那么token，userinfo都可以在登录以后存储到store中，不需要使用storage
// 获取浏览器的接口地址。
const now = ref(3)
// document.cookie = 'admin=' + localStorage.getItem('lzy_token') as string
const instance = axios.create({
  baseURL: window.location.origin,
  // timeout: 5000,
  withCredentials: true,//表示跨域请求时是否需要使用凭证
})
// // 请求拦截器，设置token
// instance.interceptors.request.use(config => {
//   console.log('进入请求状态')
//   return config
// })

// axios.interceptors.request.use(config => {
//   if (localStorage && localStorage.getItem('token')) {
//     const token = localStorage.getItem('token')
//     token && (config.headers.Authorization = token)
//   }
//   return config
// }, error => {
//   // 可以安装elementui等ui组件，将错误信息输出到界面。
//   console.log(error)
//   return Promise.error(error)
// })
// 响应拦截器
instance.interceptors.response.use(response => {
  if (response.status === 200) {
    // 993登录过期
    if (response.data.code != '10011') {
      return Promise.resolve(response)
    } else if (response.data.code == '10011') {
      let timer: any = setTimeout(() => {
        window.location.href = '/login'
        console.log(123)
      }, 2000)
      // store.commit('clearUserInfo')  // 使用vuex存储过用户信息，这里需要清空一下。
      localStorage.clear() // 清空本地存储
      ElMessageBox.alert('登陆验证失败，请重新登陆！！(2秒后自动退出)', '提示', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: '确定',
        callback: () => {
          window.location.href = '/login'
          clearTimeout(timer)
        },
      })

    }
  } else {
    return Promise.reject(response)
  }
})

// 2、封装请求方式
// @param method(必须)  请求方法
// @param url(必须)  接口地址
// @param data(可选)  携带参数
// @param headers(可选) 请求头可以自己设置，也可以使用默认的（不传）
export default function (method = 'get', url = '', data = {}, headers?) {
  const Authorization = headers?.Authorization ? headers?.Authorization : ''
  const isHeadPara = headers ? true : false
  headers = {
    'access-control-allow-origin': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin-Type': '*',
    'Authorization': localStorage.getItem('lzy_token') as string
  }
  if (Authorization) headers['Authorization'] = Authorization
  if (isHeadPara) headers['Content-Type'] = 'multipart/form-data'
  return new Promise((resolve, reject) => {
    instance({ method, url, data, headers })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
/* 旧版写法 */
/* export default class http {
  // get请求

  static get(url: string, data: any) {
    return new Promise((resolve, reject) => {
      axios.get(url, data)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  // post请求
  static post(url: string, data: any) {
    return new Promise((resolve, reject) => {
      axios.post(url, data)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  // put请求
  static put(url: string, data: any) {
    return axios.put(url, data)
  }
  // delete 请求
  static del(url: string, data: any) {
    return axios.delete(url, data)
  }
  // upload 请求
  static uploader(url: string, file: any) {
    let params = new FormData()
    params.append('file', file)
    return axios.post(url, params)
  }
} */
