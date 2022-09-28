import axios from 'axios'
import { Loading, Message } from 'element-plus/es/components'
import myConfig from './static/config'

let loading = null // loading框
let requestNum = 0 // 请求数

let baseUrl
if (process.env.NODE_ENV === 'development') {
  baseUrl = myConfig.apiUrlDev
}

// axios配置
axios.defaults.baseURL = baseUrl
// 超时时间
axios.defaults.timeout = 10 * 1000 // 单位：ms
// 跨域请求
axios.defaults.withCredentials = true

// httpRequest拦截
axios.interceptors.request.use(
  (config) => {
    // 固定配置 （每个请求都会带上）
    config.headers.client = 'admin'
    // 如果有用户体系，可以带上token等信息

    // 请求+1
    requestNum++

    loading = Loading.service({ fullscreen: true, text: '正在努力加载中' })

    return config
  },
  (error) => {
    // 出错 直接关闭loading
    requestNum = 0
    if (loading) {
      loading.close()
    }

    return Promise.reject(error)
  }
)

// httpResponse拦截
axios.interceptors.response.use((res) => {
  // 请求减1
  requestNum--

  if (requestNum <= 0) {
    loading.close()
  }

  // 响应的状态码如果是0，提示报错
  if (res.data.code === 0) {
    const data = res.data
    Message({
      message: data.extendInfo ? data.extendInfo : data.msg,
      type: 'error',
      duration: 1500,
    })
  }
})
