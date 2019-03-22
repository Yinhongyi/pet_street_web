<template>
  <div class="menu">
    <ul v-for="(menu,index) in menuList"
        :key="index"
        :class="{'border-b': index < menuList.length - 1,'selected': selectedMenu === menu.path}">
      <li class="first-menu" @click="handleFirstMenu(menu)">
        <span v-if="menu.icon"></span>
        {{menu.name}}
      </li>
      <li class="second-menu"
          v-if="menu.children"
          v-for="(m,idx) in menu.children"
          :key="idx"
          :class="{'selected': selectedMenu === m.path}"
          @click="handleSecondMenu(m)">
        {{m.name}}
      </li>
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
      parent_id: 0,
      selectedMenu: '',
    }
  },
  methods:{
    handleFirstMenu(menu){
      if(this.parent_id === menu.id) return;
      if(menu.children&&menu.menu.length){
        this.$router.push({path: menu.path})
      }else{
        this.selectedMenu = menu.path;
      }
    },
    handleSecondMenu(m){
      this.parent_id = m.parent_id;
      this.selectedMenu = m.path;
      this.$router.push({path: m.path})
    },
  },
  created () {
  }
}
</script>
<style lang="less" scoped>
  .menu{
    width: 100%;
    ul{
      width: 100%;
      li{
        max-width: 100%;
        padding: 10px 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      li:hover{
        cursor: pointer;
        color: white;
        background-color: #F55D54;
      }
      li.first-menu{
        padding-left: 10px;
      }
      li.second-menu{
        padding-left: 30px;
      }
      li.second-menu.selected{
        background-color: #F55D54;
      }
/*
      li.second-menu:hover{
        color: white;
        background-color: #F55D54;
      }
*/
    }
    ul.border-b{
      border-bottom: 2px solid #E0E0E0;
    }
  }
</style>
