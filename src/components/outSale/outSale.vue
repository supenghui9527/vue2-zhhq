<template>
  <div class="outsale">
    <div class="logo">
      <h1>建业智慧后勤管理中心</h1>
      <div>
        <img class="user" src="../login/already_login.png" @click="$router.push('/login')">
        <router-link to="/outSale/chooseFood" class="go_sale">预定外卖</router-link>
        <span class="rule_tit" @click="showRule=!showRule">订单规则</span>
        <router-link to="/outSale/allOrder" class="rule_tit">全部订单</router-link>
      </div>
    </div>
    <transition name="fade">
      <div v-show="showRule" class="rule_detail">
        <i class="el-icon-close close_rule" @click="showRule?showRule=false:showRule"></i>
        <h5>
          <span>预定外卖规则：</span>
        </h5>
        <ul>
          <li>1、每周五更新预定菜单；</li>
          <li>2、预定时间：8：00-9：00、12：00-14：00；</li>
          <li>3、预定时间内可以，可以取消预定内容，14：00之后，无法取消预定状态；</li>
          <li>4、面点：每天最多可选择两个品类，每个最多十个预订量；</li>
          <li>5、凉菜：每个品类只能一份预订量；</li>
        </ul>
      </div>
    </transition>
    <keep-alive>
      <router-view class="food_container"></router-view>
    </keep-alive>
  </div>
</template>
<script>
  export default {
    data: () => ({
      showRule: false // 显示外卖规则
    })
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .outsale
    .address_active
      background-color:#7f9af5 !important
    .address1
      display:inline-block
      text-align:center
      color:#fff
      background-color:rgba(239,239,239,0.4)
      height:22px
      line-height:22px
      padding:0 10px
      margin-right:10px
    .active_item
      background-color:#ff0090 !important
    .logo
      position:absolute
      width:700px
      left:50%
      top:100px
      margin-left:-350px
      div
        height:60px
        padding-top:10px
        line-height:60px
        font-size:18px
        font-size:0
        .go_sale
          margin-right:10px
          background-color:rgba(239,239,239,0.4)
          padding:0 10px
        span,a
          font-size:16px
          display:inline-block
          cursor: pointer
          color:#fff
          text-decoration:none
          height:22px
          line-height:22px
        .rule_tit
          width:78px
          padding-left:24px
          border-radius:4px
          margin-right:10px
          background:url('./text.png') no-repeat 4px center rgba(239,239,239,0.4)
          background-size:16px 16px
          color:#868686
      h1
        font-size:28px
        color:#fff
      .user
        width:60px
        height:60px
        padding-right:6px
        cursor: pointer
    // 外卖订单规则
    .close_rule
      padding:10px
      position:absolute
      right:0
      top:0
      color:#f00
    .rule_detail
      width:570px
      padding:20px
      height:240px
      position:absolute
      top:260px
      left:50%
      margin-left:-285px
      background-color:#fff
      border-radius:2px
      z-index:3
      li
        line-height:28px
      h5
        font-size:0
        padding-bottom:26px
        span
          height:30px
          line-height:30px
          font-size:16px
          display:inline-block
          color:#323232
        .pos
          width:130px
          background-color:#4593ff
          border-radius:6px
          text-align:center
          color:#fff
    // 外卖全部订单
    .all_order
      dl,dt,dd
        width:100%
        color:#a1b4ff
      .food_name
        overflow:hidden 
        text-overflow:ellipsis
        display:-webkit-box
        -webkit-box-orient:vertical
        -webkit-line-clamp:1
      .active_tit
        position:relative
        width:100%
        height:43px
        line-height:43px
        color:#a1b4ff
        font-size:14px
        background-color:#14339d
        span
          float:left
          width:33.33%
          padding-left:40px
          box-sizing:border-box
      .detail_item
        height:30px
        line-height:30px
        background-color:#14339d
        span
          float:left
          width:33.33%
          padding-left:40px
          box-sizing:border-box
      .active_item1
        background-color:#1147b1 !important
    .food_container,.orderDetail,.all_order
      position:absolute
      width:700px
      left:50%
      margin-left:-350px
      top:240px
      .order
        position:relative
        width:100%
        height:35px
        line-height:35px
        color:#a1b4ff
        font-size:14px
        background-color:#14339d
        text-align:center
        span
          float:left
        .go_order
          position:absolute
          width:20px
          height:100%
          right:30%
        .btn
          position:absolute
          width:70px
          height:24px
          line-height:24px
          right:60px
          top:50%
          margin-top:-12px
          background-color:#143ba4
          cursor: pointer
        .time
          width:60%
          left:0
          padding-left:30px
          text-align:left
        .mianshi
          width:20%
          text-align:left
          box-sizing:border-box
          padding-left:30px
      h5
        color:#fff
        font-size:0
        .address
          width:110px !important
          border-radius:0 !important
        .address,a
          background-color:#476ade
          font-size:14px
          display:inline-block
          width:80px
          height:30px
          line-height: 30px
          text-align:center
          margin-right:4px
          border-radius:0 20px 0 0
          text-decoration:none
      .food_list
        width:100%
        background-color:#1839aa
        .noodles
          width:70%
          background-color:#1839aa
          font-size:0
          .item
            width:33.33%
            height:30px
            line-height:30px
            display:inline-block
            color:#fff
            font-size:14px
            background-color:#1758be
            border-right:1px solid #a1b4ff
            box-sizing:border-box
            border-bottom:1px solid #a1b4ff
            span
              width:75px
              display:inline-block
              text-align:center
            div
              display:inline-block
              width:60px
        .cold_dishes
          width:30%
          background-color:#14339d
          dd
            height:30px
            line-height:30px
            width:100%
            color:#fff
            font-size:14px
            text-align:center
            background-color:#1758be
            border-bottom:1px solid #a1b4ff
            box-sizing:border-box
        .active_tit
          width:100%
          height:40px
          line-height:40px
          text-align:center
          color:#fff
          font-size:14px
          display:block
</style>