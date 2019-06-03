<template>
  <div class="app-version">
    <div class="container">
      <div class="item-line">
        <span class="item-title">机型：</span>
        <el-radio-group v-model="deviceType">
          <el-radio :label="'iOS'">iOS</el-radio>
          <el-radio :label="'Android'">Android</el-radio>
        </el-radio-group>
      </div>
      <div class="item-line">
        <span class="item-title">版本号：</span>
        <el-input v-model="versionNum" placeholder="请输入版本号"></el-input>
      </div>
      <div class="item-line">
        <span class="item-title">版本编号：</span>
        <el-input v-model="versionNum" placeholder="请输入版本编号"></el-input>
      </div>
      <div class="item-line auto-height">
        <span class="item-title">升级信息：</span>
        <el-input type="textarea" :rows="4" v-model="updateMsg" placeholder="请输入升级信息" style="width: 60%;"></el-input>
      </div>
      <div class="item-line">
        <span class="item-title">是否强制升级：</span>
        <el-radio-group v-model="forcedUpgrade">
          <el-radio :label="0">否</el-radio>
          <el-radio :label="1">是</el-radio>
        </el-radio-group>
      </div>
      <div class="footer">
        <el-button type="danger" @click="confirm">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
/*eslint-disable*/
export default {
  name: 'appVersion',
  data(){
    return {
      deviceType: 'iOS',
      versionNum: '',
      updateMsg: '',
      forcedUpgrade: 0,
    }
  },
  methods: {
    confirm(){},
  }
}
</script>
<style lang="less" scoped>
  .app-version{
    .container{
      width: 98%;
      padding-left: 2%;
      padding-top: 20px;
      overflow: auto;
      height: ~'calc(100% - 64px)';
      .item-line{
        margin-bottom: 10px;
        height: 40px;
        white-space: nowrap;
        position: relative;
        .item-title{
          display: inline-block;
          width: 160px;
          height: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          vertical-align: top;
        }
        .input-box{
          display: inline-block;
          margin-right: 20px;
        }
        .list{
          display: inline-block;
          width: ~'calc(100% - 120px)';
          .line{
            margin-bottom: 10px;
          }
        }
        .tips{
          color: rgba(168, 168, 168, 1);
        }
        .down-btn{
          border-color: #A8A8A8;
          color: #A8A8A8;
          background-color: white;
        }
        .down-btn.selected{
          color: white;
          background-color: #409EFF;
          border-color: #409EFF;
        }
      }
      .auto-height{
        height: auto;
      }
      .editor-container{
        margin-bottom: 20px;
      }
      .footer{
        border-top: 2px solid #E0E0E0;
        padding-top: 40px;
        margin-bottom: 40px;
        text-align: center;
      }
    }
  }
</style>
