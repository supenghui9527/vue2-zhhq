<template>
  <div class="agency">
    <div class="logo">
      <h1>建邺智慧后勤管理中心</h1>
      <div>
        <img class="user" title="点击回到首页面" src="../login/already_login.png" @click="$router.push('/login')">
        <router-link to="" class="go_sale">我的待办</router-link>
        <span class="rule_tit" @click="$router.push('/login')">返回主页</span>
      </div>
    </div>
    <div class="all_agency">
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
          <span class="department">部门名称</span>
          <span class="state_filter">
            <el-select v-model="stateValue" @change="filter" placeholder="请选择">
              <el-option
                v-for="item in filter_.stateFilter"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </span>
        </dt>
        <dd style="text-align:center" v-if="allAgency.list==''">暂无数据</dd>
        <dd @click="goDetail(item)" v-for="(item,index) in allAgency.list" :class="{active:(index+1)%2==0}">
          <span class="created_time">{{item.param1}}</span>
          <span class="department">{{item.title}}</span>
          <span class="arrow">>></span>
          <span class="detail">详情</span>
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
          :page-size="5"
          layout="prev, pager, next, jumper"
          :total="allAgency.count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      showRule: false, // 显示外卖规则
      timeValue: '0',
      stateValue: '0',
      val: 1,
      allAgency: {},
      filter_: {
        timeFilter: [{
          value: '0',
          label: '全部待办'
        }, {
          value: '1',
          label: '今天'
        }],
        stateFilter: [{
          value: '0',
          label: '全部状态'
        }, {
          value: '1',
          label: '已处理'
        }, {
          value: '2',
          label: '未处理'
        }]
      }
    }),
    created () {
      this.getMyAgency(0, 0, 1)
    },
    methods: {
      // 获取我的代办
      getMyAgency (timeType, state, pageIndex) {
        this.$store.dispatch('get/agency', {
          Vue: this,
          userID: window.localStorage.getItem('userID'),
          timeType: timeType,
          state: state,
          pageIndex: pageIndex,
          pageNumber: 5
        })
      },
      handleSizeChange (val) {
      },
      filter () {
        this.getMyAgency(this.timeValue, this.stateValue, this.val)
      },
      handleCurrentChange (val) {
        this.val = val
        this.getMyAgency(this.timeValue, this.stateValue, this.val)
      },
      goDetail (item) {
        // this.$store.commit('setRepairID', item.id)
        if (item.tag * 1 === 1) { // 外卖
          this.$router.push({path: '/outSale/orderDetail', query: {agency: 1, outFoodID: item.id}})
        } else if (item.tag * 1 === 2) { // 用车
          this.$router.push({path: '/applyUseCar/useCarDetail', query: {agency: 1, carApplyID: item.id}})
        } else if (item.tag * 1 === 3) { // 会议
          this.$router.push({path: '/meetingApply/meetingDetail', query: {agency: 1, meetingApplyID: item.id}})
        } else if (item.tag * 1 === 4) { // 报修
          this.$router.push({path: '/repair/repairDetail', query: {agency: 1, repairApplyID: item.id}})
        } else if (item.tag * 1 === 5) { // 用餐
          this.$router.push({path: '/applyMeal/mealDetail', query: {agency: 1, diningApplyID: item.id}})
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/css/common.styl'
.all_agency
  position:absolute
  width:700px
  height:300px !important
  left:50%
  margin-left:-350px
  top:240px
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
    right:100px
    margin-top:-13px
    background-color:#476ade
    text-align:center
    border-radius:4px
    cursor:pointer
  dt
    background-color:#c0c3d2
    height:46px
    line-height:46px
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
    width:70px
    height:26px
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