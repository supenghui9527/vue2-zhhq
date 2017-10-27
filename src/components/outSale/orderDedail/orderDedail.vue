<template>
  <div class="orderDetail">
    <h5>
      <p class="address">{{address}}</p> 
    </h5>
    <div class="food_list clearfix">
      <dl>
        <dt class="active_tit">
          <span class="created_time">订单生成时间</span>
          <span>订单编号：{{orderDetail.orderID}}</span>
          <span class="price">共计：￥{{orderDetail.allPrice}}</span>
          <span @click="cancelOrder" class="order_status">撤销</span>
        </dt>
        <dd v-for="(item,index) in orderDetail.detailList" class="detail_item" :class="{active_item1:(index+1)%2==0}">
          <span class="created_time">{{orderDetail.createTime}}</span>
          <span class="food_name">{{item.foodName}}</span>
          <span>>></span>
          <span class="price">￥{{item.foodPrice*item.foodCount}}</span>
        </dd>
      </dl>
    </div>
  </div>
</template>
<script>
  import time from '@/common/js/time'
  export default {
    data: () => ({
      orderDetail: {},
      address: ''
    }),
    created () {
      setTimeout(() => {
        this.getDetail()
      }, 20)
    },
    methods: {
      // 查看订单详情
      getDetail () {
        this.$store.dispatch('go/order', {
          Vue: this,
          outFoodID: this.$route.query.outFoodID
        })
      },
      // 撤销订单
      cancelOrder () {
        if (time(this, '8:00', '14:00')) {
          this.$store.dispatch('cancel/order', {
            Vue: this,
            outFoodID: window.localStorage.getItem('orderID')
          })
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .orderDetail
    text-align:left !important
    .active_item1
      background-color:#14339d !important
    .active_tit
      position:relative
      width:100%
      height:43px
      line-height:43px
      color:#a1b4ff
      font-size:14px
      background-color:#14339d
    .address
      background-color:#476ade
      font-size:14px
      width:120px
      color:#fff
      height:30px
      line-height: 30px
      text-align:center
    dt
      font-size:0 !important
      text-align:left !important
      position:relative
    span
      float:left
      font-size:14px
    .detail_item
      width:100%
      height:30px
      line-height:30px
      background-color:#1147b1
    .created_time
      width:40%
      box-sizing:border-box
      padding-left:50px
    .price
      width:15%
      padding-left:20px
    .order_status
      position:absolute
      padding:0 10px
      height:22px
      top:50%
      right:50px
      margin-top:-11px
      line-height:22px
      text-align:center
      background-color:#ff0090
      border-radius:4px
      cursor: pointer
    .food_name
      width:20%
    dl
      width:100%
      color:#98aef9
</style>