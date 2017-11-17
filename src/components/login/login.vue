<template>
  <div class="login">
    <transition name="fade">
      <div v-show="show" class="user" :class="{show:$store.state.isLogin==true}">
        <img @click="showLogin" v-if="$store.state.isLogin==false" src="./no_login.png">
        <img @click="signOut" v-if="$store.state.isLogin==true&&!$route.query.username" src="./already_login.png">
        <img v-if="$store.state.isLogin==true&&$route.query.username" src="./already_login.png">
        <p class="role" v-if="$store.state.isLogin==true">{{userName}}</p>
      </div>
    </transition>
    <transition name="fade">
      <v-login @fromLogin="showIsLogin" v-show="$store.state.loginModule"></v-login>
    </transition>
    <transition name="fade">
      <v-auth v-if="$store.state.isLogin==true"></v-auth>
    </transition>
    <div v-show="showInstruction" class="fixed_" @click="showInstruction=false"></div>
    <div class="explain" >
      <span @click="showInstruction=!showInstruction">操作说明</span>
      <span>用户手册下载</span>
    </div>
    <div v-show="showInstruction" class="instruction">
      <img v-if="$store.state.isLogin==false" src="~common/images/1_dengluqian.png">
      <img v-if="$store.state.isLogin==true&&$store.state.type==0" src="~common/images/4_shaoaj_zhuye.png">
      <img v-if="$store.state.isLogin==true&&$store.state.type==1" src="~common/images/2_fengqj_zhuye.png">
      <img v-if="$store.state.isLogin==true&&$store.state.type==2" src="~common/images/3_shenglz_zhuye.png">
    </div>
  </div>
</template>
<script>
  import login from '@/base/login/login'
  import auth from '@/base/auth/auth'
  export default {
    data: () => ({
      show: true,
      showInstruction: false,
      userName: null
    }),
    components: {
      vLogin: login,
      vAuth: auth
    },
    created () {
      this.userName = window.localStorage.getItem('linkman')
      if (this.$route.query.username) {
        let str = ''
        for (var i = 0; i < this.$route.query.username.length; i++) {
          str += String.fromCharCode(this.$route.query.username.charCodeAt(i) + 11)
        }
        this.$store.dispatch('login/active', {
          Vue: this,
          uid: str
        })
      } else {
        this.login()
      }
    },
    methods: {
      // 点击头像显示登录窗口
      showLogin () {
        this.show = false
        this.$store.commit('SHOW_LOGIN', {
          loginModule: true
        })
      },
      // 帐号密码登录
      login () {
        this.$store.dispatch('common/set/USERTOKEN', {
          Vue: this,
          uid: window.localStorage.getItem('uname'),
          password: window.localStorage.getItem('password')
        })
      },
      // 获取代办个数
      getApplyNub () {
        this.$store.dispatch('get/apply/nub', {
          Vue: this,
          userID: window.localStorage.getItem('userID')
        })
      },
      // 改变已登录状态
      showIsLogin (data) {
        this.show = data.show
        this.userName = data.userName
      },
      // 退出登录
      signOut () {
        localStorage.clear()
        this.userName = null
        this.$store.state.isLogin = false
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.fixed_
  width:100%
  height:100%
  position:fixed
  left:0
  top:0
  z-index:99999
.instruction
  width:80%
  position:fixed
  left:50%
  margin-left:-40%
  top:15%
  z-index:9999
  img
    width:100%
    height:100%
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
.explain
  width:200px
  height:50px
  text-align:center
  position:fixed
  bottom:20px
  left:50%
  margin-left:-100px
  color:#fff
  font-size:12px
  cursor:pointer
  span
    text-decoration:underline
</style>