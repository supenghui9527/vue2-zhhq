<template>
  <div class="myCard">
    <div class="line"></div>
    <div>
      <p>申请表单：基础名片</p>
      <p>申请时间：2017-08-12</p>
      <p>申办单位：xxx</p>
      <p>申办单位联系人：xxx</p>
      <p>
        <span>申办单位办公司电话：</span>
        <input type="text" name="tel" value="025-6666666">
      </p>
      <p>
        <span>申办单位联系人手机：</span>
        <input type="text" name="tel" value="15888888888">
      </p>
    </div>
    <div class="line"></div>
    <p class="btn modify">修改</p>
    <p class="btn submit">提交</p>
  </div>
</template>
<script>
  export default {
    data: () => ({
    })
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.myCard
  background-color:rgba(126,132,156,0.9)
  color:#ebecf0
  font-size:14px
  input
    background-color:transparent
    border:none
    color:#ebecf0
  div
    padding: 0 30px
    p
      padding-left:30px
      height:25px
      line-height:25px
      border-bottom:1px solid #6b7491
      background-size:20px 20px !important
    p:nth-child(1)
      background:url('~common/images/user.png') no-repeat center left
    p:nth-child(2)
      background:url('~common/images/rq.png') no-repeat center left
    p:nth-child(3)
      background:url('~common/images/zsdw.png') no-repeat center left
    p:nth-child(4)
      background:url('~common/images/lxr.png') no-repeat center left
    p:nth-child(5)
      background:url('~common/images/lxrqz.png') no-repeat center left
    p:nth-child(6)
      background:url('~common/images/tel.png') no-repeat center left
  .line
    height:20px
    background-color:rgba(131,137,161,0.7)
  .btn
    position:absolute
    bottom:15px
    width:32px
    height:20px
    line-height:20px
    color:#242424
    border:1px solid #242424
    font-size:12px
    text-align:center
    background-color:#4a5fa0
  .modify
    right:125px
  .submit
    right:80px
</style>