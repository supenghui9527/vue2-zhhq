<template>
  <div class="rule_detail">
    <i class="el-icon-close close_rule" @click="closeRule"></i>
    <h5>
      <span>用车规则：</span>
    </h5>
    <ul>
      <li>1、每周五更新预定菜单；</li>
      <li>2、预定时间：8：00-9：00、12：00-14：00；</li>
      <li>3、预定时间内可以，可以取消预定内容，14：00之后，无法取消预定状态；</li>
      <li>4、面点：每天最多可选择两个品类，每个最多十个预订量；</li>
      <li>5、凉菜：每个品类只能一份预订量；</li>
    </ul>
  </div>
</template>
<script>
  export default {
    data: () => ({
    }),
    props: ['rule'],
    methods: {
      closeRule () {
        this.$emit('closeRule')
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>