<template>
  <div class="detail">
    <div v-if="showRooms" class="fixed">
      <div class="allot">
        <h5>
          <span>分配包间</span>
          <i @click="closeAssess"></i>
        </h5>
        <div>
          <span>包间选择：</span>
          <el-radio class="radio" v-model="room" :label="201">201</el-radio>
          <el-radio class="radio" v-model="room" :label="202">202</el-radio>
          <el-radio class="radio" v-model="room" :label="203">203</el-radio>
        </div>
        <el-button class="submit_allot" type="primary" @click="mealSure">确认分配</el-button>
      </div>
    </div>
    <ul class="detail_top clearfix">
      <li>申请类型：用餐申请</li>
      <li>申请时间：{{mealDetail.createTime}}</li>
      <li>申办单位：{{mealDetail.applyDept}}</li>
      <li>申办单位联系人：{{mealDetail.linkman}}</li>
      <li>申办单位办公电话：{{mealDetail.officeTel}}</li>
      <li>申办单位联系人手机：{{mealDetail.linkmanTel}}</li>
    </ul>
    <div class="detail_bottom">
      <ul class="clearfix">
        <li>
          <span>用餐地点</span>
          <span>{{mealDetail.diningPlace==1?'建邺政府大楼':'双和园'}}</span>
        </li>
        <li>
          <span>用餐类型</span>
          <span>{{mealDetail.diningType==0?'桌餐':'自助餐'}}</span>
        </li>
        <li v-if="mealDetail.room">
          <span>用餐包间</span>
          <span>{{mealDetail.room}}</span>
        </li>
        <li>
          <span>用餐标准</span>
          <span v-if="mealDetail.diningBenchmark==0">标准不高于50元/人</span>
          <span v-if="mealDetail.diningBenchmark==1">标准不高于80元/人</span>
          <span v-if="mealDetail.diningBenchmark==2">标准不高于120元/人</span>
          <span v-if="mealDetail.diningBenchmark==3">参照公务接待标准</span>
        </li>
        <li>
          <span>用餐事由</span>
          <span>{{mealDetail.diningReason}}</span>
        </li>
        <li>
          <span>用餐人数</span>
          <span>{{mealDetail.peopleCount}}</span>
        </li>
        <li>
          <span>用餐时间</span>
          <span>{{mealDetail.diningTime}}</span>
        </li>
        <li v-if="mealDetail.check1==1" class="sign">
          <span>申请部门领导</span>
          <img width="30" height="30" :src="mealDetail.check1Sign">
        </li>
        <li v-if="mealDetail.check1==2">
          <span>申请部门领导</span>
          <span>驳回（签字）</span>
          <span>{{mealDetail.check1Comments}}</span>
        </li>
        <li v-if="mealDetail.check2==1" class="sign">
          <span>申请部门盖章</span>
          <img width="30" src="~common/images/pdf@2x.png" @click="downLoadPdf(mealDetail)">
        </li>
        <li v-if="mealDetail.check3==1" class="sign">
          <span>区领导</span>
          <img width="30" height="30" :src="mealDetail.check3Sign">
        </li>
        <li v-if="mealDetail.check3==2">
          <span>区领导</span>
          <span>签字（驳回）</span>
          <span>{{mealDetail.check3Comments}}</span>
        </li>
        <li v-if="mealDetail.check4==1">
          <span>用餐分管主任</span>
          <span>{{mealDetail.reviewName}}</span>
          <span>管理中心分管主任</span>
        </li>
        <li v-if="mealDetail.check4==2">
          <span>用餐分管主任</span>
          <span>审核（驳回）</span>
          <span>{{mealDetail.check4Comments}}</span>
        </li>
        <li class="active" v-if="mealDetail.check5==1">
          <span>餐科长</span>
          <span>{{mealDetail.leaderName}}</span>
          <span>管理中心餐饮科长</span>
        </li>
        <li v-if="mealDetail.check5==2">
          <span>餐科长</span>
          <span>分配（驳回）</span>
          <span>{{mealDetail.check5Comments}}</span>
        </li>
      </ul>
      <div class="btn_" v-if="mealDetail.state==0&&$route.query.agency==1" type="primary" @click="getSign">签字</div>
      <div class="btn_" v-if="mealDetail.state==1&&$route.query.agency==1&&authStamp" type="primary" @click="goStamp">盖章</div>
      <div class="btn_" v-if="mealDetail.state==2&&$route.query.agency==1&&userInfo.isSign==1" type="primary" @click="getSign">签字</div>
      <div class="btn_" v-if="mealDetail.state==3&&$route.query.agency==1&&authInstructions" type="primary" @click="instructions">审核</div>
      <div class="btn_no" v-if="mealDetail.state==3&&$route.query.agency==1&&authInstructions" type="primary" @click="reject">驳回</div>
      <div class="btn_" v-if="mealDetail.state==4&&$route.query.agency==1&&authAllot" type="primary" @click="mealSure">确认</div>
      <div class="btn_no" v-if="mealDetail.state==4&&$route.query.agency==1&&authAllot" type="primary" @click="mealReject">驳回</div>
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      mealDetail: {},
      authStamp: false,
      authInstructions: false,
      authAllot: false,
      room: '',
      userInfo: {},
      showRooms: false
    }),
    created () {
      setTimeout(() => {
        this.userInfo = JSON.parse(localStorage.getItem('userinfo'))
        console.log(this.userInfo.isSign)
        this.getDetail()
      }, 20)
    },
    beforeRouteUpdate (to, from, next) {
      next()
    },
    methods: {
      // 详情
      getDetail () {
        this.$store.dispatch('go/meal/detail', {
          Vue: this,
          diningApplyID: this.$route.query.diningApplyID * 1
        })
      },
      // 签字
      getSign () {
        if (this.userInfo.signPath !== null && this.userInfo.signPath !== '') {
          this.$store.dispatch('get/sign', {
            Vue: this,
            userID: localStorage.getItem('userID'),
            signPath: this.userInfo.signPath,
            applyID: this.$route.query.diningApplyID * 1,
            tag: this.$route.query.tag * 1
          })
        } else {
          this.$message({message: '请前往移动端保存签名', type: 'warning'})
        }
      },
      // 盖章
      goStamp () {
        this.$router.push({path: '/agency/mealAgency', query: {diningApplyID: this.$route.query.diningApplyID * 1}})
      },
      // 下载PDF
      downLoadPdf (item) {
        location.href = item.check2Sign
      },
      // 审核
      instructions () {
        this.$store.dispatch('meal/auditing', {
          Vue: this,
          userID: localStorage.getItem('userID'),
          diningApplyID: this.$route.query.diningApplyID * 1,
          comment: '',
          state: 4
        })
      },
      // 审核驳回
      reject () {
        this.$prompt('请输入驳回原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.$store.dispatch('meal/auditing', {
            Vue: this,
            userID: localStorage.getItem('userID'),
            diningApplyID: this.$route.query.diningApplyID * 1,
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
      // 确认用餐
      mealSure () {
        if (this.mealDetail.diningType === 0) {
          if (!this.showRooms) {
            this.showRooms = true
            return false
          }
        }
        this.$store.dispatch('meal/sure', {
          Vue: this,
          userID: localStorage.getItem('userID'),
          diningApplyID: this.$route.query.diningApplyID * 1,
          comment: '',
          room: this.room,
          state: 5
        })
      },
      // 关闭评价模块
      closeAssess () {
        this.showRooms = false
        this.room = ''
      },
      // 确认驳回
      mealReject () {
        this.$prompt('请输入驳回原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.$store.dispatch('meal/sure', {
            Vue: this,
            userID: localStorage.getItem('userID'),
            diningApplyID: this.$route.query.diningApplyID * 1,
            comment: value,
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
  .detail
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
        width:500px
        top:230px
        left:50%
        margin-left:-250px
        padding-bottom:40px
        z-index:9999
        background-color:#fff
        div
          height:50px
          line-height:50px
          padding-left:20px
        .submit_allot
           position:absolute
           bottom:10px
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
    .detail_top
      background-color:#488fd7
      color:#fff
      li
        height:36px
        line-height:36px
        font-size:14px
        width:50%
        float:left
        box-sizing:border-box
        padding-left:60px
        border-right:1px solid #d9eef9
        border-bottom:1px solid #d9eef9
        background-size:20px 20px !important
      li:nth-child(2),li:nth-child(4),li:nth-child(6)
        border-right:none
      li:nth-child(5),li:nth-child(6)
        border-bottom:none
      li:nth-child(1)
        background:url('~common/images/user.png') no-repeat 20px center
      li:nth-child(2)
        background:url('~common/images/rq.png') no-repeat 20px center
      li:nth-child(3)
        background:url('~common/images/zsdw.png') no-repeat 20px center
      li:nth-child(4)
        background:url('~common/images/lxr.png') no-repeat 20px center
      li:nth-child(5)
        background:url('~common/images/lxrqz.png') no-repeat 20px center
      li:nth-child(6)
        background:url('~common/images/tel.png') no-repeat 20px center
    .detail_bottom
      background-color:#def0fa
      ul
        padding-top:30px
        box-sizing:border-box
        li
          width:50%
          float:left
          font-size:14px
          box-sizing:border-box
          padding-left:30px
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
          span:nth-child(2)
            color:#426df7
</style>