<template>
  <div class="meal_container clearfix">
    <ul class="repair_left">
      <li>
        <label><span class="must_write">*</span>用餐类型</label>
        <el-radio class="radio" v-model="diningType" :label="0">桌餐</el-radio>
        <el-radio class="radio" v-model="diningType" :label="1">自助餐</el-radio>
        <el-radio class="radio" v-model="diningType" :label="2">餐券</el-radio>
      </li>
      <li v-show="diningType!=2">
        <label><span class="must_write">*</span>用餐标准</label>
        <el-select v-model="diningBenchmark" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </li>
      <li>
        <label><span class="must_write">*</span>用餐事由</label>
        <el-input v-model="diningReason" placeholder="请输入用餐事由"></el-input>
      </li>
      <li>
        <label><span class="must_write">*</span>用餐人数</label>
        <el-input @change="testNub" v-model="peopleCount" placeholder="请输入用餐人数"></el-input>
      </li>
      <li>
        <label><span class="must_write">*</span>用餐时间</label>
        <el-date-picker
          v-model="diningTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </li>
    </ul>
    <div class="repair_right">
      <ul>
        <li v-if="userinfo.isSpecial==0" class="clearfix">
          <label class="float-left"><span class="must_write">*</span>选择区领导</label>
          <div class="float-left">
            <span class="check_leader" @click="choseLeader(item)" :class="{active:item.id==active}" v-for="item in checkLeaders">{{item.name}}</span>
          </div>
        </li>
        <li class="clearfix">
          <label>其他需要说明的情况</label>
          <div>
            <textarea class="other" v-model="other"></textarea>
          </div>
        </li>
      </ul>
      <div class="meal_btn" @click="submitApplyCar">提交申请</div>
    </div>
  </div>
</template>
<script>
  import dateFormat from '@/common/js/dateFormat'
  export default {
    data: () => ({
      userinfo: {},
      diningPlace: 1,
      diningType: 0,
      other: null,
      diningBenchmark: '0',
      active: null,
      checkLeaders: [],
      options: [{
        value: '0',
        label: '标准不高于50元/人'
      }, {
        value: '1',
        label: '标准不高于80元/人'
      }, {
        value: '2',
        label: '标准不高于120元/人'
      }, {
        value: '3',
        label: '参照公务接待标准'
      }],
      diningReason: '',
      peopleCount: '',
      diningTime: ''
    }),
    watch: {
      diningType () {
        this.diningType === 2 ? this.diningBenchmark = '4' : this.diningBenchmark = '0'
      }
    },
    created () {
      let userinfo = localStorage.getItem('userinfo')
      this.userinfo = JSON.parse(userinfo)
      this.$store.dispatch('get/check/leader', {
        Vue: this
      })
    },
    methods: {
      // 检测输入是否为数字
      testNub () {
        let reg = new RegExp('^[0-9]*$')
        if (!reg.test(this.peopleCount)) {
          this.$nextTick(() => {
            this.peopleCount = ''
          })
        }
      },
      choseLeader (item) {
        this.active = item.id
      },
      // 提交用餐申请
      submitApplyCar () {
        if (this.userinfo.isSpecial === 0) {
          if (this.active === null) {
            this.$message({message: '请确认信息是否填写完整', type: 'warning'})
            return false
          }
        }
        if (this.diningReason !== '' && this.peopleCount !== '' && this.diningTime !== '') {
          let nowDate = dateFormat(this.diningTime, 'yyyy-MM-dd-hh-mm').split('-')
          this.$store.dispatch('submit/apply/meal', {
            Vue: this,
            userID: localStorage.getItem('userID'),
            applyDeptID: localStorage.getItem('dept_id'),
            linkman: localStorage.getItem('linkman'),
            linkmantel: localStorage.getItem('linkmantel'),
            officeTel: localStorage.getItem('officetel'),
            diningType: this.diningType,
            diningBenchmark: this.diningBenchmark,
            diningReason: this.diningReason,
            peopleCount: this.peopleCount,
            diningTime: `${nowDate[0]}-${nowDate[1]}-${nowDate[2]} ${nowDate[3]}:${nowDate[4]}`,
            leaderID: this.active,
            room: this.room,
            remark: this.other
          })
        } else {
          this.$message({message: '请确认信息是否填写完整', type: 'warning'})
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.meal_container
  background-color:rgba(188,194,218,0.8)
  height:280px
  font-size:14px
  .check_leader
    display:inline-block
    height:20px
    line-height:20px
    margin-right:4px
    padding:0 6px
    border:1px solid #476cde
    background-color:#fff
    font-size:14px
  .other
    width:70%
    height:60px
    resize:none
  .active
    background-color:#8aa0ec !important
  label
    .must_write
      display:inline-block
      width:6px
      color:#ff0000
  .el-input
    width:220px
  .repair_left
    li
      margin-bottom:6px
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
        display:block
        span
          color:#ff0000
    .meal_btn
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