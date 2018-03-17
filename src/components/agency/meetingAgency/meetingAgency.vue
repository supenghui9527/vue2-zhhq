<template>
  <div>
    <div class="goback" @click="$router.go(-1)">返回上一页</div>
    <el-button class="up_load" @click="getfile" type="primary">盖章</el-button>
    <div ref="home" id="home" style="width: 800px;margin: 0 auto;background-color: #fff;height: 100%">
      <h1 style="text-align:center;width:100%">会议室使用申请表</h1>
      <p style="width:100%;padding-left: 50px">申请日期：{{meetingDeatail.applyDate}}</p>
      <table border="1" style="border-collapse: collapse;width: 700px;margin: 0 auto;height: 90%;font-size:20px">
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
            <td class="ss" rowspan="9" width="60px" colspan="1" style="border-width: 1px; border-style: solid">申请内容</td>
            <td width="83" valign="top" style="border-width: 1px; border-style: solid;">会议时间</td>
            <td valign="top" rowspan="1" colspan="2" style="border-width: 1px; border-style: solid;width: 100px">
              <p>日期：{{meetingDeatail.meetingDate}}</p>
              <p>时间：{{meetingDeatail.startTime}}</p>
            </td>
            <td valign="top" rowspan="1" colspan="3" style="border-width: 1px; border-style: solid;width:100px">
              <p>开门时间：{{meetingDeatail.openTime}}</p>
              <p>预计结束时间：{{meetingDeatail.endTime}}</p>
            </td>
          </tr>
          <tr>
            <td width="83" valign="top" rowspan="2" colspan="1" style="border-width: 1px; border-style: solid;">会议内容</td>
            <td valign="top" rowspan="2" colspan="4" style="border-width: 1px; border-style: solid;">{{meetingDeatail.meetingContent}}</td>
            <td width="83" valign="top" style="border-width: 1px; border-style: solid;">是否在大日程内</td>
          </tr>
          <tr>
            <td width="83" valign="top" style="border-width: 1px; border-style: solid;">{{meetingDeatail.isSchedule==0?'否':'是'}}</td>
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
  import seal from '@/common/js/seal'
  export default {
    name: 'home',
    data: () => ({
      fileList: [],
      pdfUrl: '',
      parm: {
        tag: '3',
        applyID: ''
      },
      meetingDeatail: {},
      filePath: ''
    }),
    created () {
      this.$store.dispatch('meeting/agpply', {
        Vue: this,
        meetingApplyID: this.$route.query.meetingApplyID * 1
      })
      this.parm.applyID = this.$route.query.meetingApplyID * 1
    },
    watch: {
      meetingDeatail () {
        this.$nextTick(function () {
          let ado_stream = new ActiveXObject('ADODB.Stream')
          let xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
          let url = `http://xz.hopethink.com/pdf.php?title=1&html=${encodeURI(this.$refs.home.innerHTML)}`
          let savepath = 'd:\\申请表.pdf'
          xmlhttp.open('post', url, false)
          xmlhttp.send()
          console.log(this.$refs.home.innerHTML)
          ado_stream.Type = 1
          ado_stream.open()
          ado_stream.Write(xmlhttp.responseBody)
          ado_stream.SaveToFile(savepath, 2)
          ado_stream.close()
          // this.pdfUrl = this.$refs.home.innerHTML
        })
      }
    },
    methods: {
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
      getfile (file, fileList) {
        seal(this, 'd:\\申请表.pdf', `${this.$route.query.meetingApplyID * 1}`, '3')
        // FileUP.PJ_UpFile('d:\\申请表.pdf', 'http://58.213.150.99:8010/logistics/submitPDF.do', `${this.$route.query.meetingApplyID * 1}`, '3')
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
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
</style>