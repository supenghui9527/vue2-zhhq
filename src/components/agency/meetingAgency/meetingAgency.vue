<template>
  <div>
    <div class="down_load" @click="getPdf">点击下载</div>
    <el-upload
      class="upload-demo"
      style="position: absolute;top:30px;"
      :action="$store.state.updataPdf"
      name="file"
      :on-change="getfile"
      :data="parm"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <div id="home" style="width: 600px;margin: 0 auto;background-color: #fff;height: 100%">
      <h1 style="text-align:center;width:100%">会议室使用申请表</h1>
      <p style="width:100%;padding-left: 50px">申请日期：2017-08-19</p>
      <table border="1" style="border-collapse: collapse;width: 500px;margin: 0 auto;height: 90%">
        <tbody>
          <tr class="firstRow">
            <td valign="top" rowspan="2" colspan="2" style="word-break: break-all; border-width: 1px; border-style: solid;">
              <p style="text-align: center">申办</p>
              <p style="text-align: center">单位</p>
              <p style="text-align: center">（盖章）</p>
            </td>
            <td valign="top" rowspan="2" colspan="2" style="border-width: 1px; border-style: solid;"></td>
            <td valign="top" rowspan="1" colspan="3" style="border-width: 1px; border-style: solid;">联系人：{{meetingDeatail.linkman}}</td>
          </tr>
          <tr>
            <td valign="top" rowspan="1" colspan="3" style="border-width: 1px; border-style: solid;">
              <p>办公室电话：{{meetingDeatail.officeTel}}</p>
              <p>手机：{{meetingDeatail.linkmanTel}}</p>
            </td>
          </tr>
          <tr>
            <td valign="top" rowspan="9" colspan="1" style="border-width: 1px; border-style: solid;">
            申请内容
            </td>
            <td width="83" valign="top" style="border-width: 1px; border-style: solid;">会议时间</td>
            <td valign="top" rowspan="1" colspan="2" style="border-width: 1px; border-style: solid;width: 100px">
              <p>日期：{{meetingDeatail.meetingDate}}</p>
              <p>时间：{{meetingDeatail.startTime}}</p>
            </td>
            <td valign="top" rowspan="1" colspan="3" style="border-width: 1px; border-style: solid;width:100px">
              <p>开门时间：</p>
              <p>预计结束时间：{{meetingDeatail.endTime}}</p>
            </td>
          </tr>
          <tr>
            <td width="83" valign="top" rowspan="2" colspan="1" style="border-width: 1px; border-style: solid;">会议内容</td>
            <td valign="top" rowspan="2" colspan="4" style="border-width: 1px; border-style: solid;">{{meetingDeatail.meetingContent}}</td>
            <td width="83" valign="top" style="border-width: 1px; border-style: solid;">是否在大日程内</td>
          </tr>
          <tr>
            <td width="83" valign="top" style="border-width: 1px; border-style: solid;">{{meetingDeatail.isSchedule==0?'是':'否'}}</td>
          </tr>
          <tr>
            <td width="83" valign="top" rowspan="2" colspan="1" style="border-width: 1px; border-style: solid;">申请会议室</td>
            <td width="83" valign="top" style="border-width: 1px; border-style: solid;">{{meetingDeatail.meetingRoomName}}</td>
            <td width="83" valign="top" style="border-width: 1px; border-style: solid;"></td>
            <td width="83" valign="top" style="border-width: 1px; border-style: solid;"></td>
            <td width="83" valign="top" style="border-width: 1px; border-style: solid;"></td>
            <td width="83" valign="top" style="border-width: 1px; border-style: solid;"></td>
          </tr>
          <tr>
            <td width="83" valign="top" style="border-width: 1px; border-style: solid;"></td>
            <td width="83" valign="top" style="border-width: 1px; border-style: solid;"></td>
            <td width="83" valign="top" style="border-width: 1px; border-style: solid;"></td>
            <td width="83" valign="top" style="border-width: 1px; border-style: solid;"></td>
            <td width="83" valign="top" style="border-width: 1px; border-style: solid;"></td>
          </tr>
          <tr>
          <td valign="top" colspan="1" rowspan="1" style="border-left-width: 1px; border-top-width: 1px; word-break: break-all;">预计参会人数</td>
          <td valign="top" colspan="1" rowspan="1" style="border-left-width: 1px; border-top-width: 1px;">{{meetingDeatail.peopleCount}}</td>
          <td valign="top" colspan="2" rowspan="1" style="border-left-width: 1px; border-top-width: 1px; word-break: break-all;">是否音乐播放</td>
          <td valign="top" colspan="2" rowspan="1" style="border-left-width: 1px; border-top-width: 1px;">{{meetingDeatail.music==0?'是':'否'}}</td>
          </tr>
          <tr>
            <td width="83" valign="top" style="border-width: 1px; border-style: solid;">主席台人数</td>
            <td width="83" valign="top" style="border-width: 1px; border-style: solid;">{{meetingDeatail.rostrumCount}}</td>
            <td width="83" valign="top" style="border-width: 1px; border-style: solid;">话筒只数</td>
            <td width="83" valign="top" style="border-width: 1px; border-style: solid;">{{meetingDeatail.mikeCount}}</td>
            <td width="83" valign="top" style="border-width: 1px; border-style: solid;">立式话筒</td>
            <td width="83" valign="top" style="border-width: 1px; border-style: solid;">{{meetingDeatail.standMike}}</td>
          </tr>
          <tr>
            <td width="83" valign="top" style="border-width: 1px; border-style: solid;">横幅</td>
            <td valign="top" rowspan="2" colspan="5" style="border-width: 1px; border-style: solid;">{{meetingDeatail.banner,meetingDeatail.screen}}</td>
          </tr>
          <tr>
            <td width="83" valign="top" style="border-width: 1px; border-style: solid;">电子屏幕</td>
          </tr>
          <tr>
            <td valign="top" rowspan="2" colspan="2" style="border-width: 1px; border-style: solid;">其他服务要求</td>
            <td valign="top" rowspan="2" colspan="6" style="border-width: 1px; border-style: solid;">{{meetingDeatail.endTime}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  import html2canvas from 'html2canvas'
  import JSPDF from 'jspdf'
  import seal from '@/common/js/seal'
  export default {
    name: 'home',
    data: () => ({
      fileList: [],
      parm: {
        tag: '3',
        applyID: ''
      },
      meetingDeatail: {}
    }),
    created () {
      this.$store.dispatch('meeting/agpply', {
        Vue: this,
        meetingApplyID: this.$route.query.meetingApplyID * 1
      })
      this.parm.applyID = this.$route.query.meetingApplyID * 1
    },
    methods: {
      getPdf: () => {
        let pdfDom = document.querySelector('#home')
        html2canvas(pdfDom, {
          onrendered: function (canvas) {
            let contentWidth = canvas.width
            let contentHeight = canvas.height
            let pageHeight = contentWidth / 592.28 * 841.89
            let leftHeight = contentHeight
            let position = 0
            let imgWidth = 595.28
            let imgHeight = 592.28 / contentWidth * contentHeight
            let pageData = canvas.toDataURL('image/jpeg', 1.0)
            let PDF = new JSPDF('', 'pt', 'a4')
            if (leftHeight < pageHeight) {
              PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
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
            PDF.save('会议室使用申请表.pdf')
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
        seal(file)
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.down_load
  position:absolute
  left:0
  top:0
  color:#fff
  font-size:14px
  background-color:#4db3ff
  padding:6px 10px
</style>