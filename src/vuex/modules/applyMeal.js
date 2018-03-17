import * as types from '../mutation-types/applyMeal'
import filterAuth from '@/common/js/filterAuth'
const state = {
}

const getters = {

}

// action
const actions = {
  // 提交我的用餐申请
  [types.APPLY_MEAL] ({rootState, commit}, {Vue, userID, place, applyDeptID, linkman, linkmanTel, officeTel, diningType, diningBenchmark, diningReason, peopleCount, diningTime, leaderID, remark}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.applyMealUrl,
      body: {
        userID,
        place,
        applyDeptID,
        linkman,
        linkmanTel,
        officeTel,
        diningType,
        diningBenchmark,
        diningReason,
        peopleCount,
        diningTime,
        leaderID,
        remark
      }
    }).then((data) => {
      Vue.$message(data.message)
    })
  },
  // 用餐详情
  [types.GO_MEAL_DETAIL] ({rootState, commit}, {Vue, diningApplyID}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.mealDetailUrl,
      body: {
        diningApplyID
      }
    }).then((data) => {
      Vue.mealDetail = data.data
      filterAuth({Vue: Vue, roleArr: localStorage.getItem('roleId').split(','), storeArr: [rootState.auth.STAMP_SIGN, rootState.auth.CHECK_MEAL, rootState.auth.PORITION_MEAL], authArr: ['authStamp', 'authInstructions', 'authAllot']})
      console.log(Vue.authStamp, Vue.authInstructions, Vue.authAllot)
    })
  },
  // 用餐审核
  [types.MEAL_AUDITING] ({rootState, commit}, {Vue, userID, diningApplyID, comment, state}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: 'http://58.213.150.99:8010/logistics/diningApplyReview.do',
      body: {
        userID,
        diningApplyID,
        comment,
        state
      }
    }).then((data) => {
      Vue.$message(data.message)
      Vue.getDetail()
    })
  },
  // 确认
  [types.MEAL_SURE] ({rootState, commit}, {Vue, userID, diningApplyID, comment, state, room}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.mealSureUrl,
      body: {
        userID,
        diningApplyID,
        comment,
        state,
        room
      }
    }).then((data) => {
      Vue.$message(data.message)
      Vue.showRooms = false
      Vue.getDetail()
    })
  },
  [types.GET_CHECK_LEADER] ({rootState, commit}, {Vue}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.getCheckLeaderUrl
    }).then(({data}) => {
      Vue.checkLeaders = data
    })
  },
  // 取消会议申请
  [types.CANCEL_MEAL_APPLY] ({rootState, commit}, {Vue, diningApplyID}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.cancelMealApplyUrl,
      body: {
        diningApplyID
      }
    }).then((data) => {
      Vue.$message(data.message)
      Vue.$emit('changePage', Vue.typeValue, Vue.timeValue, Vue.stateValue, Vue.val)
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
