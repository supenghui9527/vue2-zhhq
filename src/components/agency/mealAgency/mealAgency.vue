<template>
  <div>
    <el-button type="primary" class="down_load" @click="getPdf">生成pdf</el-button>
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
      <el-button class="up_load" type="primary">盖章</el-button>
    </el-upload>
    <div id="home" class="box">
      <div class="head">
        <div class="head_title">机关内部用餐申请表</div>
        <div class="head_msg">
          <div class="head_office">申请单位：（盖章）</div>
          <ul class="head_time">
            <li class="li_1">填表时间:{{mealDetail.createTime}}</li>
          </ul>
        </div>
      </div>
      <div class="body">
        <table cellspacing="0" cellpadding="1" border="1">
          <tr>
            <td>用餐时间</td>
            <td>{{mealDetail.diningTime}}</td>
            <td>联系人</td>
            <td>{{mealDetail.linkman}}</td>
            <td>联系电话</td>
            <td>{{mealDetail.linkmanTel}}</td>
          </tr>
          <tr>
            <td>用餐事由</td>
            <td colspan="5">{{mealDetail.diningReason}}</td>
          </tr>
          <tr >
            <td rowspan="8">用餐类型及标准（请在所选项目上打√）</td>
            <td rowspan="4"><span v-if="mealDetail.diningType==0">√</span>桌餐</td>
            <td colspan="4"><span v-if="mealDetail.diningType==0&&mealDetail.diningBenchmark==0">√</span>加班误餐：标准不高于50元/人</td>
          </tr>
          <tr>
            <td colspan="4"><span v-if="mealDetail.diningType==0&&mealDetail.diningBenchmark==1">√</span>同城工作误餐：标准不高于80元/人</td>
          </tr>
          <tr>
            <td colspan="4"><span v-if="mealDetail.diningType==0&&mealDetail.diningBenchmark==2">√</span>公务接待：标准不高于120元/人</td>
          </tr>
          <tr>
            <td colspan="4"><span v-if="mealDetail.diningType==0&&mealDetail.diningBenchmark==3">√</span>商务接待：参照公务接待标准</td>
          </tr>
          <tr>
            <td rowspan="4"><span v-if="mealDetail.diningType==1">√</span>自助餐</td>
            <td colspan="4"><span v-if="mealDetail.diningType==1&&mealDetail.diningBenchmark==0">√</span>加班误餐：标准不高于50元/人</td>
          </tr>
          <tr>
            <td colspan="4"><span v-if="mealDetail.diningType==1&&mealDetail.diningBenchmark==1">√</span>同城工作误餐：标准不高于80元/人</td>
          </tr>
          <tr>
            <td colspan="4"><span v-if="mealDetail.diningType==1&&mealDetail.diningBenchmark==2">√</span>公务接待：标准不高于120元/人</td>
          </tr>
          <tr>
            <td colspan="4"><span v-if="mealDetail.diningType==1&&mealDetail.diningBenchmark==3">√</span>商务接待：参照公务接待标准</td>
          </tr>
          <tr>
            <td>用餐人数</td>
            <td colspan="5">{{mealDetail.peopleCount}}</td>
          </tr>
          <tr>
            <td colspan="2">其他需要说明</td>
            <td colspan="4"></td>
          </tr>
          <tr>
            <td colspan="2">申请单位领导说明</td>
            <td colspan="4"></td>
          </tr>
          <tr>
            <td colspan="2">区分管领导签字</td>
            <td colspan="4"><img width="80" height="80" :src="mealDetail.check1Sign"></td>
          </tr>
          <tr>
            <td colspan="2">管理中心分管领导意见</td>
            <td colspan="4"></td>
          </tr>
          <tr>
            <td colspan="2">用餐地点</td>
            <td colspan="4">{{mealDetail.diningPlace==0?'双和园':'建邺大厦'}}</td>
          </tr>
          <tr></tr>
        </table>
      </div>
      <div class="foot">
        <p>说明：</p>
        <p>1、请个申请单位严格执行《党政机关厉行节约反对浪费条例》、《党政机关国内公务接待管理规定》等相关规定，填报需完整准确；</p>
        <p>2、申请用餐前请管理中心联系确认后再填写本申请单，联系电话：87778985</p>
        <p>3、本申请单填好后请送至0311办公室，联系电话：87778009</p>
      </div>
    </div>
  </div>
</template>
<script>
  import html2canvas from 'html2canvas'
  import dateFormat from '@/common/js/dateFormat'
  import JSPDF from 'jspdf'
  import seal from '@/common/js/seal'
  export default {
    data: () => ({
      mealDetail: {},
      fileList: [],
      nowDate: dateFormat(new Date(), 'yyyy-MM-dd'),
      parm: {
        tag: '5',
        applyID: ''
      }
    }),
    created () {
      this.getDetail()
      this.parm.applyID = this.$route.query.diningApplyID * 1
    },
    methods: {
      getDetail () {
        this.$store.dispatch('go/meal/detail', {
          Vue: this,
          diningApplyID: this.$route.query.diningApplyID * 1
        })
      },
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
            PDF.save('用餐申请表.pdf')
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
        seal(`${file.url}.pdf`)
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
.up_load
  top:220px
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
</style>