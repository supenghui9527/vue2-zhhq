<template>
  <div>
    <div class="goback" @click="$router.go(-1)">返回上一页</div>
    <el-upload
      class="upload-demo"
      style="position: absolute;top:30px;"
      :action="$store.state.updataPdf"
      name="file"
      ref="upload"
      :on-change="getfile"
      :data="parm"
      :auto-upload="false"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList">
      <el-button class="up_load" type="primary">盖章</el-button>
    </el-upload>
    <form method="POST" action="http://xz.hopethink.com/pdf.php">
      <input type="hidden" name="html" v-model="pdfUrl">
      <input type="hidden" name="title" value="2">
      <input type="submit" class="down_load" value="生成pdf">
    </form>
    <div ref="home" id="home" style="width: 650px;margin:0 auto;background-color:#fff">
      <div style="width:500px;margin:0 auto">
        <div style="width: 100%;height: 50px;line-height: 50px;text-align: center;font-size: 34px;font-weight: 500">建邺区公务车辆使用申请表</div>
        <div style="width: 100%;height: 50px;line-height: 50px">
          <div style="width: 50%;float: left">申请部门：（盖章）</div>
          <div style="width: 50%;float: left">填表时间:{{nowDate}}</div>
        </div>
      </div>
      <div class="body">
        <table style="width:600px;margin:0 auto" cellspacing="0" cellpadding="1" border="1">
          <tr>
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000">申报类别</td>
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000" colspan="3">
              <span v-if="carDetail.applyReason==0">应急</span>
              <span v-else-if="carDetail.applyReason==1">调研</span>
              <span v-else>接待</span>
            </td>
          </tr>
          <tr >
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000">申报单位</td>
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000">{{carDetail.applyDept}}</td>
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000">目的地</td>
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000">{{carDetail.goalPlace}}</td>
          </tr>
          <tr>
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000">申报事由</td>
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000" colspan="3">{{carDetail.detailReason}}</td>
          </tr>
          <tr >
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000">用车人数</td>
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000">{{carDetail.peopleCount}}</td>
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000">用车时间</td>
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000">{{carDetail.applyDate}}</td>
          </tr>
          <tr >
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000">联系人</td>
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000">{{carDetail.linkman}}</td>
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000">联系电话</td>
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000">{{carDetail.linkmanTel}}</td>
          </tr>
          <tr>
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000">附件</td>
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000" colspan="3"></td>
          </tr>
          <tr >
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000">车辆型号</td>
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000"></td>
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000">车牌号</td>
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000"></td>
          </tr>
          <tr>
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000">司机</td>
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000"></td>
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000">联系电话</td>
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000"></td>
          </tr>
          <tr >
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000">申请单位领导签字</td>
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000"><img width="80" height="80" :src="carDetail.check1Sign"></td>
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000">管理中心分管领导意见</td>
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000"></td>
          </tr>
          <tr >
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000">用车前里程</td>
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000"></td>
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000">用车后里程</td>
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000"></td>
          </tr>
          <tr>
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000">车队意见</td>
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000"></td>
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000">备注</td>
            <td style="width: 100px;height: 60px;text-align: center;border: 1px solid #000"></td>
          </tr>
        </table>
      </div>
      <div style="width:500px;margin:0 auto">
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
      pdfUrl: '',
      fileList: [],
      $file: null,
      parm: {
        tag: '2',
        applyID: ''
      }
    }),
    created () {
      // this.$file = this.$el.querySelector('input[type="file"]')
      this.$store.dispatch('go/UseCar/detail', {
        Vue: this,
        carApplyID: this.$route.query.carApplyID * 1
      })
      this.parm.applyID = this.$route.query.carApplyID * 1
    },
    watch: {
      carDetail () {
        this.$nextTick(function () {
          this.pdfUrl = this.$refs.home.innerHTML
        })
      }
    },
    methods: {
      test () {
        this.pdfUrl = `http://xz.hopethink.com/pdf.php?title=2&html=${this.$refs.home.innerHTML}`
      },
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
            PDF.save(`用车申请表${dateFormat(new Date(), 'yyyy-MM-dd-h-m')}.pdf`)
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
      getfile (file, fileList) {
        let fileValue = document.getElementsByTagName('input')[0].value
        seal(this, fileValue)
        // this.$refs.upload.submit()
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .router
    overflow-y: scroll !important  
  .goback
    width:100px
    height:40px
    line-height:40px
    position:absolute
    text-align:center
    font-size:14px
    background-color:#20a0ff
    color:#fff
    right:50px
    top:40px
    border-radius:6px
  .down_load,.up_load
    position:absolute
    font-size:14px
    left:50px
  .down_load
    top:200px
    width:100px
    height:40px
    line-height:40px
    position:absolute
    text-align:center
    font-size:14px
    background-color:#20a0ff
    color:#fff
    right:50px
    border-radius:6px
    border:none
  .up_load
    top:220px
</style>