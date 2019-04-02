/* eslint-disable */
import Vue from 'vue';
import axios from 'axios';

const ajax = () => {
  //默认Ajax配置
  let $http = axios.create({
    timeout: 60000
  });
  $http.interceptors.request.use(function (config) {
    if(typeof config.data=='undefined'||typeof config.data=='object'){
      config.data=config.data||{}
    }
    if(localStorage.getItem('TOKEN_KEY')){
      config.headers.common['TOKEN_KEY'] = localStorage.getItem('TOKEN_KEY');
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
  return $http;
}
export default ajax();
