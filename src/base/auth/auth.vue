<template>
  <div>
    <div v-if="$store.state.type==0" class="auth">
      <router-link to="outSale"><img src="~common/images/outsale.png" /></router-link>
      <router-link to="repair"><img src="~common/images/repair.png" /></router-link>
      <router-link to="myApply"><img src="~common/images/apply.png" /></router-link>
      <router-link class="my-agency" to="agency">
        <img src="~common/images/mine.png" />
        <div v-if="$store.state.daibanCount" class="agency-nub">{{$store.state.daibanCount}}</div>
      </router-link>
    </div>
    <div v-if="$store.state.type==1" class="auth">
      <router-link to="meetingApply"><img src="~common/images/meeting.png" /></router-link>
      <router-link to="applyUseCar"><img src="~common/images/car.png" /></router-link>
      <router-link to="repair"><img src="~common/images/repair.png" /></router-link>
      <router-link to="applyMeal"><img src="~common/images/foodapply.png" /></router-link>
      <router-link to="outSale"><img src="~common/images/outsale.png" /></router-link>
      <router-link to="myApply"><img src="~common/images/apply.png" /></router-link>
      <router-link class="my-agency" to="agency">
        <img src="~common/images/mine.png" />
        <div v-if="$store.state.daibanCount" class="agency-nub">{{$store.state.daibanCount}}</div>
      </router-link>
      <!-- <router-link to="#"><img src="~common/images/combine.png" /></router-link> -->
    </div>
    <div v-if="$store.state.type==2" class="auth">
      <router-link to="editMenu"><img src="~common/images/menu.png" /></router-link>
      <router-link to="allOutSale"><img src="~common/images/print.png" /></router-link>
      <router-link to="myApply"><img src="~common/images/apply.png" /></router-link>
      <router-link class="my-agency" to="agency">
        <img src="~common/images/mine.png" />
        <div v-if="$store.state.daibanCount" class="agency-nub">{{$store.state.daibanCount}}</div>
      </router-link>
      <router-link to="outSale"><img src="~common/images/outsale.png" /></router-link>
      <router-link to="repair"><img src="~common/images/repair.png" /></router-link>
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
    .my-agency
      position:relative
    .agency-nub
      width:30px
      height:30px
      line-height:30px
      position:absolute
      right:0
      top:0
      background-color:#f00
      border-radius:50%
      color:#fff
    a
      display:inline-block
    img
      width:120px
      height:120px
      padding: 2px 5px
</style>