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
      localStorage.setItem('accessToken', data.data.accessToken) // 存token到本地
      localStorage.setItem('userID', data.data.id) // userid
      localStorage.setItem('linkman', data.data.name)
      localStorage.setItem('linkmantel', data.data.mobile)
      localStorage.setItem('officetel', data.data.telphone)
      rootState.isLogin = true // 改变成已登录状态
      rootState.loginModule = false // 隐藏登录框
      Vue.$emit('fromLogin', true)
      rootState.type = data.data.type
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
      rootState.isLogin = true
      rootState.loginModule = false
      rootState.type = data.data.type
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
