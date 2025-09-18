import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import qs from 'qs'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
// 设置一个请求拦截器用来设置token
axios.interceptors.request.use(config => {
  const tokenStr = window.sessionStorage.getItem('token')
  if (tokenStr) {
    config.headers.token = tokenStr
  }
  return config
})
// axios.defaults.baseURL = 'http://localhost:8088'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
