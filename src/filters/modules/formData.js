import { parseTime } from '@/utils'
// 格式化手机号
export default {
  formatArrayToText(val) {
    let text = ''
    if (val instanceof Array) {
      text = val.join(',')
    }
    return text
  },
  formatDate(val, fmt) {
    if (!val) {
      return val
    }
    return parseTime(val, fmt)
  }
}
