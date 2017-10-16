<template>
  <div>
    <my-apply :myApply="myApply" :toTypeValue="typeValue" :filter_="filter_" @changePage="getMyApply"></my-apply>
  </div>
</template>
<script>
  import common from '@/base/common/common'
  export default {
    data: () => ({
      typeValue: '5',
      filter_: {
        typeFilter: [{
          value: '5',
          label: '用餐申请'
        }],
        timeFilter: [{
          value: '0',
          label: '全部时间'
        }, {
          value: '1',
          label: '今天'
        }, {
          value: '2',
          label: '本周'
        }, {
          value: '3',
          label: '本月'
        }]
      }
    }),
    components: {
      myApply: common
    },
    computed: {
      myApply () {
        return this.$store.getters['get/all/myapply']
      }
    },
    created () {
      this.getMyApply(5, 0, 0, 1)
    },
    beforeRouteUpdate (to, from, next) {
      next()
    },
    methods: {
      getMyApply (applyType, timeType, state, pageIndex) {
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
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>