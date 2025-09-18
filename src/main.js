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
// 设置一个响应的拦截器,来判断token是否有效,无效跳转登录界面,有效则继续操作
axios.interceptors.response.use(
  response => {
    if (response.data.status === 10004) {
      window.sessionStorage.removeItem('token')
      // 跳转到登录界面
      router.replace(
        {
          path: '/login'
        }
      )
    }
    return response
  }
)
// axios.defaults.baseURL = 'http://localhost:8088'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
