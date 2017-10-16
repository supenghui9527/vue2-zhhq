<template>
  <div class="agency">
    <div class="logo">
      <h1>建邺智慧后勤管理中心</h1>
      <div>
        <img class="user" src="../login/already_login.png" @click="$router.push('/login')">
        <router-link to="" class="go_sale">会务服务</router-link>
        <span class="rule_tit" @click="showRule=!showRule">申请规则</span>
        <span @click="$router.push('/login')">返回主页</span>
      </div>
    </div>
    <transition name="fade">
      <div v-show="showRule" class="rule_detail">
        <h5>
          <span>代办须知：</span>
        </h5>
        <ul>
          <li>1、申请使用前请先联系（188）确认会议室可以使用后，同时填写此申请单，并及时将填写好的表格（签字盖章）提交管理中心办公室（0311）</li>
          <li>2、“会议室使用申请表”报送后，若需协调会议室内部相关事宜，如开门，摆放席卡、悬挂横幅、调试设备等，申请单申请审核通过之后，联系管理中心行政科（办公司电话：87778366；手机：13912958737）。若需协调外部事宜，如控制电梯、车辆停放等，可以联系管理中心办公室。</li>
          <li>3、如因特殊原因临时决定不使用会议室，应及时与管理中心办公室联系告知情况。</li>
          <li>4、横幅制作联系电话：68698518，QQ：95393981。（可另选其他单位制作）</li>
        </ul>
      </div>
    </transition>
    <div class="all_agency">
      <div>
        <router-link to="/meetingApply/apply">会议申请</router-link>
        <router-link to="/meetingApply/myApply">我的申请</router-link>
      </div>
      <router-view class="meeting_container"></router-view>
    </div>
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
.all_agency
  position:absolute
  width:700px
  left:50%
  margin-left:-350px
  top:240px
  .meeting_container
    background-color:rgba(197,203,227,0.8)
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