import permission from './permission'

const install = function(Vue) {
  Vue.directive('permission', permission)
}

if (window.Vue) {
  // eslint-disable-next-line dot-notation
  window['permission'] = permission
  Vue.use(install) // eslint-disable-line
}

permission.install = install
export default permission
