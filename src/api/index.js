import Axios from "axios";
import {PRIVATE_URL} from './url_private';
const URL = PRIVATE_URL;

export {URL};
Axios.defaults.timeout = 30000;

const base_url = "http://127.0.0.1:8000";

export const api = {
  get (url) { // get请求
    return Axios.get(dealUrl(url));
  },
  post (url, data = {}) { // post请求
    return Axios.post(dealUrl(url), data);
  },
  put (url, data = {}) { // put
    return Axios.put(dealUrl(url), data);
  },
  delete (url) { // delete
    return Axios.delete(dealUrl(url));
  },
};

function dealUrl (url) {
  if (!url) {
    console.log("url未定义", "api");
    return;
  }

  return base_url + url;
}


Axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = 'Bearer '+ token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


// http response 拦截器
Axios.interceptors.response.use(
  response => {
    console.log(response)
    // 未登录或会话已过期
    if ('401' === response.status) {
      // 重定向到登录页
      router.replace({
        path: '/login',
        query: {}
      })
    }
    return response;
  },
  error => {
    if (500 === error.response.status) {
      // 服务端异常
    }
    return Promise.reject(error) // 返回接口返回的错误信息
  }
);

