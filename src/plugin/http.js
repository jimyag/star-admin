import axios from "axios";
import Vue from "vue";

let Url = "http://localhost:9000/zizhuxing"
axios.defaults.withCredentials=true
axios.defaults.baseURL = Url
// 请求拦截器
axios.interceptors.request.use(config => {
    config.headers.token = window.sessionStorage.getItem("token")
    return config
})
Vue.prototype.$http = axios
export {Url}

// 可以使用 import {Url} from "../../plugin/http" 导入了