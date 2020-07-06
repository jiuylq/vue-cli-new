import Vue from 'vue'
import Application1 from './application1.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(Application1)
}).$mount('#app')
