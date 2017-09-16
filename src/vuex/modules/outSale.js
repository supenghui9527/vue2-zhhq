import * as types from '../mutation-types/outSale'

const state = {

}

const getters = {

}

// action
const actions = {
  // 获取外卖列表
  [types.GET_FOOD_LIST] ({state, rootState}, {Vue, place}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.outSaleUrl,
      body: {
        place
      }
    }).then((data) => {
      let datas = data.data
      if (datas.mianshi) {
        for (let i = 0; i < datas.mianshi.length; i++) {
          datas.mianshi[i].value = 0
          datas.mianshi[i].active = false
        }
      }
      if (datas.shushi) {
        for (let i = 0; i < datas.shushi.length; i++) {
          datas.shushi[i].value = 1
          datas.shushi[i].active = false
        }
      }
      Vue.foodList = datas
    })
  },
  // 提交订单
  [types.COMMIT_ORDER] ({state, rootState}, {Vue, outFood, userID, place}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.commitOrderUrl,
      body: {
        outFood,
        userID,
        place
      }
    }).then((data) => {
      window.localStorage.setItem('orderID', data.data)
      Vue.$message('订单提交成功')
      window.localStorage.setItem('showDetailBtn', true)
      window.localStorage.setItem('activeAddress', Vue.activeAddress)
      Vue.showDetailBtn = true
      Vue.$store.dispatch('food/list', {
        Vue: Vue,
        place: Vue.orderPlace
      })
    })
  },
  // 查看当天订单详情
  [types.GO_ORDER] ({state, rootState}, {Vue, outFoodID}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.goOrderUrl,
      body: {
        outFoodID
      }
    }).then((data) => {
      let datas = data.data
      Vue.orderDetail = datas
      Vue.orderDetail.allPrice = 0
      for (let i in data.data.detailList) {
        Vue.orderDetail.allPrice += datas.detailList[i].foodCount * datas.detailList[i].foodPrice
      }
    })
  },
  // 撤销订单
  [types.CANCEL_ORDER] ({state, rootState}, {Vue, outFoodID}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.cancelOrderUrl,
      body: {
        outFoodID
      }
    }).then((data) => {
      Vue.$message('撤销成功')
      Vue.showDetailBtn = false
      window.localStorage.setItem('showDetailBtn', false)
      Vue.$router.push('/outSale/chooseFood')
    })
  },
  // 获取全部外卖订单
  [types.ALL_ORDER] ({rootState}, {Vue, userID, applyType, timeType, state, pageIndex, pageNumber}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.allOrderUrl,
      body: {
        userID,
        applyType,
        timeType,
        state,
        pageIndex,
        pageNumber
      }
    }).then((data) => {
      Vue.allOrder = data.data
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
