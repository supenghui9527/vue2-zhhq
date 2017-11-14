<template>
  <div  @click="closeOption" class="container_">
    <div class="repair_container clearfix">
      <div class="repair_left">
        <div class="clearfix common_margin">
          <span class="float-left" style="padding-right: 3px"><span class="must_write">*</span>报修事项</span>
          <div class="repair_choose">
            <span class="show_option" @click.stop="showOption=!showOption">{{activeNameArr.length === 0 ? '请选择维修地点' : activeNameArr.toString()}}</span>
            <transition name="fade">
              <div v-show="showOption" class="options">
                <span v-for="item in options" :class="{active:questionIDs.toString().indexOf(item.questionID)!==-1}" @click="chooseRepair(item.questionName,item.questionID)" :key="item.questionName">{{item.questionName}}</span>
              </div>
            </transition>
          </div>
        </div>
        <div class="common_margin">
          <span class="float-left" style="padding-right: 3px"><span class="must_write"></span>预约时间</span>
          <div class="time">
            <span v-for="item in timePicker" :class="{active_time:item==activeTime}" @click="chooseTime(item)">{{item}}</span>
          </div>
          <el-date-picker
            v-model="bespeakStartTime"
            type="datetime"
            :disabled="noUse"
            placeholder="选择日期时间">
          </el-date-picker>
          <el-date-picker
            v-model="bespeakEndTime"
            type="datetime"
            :disabled="noUse"
            placeholder="选择日期时间">
          </el-date-picker>
        </div>
        <div class="pictures">
          <span class="float-left" style="padding-right: 2px"><span class="must_write"></span>实地照片</span>
          <el-upload
            :action="$store.state.submitQuestionsUrl"
            ref="upload"
            name="picList"
            :data="param"
            list-type="picture-card"
            class="float-left"
            style="width: 180px"
            :multiple="true"
            :auto-upload="false"
            :on-change="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
      </div>
      <div class="repair_right">
        <div class="fault_place clearfix">
          <span class="float-left"><span class="must_write">*</span>故障位置</span>
          <input class="float-left" type="text" v-model="faultPlace">
        </div>
        <div class="fault_detail clearfix">
          <span class="float-left"><span class="must_write">*</span>故障现象</span>
          <input class="float-left" type="text" v-model="faultDetail">
        </div>
        <div class="remark clearfix">
          <span class="float-left"><span class="must_write"></span>备注说明</span>
          <textarea class="float-left" v-model="remark"></textarea>
        </div>
        <div class="repair_btn" @click="submitQuestions">提交申请</div>
      </div>
    </div>
  </div>
