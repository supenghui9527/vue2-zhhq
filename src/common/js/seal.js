export default function seal (pdfFile) {
  // pdfFile 为pdf fileinput 的id
  if (pdfFile === '') {
    alert('请选择PDF文件')
    return
  }
  try {
    var obj = new ActiveXObject('VisualSealStampCom.PDFSeal')
  } catch (err) {
    alert('请先安装打印组件 nanjingshiwei_pdf.exe')
    return
  }
  var server = 'http://10.101.8.183/StampServer' // 盖章服务器
  var app = 'OA测试系统' // 应用名称
  var reason = '测试' // 盖章原因
  var lRet = obj.PDFVisualSeal(pdfFile, pdfFile, server, '<DeviceStyle>5</DeviceStyle>', app, reason, '')
  if (lRet !== 0) {
    alert(obj.GetErrorMsg())
  } else {
    alert('Success')
  }
}
