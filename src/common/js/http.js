import './interceptors'
import axios from 'axios'
import baseURL from './config'

axios.defaults.baseURL = baseURL

// 正确
const OK = '01'
// token失效
const NOTOKEN = '300'
// 权限不足
const NOCODE = '403'

// type 默认0表示过滤后的请求 1表示不过滤请求 是自动控制loading
export default async function ({actionType, body = {}, type = true, loadingType = true}) {
  // 打开loading
  if (loadingType) {
    if (!this.btnloading) {
      this.loading = true
    }
  }
  let {token} = this.$store.state.login
  // 给组件返回的数据
  let data = await this.$store.dispatch(actionType, {
    httpFun: (url, body, successFun = null) => {
      return new Promise((resolve, reject) => {
        axios.post(
          url,
          token ? Object.assign({userToken: token}, body) : body
        ).then(({data: {code, content, msg}}) => {
          if (type) {
            if (code === OK) {
              // 执行成功函数
              successFun && successFun({data: content, body})
              resolve({data: content, body})
            } else if (code === NOTOKEN) {
              this.$alert('登陆过期，请您重新登陆', '温馨提示', {
                callback: () => {
                  this.$ajax({actionType: 'login/act/LOGOUT'})
                }
              })
            } else if (code === NOCODE) {
              this.$alert('抱歉，您的权限不足', '温馨提示')
            } else {
              this.$message.error(msg)
            }
          } else {
            successFun && successFun({code, content, msg})
            resolve({code, content, msg})
          }
          // 关闭loading
          if (loadingType) {
            this.btnloading = false
            this.loading = false
          }
        }).catch((res) => {
          // 关闭loading
          if (loadingType) {
            this.btnloading = false
            this.loading = false
          }
          this.$message.warning('请求失败，服务器异常')
        })
      })
    },
    body
  })
  // 关闭loading
  if (loadingType) {
    this.btnloading = false
    this.loading = false
  }
  return data
}
