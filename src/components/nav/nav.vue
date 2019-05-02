<template>
  <div>
    <span class="logo">
      <img src="../../../static/image/logo.png" alt="">
    </span>
    <span class="system-title">宠物街后台管理系统</span>
    <span class="quit" @click="quit()">退出</span>
    <span class="user-info">
      <img :src="userInfo.avartar">
      <span>{{userInfo.nickName}}</span>
    </span>
  </div>
</template>
<script>
/*eslint-disable*/
export default {
  name: 'Nav',
  data(){
    return {
      userInfo: {}
    }
  },
  methods:{
    quit(){
      localStorage.removeItem('P_S_TOKEN_KEY');
      localStorage.removeItem('P_S_USER_INFO');
      localStorage.removeItem('P_S_USER_TYPE');
      this.$router.push({path: '/login'});
      location.reload();
    }
  },
  created () {
    this.userInfo = JSON.parse(localStorage.getItem('P_S_USER_INFO') || '{}')
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
  .user-info{
    float: right;
    color: #101010;
    margin-right: 20px;
    padding: 0 10px;
    img{
      width: 30px;
      height: 30px;
      position: relative;
      top: 8px;
      margin-right: 10px;
    }
  }
</style>
