<template>
  <div class="apply_list">
    <div>
      <div class="clearfix apply_nav">
        <div class="float-left">
          <span>申请日期</span>
          <el-select class="apply_date" v-model="timeValue" @change="filter" placeholder="请选择">
            <el-option
              v-for="item in filter_.timeFilter"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="float-left">
          <span>申请内容</span>
          <el-select class="apply_content" v-model="typeValue" @change="filter" placeholder="请选择">
            <el-option
              v-for="item in filter_.typeFilter"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="float-left">
          <span>申请状态</span>
          <el-select class="apply_content" v-if="typeValue==1" v-model="stateValue" @change="filter" placeholder="请选择">
            <el-option
              v-for="item in stateFilter.outSale"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <!-- 用车 -->
          <el-select class="apply_content" v-else-if="typeValue==2" v-model="stateValue" @change="filter" placeholder="请选择">
            <el-option
              v-for="item in stateFilter.useCar"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <!-- 会议 -->
          <el-select class="apply_content" v-else-if="typeValue==3" v-model="stateValue" @change="filter" placeholder="请选择">
            <el-option
              v-for="item in stateFilter.meeting"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <!-- 维修 -->
          <el-select class="apply_content" v-else-if="typeValue==4" v-model="stateValue" @change="filter" placeholder="请选择">
            <el-option
              v-for="item in stateFilter.repair"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <!-- 用餐 -->
          <el-select class="apply_content" v-else-if="typeValue==5" v-model="stateValue" @change="filter" placeholder="请选择">
            <el-option
              v-for="item in stateFilter.applyMeal"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <table>
        <tr class="header_">
          <th width="25%">申请时间</th>
          <th width="25%">申请内容</th>
          <th width="22%">申请状态</th>
          <th width="28%">操作</th>
        </tr>
        <tr v-for="(item,index) in myApply.list" class="list_item">
          <td>{{item.param1}}</td>
          <td v-if="item.tag!=1">{{item.title}}</td>
          <td v-if="item.tag==1&&item.orderType==1">外卖申请单（熟食）</td>
          <td v-if="item.tag==1&&item.orderType==0">外卖申请单（面食）</td>
          <td>
            <!-- 外卖 -->
            <span v-if="item.tag==1" :title="$store.state.allState.outSaleState[item.state]">{{$store.state.allState.outSaleState[item.state]}}</span>
            <!-- 公务用车 -->
            <span v-if="item.tag==2" :title="$store.state.allState.carState[item.state]">{{$store.state.allState.carState[item.state]}}</span>
            <!-- 会务申请 -->
            <span v-else-if="item.tag==3" :title="$store.state.allState.meetingState[item.state]">{{$store.state.allState.meetingState[item.state]}}</span>
            <!-- 报修申请 -->
            <span v-else-if="item.tag==4" :title="$store.state.allState.repairState[item.state]">{{$store.state.allState.repairState[item.state]}}</span>
            <!-- 用餐申请 -->
            <span v-else-if="item.tag==5" :title="$store.state.allState.mealState[item.state]">{{$store.state.allState.mealState[item.state]}}</span>
          </td>
          <td>
            <span class="go_detail" @click="goDetail(item)">查看详情</span>
            <!-- <span v-if="item.tag==3" :title="$store.state.allState.meetingState[item.state]" class="play">打印</span> -->
          </td>
        </tr>
      </table>
    </div>
    <div class="no_data" v-if="myApply.list==''||JSON.stringify(myApply)=='{}'">暂无数据</div>
    <div class="apply_block">
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
        console.log(1)
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
.my_apply
  .apply_list
    width:94%
    margin:0 auto
    .apply_nav
      padding:20px 0
      >div
        width:33.33%
    .no_data
      width:100%
      height:36px
      line-height:36px
      text-align:center
      box-sizing:border-box
      border-right:1px solid #808080
      border-left:1px solid #808080
      border-bottom:1px solid #808080
      background-color:#f5f5f5
    table
      width:100%
      text-align:center
      border-right:1px solid #808080
      border-bottom:1px solid #808080
      .header_
        width:100% !important
        height:36px
        line-height:36px
        background-color:#488fd7
        color:#fff
        font-size:16px
      tr
        width:100% !important
        height:36px
        line-height:36px
        background-color:#f5f5f5
        th,td
          border-top:1px solid #808080
          border-left:1px solid #808080
      .list_item
        background-color:#f5f5f5
    .apply_block
      background-color:#fff
      margin-top:20px
</style>
