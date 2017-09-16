export default function time (Vue, beginTime, endTime) {
  var strb = beginTime.split(':')
  if (strb.length !== 2) {
    return false
  }
  var stre = endTime.split(':')
  if (stre.length !== 2) {
    return false
  }
  var b = new Date()
  var e = new Date()
  var n = new Date()
  b.setHours(strb[0])
  b.setMinutes(strb[1])
  e.setHours(stre[0])
  e.setMinutes(stre[1])
  if (n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0) {
    return true
  } else {
    return false
  }
}
