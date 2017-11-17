<template>
  <form class="meeting_apply">
    <div class="meeting_left">
      <ul>
        <li class="clearfix" style="padding-top:10px">
          <div class="time">
            <label>是否电梯控制</label>
          </div>
          <span :class="{active:isLift.toString().indexOf(item)!==-1}" @click="getLift(item)" class="lift" v-for="item in lift">{{item}}</span>
        </li>
        <li class="clearfix">
          <div class="time">
            <label><span>*</span>是否大日程</label>
            <span class="btn" @click="getTime(item)" :class="{active:isSchedule==item.id}" v-for="item in time">{{item.text}}</span>
          </div>
        </li>
        <li>
          <label><span>*</span>开门时间</label>
          <el-time-picker
            v-model="openTime"
            class="meeting_date"
            :picker-options="{
              selectableRange: '01:00:00 - 24:00:00'
            }"
            placeholder="起始时间">
          </el-time-picker>
        </li>
        <li>
          <label><span>*</span>会议日期</label>
          <el-date-picker
            v-model="meetingDate"
            class="meeting_date"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions0">
          </el-date-picker>
        </li>
        <li>
          <label><span>*</span>会议时间</label>
          <el-time-picker
            v-model="startTime"
            class="meeting_time"
            :picker-options="{
              selectableRange: '01:00:00 - 24:00:00'
            }"
            placeholder="起始时间">
          </el-time-picker>
          <el-time-picker
            v-model="endTime"
            class="meeting_time"
            :picker-options="{
              selectableRange: '01:00:00 - 24:00:00'
            }"
            placeholder="结束时间">
          </el-time-picker>
        </li>
        <li>
          <label><span>*</span>预计参会人数</label>
          <input class="join_number" v-model="peopleCount" name="peopleCount">
        </li>
        <li class="meeting_content">
          <div>
            <label><span>*</span>会议内容</label>
          </div>
          <textarea v-model="meetingContent"></textarea>
        </li>
      </ul>
    </div>
    <div class="meeting_right">
      <ul>
        <li class="clearfix" style="padding-top:10px">
          <label class="float-left" style="width:18%"><span>*</span>申请会议室</label>
          <div class="float-left meeting_address" style="width:82%">
            <span v-for="item in meetingRooms" @click="getRoomId(item)" :class="{active:meetingRoomID==item.meetingRoomID}">{{item.meetingName}}</span>
          </div>
        </li>
        <li class="clearfix">
          <label class="float-left" style="width:18%;padding-top:4px">资源配备</label>
          <ul class="resources clearfix">
            <li>
              <label><span>*</span>主席台人数:</label>
              <input class="host" v-model="rostrumCount" name="rostrumCount">
            </li>
            <li>
              <label><span>*</span>音乐播放:</label>
              <span class="btn" @click="onMusic(item)" :class="{active:music==item.id}" v-for="item in time">{{item.text}}</span>
            </li>
            <li>
              <label><span>*</span>话筒只数:</label>
              <input class="host" v-model="mikeCount" name="mikeCount">
            </li>
            <li>
              <label style="margin-right: 4px"><span>*</span>立式话筒:</label>
              <input class="host" v-model="standMike" name="standMike">
            </li>
          </ul>
        </li>
        <li class="clearfix">
          <label class="float-left" style="width:15%;padding-right:3%;">横幅电子屏幕</label>
          <textarea class="text float-left" v-model="banner" name="banner"></textarea>
        </li>
        <li class="clearfix">
          <label class="float-left"style="width:15%;padding-right:3%">其他服务要求</label>
          <textarea class="text float-left" v-model="otherService" name="otherService"></textarea>
        </li>
        <li class="clearfix">
          <div @click="submit" class="submit">提交申请</div>
        </li>
      </ul>
    </div>
  </form>
