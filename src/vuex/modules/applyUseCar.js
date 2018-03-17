import * as types from '../mutation-types/applyUseCar'
import filterAuth from '@/common/js/filterAuth'
const state = {
}

const getters = {

}

// action
const actions = {
  // 提交用车申请
  [types.SUBMIT_APPLY_CAR] ({rootState, commit}, {Vue, userID, place, userName, userTel, applyDeptID, applyDept, officeTel, applyReason, goalPlace, detailReason, peopleCount, usingTime, linkman, linkmanTel, isAfterApply}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.submitApplyCarUrl,
      body: {
        userID,
        place,
        userName,
        userTel,
        applyDeptID,
        applyDept,
        officeTel,
        applyReason,
        goalPlace,
        detailReason,
        peopleCount,
        usingTime,
        linkman,
        linkmanTel,
        isAfterApply
      }
    }).then((data) => {
      Vue.$message(data.message)
    })
  },
  // 获取用车详情
  [types.GO_DETAIL] ({rootState, commit}, {Vue, carApplyID}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.useCarDetailUrl,
      body: {
        carApplyID
      }
    }).then((data) => {
      Vue.carDetail = data.data
      filterAuth({Vue: Vue, roleArr: localStorage.getItem('roleId').split(','), storeArr: [rootState.auth.STAMP_SIGN, rootState.auth.CHECK_CAR, rootState.auth.PORITION_CAR], authArr: ['authStamp', 'authInstructions', 'authAllot']})
      console.log(Vue.authStamp, Vue.authInstructions, Vue.authAllot)
    })
  },
  // 提交驳回
  [types.SUBMIT_AUDITING] ({rootState, commit}, {Vue, userID, carApplyID, comment, state}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: 'http://58.213.150.99:8010/logistics/carApplyComment.do',
      body: {
        userID,
        carApplyID,
        comment,
        state
      }
    }).then((data) => {
      Vue.$message(data.message)
      Vue.getDetail()
    })
  },
  // 获取分配车辆
  [types.GET_ALLOT] ({rootState, commit}, {Vue}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.getCarAllotUrl,
      body: {
      }
    }).then((data) => {
      Vue.aboutCar = data.data
    })
  },
  // 提交分配车辆
  [types.SUBMIT_CAR] ({rootState, commit}, {Vue, userID, carApplyID, driverName, driverTel, carModel, carNum, driverID, carID, comment, state}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: 'http://58.213.150.99:8010/logistics/carApplyAllot.do',
      body: {
        userID,
        carApplyID,
        driverName,
        driverTel,
        carModel,
        carNum,
        driverID,
        carID,
        comment,
        state
      }
    }).then((data) => {
      Vue.aboutCar = null
      Vue.$message(data.message)
      Vue.getDetail()
    })
  },
  // 完成用车
  [types.CAR_COMPLETE] ({rootState, commit}, {Vue, userID, carApplyID, beforeMile, afterMile}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.carCompleteUrl,
      body: {
        userID,
        carApplyID,
        beforeMile,
        afterMile
      }
    }).then((data) => {
      Vue.$message(data.message)
      Vue.showMile = false
      Vue.getDetail()
    })
  },
  // 用车评价
  [types.ASSESS_USE_CAR] ({rootState, commit}, {Vue, assess, carApplyID, levels}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.assessUseCarUrl,
      body: {
        assess,
        carApplyID,
        levels
      }
    }).then((data) => {
      Vue.$message(data.message)
      Vue.assessShow = false
      Vue.getDetail()
    })
  },
  // 查看车辆是否被占用
  [types.CAR_USEING] ({rootState, commit}, {Vue, carID}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.carUseingUrl,
      body: {
        carID
      }
    }).then(({data}) => {
      Vue.carUseing = data
    })
  },
  [types.CANCEL_CAR_APPLY] ({rootState, commit}, {Vue, carApplyID}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.cancelCarApplyUrl,
      body: {
        carApplyID
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
