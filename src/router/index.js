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
    {
      path: '/agency',
      name: 'agency',
      component: resolve => require(['@/components/agency/agency'], resolve)
    }
  ]
})
