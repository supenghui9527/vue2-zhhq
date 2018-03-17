<template>
  <div class="detail">
    <div v-if="fixWorkerList!=null" class="fixed">
      <div class="repair_allot">
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
    <div v-if="assessShow" class="fixed">
      <div class="allot">
        <h5>
          <span>评价反馈</span>
          <i @click="closeAssess"></i>
        </h5>
        <div style="padding-left: 10px">
          <div style="padding-top:10px;padding-bottom: 10px" class="clearfix">
            <label class="float-left" style="padding-right:10px">文字描述</label>
            <textarea class="float-left" v-model="assess" placeholder="多行输入"></textarea>
          </div>
          <div class="block clearfix">
            <span style="padding-right:10px" class="demonstration float-left">星级指数</span>
            <el-rate
              class="float-left"
              v-model="levels"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
            </el-rate>
          </div>
        </div>
        <el-button class="submit_allot" type="primary" @click="sureAssess">确认评价</el-button>
      </div>
    </div>
    <ul class="detail_top clearfix">
      <li>申请类型：维修申请</li>
      <li>申请时间：{{repairDetail.repairApplyReturn.createTime}}</li>
      <li>申办单位：{{userInfo.deptName}}</li>
      <li>申办单位联系人：{{userInfo.name}}</li>
      <li>申办单位办公电话：{{userInfo.telphone}}</li>
      <li>申办单位联系人手机：{{userInfo.mobile}}</li>
    </ul>
    <div class="detail_bottom">
      <ul class="clearfix">
        <li>
          <span>维修地点</span>
          <span v-if="repairDetail.repairApplyReturn.place==0">暂无</span>
          <span v-else-if="repairDetail.repairApplyReturn.place==1">建邺区政府大楼</span>
          <span v-else>双和园</span>
        </li>
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
          <img v-if="repairDetail.picList!=''" width="30" height="30" v-for="item in repairDetail.picList" :src="repairDetail.homePicPath+item">
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
      <div class="stars" v-if="repairDetail.repairApplyReturn.state==3">
        <div>
          <span>评价反馈：</span>
          <span>{{repairDetail.repairApplyReturn.assess}}</span>
        </div>
        <div style="width:100%">
          <span>星级指数：</span>
          <el-rate
            v-model="repairDetail.repairApplyReturn.levels"
            style="display:inline-block"
            :disabled="true"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
          </el-rate>
        </div>
      </div>
      <div class="btn_" v-if="repairDetail.repairApplyReturn.state==0&&$route.query.agency==1&&authAllot" type="primary" @click="getAllot">分配</div>
      <div class="btn_" v-if="repairDetail.repairApplyReturn.state==0&&$route.query.agency==1&&!authAllot&&userInfo.id!='f63ec75d5e992332015e99a8e978000c'" type="primary" @click="getOrders">接单</div>
<!--       <div v-if="repairDetail.repairApplyReturn.state==0&&$route.query.agency==1&&!authAllot&&userInfo.id!='f63ec75d5e992332015e99a8e978000c'" type="primary" @click="getOrders">完成</div> -->
      <div class="btn_" v-if="repairDetail.repairApplyReturn.state==2&&$route.query.agency!=1" type="primary" @click="showAssess">点击评价</div>
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      repairDetail: {
        repairApplyReturn: {}
      },
      fixWorkerList: null,
      authAllot: false,
      orderAuth: false,
      fixWorkerId: null,
      assess: null,
      levels: null,
      assessShow: false,
      userInfo: null
    }),
    created () {
      setTimeout(() => {
        this.getDetail()
        this.userInfo = JSON.parse(localStorage.getItem('userinfo'))
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
        this.fixWorkerList = null
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
          fixWorkerID: this.fixWorkerId,
          fixWorkerName: this.fixWorkerName,
          fixWorkerTel: this.fixWorkerTel,
          repairApplyID: this.$route.query.repairApplyID * 1,
          comment: '',
          state: this.repairDetail.repairApplyReturn.state
        })
      },
      // 维修接单
      getOrders () {
        this.$store.dispatch('order/repair', {
          Vue: this,
          userID: localStorage.getItem('userID'),
          repairApplyID: this.$route.query.repairApplyID * 1
        })
      },
      // 显示评价模块
      showAssess () {
        this.assessShow = true
      },
      // 关闭评价模块
      closeAssess () {
        this.assessShow = false
      },
      // 确认评价
      sureAssess () {
        this.$store.dispatch('assess/repair', {
          Vue: this,
          assess: this.assess,
          repairApplyID: this.$route.query.repairApplyID * 1,
          levels: this.levels
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
  .repair_allot
    position:absolute
    width:60% !important
    height:220px
    top:230px
    left:50%
    margin-left:-30% !important
    z-index:9999
    background-color:#fff
  .allot,.repair_allot
    position:absolute
    width:700px
    height:220px
    top:230px
    left:50%
    margin-left:-225px
    z-index:9999
    background-color:#fff
    textarea
      width:320px
      height:90px
      padding-top:5px
      padding-left:10px
      box-sizing:border-box
      resize:none
      border:none
      background-color:#f0f0f0
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
.stars
  padding-left:30px
  >div
    margin-bottom:4px
    height:30px
    line-height:30px
    span:nth-child(1)
      display:inline-block
      width:100px
      background-color:#d9d9d9
      border-radius:6px
      color:#646464
      text-align:center
      margin-right:30px
    span:nth-child(2),span:nth-child(3)
      color:#426df7
</style>