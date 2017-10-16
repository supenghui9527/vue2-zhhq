import axios from 'axios'
import { Message } from 'element-ui'
// 超时时间
axios.defaults.timeout = 5000
// http请求拦截器
axios.interceptors.request.use(config => {
// element ui Loading方法
  if (window.navigator.onLine) {
    return config
  }
}, error => {
  Message.error({
    message: '加载超时'
  })
  return Promise.reject(error)
})
