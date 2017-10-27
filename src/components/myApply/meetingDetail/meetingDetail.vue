<template>
  <div class="detail">
    <div v-if="allot!=null" class="fixed">
      <div class="allot">
        <h5>
          <span>添加服务人员</span>
          <i @click="closeChoose"></i>
        </h5>
        <div>
          <div class="allot_item" v-for="item in allot" @click="chooseallot(item)">
            <img v-if="activeNameArr.toString().indexOf(item.serverID)==-1" width="16" height="16" src="~common/images/check_boxs.png">
            <img v-else width="16" height="16" src="~common/images/selected.png">
            <img width="20" height="20" src="~common/images/staff.png">
            <span>{{item.serverName}}</span>
            <span>{{item.tel}}</span>
          </div>
        </div>
        <el-button class="submit_allot" type="primary" @click="submitAllot">确认分配</el-button>
      </div>
    </div>
    <ul class="detail_left">
      <li>申请表单：基础名片（请确认）</li>
      <li>申请时间：{{meetingDeatail.createTime}}</li>
      <li>申办单位：{{$store.state.deptName}}</li>
      <li>申办单位联系人：{{$store.state.linkman}}</li>
      <li>申办单位办公电话：{{$store.state.officetel}}</li>
      <li>申办单位联系人手机：{{$store.state.linkmantel}}</li>
    </ul>
    <div class="detail_right">
      <ul>
        <li class="clearfix">
          <div class="float-left">
            <span>会议日期：</span>
            <span>{{meetingDeatail.meetingDate}}</span>
          </div>
          <div class="float-left">
            <li>
              <span>会议时间：</span>
              <span>{{meetingDeatail.startTime}}-{{meetingDeatail.endTime}}</span>
            </li>
          </div>
        </li>
        <li>
          <span>是否大日程：</span>
          <span>{{meetingDeatail.isSchedule==0?'否':'是'}}</span>
        </li>
        <li>
          <span>会议内容：</span>
          <span>{{meetingDeatail.meetingContent==null?'空':meetingDeatail.meetingContent}}</span>
        </li>
        <li class="clearfix">
          <div class="float-left">
            <span>参会人数：</span>
            <span>{{meetingDeatail.peopleCount}}</span>
          </div>
          <div class="float-left">
            <span>主席台人数：</span>
            <span>{{meetingDeatail.rostrumCount}}</span>
          </div>
        </li>
        <li class="clearfix">
          <div class="float-left">
            <span>话筒数量：</span>
            <span>{{meetingDeatail.mikeCount}}</span>
          </div>
          <div class="float-left">
            <span>立式话筒数量：</span>
            <span>{{meetingDeatail.standMike}}</span>
          </div>
        </li>
        <li>
          <span>音乐播放：</span>
          <span>{{meetingDeatail.music==0?'否':'是'}}</span>
        </li>
        <li>
          <span>横幅/LED：</span>
          <span>{{meetingDeatail.banner}}</span>
        </li>
        <li>
          <span>其他内容：</span>
          <span>{{meetingDeatail.otherService}}</span>
        </li>
        <li v-if="meetingDeatail.check1==1" class="sign">
          <span>申请单位领导：</span>
          <img width="40" height="40" :src="meetingDeatail.check1Sign">
        </li>
        <li v-if="meetingDeatail.check1==2">
          <span>签字驳回：</span>
          <span>{{meetingDeatail.check1Comments}}</span>
        </li>
        <li v-if="meetingDeatail.check2==1" class="sign">
          <span>申请部门盖章：</span>
          <img width="40" height="48" src="~common/images/pdf@2x.png" @click="downLoadPdf(meetingDeatail)">
        </li>
        <li v-if="meetingDeatail.check3==1">
          <span>已批示：</span>
          <span>{{meetingDeatail.check3Comments}}</span>
        </li>
        <li v-if="meetingDeatail.check4==1">
          <span>分管中心领导：{{meetingDeatail.leaderName}}</span>
          <span>{{meetingDeatail.leaderTel}}</span>
          <div class="meeting_plan clearfix">
            <span class="float-left">会议室安排：</span>
            <p class="float-left" v-for="item in meetingDeatail.serverList">{{item.duty}}&nbsp{{item.serverName}}&nbsp{{item.tel}}</p>
          </div>
        </li>
        <li v-if="meetingDeatail.check4==2">
          <span>分配驳回：</span>
          <span>{{meetingDeatail.check4Comments}}</span>
        </li>
      </ul>
      <el-button v-show="meetingDeatail.state==0&&$route.query.agency==1" type="primary" @click="getSign">签字</el-button>
      <el-button v-show="meetingDeatail.state==1&&$route.query.agency==1&&authStamp" type="primary" @click="goStamp">盖章</el-button>
      <el-button v-show="meetingDeatail.state==2&&$route.query.agency==1&&authInstructions" type="primary" @click="instructions">批示</el-button>
      <el-button v-show="meetingDeatail.state==3&&$route.query.agency==1&&authAllot" type="primary" @click="getAllot">分配</el-button>
      <el-button v-show="meetingDeatail.state==3&&$route.query.agency==1&&authAllot" type="primary" @click="reject">驳回</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      meetingDeatail: {},
      allot: null,
      serverIDs: [],
      activeNameArr: [],
      authStamp: false,
      authInstructions: false,
      authAllot: false
    }),
    created () {
      setTimeout(() => {
        this.getDetail()
      }, 20)
    },
    beforeRouteUpdate (to, from, next) {
      next()
    },
    methods: {
      // 会议申请详情
      getDetail () {
        this.$store.dispatch('meeting/agpply', {
          Vue: this,
          meetingApplyID: this.$route.query.meetingApplyID * 1
        })
      },
      // 签字
      getSign () {
        this.$store.dispatch('get/sign', {
          Vue: this,
          userID: localStorage.getItem('userID')
        })
      },
      // 盖章
      goStamp () {
        this.$router.push({path: '/agency/meetingAgency', query: {meetingApplyID: this.$route.query.meetingApplyID * 1}})
      },
      // 下载PDF
      downLoadPdf (item) {
        location.href = item.check2Sign
      },
      // 待批示
      instructions () {
        this.$prompt('请输入批示内容', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.$store.dispatch('meeting/instructions', {
            Vue: this,
            userID: localStorage.getItem('userID'),
            meetingApplyID: this.$route.query.meetingApplyID * 1,
            comment: value
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      },
      // 获取分配列表
      getAllot () {
        this.$store.dispatch('get/allot', {
          Vue: this
        })
      },
      // 选择分配人员
      chooseallot (item) {
        let flag = true
        for (let i = 0; i < this.activeNameArr.length; i++) {
          if (this.activeNameArr[i] === item.serverID) {
            this.activeNameArr.splice(i, 1)
            this.serverIDs.splice(i, 1)
            flag = false
            return flag
          }
        }
        if (flag) {
          this.activeNameArr.push(item.serverID)
          this.serverIDs.push(item.serverID)
        }
        this.serverIDs.toString()
      },
      // 关闭会议室分配
      closeChoose () {
        this.allot = null
      },
      // 提交会议分配
      submitAllot () {
        this.$store.dispatch('submit/allot', {
          Vue: this,
          meetingApplyID: this.$route.query.meetingApplyID * 1,
          userID: localStorage.getItem('userID'),
          comment: '',
          serverIDs: this.serverIDs.toString(),
          state: 4
        })
      },
      // 分配驳回
      reject () {
        this.$prompt('请输入驳回原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.$store.dispatch('submit/allot', {
            Vue: this,
            meetingApplyID: this.$route.query.meetingApplyID * 1,
            userID: localStorage.getItem('userID'),
            comment: value,
            serverIDs: '',
            state: 10
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
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
      text-align:center
      margin-bottom:6px
      img
        vertical-align:middle
.meeting_plan
  width:80% !important
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
  padding-bottom:10px
  background-color:#fff
  font-size:14px
  overflow-y:scroll !important
  .sign
    height:48px !important
    line-height:48px !important
    img
      vertical-align:middle
  li
    height:20px
    line-height:20px
    div
      width:50%
</style>