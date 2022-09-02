import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// rem
// import 'amfe-flexible'
import { flexibleDashboard } from '@/utils/rem'

// 初始化rem
flexibleDashboard() // 默认比例16/9

// import eventBus from './utils/eventBus'
// Vue.use(eventBus)

// import Throttle from '../Throttle'
// Vue.component('Throttle', Throttle)

// 自动注册全局组件
import '@/components/componentRegister.js'

// svg
import './icons'

// fastclick 解决移动端点击300ms问题
import fastclick from 'fastclick'

fastclick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
