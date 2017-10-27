<template>
  <div class="outsale">
    <div class="logo">
      <h1>建邺智慧后勤管理中心</h1>
      <div>
        <img class="user" src="../login/already_login.png" @click="$router.push('/login')">
        <router-link to="#" class="go_sale">我的申请</router-link>
        <span @click="$router.push('/login')">返回主页</span>
      </div>
    </div>
    <transition name="fade">
      <rule v-show="showRule" :rule="showRule" @closeRule="showRule=!showRule"></rule>
    </transition>
    <div class="all_agency">
      <my-apply :myApply="myApply" :toTypeValue="typeValue" :filter_="filter_" @changePage="getMyApply"></my-apply>
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
.all_agency
  position:absolute
  width:700px
  left:50%
  margin-left:-350px
  top:240px
  div
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
</style>