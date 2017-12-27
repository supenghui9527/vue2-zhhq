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
      localStorage.setItem('userinfo', JSON.stringify(data.data)) // 存token到本地
      localStorage.setItem('uname', Vue.userName)
      localStorage.setItem('password', Vue.password)
      localStorage.setItem('accessToken', data.data.accessToken) // 存token到本地
      localStorage.setItem('userID', data.data.id) // userid
      localStorage.setItem('linkman', data.data.name)
      localStorage.setItem('linkmantel', data.data.mobile)
      localStorage.setItem('officetel', data.data.telphone)
      localStorage.setItem('deptName', data.data.deptName)
      localStorage.setItem('roleId', data.data.roleId)
      localStorage.setItem('dept_id', data.data.dept_id)
      localStorage.setItem('isManage', data.data.isManage)
      localStorage.setItem('loginName', data.data.login_name)
      localStorage.setItem('password', data.data.password)
      rootState.isLogin = true // 改变成已登录状态
      rootState.loginModule = false // 隐藏登录框
      Vue.$emit('fromLogin', {show: true, userName: data.data.name})
      rootState.type = data.data.type
      Vue.$store.dispatch('get/apply/nub', {
        Vue: Vue,
        userID: data.data.id
      })
    })
  },
  // token
  [types.SET_COMMON_USERTOKEN] ({state, rootState}, {Vue, uid, password}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.loginUrl,
      body: {
        uid,
        password
      }
    }).then((data) => {
      rootState.isLogin = true
      rootState.loginModule = false
      rootState.type = data.data.type
      Vue.userName = data.data.name
      localStorage.setItem('isManage', data.data.isManage)
      localStorage.setItem('loginName', data.data.login_name)
      localStorage.setItem('password', data.data.password)
      Vue.$store.dispatch('get/apply/nub', {
        Vue: Vue,
        userID: data.data.id
      })
    })
  },
  [types.LOGIN_ACTIVE] ({state, rootState}, {Vue, uid}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.loginACtiveUrl,
      body: {
        uid
      }
    }).then((data) => {
      localStorage.setItem('userinfo', JSON.stringify(data.data)) // 存token到本地
      localStorage.setItem('uname', Vue.userName)
      localStorage.setItem('password', Vue.password)
      localStorage.setItem('accessToken', data.data.accessToken) // 存token到本地
      localStorage.setItem('userID', data.data.id) // userid
      localStorage.setItem('linkman', data.data.name)
      localStorage.setItem('linkmantel', data.data.mobile)
      localStorage.setItem('officetel', data.data.telphone)
      localStorage.setItem('deptName', data.data.deptName)
      localStorage.setItem('roleId', data.data.roleId)
      localStorage.setItem('dept_id', data.data.dept_id)
      localStorage.setItem('isManage', data.data.isManage)
      localStorage.setItem('loginName', data.data.login_name)
      localStorage.setItem('password', data.data.password)
      Vue.$emit('fromLogin', {show: true, userName: data.data.name})
      rootState.isLogin = true
      rootState.loginModule = false
      rootState.type = data.data.type
      Vue.userName = data.data.name
      Vue.$store.dispatch('get/apply/nub', {
        Vue: Vue,
        userID: data.data.id
      })
    })
  },
  [types.GET_APPLY_NUB] ({state, rootState}, {Vue, userID}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.getApplyNub,
      body: {
        userID
      }
    }).then((data) => {
      rootState.daibanCount = data.data.daibanCount
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
