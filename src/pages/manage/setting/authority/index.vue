<template>
  <div class="account-authority">
    <div class="title-line">权限管理</div>
    <div class="second-title">新增权限</div>
    <div class="bg-line"></div>
    <div class="container">
      <div class="item">
        <span class="left">角色名称：</span>
        <span class="right">
          <div>
            <el-input v-model="input" placeholder="请输入角色名称"></el-input>
          </div>
          <div>
            <el-checkbox v-model="checked">平台工作者</el-checkbox>
          </div>
          <div>
            <el-checkbox v-model="checked">其他</el-checkbox>
          </div>
        </span>
      </div>
      <div class="item">
        <span class="left">权限选择：</span>
        <span class="right">
          <table class="table" v-loading="false">
            <thead>
            <tr>
              <th>统计</th>
              <th>管理</th>
              <th>开发</th>
              <th>设置</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td style="width: 25%">
                <div>
                  <el-checkbox v-model="checked">用户分析及导出</el-checkbox>
                </div>
                <div>
                  <el-checkbox v-model="checked">订单分析及导出</el-checkbox>
                </div>
              </td>
              <td style="width: 25%">
                <div>
                  <el-checkbox v-model="checked">用户管理</el-checkbox>
                </div>
                <div>
                  <el-checkbox v-model="checked">卡券管理 </el-checkbox>
                </div>
              </td>
              <td style="width: 25%">
                <div>
                  <el-checkbox v-model="checked">基本配置</el-checkbox>
                </div>
                <div>
                  <el-checkbox v-model="checked">接入权限</el-checkbox>
                </div>
              </td>
              <td style="width: 25%">
                <div>
                  <el-checkbox v-model="checked">平台信息</el-checkbox>
                </div>
              </td>
            </tr>
            </tbody>
          </table>

        </span>
      </div>
      <div class="footer">
        <el-button type="danger">提交</el-button>
        <el-button type="info" @click="cancel()">取消</el-button>
      </div>

    </div>
  </div>
</template>
<script>
/*eslint-disable*/
export default {
  props:{
    config: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  components: {},
  data(){
    return {
      input: '',
      checked: false,
    }
  },
  methods:{
    cancel(){
      this.$emit('on-cancel');
    }
  },
  created(){
  },
}
</script>
<style lang="less" scoped>
  .account-authority{
    position: absolute;
    background: white;
    top: 0;
    left: 0;
    right: 0;
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
      .item{
        margin-bottom: 20px;
        span{
          display: inline-block;
        }
        .left{
          width: 100px;
          margin-right: 10px;
          vertical-align: top;
        }
        .right{
          width: ~'calc(100% - 120px)';
          vertical-align: top;
          div{
            margin-bottom: 10px;
          }
          .table td div{
            margin: 10px 0;
          }
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
