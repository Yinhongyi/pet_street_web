<template>
  <div>
    <span class="logo">
      <img src="../../../static/image/logo.png" alt="">
    </span>
    <span class="system-title">宠物街后台管理系统</span>
    <span class="quit" @click="quit()">退出</span>
    <span class="user-name">{{login_message.userData.name}}</span>
  </div>
</template>
<script>
/*eslint-disable*/
import {login_message} from '@/global/login_message'
export default {
  name: 'Nav',
  data(){
    return {
      login_message: login_message,
    }
  },
  methods:{
    quit(){
      localStorage.removeItem('TOKEN_KEY');
      login_message.userData = {};
      this.$router.push({path: '/login'});
    }
  },
  created () {
  }
}
</script>
<style lang="less" scoped>
  .logo{
    padding: 0 16px;
    width: 30px;
    height: 30px;
    display: inline-block;
    vertical-align: middle;
    img{
      width: 100%;
    }
  }
  .system-title{
    font-size: 24px;
    vertical-align: middle;
  }
  .quit{
    float: right;
    margin-right: 16px;
    padding: 0 10px;
  }
  .quit:hover{
    background-color: #F55D54;
    color: white;
    cursor: pointer;
  }
  .user-name{
    float: right;
    color: #101010;
    margin-right: 20px;
    padding: 0 10px;
  }
</style>
