<template>
  <div class="add-commodity" v-loading="loading">
    <y-tab class="tab" :tabList="tabList" @change="changeTab($event)"></y-tab>
    <div class="title-line">商品信息</div>
    <div class="container">
      <div class="item-line">
        <span class="item-title">选择种类：</span>
        <el-select v-model="firstClassify" placeholder="请选择" @change="selectFirstClassify($event)">
          <el-option
            v-for="item in firstClassifyList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-select v-model="secondClassify" placeholder="请选择" @change="selectSecondClassify($event)">
          <el-option
            v-for="item in secondClassifyList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
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
        <el-select v-model="petGrade" placeholder="请选择" @change="selectPetClassify($event)">
          <el-option
            v-for="item in petGradeList"
            :key="item.dictValue"
            :label="item.dictLabel"
            :value="item.dictValue">
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
        <pet-upload @on-success="uploadSmallImage"></pet-upload>
      </div>
      <div class="item-line">
        <span class="item-title" style="overflow: visible">轮播顶图/视频：</span>
      </div>
      <div class="editor-container">
        <pet-upload v-for="(item,index) in swiperImgList" :key="index" @on-success="uploadSwiperImage($event,item)"></pet-upload>
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
const token = localStorage.getItem('P_S_TOKEN_KEY');
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
    let _this = this;
    return {
      loading: false,
      tabList: ['商品管理','新增商品'],
      firstClassify: '',
      firstClassifyList: [],
      secondClassify: '',
      secondClassifyList: [],
      petGrade:'',
      petGradeList: _this.$store.state.gradeList,
      petClassify: '',
      petList: [],
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
      },
      headerToken: token,
      uploadingImage: false,
      swiperImgList: [
        {
          imgUrl: ''
        }
      ],
    }
  },
  methods:{
    //tab变化
    changeTab(index){
      console.log(index)
    },
    //选择种类
    selectFirstClassify(id){
      this.getSecondClassifyList(id)
    },
    //具体种类
    selectSecondClassify(classify){
      console.log(classify)
    },

    selectPetClassify(){},

    //选择年龄
    changePetAge(date){
      console.log(date.toJSON().split('T')[0])
      console.log(date.toJSON().split('T')[1].split('.')[0])
      console.log(date)
    },
    ueditorChange(data){
      console.log('ueditor content: ',data)
    },
    uploadSmallImage(data){
      console.log(data);
    },
    uploadSwiperImage(data,item){
      item.imgUrl = data.imageSmallUrl;
      this.swiperImgList.length < 5 ? this.swiperImgList.push({imgUrl:''}) : '';
    },
    getFirstClassifyList(){
      this.$http.get('api/mgmt/public/classific/query?level=1&pid=0&status=0').then((res) => {
        if (res.code === 1000) {
          this.firstClassifyList = res.data;
        }else{
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    getSecondClassifyList(id){
      this.$http.get('api/mgmt/public/classific/query?level=2&pid='+id+'&status=0').then((res) => {
        if (res.code === 1000) {
          this.secondClassifyList = res.data;
        }else{
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })

    },
    getClassifyList(){
      this.loading = true;
      let getFirstClassifyList = new Promise((resolve, reject)=> {
        this.$http.get('api/mgmt/public/classific/1?status=0').then((res) => {
          if (res.code === 1000) {
            this.secondClassifyList = res.data;
          }else{
            this.$message({
              message: res.message,
              type: 'error'
            })
          }
          resolve()
        })
      })
      let getSecondClassifyList = new Promise((resolve, reject)=> {
        this.$http.get('api/mgmt/public/classific/2?status=0').then((res) => {
          if (res.code === 1000) {
            this.secondClassifyList = res.data;
          }else{
            this.$message({
              message: res.message,
              type: 'error'
            })
          }
          resolve()
        })
      })
      Promise.all([getFirstClassifyList,getSecondClassifyList]).then(()=>{
        this.loading = false;
      })
    }
  },
  created(){
    this.getFirstClassifyList()
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
