// 格式化手机号
export default {
  formatPhone(val) {
    if (val) {
      return val.replace(/(\d)(?=(\d{4})+(?!\d))/g, '$1 ')
    }
  }
}