</template>
<script>
  import dateFormat from '@/common/js/dateFormat'
  export default {
    data: () => ({
      time: [{
        text: '是',
        id: 1
      },
      {
        text: '否',
        id: 0
      }],
      lift: ['低区', '高区'],
      activeNameArr: [],
      meetingDate: '',
      startTime: '',
      endTime: '',
      isSchedule: 0,
      isLift: [],
      music: 0,
      meetingRoomID: '',
      banner: '',
      standMike: '',
      openTime: '',
      peopleCount: '',
      rostrumCount: '',
      mikeCount: '',
      meetingContent: '',
      otherService: '',
      meetingPeople: '',
      meetingRooms: {},
      pickerOptions0: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      }
    }),
    watch: {
      rostrumCount () {
        let reg = new RegExp('^[0-9]*$')
        if (!reg.test(this.rostrumCount)) {
          this.rostrumCount = ''
        }
      },
      peopleCount () {
        let reg = new RegExp('^[0-9]*$')
        if (!reg.test(this.peopleCount)) {
          this.peopleCount = ''
        }
      },
      mikeCount () {
        let reg = new RegExp('^[0-9]*$')
        if (!reg.test(this.mikeCount)) {
          this.mikeCount = ''
        }
      },
      standMike () {
        let reg = new RegExp('^[0-9]*$')
        if (!reg.test(this.standMike)) {
          this.standMike = ''
        }
      }
    },
    created () {
      this.userID = window.localStorage.getItem('userID')
      this.linkman = window.localStorage.getItem('linkman')
      this.linkmanTel = window.localStorage.getItem('linkmantel')
      this.officeTel = window.localStorage.getItem('officetel')
      this.$store.dispatch('get/meeting/room', {
        Vue: this
      })
    },
    methods: {
      // 是否电梯控制
      getLift (item) {
        let flag = true
        for (let i = 0; i < this.activeNameArr.length; i++) {
          if (this.activeNameArr[i] === item) {
            this.activeNameArr.splice(i, 1)
            this.isLift.splice(i, 1)
            flag = false
            return flag
          }
        }
        if (flag) {
          this.activeNameArr.push(item)
          this.isLift.push(item)
        }
        this.isLift.toString()
      },
      // 是否大日程
      getTime (item) {
        this.isSchedule = item.id
      },
      // 是否音乐播放
      onMusic (item) {
        this.music = item.id
      },
      // 会议室
      getRoomId (item) {
        this.meetingRoomID = item.meetingRoomID
        this.meetingPeople = item.meetingContent
      },
      submit () {
        let date = new Date()
        let nowDate = new Date(dateFormat(date, 'yyyy-MM-dd')).getTime() - 3600000 * 8
        if (this.meetingDate !== '' && this.startTime !== '' && this.endTime !== '' && this.peopleCount !== '' && this.meetingContent !== '' && this.meetingRoomID !== '' && this.rostrumCount !== '' && this.mikeCount !== '' && this.standMike !== '') {
          if (this.meetingDate.getTime() - nowDate >= 3600000 * 48) {
            if (this.peopleCount * 1 <= this.meetingPeople) {
              this.$store.dispatch('submit/meeting', {
                Vue: this,
                userID: window.localStorage.getItem('userID'),
                linkman: window.localStorage.getItem('linkman'),
                officeTel: window.localStorage.getItem('officetel'),
                linkmanTel: window.localStorage.getItem('linkmantel'),
                isLift: this.isLift.toString(),
                meetingDate: dateFormat(this.meetingDate, 'yyyy-MM-dd'),
                openTime: dateFormat(this.openTime, 'hh-mm').replace('-', ':'),
                startTime: dateFormat(this.startTime, 'hh-mm').replace('-', ':'),
                endTime: dateFormat(this.endTime, 'hh-mm').replace('-', ':'),
                meetingContent: this.meetingContent,
                meetingRoomID: this.meetingRoomID,
                isSchedule: this.isSchedule,
                peopleCount: this.peopleCount,
                rostrumCount: this.rostrumCount,
                mikeCount: this.mikeCount,
                standMike: this.standMike,
                music: this.music,
                banner: this.banner,
                otherService: this.otherService
              })
            } else {
              this.$message({message: '请确认会议室人数是否达到上线', type: 'warning'})
            }
          } else {
            this.$message({message: '请选择会议有效时间', type: 'warning'})
          }
        } else {
          this.$message({message: '请确认信息是否填写完整', type: 'warning'})
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.meeting_apply
  height:280px
  label
    height:20px
    line-height:20px
    span
      display:inline-block
      width:6px
      color:#ff0000
.btn
  display:inline-block
  width:25px
  height:20px
  line-height:20px
  border:1px dashed #476cde
  text-align:center
  background-color:#fff
  margin-left:4px
.active
  background-color:#8aa0ec !important
.meeting_left,.meeting_right
  float:left
.meeting_left
  width:40%
  font-size:12px
  padding-left:20px
  height:100%
  box-sizing:border-box
  input[type="number"]
    appearance: textfield
  .lift
    display:inline-block
    width: 30px
    height: 20px
    line-height: 20px
    text-align: center
    background-color: #fff
    margin-left: 10px
    margin-bottom: 4px
    border: 1px solid #476cde
  .meeting_date
    height:22px
    width:77%
    .el-input__inner
      width:100%
      height:22px !important
  .meeting_time
    width:38%
    height:22px
    .el-input__inner
      width:100%
      height:22px !important
  h5
    padding-top:10px
    font-size:14px
  .time
    float:left
  li
    padding-bottom:6px
  .join_number
    width:173px
    height:20px
    border:1px solid #476cde
  .meeting_content
    div
      height:20px
      padding-bottom:5px
      label,span
        float:left
        height:20px
        line-height:20px
    .add_img
      width:25px
      text-align:center
      font-size:20px
      border:1px dashed #476cde
      background-color:#fff
      color:#476cde
    textarea
      width:266px
      height:40px
      border:1px solid #476cde
      resize:none
.meeting_right
  width:60%
  font-size:12px
  .meeting_address
    span
      float:left
      width:30%
      height:20px
      line-height:20px
      text-align:center
      background-color:#fff
      margin-right:1%
      margin-bottom:4px
      border:1px solid #476cde
    .cur_span
      width:15%
  .host
    width:35px
    height:20px
    border:1px solid #476cde
  .resources
    width:82%
    float:left
    li
      float:left
      width:50%
      margin-bottom:4px
      label
        display:inline-block
        width:46%
  .text
    width:75%
    height:40px
    resize:none
    border:1px solid #476cde
    margin-bottom:4px
  .submit
    padding:0
    width:70px
    height:30px
    line-height:30px
    background-color:#1c3da6
    border:none
    color:#f0f0f0
    border-radius:4px
    text-align:center
    float:right
    margin-right:10px
</style>