import longpress from './longpress'
import permission from './permission'
import clipboard from './clipboard/clipboard'

// 自定义指令
const directives = {
  longpress,
  permission,
  clipboard
}

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  }
}
