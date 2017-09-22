import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import login from './modules/login'
import outSale from './modules/outSale'
import agency from './modules/agency'
import meetingApply from './modules/meetingApply'
// 告诉 vue “使用” vuex
Vue.use(Vuex)
// const HOST = 'http://118.190.71.221:8010/logistics/'// 用于正式服务器上
const HOST = '/domain' + 'logistics/'// 用于本地调试
// 创建一个对象来保存应用启动时的初始状态
const state = {
  ok: 1,
  type: 0,
  isLogin: false,
  fullscreenLoading: false,
  loginModule: false,
  accessToken: '',
  loginUrl: `${HOST}checkLogin.do?`,
  outSaleUrl: `${HOST}findOutFoodList.do?`,
  commitOrderUrl: `${HOST}submitFoodApply.do?`,
  goOrderUrl: `${HOST}findFoodApplyDetail.do`,
  cancelOrderUrl: `${HOST}cancelFoodApply.do?`,
  allOrderUrl: `${HOST}myApply.do?`,
  getAgencyUrl: `${HOST}myTodo.do?`,
  getMeetingRoomUrl: `${HOST}findMeetingRoomList.do?`,
  submitMeetingUrl: `${HOST}submitMeetingApply.do?`,
  findFoodOrder: `${HOST}findFoodOrder.do?`,
  meetingApplyDetail: `${HOST}findMeetingApplyDetail.do?`,
  updataPdf: `${HOST}submitPDF.do?`
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
    outSale,
    agency,
    meetingApply
  }
})
