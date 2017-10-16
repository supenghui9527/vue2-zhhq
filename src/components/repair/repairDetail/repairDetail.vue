<template>
  <div class="detail">
    <div v-if="fixWorkerList!=null" class="fixed">
      <div class="allot">
        <h5>
          <span>添加服务人员</span>
          <i @click="closeChoose"></i>
        </h5>
        <div>
          <div class="allot_item" v-for="item in fixWorkerList" @click="chooseallot(item)">
            <img v-if="fixWorkerId!==item.fixWorkerId" width="16" height="16" src="~common/images/check_boxs.png">
            <img v-else width="16" height="16" src="~common/images/selected.png">
            <img width="20" height="20" src="~common/images/staff.png">
            <span>{{item.fixWorkerName}}</span>
            <span>{{item.fixWorkerTel}}</span>
          </div>
        </div>
        <el-button class="submit_allot" type="primary" @click="submitAllot">确认分配</el-button>
      </div>
    </div>
    <ul class="detail_left">
      <li>申请表单：基础名片（请确认）</li>
      <li>申请时间：{{repairDetail.repairApplyReturn.createTime}}</li>
      <li>申办单位：{{$store.state.deptName}}</li>
      <li>申办单位联系人：{{$store.state.linkman}}</li>
      <li>申办单位办公电话：{{$store.state.officetel}}</li>
      <li>申办单位联系人手机：{{$store.state.linkmantel}}</li>
    </ul>
    <div class="detail_right">
      <ul>
        <li>
          <span>报修事项：</span>
          <span v-for="item in repairDetail.repairApplyReturn.questionList">{{item}}</span>
        </li>
        <li>
          <span>预约时间：</span>
          <span>{{repairDetail.repairApplyReturn.bespeakStartTime&&repairDetail.repairApplyReturn.bespeakEndTime}}</span>
          <span v-if="repairDetail.repairApplyReturn.bespeakStartTime==''">无</span>
        </li>
        <li>
          <span>实地拍摄：</span>
          <span v-if="repairDetail.picList==''">无</span>
          <img v-for="item in repairDetail.picList" :src="item">
        </li>
        <li>
          <span>故障位置：</span>
          <span v-for="item in repairDetail.repairApplyReturn.questionList">{{item}}</span>
        </li>
        <li>
          <span>故障现象：</span>
          <span>{{repairDetail.repairApplyReturn.faultDetail}}</span>
        </li>
        <li>
          <span>备注说明：</span>
          <span>{{repairDetail.repairApplyReturn.remark}}</span>
        </li>
        <li v-if="repairDetail.repairApplyReturn.state>0">
          <span>维修人员：</span>
          <span>{{repairDetail.repairApplyReturn.fixWorkerName}}{{repairDetail.repairApplyReturn.fixWorkerTel}}</span>
        </li>
      </ul>
      <el-button v-if="repairDetail.repairApplyReturn.state==0&&$route.query.agency==1&&authAllot" type="primary" @click="getAllot">分配</el-button>
      <el-button v-if="repairDetail.repairApplyReturn.state==0&&$route.query.agency==1&&orderAuth" type="primary" @click="getOrders">接单</el-button>
    </div>
  </div>
</template>
<script>
  import filterAuth from '@/common/js/filterAuth'
  export default {
    data: () => ({
      repairDetail: {
        repairApplyReturn: {}
      },
      fixWorkerList: null,
      authAllot: false,
      orderAuth: false,
      fixWorkerId: null
    }),
    created () {
      setTimeout(() => {
        this.getDetail()
        filterAuth({Vue: this, roleArr: this.$store.state.roleId.split(','), storeArr: [this.$store.state.auth.ORDER_REPAIR, this.$store.state.auth.PORITION], authArr: ['orderAuth', 'authAllot']})
        console.log(this.authAllot, this.orderAuth)
      }, 20)
    },
    beforeRouteUpdate (to, from, next) {
      next()
    },
    methods: {
      // 详情
      getDetail () {
        this.$store.dispatch('go/repair/detail', {
          Vue: this,
          repairApplyID: this.$route.query.repairApplyID * 1
        })
      },
      // 获取分配人员列表
      getAllot () {
        this.$store.dispatch('get/repair/allot', {
          Vue: this
        })
      },
      // 关闭分配
      closeChoose () {
        this.allot = null
      },
      // 分配维修人员
      chooseallot (item) {
        this.fixWorkerId = item.fixWorkerId
        this.fixWorkerName = item.fixWorkerName
        this.fixWorkerTel = item.fixWorkerTel
      },
      // 提交分配
      submitAllot () {
        this.$store.dispatch('submit/repair/allot', {
          Vue: this,
          userID: localStorage.getItem('userID'),
          fixWorkerID: this.fixWorkerID,
          fixWorkerName: this.fixWorkerName,
          fixWorkerTel: this.fixWorkerTel,
          repairApplyID: this.$route.query.repairApplyID * 1,
          comment: '',
          state: this.repairDetail.repairApplyReturn.state
        })
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.fixed
  position:fixed
  height:100%
  width:100%
  left:0
  top:0
  z-index:999
  background-color:rgba(0,0,0,0.5)
  .allot
    position:absolute
    width:450px
    height:220px
    top:230px
    left:50%
    margin-left:-225px
    z-index:9999
    background-color:#fff
    .submit_allot
       position:absolute
       bottom:20px
       left:50%
       margin-left:-44px
    h5
      height:30px
      line-height:30px
      background-color:#20a0ff
      color:#fff
      text-align:center
      font-size:12px
      i
        position:absolute
        right:0
        width:14px
        height:14px
        padding:6px
        background:url('~common/images/close.png') no-repeat center center
        background-size:14px 14px
    .allot_item
      width:50%
      height:30px
      line-height:30px
      float:left
      padding-left: 20px
      box-sizing:border-box
      margin-bottom:6px
      img
        vertical-align:middle
.detail
  height:210px
.detail_left,.detail_right
  padding-left:20px
  box-sizing:border-box
  height:100%
  float:left
.detail_left
  width:300px
  padding-top:15px
  background-color:#848ba5
  li
    height:28px
    line-height:28px
    font-size:12px
    color:#fff
    padding-left:30px
    background-size:20px 20px !important
    border-bottom:1px solid #6775a6
  li:nth-child(1)
    background:url('~common/images/user.png') no-repeat center left
  li:nth-child(2)
    background:url('~common/images/rq.png') no-repeat center left
  li:nth-child(3)
    background:url('~common/images/zsdw.png') no-repeat center left
  li:nth-child(4)
    background:url('~common/images/lxr.png') no-repeat center left
  li:nth-child(5)
    background:url('~common/images/lxrqz.png') no-repeat center left
  li:nth-child(6)
    background:url('~common/images/tel.png') no-repeat center left
.detail_right
  width:400px
  padding-top:10px
  background-color:#fff
  font-size:14px
  li
    height:20px
    line-height:20px
</style>