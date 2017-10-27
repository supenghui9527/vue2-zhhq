<template>
  <div>
    <div class="logo">
      <h1>建邺智慧后勤管理中心</h1>
      <div>
        <img class="user" src="../../login/already_login.png" @click="$router.push('/login')">
        <router-link to="#" class="go_sale">申请详情</router-link>
        <span @click="$router.push('/login')">返回主页</span>
      </div>
    </div>
    <transition name="fade">
      <router-view class="all_agency"></router-view>
    </transition>
  </div>
</template>
<script>
  export default {
    data: () => ({

    })
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" >
@import '~common/css/common.styl'
.all_agency
  position:absolute
  width:700px
  left:50%
  margin-left:-350px
  top:240px
  div
    a
      display:inline-block
      width:80px
      height:25px
      line-height:25px
      color:#fff
      background-color:#476ade
      text-align:center
      border-radius:0 20px 0 0
      font-size:14px
      text-decoration:none
    .router-link-active
      background-color:#1c3da6
</style>