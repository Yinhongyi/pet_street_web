<template>
  <div class="account-authority">
    <div class="title-line">账户管理</div>
    <div class="second-title">修改账户</div>
    <div class="bg-line"></div>
    <div class="container">
      <div class="item-line">
        <span class="item-title">账户名称：</span>
        <el-input :disabled="true" v-model="input" placeholder="请输入原密码"></el-input>
      </div>
      <div class="item-line">
        <span class="item-title">原密码：</span>
        <el-input type="password" v-model="input" placeholder="请输入原密码"></el-input>
      </div>
      <div class="item-line">
        <span class="item-title">新密码：</span>
        <el-input type="password" v-model="input" placeholder="请输入新密码"></el-input>
      </div>
      <div class="item-line">
        <span class="item-title">确认密码：</span>
        <el-input type="password" v-model="input" placeholder="请再次输入新密码"></el-input>
      </div>
      <div class="item-line">
        <span class="item-title">联系人：</span>
        <el-input v-model="input" placeholder="请再次联系人名"></el-input>
      </div>
      <div class="item-line">
        <span class="item-title">联系方式：</span>
        <el-input v-model="input" placeholder="请输入联系方式"></el-input>
      </div>
      <div class="footer">
        <el-button type="danger">提交</el-button>
        <el-button type="info">取消</el-button>
      </div>

    </div>
  </div>
</template>
<script>
/*eslint-disable*/
export default {
  props:{},
  components: {},
  data(){
    return {
      input: ''
    }
  },
  methods:{
  },
  created(){
  },
}
</script>
<style lang="less" scoped>
  .account-authority{
    .title-line{
      padding: 10px;
      border-bottom: 2px solid #E0E0E0;
    }
    .second-title{
      padding: 10px 10px 10px 20px;
      font-weight: bold;
      font-size: 14px;
    }
    .bg-line{
      width: 100%;
      height: 10px;
      background-color: #F0F0F2;
    }
    .container{
      width: 98%;
      padding-left: 2%;
      padding-top: 20px;
      overflow: auto;
      .item-line {
        margin-bottom: 10px;
        height: 40px;
        white-space: nowrap;
        .item-title {
          display: inline-block;
          width: 100px;
          height: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          vertical-align: top;
        }
      }
      .footer{
        padding-top: 40px;
        padding-left: 100px;
        margin-bottom: 40px;
        text-align: left;
      }
    }
  }
</style>
