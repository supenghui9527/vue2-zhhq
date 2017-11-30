export default function seal (Vue, pdfFile) {
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
    Vue.$message({message: '盖章成功'})
    obj.DetachPdf(pdfFile, 1, 1)
    Vue.$refs.upload.submit()
  }
}
