import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import common from './assets/common'

Vue.config.productionTip = false
Vue.prototype.getImg = common
Vue.prototype.globalurl = 'http://192.168.22.22:8090/api/v2'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
