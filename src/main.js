import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import './plugin/antui'
// 导入全局的html样式
import './assets/css/style.css'
axios.defaults.baseURL = "https://localhost:3000/api/v1"
// 请求拦截器
axios.interceptors.request.use(config=>{
  config.headers.Authorization = `Bearer ${window.sessionStorage.getItem("token")}`
  return config
})
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
