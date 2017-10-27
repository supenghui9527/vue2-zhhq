<template>
  <div class="detail">
    <ul class="detail_left">
      <li>申请表单：基础名片（请确认）</li>
      <li>申请时间：{{mealDetail.createTime}}</li>
      <li>申办单位：{{$store.state.deptName}}</li>
      <li>申办单位联系人：{{$store.state.linkman}}</li>
      <li>申办单位办公电话：{{$store.state.officetel}}</li>
      <li>申办单位联系人手机：{{$store.state.linkmantel}}</li>
    </ul>
    <div class="detail_right">
      <ul>
        <li>
          <span>用餐地点：</span>
          <span>{{mealDetail.diningPlace==1?'建邺政府大楼':'双和园'}}</span>
        </li>
        <li>
          <span>用餐类型：</span>
          <span>{{mealDetail.diningType==0?'桌餐':'自助餐'}}</span>
        </li>
        <li>
          <span>用餐标准</span>
          <span v-if="mealDetail.diningBenchmark==0">标准不高于50元/人</span>
          <span v-if="mealDetail.diningBenchmark==1">标准不高于80元/人</span>
          <span v-if="mealDetail.diningBenchmark==2">标准不高于120元/人</span>
          <span v-if="mealDetail.diningBenchmark==3">参照公务接待标准</span>
        </li>
        <li>
          <span>用餐事由：</span>
          <span>{{mealDetail.diningReason}}</span>
        </li>
        <li>
          <span>用餐人数：</span>
          <span>{{mealDetail.peopleCount}}</span>
        </li>
        <li>
          <span>用餐时间：</span>
          <span>{{mealDetail.diningTime}}</span>
        </li>
        <li v-if="mealDetail.check1==1" class="sign">
          <span>申请单位领导：</span>
          <img width="40" height="40" :src="mealDetail.check1Sign">
        </li>
        <li v-if="mealDetail.check1==2">
          <span>签字驳回：</span>
          <span>{{mealDetail.check1Comments}}</span>
        </li>
        <li v-if="mealDetail.check2==1" class="sign">
          <span>申请部门盖章：</span>
          <img width="40" height="48" src="~common/images/pdf@2x.png" @click="downLoadPdf(mealDetail)">
        </li>
        <li v-if="mealDetail.check3==1" class="sign">
          <span>区分管领导领导：</span>
          <img width="40" height="40" :src="mealDetail.check3Sign">
        </li>
        <li v-if="mealDetail.check3==2">
          <span>签字驳回：</span>
          <span>{{mealDetail.check3Comments}}</span>
        </li>
        <li v-if="mealDetail.check4==1">
          <span>管理中心领导：已审核</span>
        </li>
        <li v-if="mealDetail.check4==2">
          <span>审核驳回：</span>
          <span>{{mealDetail.check4Comments}}</span>
        </li>
        <li v-if="mealDetail.check5==1">
          <span>管理中心分管领导：{{mealDetail.leaderName}}</span>
          <span>{{mealDetail.leaderTel}}</span>
        </li>
        <li v-if="mealDetail.check5==2">
          <span>分配驳回：</span>
          <span>{{mealDetail.check5Comments}}</span>
        </li>
      </ul>
      <el-button v-if="mealDetail.state==0&&$route.query.agency==1" type="primary" @click="getSign">签字</el-button>
      <el-button v-if="mealDetail.state==1&&$route.query.agency==1&&authStamp" type="primary" @click="goStamp">盖章</el-button>
      <el-button v-if="mealDetail.state==3&&$route.query.agency==1&&authInstructions" type="primary" @click="instructions">审核</el-button>
      <el-button v-if="mealDetail.state==3&&$route.query.agency==1&&authInstructions" type="primary" @click="reject">驳回</el-button>
      <el-button v-if="mealDetail.state==4&&$route.query.agency==1&&authAllot" type="primary" @click="mealSure">确认</el-button>
      <el-button v-if="mealDetail.state==4&&$route.query.agency==1&&authAllot" type="primary" @click="mealReject">驳回</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      mealDetail: {},
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
      // 详情
      getDetail () {
        this.$store.dispatch('go/meal/detail', {
          Vue: this,
          diningApplyID: this.$route.query.diningApplyID * 1
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
        this.$store.dispatch('meal/sure', {
          Vue: this,
          userID: localStorage.getItem('userID'),
          diningApplyID: this.$route.query.diningApplyID * 1,
          comment: '',
          state: 5
        })
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
  overflow-y:scroll !important
  .sign
    height:48px !important
    line-height:48px !important
    img
      vertical-align:middle
  li
    height:20px
    line-height:20px
</style>