<template>
  <div>
    <div class="box">
      <div class="head">
        <div class="head_title">建邺区公务车辆使用申请表</div>
        <div class="head_msg">
          <div class="head_office">申请部门：（盖章）</div>
          <ul class="head_time">
            <li class="li_1">填表时间:</li>
            <li>年</li>
            <li>月</li>
            <li>日</li>
          </ul>
        </div>
      </div>
      <div class="body">
        <table cellspacing="0" cellpadding="1" border="1">
          <tr>
            <td>申报类别</td>
            <td colspan="3"></td>
          </tr>
          <tr >
            <td>申报单位</td>
            <td></td>
            <td>目的地</td>
            <td></td>
          </tr>
          <tr>
            <td>申报事由</td>
            <td colspan="3"></td>
          </tr>
          <tr >
            <td>用车人数</td>
            <td></td>
            <td>用车时间</td>
            <td></td>
          </tr>
          <tr >
            <td>联系人</td>
            <td></td>
            <td>联系电话</td>
            <td></td>
          </tr>
          <tr>
            <td>附件</td>
            <td colspan="3"></td>
          </tr>
          <tr >
            <td>车辆型号</td>
            <td></td>
            <td>车牌号</td>
            <td></td>
          </tr>
          <tr >
            <td>司机</td>
            <td></td>
            <td>联系电话</td>
            <td></td>
          </tr>
          <tr >
            <td>申请单位领导签字</td>
            <td></td>
            <td>管理中心分管领导意见</td>
            <td></td>
          </tr>
          <tr >
            <td>用车前里程</td>
            <td></td>
            <td>用车后里程</td>
            <td></td>
          </tr>
          <tr >
            <td>车队意见</td>
            <td></td>
            <td>备注</td>
            <td></td>
          </tr>
        </table>
      </div>
      <div class="foot">
        <p>说明：</p>
        <p>1、请务必据实填写，并加盖单位公章</p>
        <p>2、参加会议、重大活动需附会议通知等文件</p>
        <p>3、机关车队电话：87778107</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({

    })
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .router
    overflow-y: scroll !important
  *
    margin: 0
    padding: 0
  ul
    li
      float: left
  td
    width: 100px
    height: 40px
    text-align: center
    border: 1px solid #000
  .box
    width: 650px
    margin: 0 auto
    background-color:#fff
  .head_title 
    width: 100%
    height: 50px
    line-height: 50px
    text-align: center
    font-size: 34px
    font-weight: 500
  .head_msg
    width: 100%
    height: 50px
    line-height: 50px
  .head_office,.head_time 
    width: 50%
    float: left
  .head,table,.foot
    width:500px
    margin:0 auto
</style>