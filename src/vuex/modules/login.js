import * as types from '../mutation-types/login'

const state = {
  accessToken: ''
}

const getters = {

}

// action
const actions = {
  // 登录接口
  [types.GO_LOGIN] ({state, rootState, commit}, {Vue, uid, password}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.loginUrl,
      body: {
        uid,
        password
      }
    }).then((data) => {
      localStorage.setItem('accessToken', data.data.accessToken)
      localStorage.setItem('userID', data.data.id)
      rootState.isLogin = true
      rootState.loginModule = false
      Vue.$emit('fromLogin', true)
    })
  },
  // token
  [types.SET_COMMON_USERTOKEN] ({state, rootState}, {Vue, accessToken}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.loginUrl,
      body: {
        accessToken
      }
    }).then((data) => {
      localStorage.setItem('userID', data.data.id)
      rootState.isLogin = true
      rootState.loginModule = false
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
