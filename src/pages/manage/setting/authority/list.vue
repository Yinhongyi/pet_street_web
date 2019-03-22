<template>
  <div class="authority-list">
    <div class="title-line">账户管理</div>
    <div class="second-title">
      <span class="cursor_pointer" :class="{'selected': $route.path.indexOf('account') > -1}" @click="$router.push({path: '/manage/setting/account-list'})">账户列表</span>
      <span class="cursor_pointer" :class="{'selected': $route.path.indexOf('authority') > -1}" @click="$router.push({path: '/manage/setting/authority-list'})">权限管理</span>
    </div>
    <div class="bg-line"></div>
    <div class="title-line">
      权限信息
      <span class="color-blue cursor_pointer" @click="isShowEditAuthority = true;">新增权限</span>
    </div>
    <div class="table-list">
      <table class="table" v-loading="false">
        <thead>
        <tr>
          <th>角色</th>
          <th>对应权限列表</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td style="width: 15%">管理员</td>
          <td style="width: 70%">
            <span class="authority-text" v-for="(t,idx) in list" :key="idx">{{t}}</span>
          </td>
          <td style="width: 15%">
            <span class="cursor_pointer color-blue" @click="editAuthority()">修改</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <edit-authority v-if="isShowEditAuthority" :config="authorityData" @on-cancel="isShowEditAuthority = false"></edit-authority>
  </div>
</template>
<script>
/*eslint-disable*/
import editAuthority from './index'
export default {
  props:{},
  components: {editAuthority},
  data(){
    return {
      isShowEditAuthority: false,
      authorityData: {},
      list: ['客户信息','员工信息','所有订单信息','待付订单订单管理','消息发送中心','历史消息查看','客户管理','订单管理','订单管理','消息管理']
    }
  },
  methods:{
    selectAccountRole(data){
      console.log(data)
    },
    editAuthority(data){},
  },
  created(){
  },
}
</script>
<style lang="less" scoped>
  .authority-list{
    position: relative;
    .title-line{
      padding: 10px;
      border-bottom: 2px solid #E0E0E0;
    }
    .second-title{
      padding: 10px 10px 10px 20px;
      font-size: 14px;
      span{
        display: inline-block;
        margin: 10px;
      }
      span.selected{
        font-weight: bold;
      }
    }
    .bg-line{
      width: 100%;
      height: 10px;
      background-color: #F0F0F2;
    }
    .table-list{
      overflow: auto;
      .table thead th{
        background-color: white;
        border-bottom: 1px solid #939598;
      }
      .authority-text{
        display: inline-block;
        margin-right: 20px;
      }
      .pagination{
        float: right;
        margin: 12px;
      }
    }
  }
</style>
