
let filters = {}

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
modulesFiles.keys().forEach(path => {
  // set './app.js' => 'app'
  // const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const modules = modulesFiles(path)
  filters = Object.assign({}, filters, modules.default)
})

export default {
  install(Vue) {
    Object.keys(filters).forEach(key => {
      Vue.filter(key, filters[key])
    })
  }
}
