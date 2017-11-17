<template>
  <div>
    <div v-show="showInstruction" class="fixed_" @click="showInstruction=false"></div>
    <div class="explain" @click="showInstruction=!showInstruction">操作说明</div>
    <div v-show="showInstruction" class="instruction">
      <img src="~common/images/11_dingdandayin.png">
    </div>
    <div class="logo">
      <h1>建邺智慧后勤管理中心</h1>
      <div>
        <img class="user" src="../login/already_login.png" @click="$router.push('/login')">
        <span class="rule_tit">全部订单</span>
        <span class="back_home" @click="$router.go(-1)">返回上一页</span>
      </div>
    </div>
    <div class="order_nav">
      <router-link to="/allOutSale/hotFood">熟食</router-link>
      <router-link to="/allOutSale/food">面食</router-link>
    </div>
      <router-view class=all_order></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      allOrder: {},
      multipleSelection: [],
      showInstruction: false
    }),
    created () {
    },
    methods: {
      // 打印订单http://127.0.0.1/tsc/print.php
      printOrder () {
        this.axios.post('http://127.0.0.1/tsc/print.php', {list: this.multipleSelection}).then(response => {
          if (response.data.status === 1) {
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~common/css/common.styl'
.order_nav
  width:70%
  height:40px
  line-height:40px
  position:absolute
  width:70%
  left:50%
  top:180px
  margin-left:-35%
  z-index:9999
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
.all_order
  position:absolute
  width:70%
  left:50%
  margin-left:-35%
  top:260px
  height:240px
  overflow-y:scroll
  background-color:#fff
.order_btn
  position:fixed
  right:15%
  top:520px
</style>