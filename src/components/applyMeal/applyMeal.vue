<template>
  <div class="outsale">
    <div class="logo">
      <h1>建邺智慧后勤管理中心</h1>
      <div>
        <img class="user" src="../login/already_login.png" @click="$router.push('/login')">
        <router-link to="#" class="go_sale">用餐申请</router-link>
        <span class="rule_tit" @click="showRule=!showRule">申请规则</span>
        <span class="back_home" @click="$router.push('/login')">返回主页</span>
      </div>
    </div>
    <transition name="fade">
      <div v-show="showRule" class="rule_detail">
        <i class="el-icon-close close_rule" @click="showRule?showRule=false:showRule"></i>
        <h5>
          <span>用餐申请规则：</span>
        </h5>
        <ul>
          <li>1、请各申请单位严格执行《党政机关厉行节约反对浪费条例》、《党政机关国内公务接待管理规定》等相关规定，填报需完整准确；</li>
          <li>2、申请用餐前请管理中心联系确认后再填写本申请单，联系电话：87778985；</li>
          <li>3、本申请单填写完成后请送至0311办公室，联系电话：87778009；</li>
        </ul>
      </div>  
    </transition>
    <div class="all_agency">
      <div>
        <router-link to="/applyMeal/submitMealApply">申请用餐</router-link>
        <router-link to="/applyMeal/myMealApply">我的申请</router-link>
      </div>
      <router-view class="food_container"></router-view>
    </div>
    <div v-show="showInstruction" class="fixed_" @click="showInstruction=false"></div>
    <div class="explain" @click="showInstruction=!showInstruction">操作说明</div>
    <div v-show="showInstruction" class="instruction">
      <img src="~common/images/8_yongcanshenqing.png">
    </div>
  </div>
</template>
<script>
  import rule from '@/base/rule/rule'
  export default {
    data: () => ({
      showRule: false,
      showInstruction: false
    }),
    components: {
      rule: rule
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~common/css/common.styl'
.all_agency
  position:absolute
  width:70%
  left:50%
  margin-left:-35%
  top:180px
  min-width:700px
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