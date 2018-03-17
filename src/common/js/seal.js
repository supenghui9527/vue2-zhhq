export default function seal (Vue, pdfFile, applyID, tag) {
  // pdfFile 为pdf fileinput 的id
  if (pdfFile === '') {
    Vue.$message('请选择PDF文件')
    return
  }
  try {
    var obj = new ActiveXObject('VisualSealStampCom.PDFSeal')
  } catch (err) {
    Vue.$message({message: '请先安装打印组件 nanjingshiwei_pdf.exe', type: 'warning'})
    return
  }
  var server = 'http://10.101.8.183/StampServer' // 盖章服务器
  var app = 'OA测试系统' // 应用名称
  var reason = '测试' // 盖章原因
  var lRet = obj.PDFVisualSeal(pdfFile, pdfFile, server, '<DeviceStyle>5</DeviceStyle>', app, reason, '')
  if (lRet !== 0) {
    // Vue.$refs.upload.submit()
    Vue.$message({message: obj.GetErrorMsg(), type: 'warning'})
  } else {
    obj.DetachPdf(pdfFile, 1, 1)
    setTimeout(function () {
      FileUP.PJ_UpFile('d:\\申请表.pdf', 'http://58.213.150.99:8010/logistics/submitPDF.do', applyID, tag)
      Vue.$message({message: '盖章成功'})
      Vue.$router.push('/agency')
    }, 2000)
  }
}
