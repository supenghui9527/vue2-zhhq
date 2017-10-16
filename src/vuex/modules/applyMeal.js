import * as types from '../mutation-types/applyMeal'

const state = {
}

const getters = {

}

// action
const actions = {
  // 提交我的用餐申请
  [types.APPLY_MEAL] ({rootState, commit}, {Vue, userID, applyDeptID, linkman, linkmanTel, officeTel, diningType, diningBenchmark, diningReason, peopleCount, diningTime}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.applyMealUrl,
      body: {
        userID,
        applyDeptID,
        linkman,
        linkmanTel,
        officeTel,
        diningType,
        diningBenchmark,
        diningReason,
        peopleCount,
        diningTime
      }
    }).then((data) => {
      Vue.allAgency = data.data
    })
  },
  [types.GO_MEAL_DETAIL] ({rootState, commit}, {Vue, diningApplyID}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.mealDetailUrl,
      body: {
        diningApplyID
      }
    }).then((data) => {
      Vue.mealDetail = data.data
    })
  },
  // 用餐审核
  [types.MEAL_AUDITING] ({rootState, commit}, {Vue, userID, diningApplyID, comment, state}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.mealAuditingUrl,
      body: {
        userID,
        diningApplyID,
        comment,
        state
      }
    }).then((data) => {
      Vue.mealDetail = data.data
    })
  },
  [types.MEAL_SURE] ({rootState, commit}, {Vue, userID, diningApplyID, comment, state}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.mealSureUrl,
      body: {
        userID,
        diningApplyID,
        comment,
        state
      }
    }).then((data) => {
      Vue.mealDetail = data.data
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
