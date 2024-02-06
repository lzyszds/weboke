// 一、配置axios
import axios from 'axios'
const instance = axios.create({
  baseURL: window.location.origin,
  timeout: 10000,
  withCredentials: true,//表示跨域请求时是否需要使用凭证
})
// 响应拦截器
instance.interceptors.response.use(response => {
  if (response.status === 200) {
    // 993登录过期
    if (response.data.code != '10011') {
      return Promise.resolve(response)
    } else { }
  } else {
    return Promise.reject(identifyCode(response.status, response))
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

function identifyCode(code, err) {
  code == 400 && (code = '请求错误')
  code == 401 && (code = '未授权，请登录')
  code == 403 && (code = '拒绝访问')
  code == 404 && (code = `请求地址出错: ${err.response.config.url}`)
  code == 408 && (code = '请求超时')
  code == 500 && (code = '服务器内部错误')
  code == 501 && (code = '服务未实现')
  code == 502 && (code = '网关错误')
  code == 503 && (code = '服务不可用')
  code == 504 && (code = '网关超时')
  code == 505 && (code = 'HTTP版本不受支持')
  return code
}
