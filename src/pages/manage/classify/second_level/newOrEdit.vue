<template>
  <div class="new-or-edit-second-classify">
    <div class="title-line">新增分类</div>
    <div class="container">
      <div class="item">
        <span class="left">一级分类：</span>
        <span class="right">
          <el-select v-model="firstClassify" placeholder="请选择" @change="selectPetClassify($event)">
            <el-option
              v-for="item in firstClassifyList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </span>
      </div>
      <div class="item">
        <span class="left">一级分类：</span>
        <span class="right">
          <el-input v-model="input" placeholder="请输入需要添加的二级分类名称"></el-input>
        </span>
      </div>
      <div class="item">
        <span class="left">缩略图：</span>
        <span class="right">
          <pet-upload @on-success="uploadSmallImage"></pet-upload>
        </span>
      </div>
      <div class="item">
        <span class="left">体型：</span>
        <span class="right">
          <el-select v-model="firstClassify" placeholder="请选择" @change="selectPetClassify($event)">
            <el-option
              v-for="item in firstClassifyList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </span>
      </div>
      <div class="item">
        <span class="left">功能：</span>
        <span class="right">
          <el-checkbox v-model="checked" label="家庭犬"></el-checkbox>
          <el-checkbox v-model="checked" label="玩具犬"></el-checkbox>
          <el-checkbox v-model="checked" label="工作犬"></el-checkbox>
          <el-checkbox v-model="checked" label="梗类犬"></el-checkbox>
          <el-checkbox v-model="checked" label="牧羊犬"></el-checkbox>
          <el-checkbox v-model="checked" label="狩猎犬"></el-checkbox>
          <el-checkbox v-model="checked" label="枪猎犬"></el-checkbox>
        </span>
      </div>
      <div class="item">
        <span class="left">特点：</span>
        <span class="right">
          <el-checkbox v-model="checked" label="聪明"></el-checkbox>
          <el-checkbox v-model="checked" label="粘人"></el-checkbox>
          <el-checkbox v-model="checked" label="不掉毛"></el-checkbox>
          <el-checkbox v-model="checked" label="不爱叫"></el-checkbox>
          <el-checkbox v-model="checked" label="友善"></el-checkbox>
          <el-checkbox v-model="checked" label="会看家"></el-checkbox>
          <el-checkbox v-model="checked" label="耐热"></el-checkbox>
          <el-checkbox v-model="checked" label="易训"></el-checkbox>
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
      input: '',
      firstClassify: '',
      firstClassifyList: [
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
      checked: false,
    }
  },
  methods:{
    selectAccountRole(data){
      console.log(data)
    },
    quit(){
      this.$emit('on-quit');
    },
    uploadSmallImage(data){},
    confirmAdd(){
      let params = {
        "characteristic": "1,2,3",
        "features": "1,2,3",
        "id": 0,
        "name": "狗狗",
        "pid": 0,
        "shapeId": 1,
        "thumbnail": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2259376396,2250852130&fm=27&gp=0.jpg"
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

    },
  },
  created(){
  },
}
</script>
<style lang="less" scoped>
  .new-or-edit-second-classify{
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
