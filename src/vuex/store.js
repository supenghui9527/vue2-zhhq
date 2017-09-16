import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import login from './modules/login'
import outSale from './modules/outSale'
// 告诉 vue “使用” vuex
Vue.use(Vuex)
// const HOST = 'http://URL_PLACEHOLDER192.168.8.12:8080/logistics/'// 用于正式服务器上
const HOST = '/domain' + 'logistics/'// 用于本地调试
// 创建一个对象来保存应用启动时的初始状态
const state = {
  ok: 1,
  isLogin: false,
  fullscreenLoading: false,
  loginModule: false,
  accessToken: '',
  loginUrl: `${HOST}checkLogin.do?`,
  outSaleUrl: `${HOST}findOutFoodList.do?`,
  commitOrderUrl: `${HOST}submitFoodApply.do?`,
  goOrderUrl: `${HOST}findFoodApplyDetail.do`,
  cancelOrderUrl: `${HOST}cancelFoodApply.do?`,
  allOrderUrl: `${HOST}myApply.do?`
}
// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
  // TODO: 放置我们的状态变更函数
  SHOW_LOGIN (state, data) {
    state.loginModule = data
  },
  IS_LOGIN (state, data) {
    state.isLogin = data
  }
}

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    login,
    outSale
  }
})
