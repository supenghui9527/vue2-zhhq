<template>
  <div class="apply_car_container clearfix">
    <show-rule v-if="isShow" @hide="hideRule"></show-rule>
    <ul class="repair_left">
      <li>
        <label><span class="must_write">*</span>是否补单</label>
        <el-radio class="radio" v-model="isAfterApply" :label="0">是</el-radio>
        <el-radio class="radio" v-model="isAfterApply" :label="1">否</el-radio>
      </li>
      <li>
        <label><span class="must_write">*</span>申报事由</label>
        <el-radio-group v-model="applyReason">
          <el-radio :label="0">应急</el-radio>
          <el-radio :label="1">调研</el-radio>
          <el-radio :label="2">接待</el-radio>
        </el-radio-group>
      </li>
      <li>
        <label style="display: block"><span class="must_write">*</span>目的地</label>
        <el-input v-model="goalPlace" placeholder="请输入目的地"></el-input>
      </li>
      <li>
        <label style="display: block"><span class="must_write">*</span>详细事由</label>
        <el-input v-model="detailReason" placeholder="请输入内容"></el-input>
      </li>
    </ul>
    <div class="repair_right">
      <ul>
        <li class="clearfix">
          <label class="float-left"><span class="must_write">*</span>用车人数</label>
          <el-input class="float-left" v-model="peopleCount" placeholder="请输入用车人数"></el-input>
        </li>
        <li class="clearfix">
          <label class="float-left"><span class="must_write">*</span>用车时间</label>
          <el-date-picker
            v-model="usingTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </li>
        <li class="clearfix">
          <label class="float-left"><span class="must_write">*</span>联系人</label>
          <el-input class="float-left" v-model="linkman" placeholder="请输入联系姓名"></el-input>
        </li>
        <li class="clearfix">
          <label class="float-left"><span class="must_write">*</span>联系人电话</label>
          <el-input class="float-left" v-model="linkmanTel" placeholder="请输入联系人电话"></el-input>
        </li>
      </ul>
      <div class="repair_btn" @click="submitApplyCar">提交申请</div>
    </div>
  </div>
</template>
<script>
  import showRule from '@/base/showRule/showRule'
  import dateFormat from '@/common/js/dateFormat'
  export default {
    data: () => ({
      isShow: null,
      isAfterApply: 0,
      applyReason: 1,
      peopleCount: '',
      linkman: '',
      linkmanTel: '',
      detailReason: '',
      goalPlace: '',
      usingTime: ''
    }),
    components: {
      showRule
    },
    created () {
      let storge = window.localStorage
      if (storge.getItem('isExpire')) {
        if (storge.getItem('isExpire') === new Date().toDateString()) {
          if (storge.getItem('isShow')) {
            this.isShow = false
          } else {
            storge.setItem('isShow', true)
            this.isShow = true
          }
        } else {
          this.isShow = true
          storge.setItem('isExpire', new Date().toDateString())
        }
      } else {
        storge.setItem('isExpire', new Date().toDateString())
        if (storge.getItem('isShow')) {
          this.isShow = false
        } else {
          storge.setItem('isShow', true)
          this.isShow = true
        }
      }
    },
    methods: {
      submitApplyCar () {
        let nowDate = dateFormat(this.usingTime, 'yyyy-MM-dd-hh-mm').split('-')
        if (this.goalPlace !== '' && this.detailReason !== '' && this.usingTime !== '' && this.peopleCount !== '' && this.linkman !== '' && this.linkmanTel !== '') {
          this.$store.dispatch('submit/apply/car', {
            Vue: this,
            userID: window.localStorage.getItem('userID'),
            userName: window.localStorage.getItem('linkman'),
            userTel: window.localStorage.getItem('linkmantel'),
            applyDeptID: window.localStorage.getItem('dept_id'),
            applyDept: window.localStorage.getItem('deptName'),
            officeTel: window.localStorage.getItem('officetel'),
            applyReason: this.applyReason,
            goalPlace: this.goalPlace,
            detailReason: this.detailReason,
            peopleCount: this.peopleCount,
            usingTime: `${nowDate[0]}-${nowDate[1]}-${nowDate[2]} ${nowDate[3]}:${nowDate[4]}}`,
            linkman: this.linkman,
            linkmanTel: this.linkmanTel,
            isAfterApply: this.isAfterApply
          })
        } else {
          this.$message({message: '请确认信息是否填写完整', type: 'warning'})
        }
      },
      hideRule () {
        this.isShow = false
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.apply_car_container
  background-color:rgba(188,194,218,0.8)
  height:220px
  font-size:14px
  label
    .must_write
      display:inline-block
      width:6px
      color:#ff0000
  .el-input
    width:220px
  .repair_left,.repair_right
    float:left
    height:100%
    box-sizing:border-box
    padding-left:25px
    padding-top:9px
    li
      padding-bottom:6px
  .repair_left
    width:40%
    border-right:1px solid #969696
  .repair_right
    width:60%
    li
      line-height:42px
      label
        width:80px
    .repair_btn
      position:absolute
      right:15px
      bottom:15px
      width:67px
      height:30px
      line-height:30px
      color:#d4d7ea
      background-color:#1c3da6
      border-radius:3px
      text-align:center
</style>