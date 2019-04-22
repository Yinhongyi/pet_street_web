<template>
  <div class="pet-upload">
    <div v-if="mode === 'single'">
      <el-upload v-loading="uploading"
                 class="uploader"
                 action="api/mgmt/public/storage/imageUpload"
                 :headers="{TOKEN_KEY:headerToken}"
                 :show-file-list="false"
                 :on-success="handleSuccess"
                 :on-progress="handleProgress"
                 :on-error="handleError"
                 :before-upload="beforeUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
  </div>
</template>
<script>
/*eslint-disable*/
const token = localStorage.getItem('P_S_TOKEN_KEY');
export default {
  props:{
    mode: {// single、multiple
      type: String,
      default: 'single'
    },
    size: {//  以M为单位
      type: Number,
      default: 1
    },
    type: {
      type: String,
      default: 'image'
    }
  },
  data(){
    return {
      imageUrl: '',
      headerToken: token,
      uploading: false,
    }
  },
  methods:{
    handleSuccess(res){
      this.uploading = false;
      if(res.code === 1000){
        this.imageUrl = res.data.imageSmallUrl || res.data.imageUrl
        this.$emit('on-success', res.data)
      }else{
        this.$message({
          message: res.message,
          type: 'error'
        })
      }
      console.log('upload success:',res.data)
    },
    handleError(res){
      this.uploading = true;
      console.log(res)
    },
    handleProgress(progress){
      console.log(progress)
    },
    //上传组件:上传之前,使用此方法限制用户上传的图片格式和大小
    beforeUpload(file){
      let typeVerification = false;
      let sizeVerification = false;
      if(file.type.indexOf(this.type) > -1){
        typeVerification = true;
      }else{
        let msg = '';
        if(this.type === 'image'){
          msg = '仅限于图片格式（jpg、png、gif、jpeg）'
        }else if(this.type === 'video'){

        }
        this.$notify.error({
          message: msg,
        })
      }
      if(file.size/1024/1024 < 1){
        sizeVerification = true;
      }else{
        this.$notify.error({
          message: '请上传小于'+this.size+'M的文件',
        })
      }
      if(typeVerification&&sizeVerification){
        this.uploading = true;
      }
      return typeVerification&&sizeVerification
    },
  },
}
</script>
<style lang="less" scoped>
.pet-upload{
  display: inline-block;
  padding: 0 12px 12px 0;
  vertical-align: top;
  div{
    display: inline-block;
  }
  .uploader{
    display: inline-block;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    width: 178px;
    height: 178px;
    overflow: hidden;
  }
  .uploader:hover{
    border-color: #409eff;
    color: #409eff;
  }
}
</style>
