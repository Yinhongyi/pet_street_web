<template>
  <div class="new-or-edit-ad">
    <!--<div class="title-line">新增分类</div>-->
    <div class="container">
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
      <div class="item">
        <span class="left">描述：</span>
        <span class="right">
          <el-input v-model="input" placeholder="请输入描述内容"></el-input>
        </span>
      </div>
      <div class="item">
        <span class="left">图片：</span>
        <span class="right">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </span>
      </div>
      <div class="item">
        <span class="left">URL：</span>
        <span class="right">
          <el-input v-model="input" placeholder="请输入链接位置"></el-input>
        </span>
      </div>

      <div class="footer">
        <el-button type="danger">确认添加</el-button>
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
    }
  },
  methods:{
    selectAccountRole(data){
      console.log(data)
    },
    cancel(){
      this.$emit('on-cancel');
    },
    handleAvatarSuccess(){},
    beforeAvatarUpload(){},
  },
  created(){
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
