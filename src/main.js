// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './vuex/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '@/common/css/reset.css'
// http拦截器
import '@/interceptors/http'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
