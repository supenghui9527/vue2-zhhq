<template>
  <div class="detail">
    <div v-if="showMile" class="fixed">
      <div class="allot assess">
        <h5>
          <span>确认里程</span>
          <i @click="showMile=false"></i>
        </h5>
        <div style="padding-left:30px">
          <label>前里程：</label>
          <input class="host" v-model="beforeMile" placeholder="请输入里程" />
        </div>
        <div style="padding-left:30px">
          <label>后里程：</label>
          <input class="host" v-model="afterMile" placeholder="请输入里程" />
        </div>
        <el-button class="btn_assess" type="primary" @click="complete">确认</el-button>
      </div>
    </div>
    <div v-if="aboutCar!=null" class="fixed">
      <div class="allot">
        <h5>
          <span>添加服务人员</span>
          <i @click="closeChoose"></i>
        </h5>
        <div class="allot_content clearfix">
          <div class="cars float-left">
            <div class="allot_item" v-for="item in aboutCar.carList" @click="getCarInfo(item)">
              <div :class="{on_useing:item.state==0}">
                <img v-if="carNum!==item.carNum" width="16" style="padding-right: 4px" height="16" src="~common/images/check_boxs.png">
                <img v-else width="20" height="16" src="~common/images/selected.png">
                <img width="25" height="20" src="~common/images/icon-car.png">
                <span>{{item.carModel}}&nbsp&nbsp{{item.carNum}}&nbsp&nbsp{{`${item.seat}人`}}</span>
                <span>{{item.tel}}</span>
              </div>
            </div>
            <div class="allot_item" v-for="item in aboutCar.driverList" @click="getDriverInfo(item)">
              <img v-if="driverID!==item.driverID" width="16" height="16" style="padding-right: 4px" src="~common/images/check_boxs.png">
              <img v-else width="20" height="16" src="~common/images/selected.png">
              <img width="20" height="20" style="padding-right: 5px" src="~common/images/staff.png">
              <span>{{item.driverName}}{{item.driverTel}}</span>
              <span>{{item.tel}}</span>
            </div>
          </div>
          <div class="car_detail float-left">
            <h6>车辆预订情况</h6>
            <div v-if="JSON.stringify(carUseing)!='[]'" class="car_use" v-for="item in carUseing">
              <div class="title">{{item.meetingDate}}</div>
              <div v-for="content in item.meetingTimeAxis">
                <div class="user_info use_date">{{content.startTime}}~{{content.endTime}}</div>
                <div class="user_info">申请部门：{{content.applyDept}}</div>
                <div class="user_info">联系电话：{{content.linkmanTel}}</div>
              </div>
            </div>
            <div class="no_useing" v-if="JSON.stringify(carUseing)=='[]'">车辆尚未使用</div>
          </div>
        </div>
        <el-button class="submit_allot" type="primary" @click="submitCarAllot">确认分配</el-button>
      </div>
    </div>
    <div v-if="assessShow" class="fixed">
      <div class="allot assess">
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
        <el-button class="btn_assess" type="primary" @click="sureAssess">确认评价</el-button>
      </div>
    </div>
    <ul class="detail_top clearfix">
      <li>申请类型：用车申请</li>
      <li>申请时间：{{carDetail.createTime}}</li>
      <li>申办单位：{{carDetail.applyDept}}</li>
      <li>申办单位联系人：{{carDetail.userName}}</li>
      <li>申办单位办公电话：{{carDetail.officeTel}}</li>
      <li>申办单位联系人手机：{{carDetail.userTel}}</li>
    </ul>
    <div class="detail_bottom">
      <ul class="clearfix">
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
          <span>申请单位领导</span>
          <img height="30" :src="carDetail.check1Sign">
        </li>
        <li v-if="carDetail.check1==2">
          <span>申请单位领导</span>
          <span>驳回</span>
          <span>{{carDetail.check1Comments}}</span>
        </li>
        <li v-if="carDetail.check2==1" class="sign">
          <span>申请部门盖章</span>
          <img width="30" src="~common/images/pdf@2x.png" @click="downLoadPdf(carDetail)">
        </li>
        <li v-if="carDetail.check3==1">
          <span>车辆分管主任</span>
          <span>{{carDetail.reviewName}}</span>
          <span>管理中心分管主任</span>
        </li>
        <li v-if="carDetail.check3==2">
          <span>车辆分管主任</span>
          <span>审核驳回</span>
          <span>{{carDetail.check3Comments}}</span>
        </li>
      </ul>
      <div class="apply_flow">
        <div class="clearfix" v-if="carDetail.check4==1">
          <div class="list_item">
            <span>车辆分管科长</span>
            <span>{{carDetail.leaderName}}</span>
            <span>管理中心车队长</span>
          </div>
          <div class="list_item">
            <span>车辆车牌</span>
            <span>{{carDetail.carModel}}</span>
            <span>{{carDetail.carNum}}</span>
          </div>
          <div class="list_item">
            <span>司机信息</span>
            <span>{{carDetail.driver}}</span>
            <span>{{carDetail.driverTel}}</span>
          </div>
        </div>
        <div class="active_item" v-if="carDetail.state==5">
          <span>里程数</span>
          <span>{{carDetail.beforeMile}}~{{carDetail.afterMile}}</span>
        </div>
        <div class="active_item" v-if="carDetail.check4==2">
          <span>分配驳回</span>
          <span>{{carDetail.check4Comments}}</span>
        </div>
        <div class="clearfix" v-if="carDetail.state==6">
          <div class="list_item">
            <span>评价反馈</span>
            <span>{{carDetail.assess}}</span>
          </div>
          <div class="clearfix list_item">
            <span class="float-left">星级指数</span>
            <el-rate
              v-model="carDetail.levels"
              class="float-left"
              :disabled="true"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
            </el-rate>
          </div>
        </div>
      </div>
      <div class="btn_" v-if="carDetail.state==0&&$route.query.agency==1" type="primary" @click="getSign">签字</div>
      <div class="btn_" v-if="carDetail.state==1&&$route.query.agency==1&&authStamp" type="primary" @click="goStamp">盖章</div>
      <div class="btn_" v-if="carDetail.state==2&&$route.query.agency==1&&authInstructions" type="primary" @click="instructions">审核</div>
      <div class="btn_no" v-if="carDetail.state==2&&$route.query.agency==1&&authInstructions" type="primary" @click="reject">驳回</div>
      <div class="btn_" v-if="carDetail.state==3&&$route.query.agency==1&&authAllot" type="primary" @click="getAllot">分配</div>
      <div class="btn_no" v-if="carDetail.state==3&&$route.query.agency==1&&authAllot" type="primary" @click="allotReject">驳回</div>
      <div class="btn_" v-if="carDetail.state==4&&$route.query.agency==1&&authAllot" type="primary" @click="clickShowMile">完成</div>
      <div class="btn_" v-if="carDetail.state==5&&$route.query.agency!=1" type="primary" @click="showAssess">点击评价</div>
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      carDetail: {},
      carUseing: [],
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
      assessShow: false,
      userInfo: null,
      showMile: false,
      beforeMile: null,
      afterMile: null
    }),
    watch: {
      carID () {
        this.$store.dispatch('car/useing', {
          Vue: this,
          carID: this.carID
        })
      }
    },
    created () {
      setTimeout(() => {
        this.userInfo = JSON.parse(localStorage.getItem('userinfo'))
        this.getDetail()
      }, 20)
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
        if (this.userInfo.signPath !== null && this.userInfo.signPath !== '') {
          this.$store.dispatch('get/sign', {
            Vue: this,
            userID: localStorage.getItem('userID'),
            signPath: this.userInfo.signPath,
            applyID: this.$route.query.carApplyID * 1,
            tag: this.$route.query.tag * 1
          })
        } else {
          this.$message({message: '请前往移动端保存签名', type: 'warning'})
        }
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
        this.carID = null
        this.carNum = null
        this.carModel = null
        this.carID = null
        this.carNum = null
        this.carModel = null
      },
      // 获取车辆信息
      getCarInfo (item) {
        this.carID = item.carID
        if (item.state === 0) {
          this.$message({
            message: '车辆在使用中或者出现其他故障请选择其他车辆',
            type: 'warning'
          })
          return false
        }
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
        if (this.driverTel !== null && this.carNum !== null && this.driverName !== null && this.driverID !== null && this.carModel !== null && this.carID !== null) {
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
        } else {
          this.$message({
            message: '请确认是否选择车辆和司机',
            type: 'warning'
          })
        }
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
      clickShowMile () {
        this.showMile = true
      },
      // 完成申请单子
      complete () {
        if (this.beforeMile !== null && this.afterMile !== null) {
          this.$store.dispatch('car/complete', {
            Vue: this,
            userID: localStorage.getItem('userID'),
            carApplyID: this.$route.query.carApplyID * 1,
            beforeMile: this.beforeMile,
            afterMile: this.afterMile
          })
        } else {
          this.$message({message: '请确认是否填写里程数', type: 'warning'})
        }
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
  .assess
    width:400px !important
    left:50% !important
    margin-left:-200px !important
    padding-bottom:60px
    h5
      height:30px !important
      line-height:30px !important
    .btn_assess
      position:absolute
      bottom:15px
      left:50%
      margin-left:-44px
  .allot
    position:absolute
    width:850px
    top:180px
    left:50%
    margin-left:-425px
    z-index:9999
    background-color:#fff
    .on_useing
      background-color:#ccc
      width:85%
      border-radius:6px
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
       left:240px
    h5
      height:50px
      position:relative
      line-height:50px
      background-color:#20a0ff
      color:#fff
      text-align:center
      font-size:16px
      i
        width:20px
        height:20px
        position:absolute
        right:0
        top:0
        padding:6px
        background:url('~common/images/close.png') no-repeat center center
        background-size:14px 14px
    .allot_content
      .cars
        width:580px
        position:relative
        box-sizing:border-box
        padding-top:20px
        border-right:2px solid #ccc
      .cars,.car_detail
        height:400px
        overflow-y:auto
      .car_detail
        width:270px
        color:#343434
        h6
          width:100%
          height:34px
          line-height:34px
          background-color:#e6e6e6
          text-align:center
        .title
          padding: 10px 0 10px 25px
          background:url('~common/images/date.png') no-repeat center left
        .no_useing
          text-align:center
          margin-top:80px
          color:#c6c6c6
        .car_use
          width:220px
          margin:0 auto
          font-size:16px
          border-bottom:1px solid #cdcdcd
          .user_info
            padding-left:25px
            margin-bottom:6px
          .use_date
            background:url('~common/images/dot.png') no-repeat center left
      .allot_item
        width:50%
        margin-bottom:20px
        float:left
        padding-left:20px
        box-sizing:border-box
        cursor: pointer
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
.apply_flow
  font-size:14px
  .list_item
    width:50%
    float:left
    padding-left:30px
    box-sizing:border-box
  .active_item
    padding-left:30px
    span:nth-child(1)
      display:inline-block
      width:100px
      height:30px
      line-height:30px
      background-color:#d9d9d9
      border-radius:6px
      color:#646464 !important
      text-align:center
      margin-right:30px
    span
      color:#426df7
  >div
    >div
      margin-bottom:4px
      span:nth-child(1)
        display:inline-block
        width:100px
        height:30px
        line-height:30px
        background-color:#d9d9d9
        border-radius:6px
        color:#646464 !important
        text-align:center
        margin-right:30px
      span
        color:#426df7
</style>