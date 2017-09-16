<template>
  <div class="login">
    <img src="./logo.png">
    <input class="user" type="text" placeholder="帐号/手机号" v-model="userName" />
    <input type="password" placeholder="密码" v-model="password" />
    <div v-show="err!==null" class="err">{{err}}</div>
    <div class="btn" @click="login">登录</div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      userName: null,
      password: null,
      err: null
    }),
    props: ['show'],
    methods: {
      login () {
        this.$store.dispatch('login/go/login', {
          Vue: this,
          uid: this.userName,
          password: this.password
        })
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .login
    width:366px
    height:466px
    background-color:rgba(255,255,255,0.4)
    position:absolute
    left:50%
    top:50%
    margin-top:-233px
    margin-left:-183px
    text-align:center
    .err
      width:240px
      height:30px
      line-height:30px
      margin:0 auto
      font-size:16px
      text-align:left
      color:#c00020
    .user
      margin-bottom:30px
    input
      width:240px
      height:30px
      background-color:transparent
      border:none
      outline:none
      border-bottom:1px solid #323232
    img
      width:88px
      height:88px
      margin: 0 auto
      display:block
      padding:74px 0 40px 0
  .btn
    width:240px
    height:40px
    position:absolute
    left:50%
    margin-left:-120px
    bottom:50px
    line-height:40px
    text-align:center
    background-color:#00a3ff
    font-size:20px
    color:#fff
</style>