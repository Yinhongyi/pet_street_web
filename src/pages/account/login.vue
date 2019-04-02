<template>
  <div>
    <transition name="disappear">
      <div class="loginPage" v-if="isShowLoginPage">
        <div class="logo">
          <img src="../../../static/image/logo.png" alt="">
        </div>
        <div class="system-title">宠物街商品管理平台</div>
        <div class="item">
          <el-select v-model="identity" placeholder="请选择" @change="selectIdentity($event)">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

        </div>
        <div class="item">
          <el-input v-model="userName" placeholder="账户名"></el-input>
        </div>
        <div class="item">
          <el-input v-model="userPassword" placeholder="账户密码" show-password></el-input>
        </div>
        <div class="item">
          <el-button type="danger" @click="logIn()">登录</el-button>
        </div>
      </div>
    </transition>
      <div class="tipsPage" v-if="isShowTipsPage">
        <transition name="shake">
          <div v-if="isShowIcon">
            <i class="iconfont icon-check-circle-fill"></i>
          </div>
        </transition>
        <transition name="pulse">
          <div v-if="isShowTips">登陆成功</div>
        </transition>
      </div>
  </div>
</template>
<script>
/*eslint-disable*/
import {login_message} from '@/global/login_message'

export default {
  name: 'Login',
  data(){
    return {
      login_message: login_message,
      isShowLoginPage: true,
      isShowTipsPage: false,
      isShowIcon: false,
      isShowTips: false,
      identity: '1',
      options: [
        {
          value: '1',
          label: '管理员'
        },
        {
          value: '2',
          label: '企业'
        },
        {
          value: '3',
          label: '平台'
        }
      ],
      userName: '',
      userPassword: '',
    }
  },
  methods:{
    selectIdentity(data){
      console.log(data)
    },
    logIn(){
      let params = {
        "mobile": this.userName,
        "pwd": this.userPassword
      };
      this.$http.post('/api/mgmt/mall/login', params).then((res)=>{
        if(res.code === 1000){
          localStorage.setItem('TOKEN_KEY', res.data&&res.data.token);
          login_message.userData = {
            name: res.data&&res.data.userInfo&&res.data.userInfo.nickName
          };
          this.animationSwitch();
        }
        else if(res.code === 1002){
          alert(res.message);
        }
        else{
          alert('登陆失败');
        }
      })
    },
    animationSwitch(){
      this.isShowLoginPage = false;
      setTimeout(()=>{
        this.isShowTipsPage = true;
      }, 500)
      setTimeout(()=>{
        this.isShowIcon = true;
      }, 700)

      setTimeout(()=>{
        this.isShowTips = true;
      }, 1700)
      setTimeout(()=>{
        this.$router.push({path: '/manage'})
      }, 2700)
      setTimeout(()=>{
        this.isShowLoginPage = true;
        this.isShowIcon = false;
        this.isShowTips = false;
      }, 3000)

    }
  },
}
</script>
<style lang="less" scoped>
  .loginPage{
    text-align: center;
    padding: 10% 0;
    .logo{
      height: 180px;
    }
    .system-title{
      font-size: 24px;
      color: #F55D54;
      margin-top: 15px;
      margin-bottom: 40px;
    }
    .item{
      margin: 15px 0;
    }
    .el-select,.el-select.el-input{
      display: inline-block;
      width: 240px;
    }
    .el-input{
      display: inline-block;
      width: 240px;
    }
    .el-button{
      display: inline-block;
      width: 240px;
    }
  }
  .tipsPage{
    height: 100%;
    text-align: center;
    position: relative;
    top: ~'calc(50% - 240px)';
    div{
      margin: 20px 0;
      .icon-check-circle-fill{
        font-size: 160px;
      }
    }
  }
  .disappear-enter-active, .disappear-leave-active {
    transition: opacity .5s;
  }
  .disappear-enter, .disappear-leave-to {
    opacity: 0;
  }
  @keyframes pulse {
    0%{
      position: relative;
      top: -10px;
    }
    40%{
      position: relative;
      top: -6px;
    }
    80%{
      position: relative;
      top: 0;
    }
    20%,60%,100% {
      position: relative;
      top: 10px;
    }
  }
  @keyframes shake {
    0%,20%,40%,60%,80%,100% {
      position: relative;
      left: -10px;
    }
    10%,30%,50%,70%,90% {
      position: relative;
      left: 10px;
    }
  }
  .pulse-enter-active, .pulse-leave-active {
    transform-origin: center top;
    animation: pulse 1s;
  }
  .shake-enter-active, .shake-leave-active {
    transform-origin: center top;
    animation: shake 1s;
  }
</style>
