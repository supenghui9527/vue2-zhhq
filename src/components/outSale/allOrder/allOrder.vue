<template>
  <div class="all_order">
    <dl>
      <dt class="active_tit">
        <span @click="showTimeFilter=!showTimeFilter">订单生成时间</span>
        <span>订单详情（订单总数{{allOrder.count}}）</span>
        <span @click="showStateFilter=!showStateFilter">全部订单</span>
        <ul v-show="showTimeFilter" class="time_filter">
          <li v-for="item in timeFilter" @click="filterByTime(item)">{{item.timeType}}</li>
        </ul>
        <ul v-show="showStateFilter" class="state_filter">
          <li v-for="item in stateFilter" @click="filterByState(item)">{{item.state}}</li>
        </ul>
      </dt>
      <dd v-for="(item,index) in allOrder.list" class="detail_item" :class="{active_item1:(index+1)%2==0}">
        <span class="created_time">{{item.param1}}</span>
        <span :title="item.param2" class="food_name">{{item.param2}}</span>
        <span v-if="item.state==1">已完成</span>
        <span v-else-if="item.state==2">已撤销</span>
        <span v-else>未支付</span>
      </dd>
    </dl>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="6"
        layout="prev, pager, next, jumper"
        :total="allOrder.count">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      allOrder: [],
      showTimeFilter: false,
      filterTime: 0,
      filterState: -1,
      showStateFilter: false,
      timeFilter: [{
        timeType: '全部',
        id: 0
      },
      {
        timeType: '今天',
        id: 1
      },
      {
        timeType: '本周',
        id: 2
      },
      {
        timeType: '本月',
        id: 3
      }],
      stateFilter: [{
        state: '全部',
        id: -1
      },
      {
        state: '未支付',
        id: 0
      },
      {
        state: '已完成',
        id: 1
      },
      {
        state: '已撤销',
        id: 2
      }]
    }),
    created () {
      this.getAllOrder(1, 2, -1, 1)
    },
    methods: {
      // 获取全部订单
      getAllOrder (applyType, time, state, pageIndex) {
        this.$store.dispatch('all/order', {
          Vue: this,
          userID: window.localStorage.getItem('userID'),
          applyType: applyType,
          timeType: time,
          state: state,
          pageIndex: pageIndex,
          pageNumber: 6
        })
      },
      handleSizeChange (val) {
      },
      handleCurrentChange (val) {
        this.getAllOrder(1, 2, -1, val)
      },
      // 通过时间筛选订单筛选
      filterByTime (item) {
        this.filterTime = item.id
        this.getAllOrder(1, item.id, -1, 1)
        this.showTimeFilter ? this.showTimeFilter = false : this.showTimeFilter
      },
      // 通过状态筛选
      filterByState (item) {
        this.filterState = item.id
        this.getAllOrder(1, this.filterTime, item.id, 1)
        this.showStateFilter ? this.showStateFilter = false : this.showStateFilter
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .all_order
    .block
      background-color:#7d9bf3
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
      ul
        position:absolute
        bottom:-120px
        z-index:999
        background-color:#fff
        li
          width:100px
          height:30px
          line-height:30px
          text-align:center
          border-bottom:1px solid #f0f0f0
          box-sizing:border-box
      .time_filter
        left:40px
      .state_filter
        left:72%
      span
        float:left
        width:33.33%
        padding-left:40px
        box-sizing:border-box
    .detail_item
      height:30px
      line-height:30px
      background-color:#1147b1
      span
        float:left
        width:33.33%
        padding-left:40px
        box-sizing:border-box
    .active_item1
      background-color:#14339d !important
</style>