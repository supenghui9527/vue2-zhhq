import * as types from './mutation-types/common'
import Qs from 'qs'
/**
 * Created by yi on 2017-01-06.
 */
import axios from 'axios'
// 修改默认 Payload 数据为 FormData
axios.defaults.transformRequest = [
  data => {
    return typeof data === 'object' ? Qs.stringify(data) : data
  }
]
export default {
  [types.ACT_AXIOS_HTTP] ({ state, rootState }, {Vue, url, body = {}}) {
    return new Promise((resolve, reject) => {
      // 打开loading
      // rootState.fullscreenLoading = true
      axios.post(url, body).then((res) => {
        let data = Qs.parse(res.data)
        if (data.state === rootState.ok) {
          resolve(data)
          // rootState.fullscreenLoading = false
        } else {
          Vue.$message(data.message)
        }
      }).catch((erro) => {
        Vue.$message('抱歉,服务器开小差了~')
      })
    })
  }
}
