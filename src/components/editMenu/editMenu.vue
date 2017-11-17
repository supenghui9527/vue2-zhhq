<template>
  <div class="outsale">
    <div class="logo">
      <h1>建邺智慧后勤管理中心</h1>
      <div>
        <img class="user" src="../login/already_login.png" @click="$router.push('/login')">
        <router-link to="#" class="go_sale">菜单编辑</router-link>
        <span class="back_home" @click="$router.go(-1)">返回上一页</span>
      </div>
    </div>
    <transition name="fade">
      <rule v-show="showRule" :rule="showRule" @closeRule="showRule=!showRule"></rule>
    </transition>
    <div class="all_agency">
      <div>
        <router-link to="/editMenu/editFood">面食编辑</router-link>
        <router-link v-if="showHotFood" to="/editMenu/editHotFood">熟食编辑</router-link>
      </div>
      <router-view class="food_container"></router-view>
    </div>
    <div v-show="showInstruction" class="fixed_" @click="showInstruction=false"></div>
    <div class="explain" @click="showInstruction=!showInstruction">操作说明</div>
    <div v-show="showInstruction" class="instruction">
      <img src="~common/images/10_caidanbianji.png">
    </div>
  </div>
</template>
<script>
  import rule from '@/base/rule/rule'
  export default {
    data: () => ({
      showRule: false,
      showInstruction: false,
      roleId: null,
      showHotFood: true
    }),
    components: {
      rule: rule
    },
    created () {
      this.roleId = localStorage.getItem('roleId')
      if (this.roleId === '402848d05f8edf68015f900ff8da0000') {
        this.showHotFood = false
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/css/common.styl'
.logo
  width:80% !important
  margin-left:-40% !important
.all_agency
  position:absolute
  width:80%
  left:50%
  margin-left:-40%
  top:180px
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