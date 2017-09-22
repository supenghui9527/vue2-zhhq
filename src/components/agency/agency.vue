<template>
  <div class="agency">
    <div class="logo">
      <h1>建邺智慧后勤管理中心</h1>
      <div>
        <img class="user" src="../login/already_login.png" @click="$router.push('/login')">
        <router-link to="" class="go_sale">我的待办</router-link>
        <span class="rule_tit" @click="showRule=!showRule">待办须知</span>
        <router-link to="" class="rule_tit">全部待办</router-link>
      </div>
    </div>
    <transition name="fade">
      <div v-show="showRule" class="rule_detail">
        <h5>
          <span>待办须知：</span>
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
    <div class="all_agency">
      <dl>
        <dt>
          <span class="created_time">订单生成时间<img class="show_time" src="~common/images/showfilter.png" /></span>
          <span class="department">部门名称</span>
          <span class="department">账号名称</span>
          <span class="department">申请单属性</span>
          <span class="department">申请单编号</span>
        </dt>
        <dd @click="goDetail(item)" v-for="(item,index) in list" :class="{active:(index+1)%2==0}">
          <span class="created_time">{{item.param1}}</span>
          <span class="department">{{item.title}}</span>
          <span class="department"></span>
          <span class="department"></span>
          <span class="department"></span>
          <span class="arrow">>></span>
          <span class="detail">详情</span>
          <span  v-if="item.state==0" class="state">待盖章</span>
          <span v-if="item.state==1" class="state active_state">已盖章</span>
        </dd>
      </dl>
<!--       <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="6"
          layout="prev, pager, next, jumper"
          :total="allAgency.count">
        </el-pagination>
      </div> -->
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      showRule: false, // 显示外卖规则
      allAgency: {},
      list: [{
        id: 54,
        tag: 1,
        title: '会议室申请',
        param1: '2017-09-15',
        param2: '2017-09-15 10:00-11:00',
        state: 0
      }, {
        id: 54,
        tag: 1,
        title: '会议室申请',
        param1: '2017-09-22',
        param2: '2017-09-15 10:00-11:00',
        state: 1
      }
      ]
    }),
    created () {
      this.getMyAgency()
    },
    methods: {
      // 获取我的代办
      getMyAgency () {
        this.$store.dispatch('get/agency', {
          Vue: this,
          userID: window.localStorage.getItem('userID'),
          timeType: 0,
          state: 0,
          pageIndex: 1,
          pageNumber: 6
        })
      },
      // 代办详情
      goDetail (item) {
        window.localStorage.setItem('agencyDetailID', item.id)
        this.$router.push({
          path: 'agency/meetingAgency',
          query: {applyID: item.id, tag: item.tag}
        })
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/css/common.styl'
.all_agency
  position:absolute
  width:700px
  left:50%
  margin-left:-350px
  top:240px
  .created_time
    width:20%
    padding-left:50px
  .department
    width:10%
    height:100%
    padding-left:10px
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
    margin-top:-13px
    background-color:#476ade
    text-align:center
    border-radius:4px
    margin-left:10px
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
    background-color:#8f95af
  .state
    width:70px
    height:26px
    line-height:26px
    text-align:center
    background-color:#a60024
    border-radius:4px
    color:#fff
    position:absolute
    right:6px
    top:50%
    margin-top:-13px
  .active_state
    background-color:#717791 !important
</style>