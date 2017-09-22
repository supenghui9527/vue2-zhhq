<template>
  <div id="app" v-loading.fullscreen.lock="$store.state.fullscreenLoading">
    <router-view class="router"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.fade-enter-active, .fade-leave-active 
  transition: opacity .2s
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ 
  opacity: 0
html,body,#app
  height: 100%
  width:100%
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  background:url('./common/images/bg.jpg') no-repeat
  background-size:100% 100%
  position:relative
  overflow:hidden
  .router
    height: 100%
    width:100%
</style>
