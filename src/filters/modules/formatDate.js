import * as dayjs from 'dayjs'
export default {
  // 格式化日期最近两天返回今天昨天其它不处理
  formatTimeToText(val) {
    val = val.replace(new RegExp(/-/gm), '/')
    let text = ''
    if (val) {
      let date = new Date(val).getTime()
      let nowDate = new Date().getTime()
      let diff = (nowDate - date) / 1000
      let maxtime = 24 * 60 * 60
      if (diff < 2 * maxtime && diff > maxtime) {
        text = '昨日'
      } else if (diff <= maxtime) {
        text = '今日'
      }
    }
    return text
  },
  // 时间转换
  filterTime(dateValue) {
    if (!dateValue) return ''
    let date = new Date(dateValue)
    return date
      .toJSON()
      .replace('T', ' ')
      .substring(0, 19)
  },
  // 时间转换
  filterReplace(val) {
    if (!val) return '--'
    return val.replace('T', ' ').substring(0, 19)
  },
  // 格式化下时间
  formatDate(val) {
    if (!val) return '--'
    return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
  }
}
