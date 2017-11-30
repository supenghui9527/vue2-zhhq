<template>
  <div class="agency">
    <div class="logo">
      <h1>建邺智慧后勤管理中心</h1>
      <div>
        <img class="user" title="点击回到首页面" src="../login/already_login.png" @click="$router.push('/login')">
        <router-link to="" class="go_sale">我的待办</router-link>
        <span class="back_home" @click="$router.go(-1)">返回上一页</span>
      </div>
    </div>
    <div class="my_agency">
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
              <el-select class="apply_content" v-model="applyType" @change="filter" placeholder="请选择">
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
              <el-select class="apply_content" v-model="stateValue" @change="filter" placeholder="请选择">
                <el-option
                  v-for="item in filter_.stateFilter"
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
            <tr v-for="(item,index) in allAgency.list" class="list_item">
              <td>{{item.param1}}</td>
              <td>{{item.title}}</td>
              <td>
                <!-- 外卖 -->
                <span v-if="item.tag==1" :title="$store.state.allState.outSaleState[item.state]" class="state">{{$store.state.allState.outSaleState[item.state]}}</span>
                <!-- 公务用车 -->
                <span v-if="item.tag==2" :title="$store.state.allState.carState[item.state]" class="state">{{$store.state.allState.carState[item.state]}}</span>
                <!-- 会务申请 -->
                <span v-else-if="item.tag==3" :title="$store.state.allState.meetingState[item.state]" class="state">{{$store.state.allState.meetingState[item.state]}}</span>
                <!-- 报修申请 -->
                <span v-else-if="item.tag==4" :title="$store.state.allState.repairState[item.state]" class="state">{{$store.state.allState.repairState[item.state]}}</span>
                <!-- 用餐申请 -->
                <span v-else-if="item.tag==5" :title="$store.state.allState.mealState[item.state]" class="state">{{$store.state.allState.mealState[item.state]}}</span>
              </td>
              <td>
                <span class="go_detail" @click="goDetail(item)">查看详情</span>
              </td>
            </tr>
          </table>
        </div>
        <div class="no_data" v-if="allAgency.list==''||JSON.stringify(allAgency)=='{}'">暂无数据</div>
        <div class="apply_block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="5"
            layout="prev, pager, next, jumper"
            :total="allAgency.count">
          </el-pagination>
        </div>
      </div>
      <div v-show="showInstruction" class="fixed_" @click="showInstruction=false"></div>
      <div class="explain" @click="showInstruction=!showInstruction">操作说明</div>
      <div v-show="showInstruction" class="instruction">
        <img src="~common/images/13_wodedaiban.png">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      showRule: false, // 显示外卖规则
      applyType: 1,
      timeValue: 0,
      stateValue: 1,
      showInstruction: false,
      val: 1,
      allAgency: {},
      filter_: {
        typeFilter: [{
          value: 1,
          label: '全部待办'
        }, {
          value: 2,
          label: '公务用车'
        }, {
          value: 3,
          label: '会议申请'
        }, {
          value: 4,
          label: '报修申请'
        }, {
          value: 5,
          label: '用餐申请'
        }],
        timeFilter: [{
          value: 0,
          label: '全部待办'
        }, {
          value: 1,
          label: '今天'
        }],
        stateFilter: [{
          value: 0,
          label: '全部状态'
        }, {
          value: 1,
          label: '未处理'
        }, {
          value: 2,
          label: '已处理'
        }]
      }
    }),
    created () {
      let filter = window.localStorage.getItem('agencyFilter')
      if (filter) {
        let newFilter = JSON.parse(filter)
        this.applyType = newFilter.applyType * 1
        this.getMyAgency(newFilter.applyType, 0, 1, 1)
      } else {
        this.getMyAgency(1, 0, 1, 1)
      }
    },
    beforeRouteUpdate (to, from, next) {
      next()
    },
    methods: {
      // 获取我的代办
      getMyAgency (applyType, timeType, state, pageIndex) {
        let filter = JSON.stringify({applyType, timeType, state, pageIndex})
        window.localStorage.setItem('agencyFilter', filter)
        this.$store.dispatch('get/agency', {
          Vue: this,
          userID: window.localStorage.getItem('userID'),
          applyType: applyType,
          timeType: timeType,
          state: state,
          pageIndex: pageIndex,
          pageNumber: 5
        })
      },
      handleSizeChange (val) {
      },
      filter () {
        this.getMyAgency(this.applyType, this.timeValue, this.stateValue, this.val)
      },
      handleCurrentChange (val) {
        this.val = val
        this.getMyAgency(this.applyType, this.timeValue, this.stateValue, this.val)
      },
      goDetail (item) {
        // this.$store.commit('setRepairID', item.id)
        if (item.tag * 1 === 1) { // 外卖
          this.$router.push({path: '/outSale/orderDetail', query: {agency: 1, outFoodID: item.id, tag: item.tag}})
        } else if (item.tag * 1 === 2) { // 用车
          this.$router.push({path: '/myApply/useCarDetail', query: {agency: 1, carApplyID: item.id, tag: item.tag}})
        } else if (item.tag * 1 === 3) { // 会议
          this.$router.push({path: '/myApply/meetingDetail', query: {agency: 1, meetingApplyID: item.id, tag: item.tag}})
        } else if (item.tag * 1 === 4) { // 报修
          this.$router.push({path: '/myApply/repairDetail', query: {agency: 1, repairApplyID: item.id, tag: item.tag}})
        } else if (item.tag * 1 === 5) { // 用餐
          this.$router.push({path: '/myApply/mealDetail', query: {agency: 1, diningApplyID: item.id, tag: item.tag}})
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~common/css/common.styl'
.my_agency
  position:absolute
  width:70%
  padding-bottom:40px
  left:50%
  margin-left:-35%
  top:180px
  min-width:700px
  max-height:400px
  background-color:#fff
  border-radius:6px
  overflow-y:auto
  overflow-x:hidden
  .active_el-select
    input
      background-color:transparent !important
      outline:none !important
      border:none !important
      text-align:center
      font-size:16px
      color:#fff !important
  .apply_date,.apply_content
    width:150px !important
    text-align:center
  .apply_nav
    padding:20px 0
    >div
      width:33.33%
  .go_detail
    display:inline-block
    padding:0 10px
    height:24px
    line-height:24px
    background-color:#426df7
    color:#fff
    border-radius:4px
    margin-right:10px
    cursor:pointer
  .play
    display:inline-block
    padding:0 10px
    height:24px
    line-height:24px
    background-color:#426df7
    color:#fff
    border-radius:4px
    cursor:pointer
  .apply_block .el-pagination
    padding:0 !important
  .apply_list
    width:94%
    margin:0 auto
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
        .state
          // color:#f00
      .list_item
        background-color:#f5f5f5
    .apply_block
      background-color:#fff
      margin-top:20px
</style>