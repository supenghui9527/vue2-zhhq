<template>
  <div class="outsale">
    <div class="logo">
      <h1>建邺智慧后勤管理中心</h1>
      <div>
        <img class="user" src="../login/already_login.png" @click="$router.push('/login')">
        <router-link to="#" class="go_sale">我的申请</router-link>
        <span class="back_home" @click="$router.go(-1)">返回上一页</span>
      </div>
    </div>
    <transition name="fade">
      <rule v-show="showRule" :rule="showRule" @closeRule="showRule=!showRule"></rule>
    </transition>
    <div class="my_apply">
      <my-apply :myApply="myApply" :toTypeValue="typeValue" :filter_="filter_" @changePage="getMyApply"></my-apply>
    </div>
    <div v-show="showInstruction" class="fixed_" @click="showInstruction=false"></div>
    <div class="explain" @click="showInstruction=!showInstruction">操作说明</div>
    <div v-show="showInstruction" class="instruction">
      <img src="~common/images/12_wodeshenqing.png">
    </div>
  </div>
</template>
<script>
  import rule from '@/base/rule/rule'
  import common from '@/base/common/common'
  export default {
    data: () => ({
      showRule: false,
      typeValue: 1,
      showInstruction: false,
      filter_: {
        typeFilter: [{
          value: 1,
          label: '外卖点餐'
        }, {
          value: 2,
          label: '公务用车'
        }, {
          value: 3,
          label: '会议申请'
        }, {
          value: 4,
          label: '报修申请'
        }, {
          value: 5,
          label: '用餐申请'
        }],
        timeFilter: [{
          value: 0,
          label: '全部时间'
        }, {
          value: 1,
          label: '今天'
        }, {
          value: 2,
          label: '本周'
        }, {
          value: 3,
          label: '本月'
        }]
      }
    }),
    components: {
      myApply: common,
      rule
    },
    computed: {
      myApply () {
        return this.$store.getters['get/all/myapply']
      }
    },
    created () {
      let filter = window.localStorage.getItem('filter')
      if (filter) {
        let newFilter = JSON.parse(filter)
        this.typeValue = newFilter.applyType
        this.getMyApply(newFilter.applyType, 0, -1, 1)
      } else {
        this.getMyApply(1, 0, -1, 1)
      }
    },
    methods: {
      getMyApply (applyType, timeType, state, pageIndex) {
        let filter = JSON.stringify({applyType, timeType, state, pageIndex})
        window.localStorage.setItem('filter', filter)
        this.$store.dispatch('get/all/myapply', {
          Vue: this,
          userID: window.localStorage.getItem('userID'),
          applyType: applyType,
          timeType: timeType,
          state: state,
          pageIndex: pageIndex,
          pageNumber: 5
        })
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" >
@import '~common/css/common.styl'
.my_apply
  position:absolute
  width:70%
  padding-bottom:40px
  left:50%
  margin-left:-35%
  top:180px
  min-width:700px
  background-color:#fff
  border-radius:6px
  >div
    a
      display:inline-block
      width:80px
      height:25px
      line-height:25px
      color:#fff
      background-color:#476ade
      text-align:center
      border-radius:0 20px 0 0
      font-size:14px
      text-decoration:none
    .router-link-active
      background-color:#1c3da6
  .active_el-select
    input
      background-color:transparent !important
      outline:none !important
      border:none !important
      text-align:center
      font-size:16px
      color:#fff !important
  .apply_date,.apply_content
    width:150px !important
    text-align:center
  .go_detail
    display:inline-block
    padding:0 10px
    height:24px
    line-height:24px
    background-color:#426df7
    color:#fff
    border-radius:4px
    margin-right:10px
    cursor:pointer
  .play
    display:inline-block
    padding:0 10px
    height:24px
    line-height:24px
    background-color:#426df7
    color:#fff
    border-radius:4px
    cursor:pointer
  .apply_block .el-pagination
    padding:0 !important
</style>