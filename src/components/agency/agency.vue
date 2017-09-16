<template>
  <div class="agency">
    <div class="logo">
      <h1>建业智慧后勤管理中心</h1>
      <div>
        <img class="user" src="../login/already_login.png" @click="$router.push('/login')">
        <router-link to="" class="go_sale">我的代办</router-link>
        <span class="rule_tit" @click="showRule=!showRule">代办须知</span>
        <router-link to="" class="rule_tit">全部代办</router-link>
      </div>
    </div>
    <transition name="fade">
      <div v-show="showRule" class="rule_detail">
        <h5>
          <span>预定外卖规则：</span>
        </h5>
        <ul>
          <li>1、每周五更新预定菜单；</li>
          <li>2、预定时间：8：00-9：00、12：00-14：00；</li>
          <li>3、预定时间内可以，可以取消预定内容，14：00之后，无法取消预定状态；</li>
          <li>4、面点：每天最多可选择两个品类，每个最多十个预订量；</li>
          <li>5、凉菜：每个品类只能一份预订量；</li>
        </ul>
      </div>
    </transition>
<!--     <el-table
      :data=""
      height="250"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table> -->
  </div>
</template>
<script>
  export default {
    data: () => ({
      showRule: false // 显示外卖规则
    })
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .logo
    position:absolute
    width:700px
    left:50%
    top:100px
    margin-left:-350px
    div
      height:60px
      padding-top:10px
      line-height:60px
      font-size:18px
      font-size:0
      .go_sale
        margin-right:10px
        background-color:rgba(239,239,239,0.4)
        padding:0 10px
      span,a
        font-size:16px
        display:inline-block
        cursor: pointer
        color:#fff
        text-decoration:none
        height:22px
        line-height:22px
      .rule_tit
        width:78px
        padding-left:24px
        border-radius:4px
        margin-right:10px
        background:url('./text.png') no-repeat 4px center rgba(239,239,239,0.4)
        background-size:16px 16px
        color:#868686
    h1
      font-size:28px
      color:#fff
    .user
      width:60px
      height:60px
      padding-right:6px
      cursor: pointer
  // 代办规则
  .rule_detail
    width:570px
    padding:20px
    height:240px
    position:absolute
    top:260px
    left:50%
    margin-left:-285px
    background-color:#fff
    border-radius:2px
    z-index:3
    li
      line-height:28px
    h5
      font-size:0
      padding-bottom:26px
      span
        height:30px
        line-height:30px
        font-size:16px
        display:inline-block
        color:#323232
      .pos
        width:130px
        background-color:#4593ff
        border-radius:6px
        text-align:center
        color:#fff
</style>