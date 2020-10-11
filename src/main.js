import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ELementUI from 'element-ui'
import Vant from 'vant';
import api from './api';
import '@vant/touch-emulator';
import 'vant/lib/index.css';
import './assets/font/iconfont.css';
import 'element-ui/packages/theme-chalk/lib/index.css';
Vue.config.productionTip = false;
Vue.use(Vant);
Vue.use(api);
Vue.use(ELementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
