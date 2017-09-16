<template>
  <div class="login">
    <div v-show="show" class="user show">
      <img @click="showLogin" v-if="$store.state.isLogin==false" src="./no_login.png">
      <img v-if="$store.state.isLogin==true" src="./already_login.png">
    </div>
    <transition name="fade">
      <v-login @fromLogin="showIsLogin" v-show="$store.state.loginModule"></v-login>
    </transition>
    <transition name="fade">
      <v-auth v-if="$store.state.isLogin==true"></v-auth>
    </transition>
  </div>
</template>

<script>
  import login from '@/base/login/login'
  import auth from '@/base/auth/auth'
  export default {
    data: () => ({
      show: true
    }),
    components: {
      vLogin: login,
      vAuth: auth
    },
    created () {
      this.$store.dispatch('common/set/USERTOKEN', {
        Vue: this,
        accessToken: window.localStorage.getItem('accessToken')
      })
    },
    methods: {
      // 点击头像显示登录窗口
      showLogin () {
        this.show = false
        this.$store.commit('SHOW_LOGIN', {
          loginModule: true
        })
      },
      // 改变已登录状态
      showIsLogin (data) {
        this.show = data
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.user
  width:145px
  height:145px
  position:absolute
  left:50%
  top:30%
  margin-top:-72.5px
  margin-left:-72.5px
@keyframes show 
  0% 
    opacity: 0
    top: 50%
  100% 
    opacity: 1
    top: 30%
.show
  animation: show 1s
</style>