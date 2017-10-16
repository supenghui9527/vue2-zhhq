import router from '@/router'

// 监听路由跳转
router.beforeEach((to, from, next) => {
  // 判断本地是否有数据
  if (to.path === '/login' && (window.localStorage.userInfo || window.sessionStorage.userInfo)) {
    let json = window.sessionStorage.userInfo ? JSON.parse(window.sessionStorage.userInfo) : JSON.parse(window.localStorage.userInfo)
    router.push(json.menu[0].secondmenulist[0].href)
  } else if (to.path !== '/login' && !(window.localStorage.userInfo || window.sessionStorage.userInfo)) {
    router.push('/login')
  } else {
    next()
  }
})
