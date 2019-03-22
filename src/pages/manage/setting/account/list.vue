<template>
  <div class="account-list">
    <div class="title-line">账户管理</div>
    <div class="second-title">
      <span class="cursor_pointer" :class="{'selected': $route.path.indexOf('account') > -1}" @click="$router.push({path: '/manage/setting/account-list'})">账户列表</span>
      <span class="cursor_pointer" :class="{'selected': $route.path.indexOf('authority') > -1}" @click="$router.push({path: '/manage/setting/authority-list'})">权限管理</span>
    </div>
    <div class="bg-line"></div>
    <div class="title-line">
      账户信息
      <span class="color-blue cursor_pointer" @click="isShowEditAccount = true;">新增账户</span>
    </div>
    <div class="table-list">
      <table class="table" v-loading="false">
        <thead>
        <tr>
          <th>用户名</th>
          <th>角色</th>
          <th>名字</th>
          <th>手机号</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td style="width: 10%">CS2017</td>
          <td style="width: 10%">管理员</td>
          <td style="width: 10%">王朝男</td>
          <td style="width: 20%">XXXXXXXXXXX</td>
          <td style="width: 10%">正常</td>
          <td style="width: 30%">
            <span class="cursor_pointer color-red" @click="deleteAccount()">删除</span>
            <span class="cursor_pointer color-blue" @click="editAccount()">修改</span>
          </td>
        </tr>
        </tbody>
      </table>

    </div>

    <edit-account v-if="isShowEditAccount" :config="accountData" @on-cancel="isShowEditAccount = false"></edit-account>
  </div>
</template>
<script>
/*eslint-disable*/
import editAccount from './index'
export default {
  props:{},
  components: {editAccount},
  data(){
    return {
      isShowEditAccount: false,
      accountData: {},
    }
  },
  methods:{
    selectAccountRole(data){
      console.log(data)
    },
    deleteAccount(data){},
    editAccount(data){},
  },
  created(){
  },
}
</script>
<style lang="less" scoped>
  .account-list{
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
      .pagination{
        float: right;
        margin: 12px;
      }
    }
  }
</style>
