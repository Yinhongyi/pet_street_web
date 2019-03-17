<template>
  <div>
    <div class="top">
      <nav-top></nav-top>
    </div>
    <div class="bottom">
      <div class="left-menu">
        <left-menu></left-menu>
      </div>
      <div class="right-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
/*eslint-disable*/
import navTop from '../nav/nav'
import leftMenu from '../menu/left-menu'
export default {
  name: 'Layout',
  components: {navTop,leftMenu},
  data(){
    return {}
  },
  created () {
  }
}
</script>
<style lang="less" scoped>
  .top{
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #F55D54;
    background-color: #F7F7F7;
  }
  .bottom{
    position: fixed;
    top: 50px;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 14px;
    .left-menu{
      display: inline-block;
      width: 180px;
      height: 100%;
      vertical-align: top;
      background-color: #F7F7F7;
    }
    .right-content{
      display: inline-block;
      margin-left: 14px;
      width: ~'calc(100% - 200px)';
      height: 100%;
      vertical-align: top;
      background-color: #F7F7F7;
    }
  }
</style>
