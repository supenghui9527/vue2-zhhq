<template>
  <div class="login">
    <transition name="fade">
      <div v-show="show" class="user" :class="{show:$store.state.isLogin==true}">
        <img @click="showLogin" v-if="$store.state.isLogin==false" src="./no_login.png">
        <img @click="signOut" v-if="$store.state.isLogin==true" src="./already_login.png">
        <p class="role" v-if="$store.state.type==0&&$store.state.isLogin==true">基础账号</p>
        <p class="role" v-else-if="$store.state.type==1&&$store.state.isLogin==true">科长</p>
        <p class="role" v-else-if="$store.state.type==2&&$store.state.isLogin==true">餐科长</p>
      </div>
    </transition>
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
      this.login()
    },
    methods: {
      // 点击头像显示登录窗口
      showLogin () {
        this.show = false
        this.$store.commit('SHOW_LOGIN', {
          loginModule: true
        })
      },
      login () {
        this.$store.dispatch('common/set/USERTOKEN', {
          Vue: this,
          accessToken: window.localStorage.getItem('accessToken')
        })
      },
      // 改变已登录状态
      showIsLogin (data) {
        this.show = data
      },
      signOut () {
        localStorage.removeItem('accessToken')
        this.$store.state.isLogin = false
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
  top:50%
  margin-top:-72.5px
  margin-left:-72.5px
  transition: all 1s
.show
  top: 25%
.role
  text-align:center
  color:#fff
  font-size:20px
</style>