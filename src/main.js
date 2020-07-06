import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import eventBus from './utils/eventBus'
// Vue.use(eventBus)

// import Throttle from '../Throttle'
// Vue.component('Throttle', Throttle)

// 自动注册全局组件
import '@/components/componentRegister.js'

// svg
import './icons'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
