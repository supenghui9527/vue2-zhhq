<template>
  <form>
<!--     <input type="hidden" :value="userID" name="userID">
    <input type="hidden" :value="linkman" name="linkman">
    <input type="hidden" :value="officeTel" name="officeTel">
    <input type="hidden" :value="linkmanTel" name="linkmanTel">
    <input type="hidden" :value="meetingDate" name="meetingDate">
    <input type="hidden" :value="music" name="music">
    <input type="hidden" :value="meetingRoomID" name="meetingRoomID">
    <input type="hidden" :value="isSchedule" name="isSchedule"> -->
    <div class="meeting_left">
      <h5>会议申请</h5>
      <ul>
        <li class="clearfix">
          <div class="time">
            <label>是否大日程</label>
            <span class="btn" @click="getTime(item)" :class="{active:isSchedule==item.id}" v-for="item in time">{{item.text}}</span>
          </div>
<!--           <div class="time">
            <label>电梯控制</label>
            <span class="btn" @click="getControl(item)" :class="{active:isActive1==item.id}" v-for="item in time">{{item.text}}</span>
          </div> -->
        </li>
        <li>
          <label>会议时间</label>
          <input class="meeting_time" type="time" name="startTime" placeholder="开始时间">
          <input class="meeting_time" type="time" name="endTime" placeholder="结束时间">
        </li>
<!--         <li>
          <label>开门时间</label>
          <input class="meeting_time" type="time" name="start" placeholder="开始时间">
          <input class="meeting_time" type="time" name="end" placeholder="结束时间">
        </li> -->
        <li>
          <label>预计参会人数：</label>
          <input class="join_number" v-model="peopleCount" name="peopleCount">
        </li>
        <li class="meeting_content">
          <div>
            <label>会议内容：</label>
          </div>
          <textarea name="meetingContent"></textarea>
        </li>
      </ul>
    </div>
    <div class="meeting_right">
      <ul>
        <li class="clearfix" style="padding-top:10px">
          <label class="float-left" style="width:18%">申请会议室</label>
          <div class="float-left meeting_address" style="width:82%">
            <span v-for="item in meetingRooms" @click="getRoomId(item)" :class="{active:meetingRoomID==item.meetingRoomID}">{{item.meetingName}}</span>
          </div>
        </li>
        <li class="clearfix">
          <label class="float-left" style="width:18%;padding-top:4px">资源配备</label>
          <ul class="resources clearfix">
            <li>
              <label>主席台人数:</label>
              <input class="host" v-model="rostrumCount" name="rostrumCount">
            </li>
            <li>
              <label>音乐播放:</label>
              <span class="btn" @click="onMusic(item)" :class="{active:music==item.id}" v-for="item in time">{{item.text}}</span>
            </li>
            <li>
              <label>话筒只数:</label>
              <input class="host" v-model="mikeCount" name="mikeCount">
            </li>
            <li>
              <label style="margin-right: 4px">立式话筒:</label>
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
      isSchedule: 0,
      music: 0,
      meetingRoomID: '',
      banner: '',
      standMike: '',
      peopleCount: '',
      rostrumCount: '',
      mikeCount: '',
      otherService: '',
      meetingRooms: {}
    }),
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
      getTime (item) {
        this.isSchedule = item.id
      },
      // getControl (item) {
      //   this.isActive1 = item.id
      // },
      onMusic (item) {
        this.music = item.id
      },
      getRoomId (item) {
        this.meetingRoomID = item.meetingRoomID
      },
      submit () {
        this.$store.dispatch('submit/meeting', {
          Vue: this,
          userID: window.localStorage.getItem('userID'),
          linkman: window.localStorage.getItem('linkman'),
          officeTel: window.localStorage.getItem('officetel'),
          linkmanTel: window.localStorage.getItem('linkmantel'),
          meetingDate: '2017-9-18',
          startTime: this.startTime,
          endTime: this.endTime,
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
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
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
  width:275px
  font-size:12px
  padding-left:25px
  height:100%
  input[type="number"]
    appearance: textfield
  .meeting_time
    border:1px solid #476cde
    width:100px
    height:20px
    box-sizing:border-box
    padding-left:10px
  h5
    padding-top:10px
    font-size:14px
  .time
    float:left
  li
    padding-bottom:6px
  .join_number
    width:166px
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
      width:253px
      height:40px
      border:1px solid #476cde
      resize:none
.meeting_right
  width:400px
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
        width:40%
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