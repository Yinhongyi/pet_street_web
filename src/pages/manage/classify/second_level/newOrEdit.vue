<template>
  <div class="new-or-edit-second-classify" v-loading="loading">
    <div class="title-line">{{config&&config.id?'更改':'新增'}}二级分类</div>
    <div class="container">
      <div class="item">
        <span class="left">一级分类：</span>
        <span class="right">
          <el-select v-model="pid" placeholder="请选择" @change="selectPetClassify($event)">
            <el-option
              v-for="item in firstClassifyList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </span>
      </div>
      <div class="item">
        <span class="left">二级分类：</span>
        <span class="right">
          <el-input v-model="secondClassifyName" placeholder="请输入需要添加的二级分类名称"></el-input>
        </span>
      </div>
      <div class="item">
        <span class="left">是否热门：</span>
        <span class="right">
          <el-checkbox label="热门" v-model="hot"></el-checkbox>
        </span>
      </div>
      <div class="item">
        <span class="left">缩略图：</span>
        <span class="right">
          <pet-upload :imgUrl="imageUrl" @on-success="uploadSmallImage"></pet-upload>
        </span>
      </div>
      <div class="item">
        <span class="left">体型：</span>
        <span class="right">
          <el-select v-model="petShape" placeholder="请选择" @change="selectPetShape($event)">
            <el-option
              v-for="item in shapesList"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue">
            </el-option>
          </el-select>
        </span>
      </div>
      <div class="item">
        <span class="left">功能：</span>
        <span class="right">
          <el-checkbox v-for="(item,index) in featureList" :key="index" :label="item.dictLabel" v-model="item.isChecked" @change="checkFeature($event,item)"></el-checkbox>
        </span>
      </div>
      <div class="item">
        <span class="left">特点：</span>
        <span class="right">
          <el-checkbox v-for="(item,index) in characteristicList" :key="index" :label="item.dictLabel" v-model="item.isChecked" @change="checkCharacteristic($event,item)"></el-checkbox>
        </span>
      </div>

      <div class="footer">
        <el-button type="danger" @click="confirm">确认{{config&&config.id?'更改':'添加'}}</el-button>
        <el-button type="info" @click="quit">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
/*eslint-disable*/
import _cloneDeep from 'loadsh/cloneDeep'
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
      pid: '',
      secondClassifyName: '',
      imageUrl: '',
      petShape: '',
      petFeature: '',
      petCharacteristic: '',
      firstClassifyList: [],
      featureList: [],
      characteristicList: [],
      shapesList: [],
      selectedFeatureList: [],
      selectedCharacteristicList: [],
      hot: false,
      loading: false,
    }
  },
  methods:{
    getFirstClassifyList(){
      this.$http.get('api/mgmt/public/classific/query?level=1&pid=0&status=0').then((res)=>{
        if(res.code === 1000){
          this.firstClassifyList = res.data;
        }else{
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    selectPetClassify(data){
      // console.log(data)
    },
    selectPetShape(data){
      // console.log(data)
    },
    checkFeature(isChecked,item){
      isChecked ? this.selectedFeatureList.push(item.dictValue)
        : this.selectedFeatureList.splice(this.selectedFeatureList.findIndex(i => i === item.dictValue), 1);
    },
    checkCharacteristic(isChecked,item){
      isChecked ? this.selectedCharacteristicList.push(item.dictValue)
        : this.selectedCharacteristicList.splice(this.selectedCharacteristicList.findIndex(i => i=== item.dictValue), 1);
    },
    quit(){
      this.pid = '';
      this.secondClassifyName = '';
      this.imageUrl =  '';
      this.petShape = '';
      this.petFeature = '';
      this.petCharacteristic =  '';
      this.firstClassifyList = [];
      this.featureList = [];
      this.characteristicList = [];
      this.shapesList = [];

      this.$emit('on-quit');
    },
    uploadSmallImage(data){
      this.imageUrl = data.imageSmallUrl
    },
    confirm(){
      // checkValid
      if(!this.pid){
        this.$message({
          message: '请选择一级分类',
          type: 'error'
        })
        return
      }
      if(!this.secondClassifyName){
        this.$message({
          message: '请填写二级分类',
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
      if(!this.petShape){
        this.$message({
          message: '请选择体型',
          type: 'error'
        })
        return
      }
      if(this.featureList.length === 0){
        this.$message({
          message: '请至少选择一种功能',
          type: 'error'
        })
        return
      }
      if(this.selectedCharacteristicList.length === 0){
        this.$message({
          message: '请至少选择一种特点',
          type: 'error'
        })
        return
      }

      this.loading = true;
      if(this.config&&this.config.id){
        this.updateSecondClassify()
      }else{
        this.addSecondClassify()
      }
    },
    addSecondClassify(){
      let params = {
        "characteristic": this.selectedCharacteristicList.join(','),
        "features": this.selectedFeatureList.join(','),
        "hot": this.hot,
        "name": this.secondClassifyName,
        "pid": this.pid,
        "shape": this.petShape,
        "thumbnail": this.imageUrl
      }
      this.$http.post('api/mgmt/platform/classific/save',params).then((res)=>{
        this.loading = false;
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
    updateSecondClassify(){
      let params = {
        "characteristic": this.selectedCharacteristicList.join(','),
        "features": this.selectedFeatureList.join(','),
        "hot": this.hot,
        "id": this.config.id,
        "name": this.secondClassifyName,
        "pid": this.pid,
        "shape": this.petShape,
        "thumbnail": this.imageUrl
      }
      this.$http.put('api/mgmt/platform/classific/update',params).then((res)=>{
        this.loading = false;
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
    getDetailData(id){
      this.loading = true;
      this.$http.get('api/mgmt/public/classific/info/'+ id).then((res)=>{
        this.loading = false;
        if(res.code === 1000){
          this.pid = res.data.pid;
          this.secondClassifyName = res.data.name;
          this.hot = res.data.hot;
          this.imageUrl = res.data.thumbnail;
          this.petShape = res.data.shape;
          this.initCheckedFeature(res.data.features);
          this.initCheckedCharacteristic(res.data.characteristic);
        }else{
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    initCheckedFeature(data){
      let featureList = data && data.split(',');
      this.featureList.forEach((item,index)=>{
        this.$set(item, 'isChecked', false)
        item.isChecked = featureList.indexOf(item.dictValue) > -1;
      })
    },
    initCheckedCharacteristic(data){
      let characteristicList = data && data.split(',')
      this.characteristicList.forEach((item,index)=>{
        this.$set(item, 'isChecked', false)
        item.isChecked = characteristicList.indexOf(item.dictValue) > -1;
      })
    },
  },
  created(){
    this.featureList = _cloneDeep(this.$store.state.featureList);
    this.characteristicList = _cloneDeep(this.$store.state.characteristicList);
    this.shapesList = _cloneDeep(this.$store.state.shapesList);

    this.featureList.forEach((item) => {this.$set(item, 'isChecked', false)});
    this.characteristicList.forEach((item) => {this.$set(item, 'isChecked', false)});
    this.shapesList.forEach((item) => {this.$set(item, 'isChecked', false)});

    this.getFirstClassifyList();
    if(this.config&&this.config.id){
      this.getDetailData(this.config.id)
    }
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
        min-height: 36px;
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
