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
