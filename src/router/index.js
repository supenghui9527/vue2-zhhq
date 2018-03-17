import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/login/login'], resolve)
    },
    // 预定外卖
    {
      path: '/outSale',
      name: 'outSale',
      redirect: '/outSale/chooseFood',
      component: resolve => require(['@/components/outSale/outSale'], resolve),
      children: [
        {
          path: '/outSale/chooseFood',
          name: 'chooseFood',
          component: resolve => require(['@/components/outSale/chooseFood/chooseFood'], resolve)
        },
        {
          path: '/outSale/allOrder',
          name: 'allOrder',
          component: resolve => require(['@/components/outSale/allOrder/allOrder'], resolve)
        },
        {
          path: '/outSale/orderDetail',
          name: 'orderDetail',
          component: resolve => require(['@/components/outSale/orderDedail/orderDedail'], resolve)
        }
      ]
    },
    // 我的代办
    {
      path: '/agency',
      name: 'agency',
      component: resolve => require(['@/components/agency/agency'], resolve)
    },
    // 会议室申请盖章
    {
      path: '/agency/meetingAgency',
      name: 'meetingAgency',
      component: resolve => require(['@/components/agency/meetingAgency/meetingAgency'], resolve)
    },
    // 用餐申请盖章
    {
      path: '/agency/mealAgency',
      name: 'mealAgency',
      component: resolve => require(['@/components/agency/mealAgency/mealAgency'], resolve)
    },
    // 用车申请盖章
    {
      path: '/agency/carAgency',
      name: 'carAgency',
      component: resolve => require(['@/components/agency/carAgency/carAgency'], resolve)
    },
    // 会议室申请
    {
      path: '/meetingApply',
      name: 'meetingApply',
      redirect: '/meetingApply/apply',
      component: resolve => require(['@/components/meetingApply/meetingApply'], resolve),
      children: [
        {
          path: '/meetingApply/apply',
          name: 'apply',
          component: resolve => require(['@/components/meetingApply/apply/apply'], resolve)
        }
      ]
    },
    // 订单打印
    {
      path: '/allOutSale',
      name: 'allOutSale',
      redirect: '/allOutSale/food',
      component: resolve => require(['@/components/allOutSale/allOutSale'], resolve),
      children: [
        {
          path: '/allOutSale/hotFood',
          name: 'hotFood',
          component: resolve => require(['@/components/allOutSale/hotFood/hotFood'], resolve)
        },
        {
          path: '/allOutSale/food',
          name: 'food',
          component: resolve => require(['@/components/allOutSale/food/food'], resolve)
        }
      ]
    },
    // 申请用车
    {
      path: '/applyUseCar',
      name: 'applyUseCar',
      redirect: '/applyUseCar/applyCar',
      component: resolve => require(['@/components/applyUseCar/applyUseCar'], resolve),
      children: [
        {
          path: '/applyUseCar/myCarApply',
          name: 'myCarApply',
          component: resolve => require(['@/components/applyUseCar/myApply/myApply'], resolve)
        },
        {
          path: '/applyUseCar/applyCar',
          name: 'applyCar',
          component: resolve => require(['@/components/applyUseCar/applyCar/applyCar'], resolve)
        }
      ]
    },
    // 我的维修
    {
      path: '/repair',
      name: 'repair',
      redirect: '/repair/applyRepair',
      component: resolve => require(['@/components/repair/repair'], resolve),
      children: [
        {
          path: '/repair/myApply',
          name: 'myApply',
          component: resolve => require(['@/components/repair/myApply/myApply'], resolve)
        },
        {
          path: '/repair/myCard',
          name: 'myCard',
          component: resolve => require(['@/components/repair/myCard/myCard'], resolve)
        },
        {
          path: '/repair/applyRepair',
          name: 'applyRepair',
          component: resolve => require(['@/components/repair/applyRepair/applyRepair'], resolve)
        }
      ]
    },
    // 我的全部申请
    {
      path: '/myApply',
      name: 'allMyApply',
      component: resolve => require(['@/components/myApply/myApply'], resolve)
    },
    {
      path: '/detail',
      name: 'detail',
      component: resolve => require(['@/components/myApply/detail/detail'], resolve),
      children: [
        {
          path: '/myApply/repairDetail',
          name: 'repairDetail',
          component: resolve => require(['@/components/myApply/repairDetail/repairDetail'], resolve)
        },
        {
          path: '/myApply/mealDetail',
          name: 'mealDetail',
          component: resolve => require(['@/components/myApply/mealDetail/mealDetail'], resolve)
        },
        {
          path: '/myApply/useCarDetail',
          name: 'useCarDetail',
          component: resolve => require(['@/components/myApply/useCarDetail/useCarDetail'], resolve)
        },
        {
          path: '/myApply/meetingDetail',
          name: 'meetingDetail',
          component: resolve => require(['@/components/myApply/meetingDetail/meetingDetail'], resolve)
        }
      ]
    },
    // 我的用餐申请
    {
      path: '/applyMeal',
      name: 'applyMeal',
      redirect: '/applyMeal/submitMealApply',
      component: resolve => require(['@/components/applyMeal/applyMeal'], resolve),
      children: [
        {
          path: '/applyMeal/myMealApply',
          name: 'myMealApply',
          component: resolve => require(['@/components/applyMeal/myApply/myApply'], resolve)
        },
        {
          path: '/applyMeal/submitMealApply',
          name: 'submitMealApply',
          component: resolve => require(['@/components/applyMeal/submitMealApply/submitMealApply'], resolve)
        }
      ]
    },
    // 菜单编辑
    {
      path: '/editMenu',
      name: 'editMenu',
      component: resolve => require(['@/components/editMenu/editMenu'], resolve),
      redirect: '/editMenu/editFood',
      children: [
        {
          path: '/editMenu/editFood',
          name: 'editFood',
          component: resolve => require(['@/components/editMenu/editFood/editFood'], resolve)
        },
        {
          path: '/editMenu/editHotFood',
          name: 'editHotFood',
          component: resolve => require(['@/components/editMenu/editHotFood/editHotFood'], resolve)
        }
      ]
    }
  ]
})
