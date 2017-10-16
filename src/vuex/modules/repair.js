import * as types from '../mutation-types/repair'

const state = {
  options: []
}

const getters = {
  [types.GET_QUESTIONS] (state) {
    return state.options
  }
}

// action
const actions = {
  // 获取我的代办列表
  [types.GET_QUESTIONS] ({rootState, state, commit}, {Vue}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.getQuestions,
      body: {
      }
    }).then(({data}) => {
      commit('get/questions', data)
    })
  },
  // 提交报修申请
  [types.SUBMIT_QUESTIONS] ({rootState, state, commit}, {Vue, fileList, userID, questionIDs, bespeakStartTime, bespeakEndTime, faultPlace, faultDetail, remark}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.submitQuestionsUrl,
      body: {
        userID,
        fileList,
        questionIDs,
        bespeakStartTime,
        bespeakEndTime,
        faultPlace,
        faultDetail,
        remark
      }
    }).then((data) => {
      Vue.$message(data.message)
    })
  },
  // 报修详情
  [types.GO_REPAIR_DETAIL] ({rootState, state, commit}, {Vue, repairApplyID}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.RepairDetailUrl,
      body: {
        repairApplyID
      }
    }).then(({data}) => {
      Vue.repairDetail = data
    })
  },
  // 获取维修分配
  [types.GET_REPAIR_ALLOT] ({rootState, state, commit}, {Vue}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.getRepairAllotUrl,
      body: {
      }
    }).then((data) => {
      Vue.fixWorkerList = data.data
    })
  },
  // 提交分配
  [types.SUBMIT_REPAIR_ALLOT] ({rootState, commit}, {Vue, userID, fixWorkerID, fixWorkerName, fixWorkerTel, repairApplyID, comment, state}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.submitRepairAllotUrl,
      body: {
        userID,
        fixWorkerID,
        fixWorkerName,
        fixWorkerTel,
        repairApplyID,
        comment,
        state
      }
    }).then((data) => {
      Vue.$message(data.message)
      Vue.getDetail()
    })
  }
}

const mutations = {
  [types.GET_QUESTIONS] (state, questions) {
    state.options = questions
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
