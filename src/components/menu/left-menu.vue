<template>
  <div class="menu">
    <ul v-for="(menu,index) in menuList" :key="index">
      <li class="first-menu" @click="$router.push({path: menu.path})">
        <span v-if="menu.icon"></span>
        {{menu.name}}
      </li>
      <li class="second-menu" v-if="menu.children" v-for="(m,idx) in menu.children" :key="idx" @click="$router.push({path: m.path})">{{m.name}}</li>
    </ul>
  </div>
</template>
<script>
/*eslint-disable*/
import {menuList} from '@/global/menu'

export default {
  name: 'LeftMenu',
  data(){
    return {
      menuList: menuList,
    }
  },
  created () {
  }
}
</script>
<style lang="less" scoped>
  .menu{
  }
</style>
