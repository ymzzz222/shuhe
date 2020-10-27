"use strict";

import Vue from 'vue';
import axios from "axios";
import ElementUI from 'element-ui';
import store from '../store/index';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// let apiUrl = process.env.NODE_ENV == 'production'?'':'http://192.168.22.104:8090/api/v2'

let config = {
  baseURL: '/api',
  timeout: 10 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
  headers:{
    'Content-Type': 'application/x-www-form-urlencoded',
    'token': localStorage.getItem("token"),
  }
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    store.commit('setLoading',true)
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    store.commit('setLoading',false)
    if(response.data.code==200){
      // Do something with response data
      return response.data.data;
    }else if(response.data.code == 506){
      localStorage.clear();
      store.commit('loginActive',true)
      return Promise.reject();
    }else{
      ElementUI.Message.warning(response.data.message);
      return Promise.reject();
    }
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

const service = (url, method, data) => {
  return new Promise((resolve, reject) => {
    _axios({
      url:url,
      method:method,
      data:data,
      params:data
    }).then(res=>{
      resolve(res)
    }).catch(error=>{
      reject(error)
    })
  })
}

Plugin.install = function(Vue, options) {
  Vue.axios = service;
  window.axios = service;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return service;
      }
    },
    $axios: {
      get() {
        return axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
