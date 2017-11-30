<template>
  <div class="agency">
    <div class="logo">
      <h1>建邺智慧后勤管理中心</h1>
      <div>
        <img class="user" src="../login/already_login.png" @click="$router.push('/login')">
        <router-link to="" class="go_sale">会务服务</router-link>
        <span class="rule_tit" @click="showRule=!showRule">申请规则</span>
        <span class="back_home" @click="$router.go(-1)">返回上一页</span>
      </div>
    </div>
    <transition name="fade">
      <div v-show="showRule" class="rule_detail">
        <i class="el-icon-close close_rule" @click="showRule?showRule=false:showRule"></i>
        <h5>
          <span>申请规则：</span>
        </h5>
        <ul>
          <li>1.申请会议室前请先联系区委办（电话：87778188），确定会议时间与大日程是否冲突。</li>
          <li>2.提交申请后，若需要协调会议室内部相关事宜，如开门、摆放席卡、悬挂横幅、调试设备等，请联系管理中心行政科（电话：87778366；手机：13912958737）</li>
          <li>3.如因特殊原因临时决定不使用会议室，应及时与管理中心办公室联系。</li>
          <li>4.横幅制作电话：68698518，QQ：95393981。（可另选其他单位制作）</li>
        </ul>
      </div>
    </transition>
    <div class="all_agency">
      <div>
        <router-link to="/meetingApply/apply">会议申请</router-link>
        <!-- <router-link to="/meetingApply/myApply">我的申请</router-link> -->
      </div>
      <router-view class="meeting_container"></router-view>
    </div>
    <div v-show="showInstruction" class="fixed_" @click="showInstruction=false"></div>
    <div class="explain" @click="showInstruction=!showInstruction">操作说明</div>
    <div v-show="showInstruction" class="instruction">
      <img src="~common/images/5_huiwufuwu.png">
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      showRule: false, // 显示外卖规则
      showInstruction: false
    }),
    created () {
      this.showRule = true
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/css/common.styl'
.all_agency
  position:absolute
  width:70%
  min-width:700px
  left:50%
  margin-left:-35%
  top:180px
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