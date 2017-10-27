<template>
  <div class="detail">
    <div v-if="aboutCar!=null" class="fixed">
      <div class="allot">
        <h5>
          <span>添加服务人员</span>
          <i @click="closeChoose"></i>
        </h5>
        <div>
          <div class="allot_item" v-for="item in aboutCar.carList" @click="getCarInfo(item)">
            <img v-if="carID!==item.carID" width="16" height="16" src="~common/images/check_boxs.png">
            <img v-else width="16" height="16" src="~common/images/selected.png">
            <img width="20" height="20" src="~common/images/staff.png">
            <span>{{item.carModel}}{{item.carNum}}{{item.seat}}</span>
            <span>{{item.tel}}</span>
          </div>
        </div>
        <div>
          <div class="allot_item" v-for="item in aboutCar.driverList" @click="getDriverInfo(item)">
            <img v-if="driverID!==item.driverID" width="16" height="16" src="~common/images/check_boxs.png">
            <img v-else width="16" height="16" src="~common/images/selected.png">
            <img width="20" height="20" src="~common/images/staff.png">
            <span>{{item.driverName}}{{item.driverTel}}</span>
            <span>{{item.tel}}</span>
          </div>
        </div>
        <el-button class="submit_allot" type="primary" @click="submitCarAllot">确认分配</el-button>
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
    <ul class="detail_left">
      <li>申请表单：基础名片（请确认）</li>
      <li>申请时间：{{carDetail.createTime}}</li>
      <li>申办单位：{{$store.state.deptName}}</li>
      <li>申办单位联系人：{{$store.state.linkman}}</li>
      <li>申办单位办公电话：{{$store.state.officetel}}</li>
      <li>申办单位联系人手机：{{$store.state.linkmantel}}</li>
    </ul>
    <div class="detail_right">
      <ul>
        <li>
          <span>申报事由：</span>
          <span v-if="carDetail.applyReason==0">应急</span>
          <span v-if="carDetail.applyReason==1">调研</span>
          <span v-if="carDetail.applyReason==2">接待</span>
        </li>
        <li>
          <span>目的地：</span>
          <span>{{carDetail.goalPlace}}</span>
        </li>
        <li>
          <span>详细事由：</span>
          <span>{{carDetail.detailReason}}</span>
        </li>
        <li>
          <span>用车人数：</span>
          <span>{{carDetail.peopleCount}}</span>
        </li>
        <li>
          <span>用车时间：</span>
          <span>{{carDetail.usingTime}}</span>
        </li>
        <li>
          <span>联系人：</span>
          <span>{{carDetail.linkman}}</span>
        </li>
        <li>
          <span>联系人电话：</span>
          <span>{{carDetail.linkmanTel}}</span>
        </li>
        <li v-if="carDetail.check1==1" class="sign">
          <span>申请单位领导：</span>
          <img width="40" height="40" :src="carDetail.check1Sign">
        </li>
        <li v-if="carDetail.check1==2">
          <span>签字驳回：</span>
          <span>{{carDetail.check1Comments}}</span>
        </li>
        <li v-if="carDetail.check2==1" class="sign">
          <span>申请部门盖章：</span>
          <img width="40" height="48" src="~common/images/pdf@2x.png" @click="downLoadPdf(carDetail)">
        </li>
        <li v-if="carDetail.check3==1">
          <span>管理中心领导：已审核</span>
        </li>
        <li v-if="carDetail.check3==2">
          <span>审核驳回：</span>
          <span>{{carDetail.check3Comments}}</span>
        </li>
        <li v-if="carDetail.check4==1">
          <span>管理中心分管领导：{{carDetail.leaderName}}</span>
          <span>{{carDetail.leaderTel}}</span>
          <div>
            <span>车辆车牌：</span>
            <div>
              <span>{{carDetail.carModel}}</span>
              <span>{{carDetail.carNum}}</span>
            </div>
          </div>
          <div>
            <span>司机信息：</span>
            <div>
              <span>{{carDetail.driver}}</span>
              <span>{{carDetail.driverTel}}</span>
            </div>
  
          </div>
        </li>
        <li v-if="carDetail.check4==2">
          <span>分配驳回：</span>
          <span>{{carDetail.check4Comments}}</span>
        </li>
        <li v-if="carDetail.state==7">
          <div>
            <span>评价反馈：</span>
            <span>{{carDetail.assess}}</span>
          </div>
          <div style="width:100%">
            <span>星级指数：</span>
            <el-rate
              v-model="carDetail.levels"
              style="display:inline-block"
              :disabled="true"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
            </el-rate>
          </div>
        </li>
      </ul>
      <el-button v-if="carDetail.state==0&&$route.query.agency==1" type="primary" @click="getSign">签字</el-button>
      <el-button v-if="carDetail.state==1&&$route.query.agency==1&&authStamp" type="primary" @click="goStamp">盖章</el-button>
      <el-button v-if="carDetail.state==2&&$route.query.agency==1&&authInstructions" type="primary" @click="instructions">审核</el-button>
      <el-button v-if="carDetail.state==2&&$route.query.agency==1&&authInstructions" type="primary" @click="reject">驳回</el-button>
      <el-button v-if="carDetail.state==3&&$route.query.agency==1&&authAllot" type="primary" @click="getAllot">分配</el-button>
      <el-button v-if="carDetail.state==3&&$route.query.agency==1&&authAllot" type="primary" @click="allotReject">驳回</el-button>
      <el-button v-if="carDetail.state==6&&$route.query.agency!=1" type="primary" @click="showAssess">点击评价</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      carDetail: {},
      aboutCar: null,
      authStamp: false,
      authInstructions: false,
      authAllot: false,
      carID: null,
      carNum: null,
      carModel: null,
      driverName: null,
      driverTel: null,
      driverID: null,
      assess: null,
      levels: null,
      assessShow: false
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
      // 详情
      getDetail () {
        this.$store.dispatch('go/UseCar/detail', {
          Vue: this,
          carApplyID: this.$route.query.carApplyID * 1
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
        this.$router.push({path: '/agency/carAgency', query: {carApplyID: this.$route.query.carApplyID * 1}})
      },
      // 下载PDF
      downLoadPdf (item) {
        location.href = item.check2Sign
      },
      // 审核
      instructions () {
        this.$store.dispatch('submit/auditing', {
          Vue: this,
          userID: localStorage.getItem('userID'),
          carApplyID: this.$route.query.carApplyID * 1,
          Comment: '',
          state: 3
        })
      },
      // 审核驳回
      reject () {
        this.$prompt('请输入驳回原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.$store.dispatch('submit/auditing', {
            Vue: this,
            userID: localStorage.getItem('userID'),
            carApplyID: this.$route.query.carApplyID * 1,
            comment: value,
            state: 9
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
        this.$store.dispatch('get/car/allot', {
          Vue: this
        })
      },
      // 关闭分配列表
      closeChoose () {
        this.aboutCar = null
      },
      // 获取车辆信息
      getCarInfo (item) {
        this.carID = item.carID
        this.carNum = item.carNum
        this.carModel = item.carModel
      },
      // 获取司机信息
      getDriverInfo (item) {
        this.driverName = item.driverName
        this.driverTel = item.driverTel
        this.driverID = item.driverID
      },
      // 提交用车分配
      submitCarAllot () {
        this.$store.dispatch('submit/car/allot', {
          Vue: this,
          userID: localStorage.getItem('userID'),
          carApplyID: this.$route.query.carApplyID * 1,
          driverName: this.driverName,
          driverTel: this.driverTel,
          carModel: this.carModel,
          carNum: this.carNum,
          driverID: this.driverID,
          carID: this.carID,
          comment: '',
          state: 4
        })
      },
      // 分配驳回
      allotReject () {
        this.$prompt('请输入驳回原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.$store.dispatch('submit/car/allot', {
            Vue: this,
            userID: localStorage.getItem('userID'),
            carApplyID: this.$route.query.carApplyID * 1,
            driverName: '',
            driverTel: '',
            carModel: '',
            carNum: '',
            driverID: '',
            carID: '',
            comment: value,
            state: 10
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
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
        this.$store.dispatch('assess/use/car', {
          Vue: this,
          assess: this.assess,
          carApplyID: this.$route.query.carApplyID * 1,
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
  .allot
    position:absolute
    width:450px
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
      padding-left:20px
      box-sizing:border-box
      margin-bottom:6px
      img
        vertical-align:middle
.car
  width:400px
  height:300px
  background-color:#f00
  position:fixed
  left:0
  text-align:center
  p
    width:200px
    height:30px
    margin:0 auto
    line-height:30px
    background-color:#fff
    margin-bottom:6px
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