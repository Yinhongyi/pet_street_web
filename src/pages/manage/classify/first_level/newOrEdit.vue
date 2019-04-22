<template>
  <div class="new-or-edit-first-classify">
    <div class="title-line">新增分类</div>
    <div class="container">
      <div class="item">
        <span class="left">一级分类：</span>
        <span class="right">
          <el-input v-model="firstClassifyName" placeholder="请输入一级分类名称"></el-input>
        </span>
      </div>
      <div class="item">
        <span class="left">缩略图：</span>
        <span class="right">
          <pet-upload @on-success="uploadSmallImage"></pet-upload>
        </span>
      </div>

      <div class="footer">
        <el-button type="danger" @click="confirmAdd">确认添加</el-button>
        <el-button type="info" @click="quit">取消</el-button>
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
      firstClassifyName: '',
      imageUrl: '',
    }
  },
  methods:{
    quit(){
      this.firstClassifyName = '';
      this.imageUrl = '';
      this.$emit('on-quit');
    },
    uploadSmallImage(data){
      this.imageUrl = data.imageSmallUrl;
    },
    confirmAdd(){
      if(!this.firstClassifyName){
        this.$message({
          message: '请填写一级分类名称',
          type: 'error'
        })
        return
      }
      if(!this.imageUrl){
        this.$message({
          message: '请上传图片作为缩略图',
          type: 'error'
        })
        return
      }
      let params = {
        "name": this.firstClassifyName,
        "thumbnail": this.imageUrl
      }
      this.$http.post('api/mgmt/platform/classific/persistent',params).then((res)=>{
        if(res.code === 1000){
          this.$emit('on-quit')
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
  },
}
</script>
<style lang="less" scoped>
  .new-or-edit-first-classify{
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
