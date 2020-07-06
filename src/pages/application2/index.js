import Vue from 'vue'
import Application2 from './application2.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(Application2)
}).$mount('#app')
