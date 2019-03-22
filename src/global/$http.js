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
      config.data.version_code = process.env.VERSION_CODE||1;
      config.data.app_lang = (localStorage.lang||'').replace('-','_');
    }
    let cookieList = document.cookie.split('Authorization=');
    cookieList.length === 2 ? localStorage.setItem('TOKEN_KEY', cookieList[1]) : '';

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
