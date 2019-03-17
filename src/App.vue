<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="app"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  name: 'App',
  data(){
    return {
      transitionName: 'transitionLeft'
    }
  },
  created () {},
  watch: {
    '$route' (to, from) {
      to.path === '/login'&&from.path !== '/' ? this.transitionName = 'transitionLeft' : this.transitionName = '';
      from.path === '/'||from.path === '/login' ? this.transitionName = 'transitionRight' : '';
    }
  }
}
</script>

<style>
@import url('./assets/css/style.less');
.app{
  height: 100%;
  transition: all 0.3s ease; /*定义动画的时间和过渡效果*/
}
.transitionLeft-enter,
.transitionRight-leave-active {
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
  /*当左滑进入右滑进入过渡动画*/
}
.transitionLeft-leave-active,
.transitionRight-enter {
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}

</style>
