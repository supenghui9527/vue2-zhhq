import * as types from '../mutation-types/agency'

const state = {
}

const getters = {

}

// action
const actions = {
  // 获取我的代办列表
  [types.GET_AGENCY] ({rootState, commit}, {Vue, userID, timeType, state, pageIndex, pageNumber}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.getAgencyUrl,
      body: {
        userID,
        timeType,
        state,
        pageIndex,
        pageNumber
      }
    }).then((data) => {
      Vue.allAgency = data.data
    })
  },
  [types.MEETINGAPPLY] ({rootState, commit}, {Vue, meetingApplyID}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.meetingApplyDetail,
      body: {
        meetingApplyID
      }
    }).then((data) => {
      Vue.applyDeatail = data.data
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