</template>
<script>
  import dateFormat from '@/common/js/dateFormat'
  export default {
    data: () => ({
      showOption: false,
      activeNameArr: [],
      questionIDs: [],
      param: {
        userID: '',
        questionIDs: '',
        bespeakStartTime: '',
        bespeakEndTime: '',
        faultPlace: '',
        faultDetail: '',
        remark: ''
      },
      bespeakStartTime: '',
      bespeakEndTime: '',
      timePicker: ['点击（无）', '点击（有）'],
      activeTime: '点击（无）',
      noUse: true,
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      faultPlace: '',
      faultDetail: '',
      remark: ''
    }),
    created () {
      this.$store.dispatch('get/questions', {
        Vue: this
      })
    },
    computed: {
      options () {
        return this.$store.getters['get/questions']
      }
    },
    methods: {
      // 选择需要维修的地点
      chooseRepair (questionName, questionID) {
        let flag = true
        for (let i = 0; i < this.activeNameArr.length; i++) {
          if (this.activeNameArr[i] === questionName) {
            this.activeNameArr.splice(i, 1)
            this.questionIDs.splice(i, 1)
            flag = false
            return flag
          }
        }
        if (flag) {
          this.activeNameArr.push(questionName)
          this.questionIDs.push(questionID)
        }
        this.questionIDs.toString()
      },
      // 是否需要预约时间
      chooseTime (item) {
        this.activeTime = item
        item === '点击（无）' ? this.noUse = true : this.noUse = false
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview (file, fileList) {
        this.dialogImageUrl = file.url
        this.fileList = fileList
      },
      closeOption () {
        if (this.showOption) {
          this.showOption = false
        }
      },
      // 提交报修申请
      submitQuestions () {
        if (this.userID === '' || this.questionIDs === '' || this.faultPlace === '' || this.faultDetail === '') {
          this.$message({message: '请确认信息是否填写完整', type: 'warning'})
          return false
        }
        if (this.bespeakStartTime !== '' && this.bespeakEndTime !== '') {
          var bespeakStartTime = dateFormat(this.bespeakStartTime, 'yyyy-MM-dd-hh-mm').split('-')
          var bespeakEndTime = dateFormat(this.bespeakEndTime, 'yyyy-MM-dd-hh-mm').split('-')
        }
        console.log(this.fileList)
        if (this.fileList.length !== 0) {
          this.param.userID = window.localStorage.getItem('userID')
          this.param.questionIDs = this.questionIDs.toString()
          this.param.bespeakStartTime = this.bespeakStartTime !== '' ? `${bespeakStartTime[0]}-${bespeakStartTime[1]}-${bespeakStartTime[2]} ${bespeakStartTime[3]}:${bespeakStartTime[4]}` : ''
          this.param.bespeakEndTime = this.bespeakEndTime !== '' ? `${bespeakEndTime[0]}-${bespeakEndTime[1]}-${bespeakEndTime[2]} ${bespeakEndTime[3]}:${bespeakEndTime[4]}` : ''
          this.param.faultPlace = this.faultPlace
          this.param.faultDetail = this.faultDetail
          this.param.remark = this.remark
          this.$refs.upload.submit()
          this.$message('已提交')
        } else {
          this.$store.dispatch('submit/questions', {
            Vue: this,
            picList: this.fileList,
            userID: window.localStorage.getItem('userID'),
            questionIDs: this.questionIDs.toString(),
            bespeakStartTime: this.bespeakStartTime !== '' ? `${bespeakStartTime[0]}-${bespeakStartTime[1]}-${bespeakStartTime[2]} ${bespeakStartTime[3]}:${bespeakStartTime[4]}` : '',
            bespeakEndTime: this.bespeakEndTime !== '' ? `${bespeakEndTime[0]}-${bespeakEndTime[1]}-${bespeakEndTime[2]} ${bespeakEndTime[3]}:${bespeakEndTime[4]}` : '',
            faultPlace: this.faultPlace,
            faultDetail: this.faultDetail,
            remark: this.remark
          })
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.container_
  position:fixed
  width:100%
  height:100%
  left:0
  top:0
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
.must_write
  display:inline-block
  width:10px
  color:#ff0000
  padding-right:0 !important
.repair_container
  position:absolute
  width:70%
  left:50%
  margin-left:-35%
  top:205px
  background-color:rgba(188,194,218,0.8)
  height:220px
  min-width:700px
  font-size:14px
  // 重写element类
  .el-upload
    width:50px
    height:50px
    position:relative
  .el-icon-plus
    position:absolute
    left:50%
    top:50%
    margin-left:-14px
    margin-top:-14px
  .el-upload-list__item 
    width:50px
    height:50px
    margin: 0 8px 2px 0
  .active_time
    background-color:#6a84dd !important
  .el-date-editor
    width:164px
    height:22px
    margin-left:69px
    margin-bottom:2px
    .el-input__inner,i
      height:22px !important
      box-sizing:border-box
      border-radius:0
      padding:0 5px
  // *
  .common_margin
    margin-bottom:4px
  .show_option
    display:inline-block
    padding-left: 6px
    width: 100%
    height:100%
    box-sizing:border-box
    overflow:hidden
    text-overflow:ellipsis
    display:-webkit-box
    -webkit-box-orient:vertical
    -webkit-line-clamp:1
  .active
    background-color:#d5e0ff
  .repair_left,.repair_right
    float:left
    height:100%
    box-sizing:border-box
    padding-left:25px
    padding-top:9px
  .repair_left
    width:40%
    border-right:1px solid #969696
    .repair_choose
      width:165px
      height:20px
      line-height:20px
      background-color:#fff
      float:left
      position:relative
      border:1px solid #9ba7d3
      box-sizing:border-box
    .time
      width:165px
      height:20px
      line-height:20px
      float:left
      margin-bottom:5px
      span
        width:78px
        height:100%
        border:1px solid #9ba7d3
        text-align:center
        background-color:#fff
        color:#cdd2e6
      span:nth-child(1)
        float:left
      span:nth-child(2)
        float:right
    .options
      position:absolute
      bottom:-120px
      left:-1px
      width:280px
      height:120px
      padding-top:20px
      padding-left:10px
      box-sizing:border-box
      background-color:#fff
      border:1px solid #9ba7d3
      z-index:999
      span
        float:left
        padding:0 6px
        height:16px
        line-height:16px
        border:1px solid #9ba7d3
        margin-right:5px
        margin-bottom:5px
  .repair_right
    position:relative
    width:60%
    .fault_place,.fault_detail,.remark
      padding-bottom:2px
      span
        padding-right:10px
    input
      width:240px
      padding:0
      border:1px solid #9ba7d3
    textarea
      width:240px
      height:120px
      resize:none
      border:1px solid #9ba7d3
</style>