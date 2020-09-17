import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ELementUI from 'element-ui'
import axios from './api'
import './assets/font/iconfont.css'
import 'element-ui/packages/theme-chalk/lib/index.css'
Vue.config.productionTip = false


Vue.prototype.axios = axios;
Vue.use(ELementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
