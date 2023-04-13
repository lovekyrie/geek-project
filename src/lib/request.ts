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
axios.interceptors.response.use(
  (res) => {
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
    return Promise.resolve(res)
  },
  (err) => {
    console.dir(err)
    // 出错直接关闭弹窗
    requestNum = 0
    loading.close()

    if (!err.response && err.message === 'Network Error') {
      Message.error('服务端未开启')
    } else if (!err.response && /timeout/.test(err.message)) {
      Message.error('接口响应超时')
    } else {
      switch (err.response.status) {
        case 401:
          MessageBox.confirm('token已过期，可以继续取消停留在该页面，或者重新登录', '重新登录', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            showClose: true,
            closeOnClickModal: false,
            type: 'warning',
          }).then(async () => {
            // 1. 清除已过期token
            // 2. 跳转到登录页
            await store.dispatch('clearAll')
            await router.push('/login')
          })
          break
        default:
          break
      }
    }
    return Promise.reject(err)
  }
)

export default axios
