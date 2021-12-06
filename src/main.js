import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugin/antui'
// 导入全局的html样式
import './assets/css/style.css'


import './plugin/http'

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
