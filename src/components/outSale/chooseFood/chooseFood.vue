<template>
  <div class="food_container">
    <h5>
      <span v-for="item in chooseAddress" @click="changeAddress(item)"
      class="address" 
      :class="{active_item:item.address==activeAddress}">
        {{item.address}}
      </span>
    </h5>
    <div class="food_list clearfix">
      <dl class="noodles float-left">
        <dt class="active_tit">面食</dt>
        <dd v-for="(item,index) in foodList.mianshi"
        class="item"
        :class="{active_item:item.active==true}"
        @click="choose(item)">
          <span>{{item.foodName}}</span>
          <div @click.stop="">
            <i class="el-icon-minus" @click="minus(item)"></i>
            <input type="text" maxlength="2" @input="maxNub(item)" v-model="item.value" />
            <i class="el-icon-plus" @click="plus(item)"></i>
          </div>
        </dd>
      </dl>
      <dl class="cold_dishes float-left">
        <dt v-if="foodList.shushi" class="active_tit">熟食</dt>
        <dd v-for="item in foodList.shushi" @click="chooseCold(item)" class="item" :class="{active_item:item.active==true}">{{item.foodName}}</dd>
      </dl>
    </div>
    <div class="order">
      <span class="time">预定时间:当日下午12：00-14：00</span>
      <span class="go_order">>></span>
      <span @click="commitOrder" class="btn">提交订单</span>
    </div>
  </div>
</template>
<script>
  import time from '@/common/js/time'
  export default {
    data: () => ({
      showRule: false, // 显示外卖规则
      foodList: {}, // 外卖数据
      shopCar: new Set(),
      order: {}, // 订单显示内容
      outFood: '', // 提交给后台的面食字符串
      cookFood: '', // 熟食字符串
      activeAddress: '建邺区政府大楼',
      chooseAddress: [{
        address: '建邺区政府大楼',
        place: 1
      },
      {
        address: '双和园',
        place: 0
      }],
      orderPlace: 1, // 提交订单后清空选中的
      showDetailBtn: false
    }),
    created () {
      setTimeout(() => {
        this.showDetailBtn = localStorage.getItem('showDetailBtn') === 'true' ? false : false
        this.$store.dispatch('food/list', {
          Vue: this,
          place: 1
        })
      }, 20)
    },
    methods: {
      // 选择就餐地址
      changeAddress (item) {
        this.activeAddress = item.address
        this.orderPlace = item.place
        this.shopCar.clear()
        this.$store.dispatch('food/list', {
          Vue: this,
          place: item.place
        })
      },
      // 选择外卖凉菜种类
      chooseCold (item) {
        item.active = !item.active
        item.active ? this.saveOrder(item) : delete this.order[item.foodID]
      },
      // 选择外卖面食种类
      choose (item) {
        if (this.shopCar.size < 2) {
          this.shopCar.add(item.foodID) // 添加ID进set
          item.active = !item.active
          if (item.active === false) {
            this.shopCar.delete(item.foodID) // 如果选中状态取消清掉当前面食ID
            item.value = 0 // 清空当前面食数量
            delete this.order[item.foodID]
          }
        } else {
          if (this.shopCar.has(item.foodID)) {
            this.shopCar.delete(item.foodID)
            item.active = false
            item.value = 0
            delete this.order[item.foodID]
          } else {
            this.$message({
              message: '只能选择两种面食',
              type: 'warning'
            })
          }
        }
      },
      // 面食增加数量
      plus (item) {
        if (item.active === true) {
          this.id = item.foodID
          if (item.value < 10 && item.value < item.foodCount) {
            item.value++
            this.saveOrder(item)
          } else {
            this.$message({
              message: `${item.foodName}仅剩${item.foodCount}份`,
              type: 'warning'
            })
          }
        }
      },
      // 面食减少数量
      minus (item) {
        if (item.active === true) {
          if (item.value >= 1) {
            item.value--
            if (item.value === 0) {
              delete this.order[item.foodID]
              return false
            }
            this.saveOrder(item)
          }
        }
      },
      // 保存订单数据
      saveOrder (item) {
        this.order[item.foodID] = {
          id: item.foodID,
          name: item.foodName,
          price: item.foodPrice,
          number: item.value,
          foodUnit: item.foodUnit,
          foodType: item.foodType
        }
      },
      // 限制输入食物数量
      maxNub (item) {
        if (item.value > 10 || item.value > item.foodCount) {
          item.value = 0
        }
      },
      // 提交订单
      commitOrder () {
        if (time(this, '8:00', '14:00')) {
          if (JSON.stringify(this.order) === '{}') {
            this.$message({message: '请确认订单个数或是否选择外卖', type: 'warning'})
            return false
          }
          for (let item in this.order) {
            if (this.order[item].foodType === 0) {
              this.outFood += `${this.order[item].id},${this.order[item].name},${this.order[item].price},${this.order[item].number},${this.order[item].foodUnit};`
            } else {
              this.cookFood += `${this.order[item].id},${this.order[item].name},${this.order[item].price},${this.order[item].number},${this.order[item].foodUnit};`
            }
          }
          this.$store.dispatch('commit/order', {
            Vue: this,
            outFood: this.outFood.substring(0, this.outFood.length - 1),
            cookFood: this.cookFood.substring(0, this.cookFood.length - 1),
            userID: window.localStorage.getItem('userID'),
            place: 0
          })
        } else {
          this.$message({message: '订餐时间不在有效时间段内', type: 'warning'})
        }
      },
      // 查看订单详情
      goOrder () {
        // this.outFoodList = false
        this.$store.dispatch('go/order', {
          Vue: this,
          outFoodID: window.localStorage.getItem('orderID')
        })
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .food_container
    position:absolute
    width:700px
    left:50%
    margin-left:-350px
    top:240px
    i
      cursor: pointer
    input
      background-color:transparent
      border:none
      outline:none
      width:20px
      height:30px
      text-align:center
      color:#fff
    .active_item
      background-color:#ff0090 !important
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
        background-color:#ff0090
        color:#fff
        cursor: pointer
        border:none !important
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
        border-radius:0 10px 0 0 !important
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
        color:#fff
        cursor:pointer
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