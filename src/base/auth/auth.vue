<template>
  <div class="auth">
    <router-link to="/agency"><img src="./mine.png" /></router-link>
    <router-link to="#"><img src="./apply.png" /></router-link>
    <router-link to="/outSale"><img src="./outsale.png" /></router-link>
    <router-link to="#"><img src="./repair.png" /></router-link>
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
    width:700px
    position: absolute
    left:50%
    margin-left:-350px
    bottom:200px
    text-align:center
    a
      display:inline-block
    img
      width:120px
      height:120px
</style>