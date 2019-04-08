/* eslint-disable */
import _this from '../main'
import axios from 'axios';

const ajax = () => {
  //默认Ajax配置
  let $http = axios.create({
    timeout: 60000
  });
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  $http.interceptors.request.use(function (config) {
    if(typeof config.data=='undefined'||typeof config.data=='object'){
      config.data=config.data||{}
    }
    if(localStorage.getItem('P_S_TOKEN_KEY')){
      config.headers.common['TOKEN_KEY'] = localStorage.getItem('P_S_TOKEN_KEY');
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
  $http.interceptors.response.use(function (response) {
    if(response.data.code === 1001){
      _this.$message({
        message: response.data.message,
        type: 'error'
      })
      _this.$router.push({path: '/login'})
    }else{
      return response.data;
    }
  }, function (error) {
    return Promise.reject(error);
  });
  return $http;
}
export default ajax();
