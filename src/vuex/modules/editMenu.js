import * as types from '../mutation-types/editMenu'

const state = {
}

const getters = {

}

// action
const actions = {
  // 获取熟食列表
  [types.GET_HOT_MENU] ({rootState, commit}, {Vue, foodJson}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.getHotFoodUrl,
      body: {
        foodJson
      }
    }).then(({data}) => {
      for (var i = 0; i < data.length; i++) {
        Vue.allFoods[`food${i + 1}`] = `${data[i].name}/${data[i].price}/${data[i].count}`
        Vue.allFoodsId.push(data[i].id)
      }
    })
  },
  // 提交熟食编辑
  [types.EDIT_HOT_MENU] ({rootState, commit}, {Vue, foodJson}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.submitHotFoodUrl,
      body: {
        foodJson
      }
    }).then((data) => {
      if (data.state === 1) {
        Vue.getMenu()
      }
      Vue.$message(data.message)
    })
  },
  // 获取面食列表
  [types.GET_FOOD_MENU] ({rootState, commit}, {Vue, userID}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.getFoodUrl,
      body: {
        userID
      }
    }).then(({data}) => {
      for (var i = 0; i < data.length; i++) {
        Vue.allFoods[`food${i}`] = `${data[i].name}/${data[i].price}/${data[i].count}`
        Vue.allFoodsId.push(data[i].id)
      }
    })
  },
  // 提交面食编辑
  [types.EDIT_FOOD_MENU] ({rootState, commit}, {Vue, foodJson}) {
    Vue.$store.dispatch('axios/act/HTTP', {
      Vue,
      url: rootState.submitFoodUrl,
      body: {
        foodJson
      }
    }).then((data) => {
      if (data.state === 1) {
        Vue.getMenu()
      }
      Vue.$message(data.message)
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
