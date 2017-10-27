<template>
  <div class="show_rule">
    <div>
      <el-carousel trigger="click" :autoplay="false" arrow="never">
        <el-carousel-item v-for="item in imgUrl" :key="item.url">
          <img :src="item.url">
        </el-carousel-item>
      </el-carousel>
      <el-button type="primary" @click="hideShow">点击确认</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      imgUrl: [{
        url: './static/rule.jpg'
      }, {
        url: './static/rule1.jpg'
      }]
    }),
    methods: {
      hideShow () {
        this.$emit('hide')
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.show_rule
  width:100%
  height:100%
  position:fixed
  top:0
  left:0
  background-color:rgba(0,0,0,0.6)
  text-align:center
  z-index:999
  >div
    width:500px
    height:90%
    position:absolute
    left:50%
    margin-left:-250px
    .el-carousel,.el-carousel__container,el-carousel__item
      height:100% !important
    img
      width:420px
</style>