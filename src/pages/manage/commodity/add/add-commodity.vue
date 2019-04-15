<template>
  <div class="add-commodity">
    <y-tab class="tab" :tabList="tabList" @change="changeTab($event)"></y-tab>
    <div class="title-line">商品信息</div>
    <div class="container">
      <div class="item-line">
        <span class="item-title">选择种类：</span>
        <el-select v-model="petClassify" placeholder="请选择" @change="selectPetClassify($event)">
          <el-option
            v-for="item in petList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="classifyDetail" placeholder="请选择" @change="selectClassifyDetail($event)">
          <el-option
            v-for="item in detailList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="item-line">
        <span class="item-title">性别：</span>
        <el-radio-group v-model="petSex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </div>
      <div class="item-line">
        <span class="item-title">年龄：</span>
        <el-date-picker
          v-model="petAge"
          type="date"
          placeholder="选择日期" @change="changePetAge($event)">
        </el-date-picker>
      </div>
      <div class="item-line">
        <span class="item-title">品级：</span>
        <el-select v-model="petClassify" placeholder="请选择" @change="selectPetClassify($event)">
          <el-option
            v-for="item in petList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="item-line">
        <span class="item-title">配送：</span>
        <div class="input-box">
          <span>自提：</span>
          <el-input v-model="input" placeholder="请输入价格"></el-input>
        </div>
        <div class="input-box">
          <span>汽运：</span>
          <el-input v-model="input" placeholder="请输入价格"></el-input>
        </div>
        <div class="input-box">
          <span>空运：</span>
          <el-input v-model="input" placeholder="请输入价格"></el-input>
        </div>
      </div>
      <div class="item-line">
        <span class="item-title">资质保障：</span>
        <el-checkbox v-model="checked" label="官方自营" border></el-checkbox>
        <el-checkbox v-model="checked" label="100%实拍" border></el-checkbox>
        <el-checkbox v-model="checked" label="先行赔付" border disabled></el-checkbox>
      </div>
      <div class="item-line">
        <span class="item-title">商品价格：</span>
        <div class="input-box">
          <el-input v-model="input" placeholder="请输入商品价格"></el-input>
        </div>
        <div class="input-box">
          <span>打折：</span>
          <el-input v-model="input" placeholder="请输入打折后价格"></el-input>
        </div>
        <span class="tips">如该商品不打折，则不需要填写打折后价格</span>
      </div>
      <div class="item-line">
        <span class="item-title">疫苗：</span>
        <div class="list">
          <el-select v-model="petClassify" placeholder="请选择" @change="selectPetClassify($event)">
            <el-option
              v-for="item in petList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          <el-date-picker
            v-model="petAge"
            type="date"
            placeholder="选择日期" @change="changePetAge($event)">
          </el-date-picker>

          <el-input v-model="input" placeholder="请输入疫苗品牌"></el-input>

          <span><i class="iconfont icon-plus-circle"></i></span>
        </div>
      </div>
      <div class="item-line">
        <span class="item-title">驱虫：</span>
        <div class="list">
          <el-select v-model="petClassify" placeholder="请选择" @change="selectPetClassify($event)">
            <el-option
              v-for="item in petList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          <el-date-picker
            v-model="petAge"
            type="date"
            placeholder="选择日期" @change="changePetAge($event)">
          </el-date-picker>

          <el-input v-model="input" placeholder="请输入驱虫药品牌"></el-input>

          <span><i class="iconfont icon-plus-circle"></i></span>
        </div>
      </div>
      <div class="item-line">
        <span class="item-title">商品详情：</span>
      </div>
      <div class="editor-container">
        <el-input
          type="textarea"
          autosize
          placeholder="请输入内容"
          v-model="input">
        </el-input>
        <!--<ueditor ref="ueditor" :config="editorConfig" @on-change="ueditorChange($event)"></ueditor>-->
      </div>
      <div class="item-line">
        <span class="item-title">缩略图：</span>
      </div>
      <div class="editor-container">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="item-line">
        <span class="item-title" style="overflow: visible">轮播顶图/视频：</span>
      </div>
      <div class="editor-container">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="item-line">
        <span class="item-title">状态切换：</span>
        <button class="btn down-btn" :class="{'selected': isSelectedDownBtn}" @click="isSelectedDownBtn = !isSelectedDownBtn">下架</button>
        <span class="tips">因特殊情况需手动下架商品，请谨慎操作</span>
      </div>
      <div class="footer">
        <el-button type="danger">预览</el-button>
        <el-button type="danger">提交审核</el-button>
        <el-button type="info">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
