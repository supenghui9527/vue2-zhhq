<template>
  <div class="outsale">
    <div class="logo">
      <h1>建邺智慧后勤管理中心</h1>
      <div>
        <img class="user" src="../login/already_login.png" @click="$router.push('/login')">
        <router-link to="/outSale/chooseFood" class="go_sale">预定外卖</router-link>
        <span class="rule_tit" @click="showRule=!showRule">订单规则</span>
        <span class="back_home" @click="$router.go(-1)">返回上一页</span>
        <span class="menu" @click="showMenu=!showMenu;hotMenu=false">面食菜单</span>
        <span class="menu" @click="hotMenu=!hotMenu;showMenu=false">熟食菜单</span>
      </div>
    </div>
    <transition name="fade">
      <div v-show="showRule" class="rule_detail">
        <i class="el-icon-close close_rule" @click="showRule?showRule=false:showRule"></i>
        <h5>
          <span>预定外卖规则：</span>
        </h5>
        <ul>
          <li>1、预定时间：12：00-14：00。</li>
          <li>2、16：00之前可以撤销预定的外卖并可以再次下单，每个用户每天只能有一单。</li>
          <li>3、16：00之后可以进行取码取货，取码之后不可撤销，取货时间18：00-18：20。</li>
          <li>4、面点：每天最多可选择两个品类，每个最多十个预订量。</li>
          <li>5、熟食：每个品类只能预订一份。</li>
        </ul>
      </div>
    </transition>
    <div v-show="showMenu" class="hot_menu">
      <i class="el-icon-close close_menu" @click="showMenu?showMenu=false:showMenu;hotMenu=false"></i>
      <h6><span>一周面食外卖菜单</span></h6>
      <table border="1" width="500" height="344" align="center">
        <tr v-for="(item,index) in foodMenu" style="text-align: center">
          <td style="background-color:#f0f0f0">{{week[index]}}</td>
          <td>{{item.foodName1}}</td>
          <td>{{item.foodName2}}</td>
          <td>{{item.foodName3}}</td>
          <td>{{item.foodName4}}</td>
          <td>{{item.foodName5}}</td>
          <td>{{item.foodName6}}</td>
        </tr>
      </table>
    </div>
    <div v-show="hotMenu" class="hot_menu">
      <i class="el-icon-close close_menu" @click="hotMenu?hotMenu=false:hotMenu;showMenu=false"></i>
      <h6><span>一周熟食外卖菜单</span></h6>
      <table border="1" width="500" height="344" align="center">
        <tr v-for="(item,index) in menu" style="text-align: center">
          <td style="background-color:#f0f0f0">{{week[index]}}</td>
          <td>{{item.foodName1}}</td>
          <td>{{item.foodName2}}</td>
          <td>{{item.foodName3}}</td>
        </tr>
      </table>
    </div>
    <router-view class="food_container"></router-view>
    <div v-show="showInstruction" class="fixed_" @click="showInstruction=false"></div>
    <div class="explain" @click="showInstruction=!showInstruction">操作说明</div>
    <div v-show="showInstruction" class="instruction">
      <img src="~common/images/9_yudingwaimai.png">
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      showRule: false, // 显示外卖规则
      showInstruction: false,
      showMenu: false,
      hotMenu: false,
      week: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      menu: [],
      foodMenu: []
    }),
    created () {
      this.$store.dispatch('get/menu', {
        Vue: this
      })
      this.$store.dispatch('get/foodmenu', {
        Vue: this,
        place: 1
      })
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/css/common.styl'
  .outsale
    .menu
      padding:0 20px
      border-radius: 4px
      margin-right: 10px
      background-color:rgba(239,239,239,0.4)
      color: #868686
    .show_menu,.hot_menu
      width:600px
      position:fixed
      top:180px
      left:50%
      margin-left:-250px
      z-index:999999
      border-radius:6px
      img
        border-radius:6px
    .hot_menu
      background-color:#fff
      padding-bottom:30px
      h6
        text-align:center
        line-height:50px
        span
          border-bottom:4px solid #4086be
    .close_menu
      position:absolute
      right:10px
      top:10px
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
      width:70%
      left:50%
      margin-left:-35%
      top:180px
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