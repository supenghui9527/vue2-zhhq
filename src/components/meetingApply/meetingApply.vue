<template>
  <div class="agency">
    <div class="logo">
      <h1>建业智慧后勤管理中心</h1>
      <div>
        <img class="user" src="../login/already_login.png" @click="$router.push('/login')">
        <router-link to="" class="go_sale">会务服务</router-link>
        <span class="rule_tit" @click="showRule=!showRule">申请规则</span>
        <router-link to="" class="rule_tit">我的申请</router-link>
      </div>
    </div>
    <transition name="fade">
      <div v-show="showRule" class="rule_detail">
        <h5>
          <span>代办须知：</span>
        </h5>
        <ul>
          <li>1、每周五更新预定菜单；</li>
          <li>2、预定时间：8：00-9：00、12：00-14：00；</li>
          <li>3、预定时间内可以，可以取消预定内容，14：00之后，无法取消预定状态；</li>
          <li>4、面点：每天最多可选择两个品类，每个最多十个预订量；</li>
          <li>5、凉菜：每个品类只能一份预订量；</li>
        </ul>
      </div>
    </transition>
    <transition name="fade">
      <router-view class="meeting"></router-view>
    </transition>
  </div>
</template>
<script>
  export default {
    data: () => ({
      showRule: false // 显示外卖规则
    })
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/css/common.styl'
.meeting
  position:absolute
  width:700px
  left:50%
  margin-left:-350px
  top:240px
  height:220px
  background-color:rgba(197,203,227,0.8)
</style>