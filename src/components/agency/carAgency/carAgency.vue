<template>
  <div>
    <el-button type="primary" class="down_load" @click="getPdf">生成pdf</el-button >
    <el-upload
      class="upload-demo"
      style="position: absolute;top:30px;"
      :action="$store.state.updataPdf"
      name="file"
      ref="upload"
      :on-change="getfile"
      :data="parm"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList">
      <el-button class="up_load" type="primary" @click="submitPdf">盖章</el-button>
    </el-upload>
    <div id="home" class="box">
      <div class="head">
        <div class="head_title">建邺区公务车辆使用申请表</div>
        <div class="head_msg">
          <div class="head_office">申请部门：（盖章）</div>
          <ul class="head_time">
            <li class="li_1">填表时间:{{nowDate}}</li>
          </ul>
        </div>
      </div>
      <div class="body">
        <table cellspacing="0" cellpadding="1" border="1">
          <tr>
            <td>申报类别</td>
            <td colspan="3">
              <span v-if="carDetail.applyReason==0">应急</span>
              <span v-else-if="carDetail.applyReason==1">调研</span>
              <span v-else>接待</span>
            </td>
          </tr>
          <tr >
            <td>申报单位</td>
            <td>{{carDetail.applyDept}}</td>
            <td>目的地</td>
            <td>{{carDetail.goalPlace}}</td>
          </tr>
          <tr>
            <td>申报事由</td>
            <td colspan="3">{{carDetail.detailReason}}</td>
          </tr>
          <tr >
            <td>用车人数</td>
            <td>{{carDetail.peopleCount}}</td>
            <td>用车时间</td>
            <td>{{carDetail.applyDate}}</td>
          </tr>
          <tr >
            <td>联系人</td>
            <td>{{carDetail.linkman}}</td>
            <td>联系电话</td>
            <td>{{carDetail.linkmanTel}}</td>
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
            <td><img width="80" height="80" :src="carDetail.check1Sign"></td>
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
  import dateFormat from '@/common/js/dateFormat'
  import html2canvas from 'html2canvas'
  import JSPDF from 'jspdf'
  import seal from '@/common/js/seal'
  export default {
    data: () => ({
      carDetail: {},
      nowDate: dateFormat(new Date(), 'yyyy-MM-dd'),
      fileList: [],
      parm: {
        tag: '2',
        applyID: ''
      }
    }),
    created () {
      this.$store.dispatch('go/UseCar/detail', {
        Vue: this,
        carApplyID: this.$route.query.carApplyID * 1
      })
      this.parm.applyID = this.$route.query.carApplyID * 1
    },
    methods: {
      getPdf: () => {
        let canvas = document.querySelector('#home')
        html2canvas(canvas, {
          dpi: 192,
          allowTaint: true,
          taintTest: false,
          onrendered: function (canvas) {
            let contentWidth = canvas.width
            let contentHeight = canvas.height
            let pageHeight = contentWidth / 592.28 * 841.89
            let leftHeight = contentHeight
            let position = 0
            let imgWidth = 595.28
            let imgHeight = 592.28 / contentWidth * contentHeight
            let pageData = canvas.toDataURL('image/png', 1.0)
            let PDF = new JSPDF('', 'pt', 'a4')
            if (leftHeight < pageHeight) {
              PDF.addImage(pageData, 'PNG', 0, 0, imgWidth, imgHeight)
            } else {
              while (leftHeight > 0) {
                PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                leftHeight -= pageHeight
                position -= 841.89
                if (leftHeight > 0) {
                  PDF.addPage()
                }
              }
            }
            PDF.save('用车申请表.pdf')
          }
        })
        html2canvas()
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
      submitPdf () {
        // this.$refs.upload.submit()
      },
      getfile (file, fileList) {
        console.log(`${file.url}.pdf`)
        seal(`${file.url}.pdf`)
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .router
    overflow-y: scroll !important
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
  .down_load,.up_load
    position:absolute
    font-size:14px
    left:50px
  .down_load
    top:200px
  .up_load
    top:220px
</style>