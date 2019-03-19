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
        <router-view class="container"></router-view>
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
    position: absolute;
    top: 50px;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 14px;
    white-space: nowrap;
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
      min-width: 600px;
      overflow: hidden;
      .container{
        height: 100%;
        overflow: auto;
      }
/*
      .container::-webkit-scrollbar {!*滚动条整体样式*!
        width: 10px;     !*高宽分别对应横竖滚动条的尺寸*!
        height: 8px;
      }
      .container::-webkit-scrollbar-thumb {!*滚动条里面小方块*!
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #535353;
      }
      .container::-webkit-scrollbar-track {!*滚动条里面轨道*!
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 10px;
        background: #EDEDED;
      }
*/
    }
  }
</style>
