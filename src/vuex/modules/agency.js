import * as types from '../mutation-types/agency'
import filterAuth from '@/common/js/filterAuth'
const state = {
}

const getters = {

}

// action
const actions = {
  // 获取我的代办列表
  [types.GET_AGENCY] ({rootState, commit}, {Vue, userID, applyType, timeType, state, pageIndex, pageNumber}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.getAgencyUrl,
      body: {
        userID,
        applyType,
        timeType,
        state,
        pageIndex,
        pageNumber
      }
    }).then((data) => {
      Vue.allAgency = data.data
    })
  },
  // 会议申请详情
  [types.MEETING_APPLY] ({rootState, commit}, {Vue, meetingApplyID}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.meetingApplyDetail,
      body: {
        meetingApplyID
      }
    }).then((data) => {
      Vue.meetingDeatail = data.data
      console.log()
      filterAuth({Vue: Vue, roleArr: localStorage.getItem('roleId').split(','), storeArr: [rootState.auth.STAMP_SIGN, rootState.auth.CHECK_HW, rootState.auth.PORITION], authArr: ['authStamp', 'authInstructions', 'authAllot']})
      console.log(Vue.authStamp, Vue.authInstructions, Vue.authAllot)
    })
  }
}

const mutations = {

}

export default {
  state,
  getters,
  actions,
  mutations
}
