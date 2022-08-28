import NP from 'number-precision'

export default {
  // 格式化金额并保留两位小数
  formatMoney(val) {
    if (!val) return '0.00'
    if (typeof val === 'number') {
      return NP.divide(val, 100).toFixed(2)
    } else if (typeof val === 'string' && !isNaN(Number(val))) {
      return NP.divide(val, 100).toFixed(2)
    } else {
      return '0.00'
    }
  },
  // 格式化金额，三位三位显示
  formatPriceTo3(val) {
    if (val) {
      // eslint-disable-next-line no-constant-condition
      if (typeof (val !== 'string')) {
        val = val.toString()
      }
      return val.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    } else {
      return val
    }
  }
}
