<template>
  <div>
    <div v-if="$store.state.type==0" class="auth">
      <router-link to="#"><img src="~common/images/apply.png" /></router-link>
      <router-link to="/agency"><img src="~common/images/mine.png" /></router-link>
      <router-link to="/outSale"><img src="~common/images/outsale.png" /></router-link>
      <router-link to="#"><img src="~common/images/repair.png" /></router-link>
    </div>
    <div v-if="$store.state.type==1" class="auth">
      <router-link to="#"><img src="~common/images/apply.png" /></router-link>
      <router-link to="/agency"><img src="~common/images/mine.png" /></router-link>
      <router-link to="/outSale"><img src="~common/images/outsale.png" /></router-link>
      <router-link to="#"><img src="~common/images/repair.png" /></router-link>
      <router-link to="#"><img src="~common/images/car.png" /></router-link>
      <router-link to="#"><img src="~common/images/foodapply.png" /></router-link>
      <router-link to="#"><img src="~common/images/meeting.png" /></router-link>
      <router-link to="#"><img src="~common/images/combine.png" /></router-link>
    </div>
    <div v-if="$store.state.type==2" class="auth">
      <router-link to="#"><img src="~common/images/apply.png" /></router-link>
      <router-link to="/agency"><img src="~common/images/mine.png" /></router-link>
      <router-link to="/outSale"><img src="~common/images/outsale.png" /></router-link>
      <router-link to="#"><img src="~common/images/repair.png" /></router-link>
      <router-link to="#"><img src="~common/images/menu.png" /></router-link>
      <router-link to="/allOutSale"><img src="~common/images/print.png" /></router-link>
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({

    })
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .auth
    width:600px
    position: absolute
    left:50%
    margin-left:-300px
    top: 45%
    text-align:center
    a
      display:inline-block
    img
      width:120px
      height:120px
      padding: 2px 5px
</style>