import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import common from './modules/common'
import login from './modules/login'
import outSale from './modules/outSale'
import agency from './modules/agency'
import meetingApply from './modules/meetingApply'
import repair from './modules/repair'
import applyUseCar from './modules/applyUseCar'
import applyMeal from './modules/applyMeal'
import editMenu from './modules/editMenu'
// 告诉 vue “使用” vuex
Vue.use(Vuex)
// const HOST = 'http://58.213.150.99:8010/logistics/'// 用于正式服务器内网 172.16.5.181:8010 测试118.190.71.221:8010 外网192.168.200.80:8010
const HOST = '/domain' + 'logistics/'// 用于本地调试
// 创建一个对象来保存应用启动时的初始状态
const state = {
  allState: {
    outSaleState: ['未完成', '已完成', '已撤销'],
    carState: ['待签字', '待盖章', '待审核', '待分配', '待服务', '待完成', '待评价', '已评价', '驳回(待签字)', '驳回(待审核)', '驳回(待分配)'],
    meetingState: ['待签字', '待盖章', '待批示', '待分配', '待服务', '待完成', '待评价', '已评价', '驳回(待签字)', '驳回(批示)', '驳回(待分配)'],
    repairState: ['待接单', '待完成', '待评价', '已评价', '待分配'],
    mealState: ['待一级领导签字', '待盖章', '待二级领导签字', '待审核', '待分配', '待就餐', '已就餐', '一级领导驳回', '二级领导驳回', '审核驳回', '分配驳回']
  },
  auth: {
    CHECK_HW: 'f63ec75d5e84800b015e8482b8390001',
    CHECK_CAR: 'f63ec75d5e849386015e886ff47c0012',
    CHECK_MEAL: 'f63ec75d5e849386015e887106fe0013',
    PORITION: 'f63ec75d5e84800b015e848370050002',
    STAMP_SIGN: 'f63ec75d5e8464ab015e84766c00000c',
    ORDER_REPAIR: 'f63ec75d5e9deb7f015e9ea763850001'
  },
  linkman: localStorage.getItem('linkman'),
  linkmantel: localStorage.getItem('linkmantel'),
  officetel: localStorage.getItem('officetel'),
  deptName: localStorage.getItem('deptName'),
  roleId: localStorage.getItem('roleId'),
  ok: 1,
  type: 0,
  isLogin: false,
  fullscreenLoading: false,
  loginModule: false,
  accessToken: '',
  loginUrl: `${HOST}checkLogin.do`,
  outSaleUrl: `${HOST}findOutFoodList.do`,
  commitOrderUrl: `${HOST}submitFoodApply.do`,
  goOrderUrl: `${HOST}findFoodApplyDetail.do`,
  cancelOrderUrl: `${HOST}cancelFoodApply.do`,
  myApplyUrl: `${HOST}myApply.do`,
  getAgencyUrl: `${HOST}myTodo.do`,
  getMeetingRoomUrl: `${HOST}findMeetingRoomList.do`,
  submitMeetingUrl: `${HOST}submitMeetingApply.do`,
  findFoodOrder: `${HOST}findFoodOrder.do`,
  meetingApplyDetail: `${HOST}findMeetingApplyDetail.do`,
  updataPdf: `${HOST}submitPDF.do`,
  getQuestions: `${HOST}findQuestions.do`,
  submitQuestionsUrl: `${HOST}submitRepairApply.do`,
  RepairDetailUrl: `${HOST}findRepairDetail.do`,
  submitApplyCarUrl: `${HOST}submitCarApply.do`,
  useCarDetailUrl: `${HOST}findCarApplyDetail.do`,
  applyMealUrl: `${HOST}submitDiningApply.do`,
  mealDetailUrl: `${HOST}findDiningApplyDetail.do`,
  mealAuditingUrl: `${HOST}diningApplyReview.do`,
  instructionsUrl: `${HOST}meetingApplyComment.do`,
  getAllotUrl: `${HOST}findAllServer.do`,
  submitAllotUrl: `${HOST}meetingApplyAllot.do`,
  submitAuditingUrl: `${HOST}carApplyComment.do`,
  getCarAllotUrl: `${HOST}findCarAndDriver.do`,
  submitCarUrl: `${HOST}carApplyAllot.do`,
  mealSureUrl: `${HOST}diningApplyFinish.do`,
  getRepairAllotUrl: `${HOST}findFixWorker.do`,
  submitRepairAllotUrl: `${HOST}repairAllot.do`,
  getHotFoodUrl: `${HOST}findCookFood.do`,
  submitHotFoodUrl: `${HOST}modifyMenu.do`,
  getFoodUrl: `${HOST}findNoodleFood.do`,
  submitFoodUrl: `${HOST}modifyNoodleMenu.do`,
  assessRepairUrl: `${HOST}assessRepair.do`,
  assessUseCarUrl: `${HOST}carApplyAssess.do`,
  orderRepairUrl: `${HOST}orderRepair.do`,
  getSignUrl: `${HOST}saveSignPath.do?`
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
    common,
    login,
    outSale,
    agency,
    meetingApply,
    repair,
    applyUseCar,
    applyMeal,
    editMenu
  }
})
