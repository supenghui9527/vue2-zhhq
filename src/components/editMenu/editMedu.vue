<template>
  <div class="outsale">
    <div class="logo">
      <h1>建邺智慧后勤管理中心</h1>
      <div>
        <img class="user" src="../login/already_login.png" @click="$router.push('/login')">
        <router-link to="#" class="go_sale">菜单编辑</router-link>
      </div>
    </div>
    <transition name="fade">
      <rule v-show="showRule" :rule="showRule" @closeRule="showRule=!showRule"></rule>
    </transition>
    <div class="all_agency">
      <div>
        <router-link to="/applyMeal/myMealApply">我的申请</router-link>
        <router-link to="/applyMeal/submitMealApply">申请用餐</router-link>
        <router-link to="/applyMeal/mealDetail">申请详情</router-link>
      </div>
      <router-view class="food_container"></router-view>
    </div>
  </div>
</template>
<script>
  import rule from '@/base/rule/rule'
  export default {
    data: () => ({
      showRule: false
    }),
    components: {
      rule: rule
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>