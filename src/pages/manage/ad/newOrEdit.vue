<template>
  <div class="new-or-edit-ad">
    <!--<div class="title-line">新增分类</div>-->
    <div class="container">
<!--
      <div class="item">
        <span class="left">广告位置：</span>
        <span class="right">
          <el-select v-model="adPosition" placeholder="请选择" @change="selectPetClassify($event)">
            <el-option
              v-for="item in adPositionList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </span>
      </div>
-->
      <div class="item">
        <span class="left">图片：</span>
        <span class="right">
          <pet-upload :imgUrl="adData.advertAvata" @on-success="handleAvatarSuccess"></pet-upload>
        </span>
      </div>
      <div class="item">
        <span class="left">描述：</span>
        <span class="right">
          <el-input type="textarea" :row="4" v-model="adData.advertDescribe" placeholder="请输入描述内容" style="width: 90%;"></el-input>
        </span>
      </div>
      <div class="item">
        <span class="left">广告名字：</span>
        <span class="right">
          <el-input v-model="adData.advertName" placeholder="请输入广告名字" style="width: 90%;"></el-input>
        </span>
      </div>
      <div class="item">
        <span class="left">URL：</span>
        <span class="right">
          <el-input v-model="adData.advertUrl" placeholder="请输入链接地址" style="width: 90%;"></el-input>
        </span>
      </div>
      <div class="item">
        <span class="left">排序：</span>
        <span class="right">
          <el-input v-model="adData.advertSort" placeholder="请输入排序数字" style="width: 90%;"></el-input>
        </span>
      </div>
      <div class="item">
        <span class="left">广告状态：</span>
        <span class="right">
          还不清楚
          <!--<el-input v-model="adData.advertUrl" placeholder="请输入排序数字"></el-input>-->
        </span>
      </div>
      <div class="item">
        <span class="left">广告类型：</span>
        <span class="right">
          <el-select v-model="adData.advertStatus" placeholder="请选择">
            <el-option
              v-for="item in adTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </span>
      </div>
      <div class="item">
        <span class="left">应用类型：</span>
        <span class="right">
          <el-select v-model="adData.applyType" placeholder="请选择">
            <el-option
              v-for="item in appTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </span>
      </div>
      <div class="item">
        <span class="left">是否启用：</span>
        <span class="right">
          <el-radio v-model="adData.enabled" :label="true">是</el-radio>
          <el-radio v-model="adData.enabled" :label="false">否</el-radio>
        </span>
      </div>
      <div class="item">
        <span class="left">是否登录：</span>
        <span class="right">
          <el-radio v-model="adData.loginFlag" :label="true">是</el-radio>
          <el-radio v-model="adData.loginFlag" :label="false">否</el-radio>
        </span>
      </div>
      <div class="item">
        <span class="left">版本：</span>
        <span class="right">
          <el-input v-model="adData.version" placeholder="请输入版本" style="width: 90%;"></el-input>
        </span>
      </div>

      <div class="footer">
        <el-button type="danger" @click="checkValidate()">确认添加</el-button>
        <el-button type="info" @click="close()">取消</el-button>
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
      adPosition: '',
      adPositionList: [
        {
          value: '1',
          label: '金毛'
        },
        {
          value: '2',
          label: '哈士奇'
        }

      ],
      imageUrl: '',
      adData: {
        advertAvata: '', // 广告图片
        advertDescribe: '', // 广告描述
        advertName: '', // 广告名字
        advertSort: '', // 排序
        advertStatus: '', // 广告状态
        advertType: '', // 广告类型
        advertUrl: '', // 广告连接
        applyType: '', // 应用类型
        enabled: '', // 是否启用
        id: '', // id
        loginFlag: '', // 是否登录
        version: '' // 乐观锁-版本
      },
      // 广告类型
      adTypeList: [
        {
          value: 'BUSINESS_SETTLED_TYPE',
          label: '商家入驻'
        },
        {
          value: 'ABOUT_TYPE',
          label: '关于我们'
        },
        {
          value: 'INVITATION_FRIEND',
          label: '邀请好友'
        }
      ],
      // 应用类型
      appTypeList: [
        {
          value: 'APPLY_INDEX',
          label: '首页广告'
        },
        {
          value: 'APPLY_PET_HOMEPAGE',
          label: '宠物圈主页广告'
        },
        {
          value: 'APPLY_PERSONAL_HOME_PAGE',
          label: '个人中心广告'
        }
      ]
    }
  },
  methods:{
    selectAccountRole(data){
      console.log(data)
    },
    close(){
      this.resetData();
      this.$emit('on-cancel');
    },
    handleAvatarSuccess(res){
      this.adData.advertAvata = res.imageUrl
    },
    resetData(){
      this.adData = {
        advertAvata: '', // 广告图片
        advertDescribe: '', // 广告描述
        advertName: '', // 广告名字
        advertSort: '', // 排序
        advertStatus: '', // 广告状态
        advertType: '', // 广告类型
        advertUrl: '', // 广告连接
        applyType: '', // 应用类型
        enabled: '', // 是否启用
        id: '', // id
        loginFlag: '', // 是否登录
        version: '' // 乐观锁-版本
      }
    },
    checkValidate(){
      let checkFailure = (msg)=>{
        this.$message({
          message: msg,
          type: 'error'
        })
      }
      if(!this.adData.advertAvata){
        checkFailure('请上传图片')
        return
      }
      console.log(this.adData)
      this.saveAdData()
    },
    saveAdData(){
      let url = this.config.id ? '/api/mgmt/platform/advert/update' : '/api/mgmt/platform/advert/save'
      this.$http.post(url, this.adData).then((res)=>{
        if(res.code === 1000){
          let msg = this.config.id ? '更新成功' : '保存成功'
          this.$message({
            message: msg,
            type: 'success'
          });
          this.close();
        }else{
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    }
  },
  created(){
    this.config ? this.adData = this.config : ''
  },
}
</script>
<style lang="less" scoped>
  .new-or-edit-ad{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: white;
    bottom: 0;
    overflow: auto;
    .title-line{
      padding: 10px;
      /*background-color: #E0E0E0;*/
      border-bottom: 2px solid #E0E0E0;
      font-weight: bold;
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
        margin-bottom: 10px;
        span{
          display: inline-block;
        }
        .left{
          width: 120px;
          margin-right: 10px;
          word-break: break-all;
          white-space: normal;
          vertical-align: top;
        }
        .right{
          width: ~'calc(100% - 140px)';
          word-break: break-all;
          white-space: normal;
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
