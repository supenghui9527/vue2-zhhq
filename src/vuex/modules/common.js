import * as types from '../mutation-types/common'

const state = {
  list: [],
  id: ''
}

const getters = {
  [types.GETALLMYAPPLY] (state) {
    return state.list
  },
  setRepairID (state) {
    return state.id
  }
}
const actions = {
  [types.GETALLMYAPPLY] ({rootState, commit}, {Vue, userID, applyType, timeType, state, pageIndex, pageNumber}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.myApplyUrl,
      body: {
        userID,
        applyType,
        timeType,
        state,
        pageIndex,
        pageNumber
      }
    }).then(({data}) => {
      commit('get/all/myapply', data)
    })
  },
  // 签字
  [types.GETSIGN] ({rootState, commit}, {Vue, userID, signPath, applyID, tag, state, comment}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.activeUrl,
      body: {
        userID,
        signPath,
        applyID,
        tag,
        state,
        comment
      }
    }).then((data) => {
      if (data.state === 1) {
        Vue.$message(data.message)
        Vue.getDetail()
      }
    })
  }
}
const mutations = {
  [types.GETALLMYAPPLY] (state, data) {
    state.list = data
  },
  setRepairID (state, data) {
    state.id = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
