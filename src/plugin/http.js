import axios from "axios";
import Vue from "vue";

let Url = "https://localhost:3000/api/v1"
axios.defaults.baseURL = Url
// 请求拦截器
axios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${window.sessionStorage.getItem("token")}`
    return config
})
Vue.prototype.$http = axios
export {Url}

// 可以使用 import {Url} from "../../plugin/http" 导入了