/*eslint-disable*/
export default {
  props:{
    commodityData: {
      type: Object,
      default: function (){
        return {}
      }
    }
  },
  components: {},
  data(){
    return {
      tabList: ['商品管理','新增商品'],
      petList: [
        {
          value: '1',
          label: '狗狗'
        },
        {
          value: '2',
          label: '猫猫'
        }
      ],
      petClassify: '',
      detailList: [
        {
          value: '1',
          label: '金毛'
        },
        {
          value: '2',
          label: '哈士奇'
        }
      ],
      classifyDetail: '',
      petSex: 1,
      petAge: '',
      input: '',
      checked: true,
      imageUrl: '',
      isSelectedDownBtn: false,
      editorConfig: {
          toolbars: [
            ['fullscreen', 'source','|', 'undo', 'redo','|','bold', 'italic', 'underline', 'fontborder', 'strikethrough',
              '|','superscript','subscript','|', 'forecolor', 'backcolor','|', 'removeformat','|', 'insertorderedlist', 'insertunorderedlist',
              '|','selectall', 'cleardoc','fontfamily','fontsize','justifyleft','justifyright','justifycenter','justifyjustify','|',
              'link','unlink']
          ],
        autoHeightEnabled: false,
        initialContent:'',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
        initialFrameWidth: null,
        initialFrameHeight: 450,
      }
    }
  },
  methods:{
    //tab变化
    changeTab(index){
      console.log(index)
    },
    //选择种类
    selectPetClassify(pet){
      console.log(pet)
    },
    //具体种类
    selectClassifyDetail(classify){
      console.log(classify)
    },
    //选择年龄
    changePetAge(date){
      console.log(date.toJSON().split('T')[0])
      console.log(date.toJSON().split('T')[1].split('.')[0])
      console.log(date)
    },
    //上传组件:上传成功
    handleAvatarSuccess(data){
      console.log(data)
    },
    //上传组件:上传之前,使用此方法限制用户上传的图片格式和大小
    beforeAvatarUpload(data){
      console.log(data)
    },
    ueditorChange(data){
      console.log('ueditor content: ',data)
    }
  },
  created(){
    this.$http.get('api/mgmt/public/features?featureType='+1+'&status='+1).then((res)=>{
      if(res.code === 1000){
        console.log('features:'+res.data)
      }
    })
    this.$http.get('api/mgmt/public/shapes?status=1').then((res)=>{
      if(res.code === 1000){
        console.log('shapes:'+res.data)
      }
    })
    let params = {
      "characteristic": "1,2,3",
      "features": "1,2,3",
      "name": "狗狗",
      "pid": 0,
      "shapeId": 1,
      "thumbnail": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2259376396,2250852130&fm=27&gp=0.jpg"
    };
    this.$http.post('api/mgmt//platform/classific/save', params).then((res)=>{
      if(res.code === 1000){
        console.log('classific:'+res.data)
      }
    })
  },
}
</script>
<style lang="less" scoped>
  .add-commodity{
    .tab{
      height: 44px;
      background-color: #F0F0F2
    }
    .title-line{
      width: 96%;
      height: 22px;
      margin: 0 2%;
      padding: 10px 0;
      border-bottom: 2px solid #E0E0E0;
    }
    .container{
      width: 98%;
      padding-left: 2%;
      padding-top: 20px;
      overflow: auto;
      height: ~'calc(100% - 110px)';
      .item-line{
        margin-bottom: 10px;
        height: 40px;
        white-space: nowrap;
        .item-title{
          display: inline-block;
          width: 100px;
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
