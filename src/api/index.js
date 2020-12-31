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
