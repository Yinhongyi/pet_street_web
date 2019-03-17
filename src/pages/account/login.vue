<template>
  <div>
    <transition name="disappear">
      <div class="loginPage" v-if="isShowLoginPage">
        <div class="logo">logo</div>
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
          <div v-if="isShowIcon">icon</div>
        </transition>
        <transition name="pulse">
          <div v-if="isShowTips">log in success</div>
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
      localStorage.setItem('TOKEN', 'test_TOKENew34sdfiuwhd2ehdu');
      login_message.userData = {
        name: '用户名'
      };
      this.animationSwitch();
    },
    animationSwitch(){
      this.isShowLoginPage = false;
      setTimeout(()=>{
        this.isShowTipsPage = true;
        this.isShowIcon = true;
      }, 500)
      setTimeout(()=>{
        this.isShowTips = true;
      }, 1500)
      setTimeout(()=>{
        this.$router.push({path: '/manage'})
      }, 2500)
      setTimeout(()=>{
        this.isShowLoginPage = true;
        this.isShowIcon = false;
        this.isShowTips = false;
      }, 2800)

    }
  },
}
</script>
<style lang="less" scoped>
  .loginPage{
    text-align: center;
    padding: 40px 0;
    height: 100%;
    .logo{
      min-height: 180px;
    }
    .system-title{
      color: #F55D54;
      margin-top: 15px;
      margin-bottom: 40px;
    }
    .item{
      margin: 15px 0;
    }
  }
  .tipsPage{
    height: 100%;
    text-align: center;
    margin-top: 100px;
    div{
      margin: 20px 0;
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
