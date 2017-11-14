<template>
  <div class="apply_list">
    <dl>
      <dt>
        <span class="created_time">
          <el-select v-model="timeValue" @change="filter" placeholder="请选择">
            <el-option
              v-for="item in filter_.timeFilter"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </span>
        <span class="department">
          <el-select v-model="typeValue" @change="filter" placeholder="请选择">
            <el-option
              v-for="item in filter_.typeFilter"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </span>
        <span class="state_filter">
          <!-- 外卖 -->
          <el-select v-if="typeValue==1" v-model="stateValue" @change="filter" placeholder="请选择">
            <el-option
              v-for="item in stateFilter.outSale"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <!-- 用车 -->
          <el-select v-else-if="typeValue==2" v-model="stateValue" @change="filter" placeholder="请选择">
            <el-option
              v-for="item in stateFilter.useCar"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <!-- 会议 -->
          <el-select v-else-if="typeValue==3" v-model="stateValue" @change="filter" placeholder="请选择">
            <el-option
              v-for="item in stateFilter.meeting"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <!-- 维修 -->
          <el-select v-else-if="typeValue==4" v-model="stateValue" @change="filter" placeholder="请选择">
            <el-option
              v-for="item in stateFilter.repair"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <!-- 用餐 -->
          <el-select v-else-if="typeValue==5" v-model="stateValue" @change="filter" placeholder="请选择">
            <el-option
              v-for="item in stateFilter.applyMeal"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </span>
      </dt>
      <dd style="text-align:center" v-if="myApply.list==''||JSON.stringify(myApply)=='{}'">暂无数据</dd>
      <dd v-for="(item,index) in myApply.list" :class="{active:(index+1)%2==0}">
        <span class="created_time">{{item.param1}}</span>
        <span class="department">{{item.title}}</span>
        <span class="detail" @click="goDetail(item)">详情</span>
        <!-- 外卖 -->
        <span v-if="item.tag==1" :title="$store.state.allState.outSaleState[item.state]" class="state active_state">{{$store.state.allState.outSaleState[item.state]}}</span>
        <!-- 公务用车 -->
        <span v-if="item.tag==2" :title="$store.state.allState.carState[item.state]" class="state active_state">{{$store.state.allState.carState[item.state]}}</span>
        <!-- 会务申请 -->
        <span v-else-if="item.tag==3" :title="$store.state.allState.meetingState[item.state]" class="state active_state">{{$store.state.allState.meetingState[item.state]}}</span>
        <!-- 报修申请 -->
        <span v-else-if="item.tag==4" :title="$store.state.allState.repairState[item.state]" class="state active_state">{{$store.state.allState.repairState[item.state]}}</span>
        <!-- 用餐申请 -->
        <span v-else-if="item.tag==5" :title="$store.state.allState.mealState[item.state]" class="state active_state">{{$store.state.allState.mealState[item.state]}}</span>
      </dd>
    </dl>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="oneIndex"
        :page-size="5"
        layout="prev, pager, next, jumper"
        :total="myApply.count">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      oneIndex: 1,
      timeValue: 0,
      typeValue: 1,
      stateValue: -1,
      stateFilter: {
        outSale: [{
          value: -1,
          label: '全部状态'
        }, {
          value: 0,
          label: '未完成'
        }, {
          value: 1,
          label: '已完成'
        }, {
          value: 2,
          label: '已撤销'
        }],
        repair: [{
          value: -1,
          label: '全部状态'
        }, {
          value: 0,
          label: '待接单'
        }, {
          value: 1,
          label: '待完成'
        }, {
          value: 2,
          label: '待评价'
        }, {
          value: 3,
          label: '已评价'
        }],
        meeting: [{
          value: -1,
          label: '全部状态'
        }, {
          value: 0,
          label: '待处理'
        }, {
          value: 1,
          label: '已完成'
        }, {
          value: 2,
          label: '已驳回'
        }],
        useCar: [{
          value: -1,
          label: '全部状态'
        }, {
          value: 0,
          label: '待处理'
        }, {
          value: 1,
          label: '已完成'
        }, {
          value: 2,
          label: '已驳回'
        }],
        applyMeal: [{
          value: -1,
          label: '全部状态'
        }, {
          value: 0,
          label: '待处理'
        }, {
          value: 1,
          label: '已完成'
        }, {
          value: 2,
          label: '已驳回'
        }]
      },
      val: 1
    }),
    props: [
      'myApply',
      'filter_',
      'toTypeValue'
    ],
    created () {
      this.typeValue = this.toTypeValue
    },
    watch: {
      typeValue () {
        this.stateValue = -1
        this.timeValue = 0
      }
    },
    methods: {
      handleSizeChange (val) {
      },
      filter () {
        this.oneIndex = 1
        this.$emit('changePage', this.typeValue, this.timeValue, this.stateValue, this.val)
      },
      handleCurrentChange (val) {
        this.val = val
        this.$emit('changePage', this.typeValue, this.timeValue, this.stateValue, val)
      },
      goDetail (item) {
        this.$store.commit('setRepairID', item.id)
        if (item.tag * 1 === 1) { // 外卖
          this.$router.push({path: '/outSale/orderDetail', query: {outFoodID: item.id}})
        } else if (item.tag * 1 === 2) { // 用车
          this.$router.push({path: '/myApply/useCarDetail', query: {carApplyID: item.id}})
        } else if (item.tag * 1 === 3) { // 会议
          this.$router.push({path: '/myApply/meetingDetail', query: {meetingApplyID: item.id}})
        } else if (item.tag * 1 === 4) { // 报修
          this.$router.push({path: '/myApply/repairDetail', query: {repairApplyID: item.id}})
        } else if (item.tag * 1 === 5) { // 用餐
          this.$router.push({path: '/myApply/mealDetail', query: {diningApplyID: item.id}})
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.all_agency
  .apply_list
    width:100%
    margin:0 auto
    .apply_nav
      background-color:#488fd7
    .created_time
      width:20%
      padding-left:50px
    .state_filter
      padding-right:10px
      width:20%
      float:right !important
    .department
      width:30%
      height:100%
      padding-left:50px
      box-sizing:border-box
    .show_time
      padding-left:6px
      width:14px
      height:14px
      vertical-align:middle
    .arrow
      width:40px
      height:100%
      background-color:#8c92ac
      text-align:center
    .detail
      width:50px
      height:26px
      line-height:26px
      position:absolute
      top:50%
      right:140px
      margin-top:-13px
      background-color:#476ade
      text-align:center
      border-radius:4px
      cursor:pointer
    dt
      background-color:#c0c3d2
      height:46px
      line-height:46px
      color:#1a3ca7
      font-size:14px
      span
        float:left
    dd
      background-color:#848ba5
      height:35px
      line-height:35px
      color:#d7dbe4
      font-size:14px
      position:relative
      span
        float:left
    .active
      background-color:#8f95af !important
    .state
      min-width:70px
      height:26px
      padding:0 10px
      line-height:26px
      text-align:center
      background-color:#a60024
      border-radius:4px
      color:#fff
      position:absolute
      right:10px
      top:50%
      margin-top:-13px
    .active_state
      background-color:#717791 !important
    .block
      background-color:#fff
</style>
