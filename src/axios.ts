/**
 * 全站http配置
 *
 * axios参数说明
 * isSerialize是否开启form表单提交
 * isToken是否需要token
 */
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
import store from '@/store/'
import router from '@/router/'
import app from '@/constants/app'
import { serialize } from '@/utils/utils'
import { getToken } from "@/utils/cache"
import { ElMessage } from 'element-plus'
import qs from "qs"
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

axios.defaults.timeout = 10000;
//返回其他状态吗
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500; // 默认的
};
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;
// NProgress Configuration
NProgress.configure({
  showSpinner: false
});

axios.defaults.baseURL = app.api

//HTTPrequest拦截
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  NProgress.start() // start progress bar
  if (config && config.headers) {
    config.headers["X-Requested-With"] = "XMLHttpRequest";
    config.headers["Request-Start"] = new Date().getTime();
    const isToken = (config.headers || {}).isToken === false;
    let token = getToken()
    if (token && !isToken) {
      config.headers[app.Authorization] = 'Bearer ' + token // 让每个请求携带token--['Authorization']为自定义key 请根据实际情况自行修改
    }
  }
  
  //headers中配置serialize为true开启序列化
  if (config.method === 'post' && config.headers && config.headers["serialize"] === true) {
    config.data = serialize(config.data);
  }
  if (config.method?.toUpperCase() === "GET") {
    config.params = { ...config.params, _t: new Date().getTime() };
  }
  if (config.headers && Object.values(config.headers).includes("application/x-www-form-urlencoded")) {
    config.data = qs.stringify(config.data);
  }
  return config
}, error => {
  return Promise.reject(error)
});
//HTTPresponse拦截
axios.interceptors.response.use((res:AxiosResponse) => {
  NProgress.done();
  const status = Number(res.status) || 200;
  const statusWhiteList = app.statusWhiteList || [];
  const message = res.data.message || '未知错误';
  //如果在白名单里则自行catch逻辑处理
  if (statusWhiteList.includes(status)) return Promise.reject(res);
  //如果是401则跳转到登录页面
  if (status === 401) store.dispatch('LogOut').then(() => router.push({ path: '/login' }));
  // 如果请求为非200否者默认统一处理
  if (status !== 200) {
    ElMessage({
      message: message,
      type: 'error'
    })
    return Promise.reject(new Error(message))
  }
  return res;
}, error => {
  NProgress.done();
  return Promise.reject(new Error(error));
})

export default axios;