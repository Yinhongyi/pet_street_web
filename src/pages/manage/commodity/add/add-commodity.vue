<template>
  <div class="add-commodity" v-loading="loading">
    <!--<y-tab class="tab" :tabList="tabList" @change="changeTab($event)"></y-tab>-->
    <div class="title-line">{{commodityId ? '更新' : '新增'}}商品信息</div>
    <div class="container">
      <!--选择种类-->
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
        <el-select v-model="commodityData.classificId" placeholder="请选择" @change="selectSecondClassify($event)">
          <el-option
            v-for="item in secondClassifyList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <!--性别-->
      <div class="item-line">
        <span class="item-title">性别：</span>
        <el-radio-group v-model="commodityData.petSex">
          <el-radio :label="'01'">男</el-radio>
          <el-radio :label="'02'">女</el-radio>
        </el-radio-group>
      </div>
      <!--年龄-->
      <div class="item-line">
        <span class="item-title">年龄：</span>
        <el-date-picker
          v-model="commodityData.petBirthday"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <!--品级-->
      <div class="item-line">
        <span class="item-title">品级：</span>
        <el-select v-model="commodityData.petGrade" placeholder="请选择">
          <el-option
            v-for="item in petGradeList"
            :key="item.dictValue"
            :label="item.dictLabel"
            :value="item.dictValue">
          </el-option>
        </el-select>
      </div>
      <!--配送-->
      <div class="item-line">
        <span class="item-title">配送：</span>
        <div class="input-box" v-for="(item,index) in commodityData.delivery" :key="index">
          <span>{{getDeliveryLabel(item.deliveryType)}}：</span>
          <el-input v-model="item.deliveryPrice" placeholder="请输入价格"></el-input>
        </div>
      </div>
      <!--资质保障-->
      <div class="item-line">
        <span class="item-title">资质保障：</span>
        <el-checkbox border
                     v-for="(item,index) in guaranteeList" :key="index"
                     v-model="item.isChecked"
                     :label="item.dictLabel"
                     :disabled="false"
                     @change="changeGuarantee">
        </el-checkbox>
      </div>
      <!--价格-->
      <div class="item-line">
        <span class="item-title">商品价格：</span>
        <div class="input-box">
          <el-input v-model="commodityData.prodPrice" placeholder="请输入商品价格"></el-input>
        </div>
        <div class="input-box">
          <span>打折：</span>
          <el-input v-model="commodityData.discountPrice" placeholder="请输入打折后价格"></el-input>
        </div>
        <span class="tips">如该商品不打折，则不需要填写打折后价格</span>
      </div>
      <!--疫苗-->
      <div class="item-line auto-height">
        <span class="item-title">疫苗：</span>
        <div class="list">
          <div class="line" v-for="(item,index) in commodityData.expParasite" :key="index">
            <el-select v-model="item.ventionOrder" placeholder="请选择">
              <el-option
                v-for="item in vaccinesOrderList"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue">
              </el-option>
            </el-select>

            <el-date-picker
              v-model="item.ventionDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>

            <el-input v-model="item.ventionModel" placeholder="请输入疫苗品牌"></el-input>

            <span>
            <i class="iconfont icon-plus-circle" @click="addExpParasite(commodityData.expParasite)"></i>
            <i v-if="index > 0" class="iconfont icon-minus-circle" @click="reduceExpParasite(index,commodityData.expParasite)"></i>
          </span>
          </div>
        </div>
      </div>
      <!--驱虫-->
      <div class="item-line auto-height">
        <span class="item-title">驱虫：</span>
        <div class="list">
          <div class="line" v-for="(item,index) in commodityData.vaccines" :key="index">
            <el-select v-model="item.ventionOrder" placeholder="请选择">
              <el-option
                v-for="item in expParasiteOrderList"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue">
              </el-option>
            </el-select>

            <el-date-picker
              v-model="item.ventionDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>

            <el-input v-model="item.ventionModel" placeholder="请输入驱虫药品牌"></el-input>

            <span>
              <i class="iconfont icon-plus-circle" @click="addExpParasite(commodityData.vaccines)"></i>
              <i v-if="index > 0" class="iconfont icon-minus-circle" @click="reduceExpParasite(index,commodityData.vaccines)"></i>
            </span>
          </div>
        </div>
      </div>
      <!--商品详情-->
      <div class="item-line">
        <span class="item-title">商品详情：</span>
      </div>
      <div class="editor-container">
        <el-input
          type="textarea"
          autosize
          placeholder="请输入内容"
          v-model="commodityData.prodDesc">
        </el-input>
        <!--<ueditor ref="ueditor" :config="editorConfig" @on-change="ueditorChange($event)"></ueditor>-->
      </div>
      <!--缩略图-->
      <div class="item-line">
        <span class="item-title">缩略图：</span>
      </div>
      <div class="editor-container">
        <pet-upload :imgUrl="commodityData.thumbnailUrl" @on-success="uploadSmallImage"></pet-upload>
      </div>
      <!--轮播图-->
      <div class="item-line">
        <span class="item-title" style="overflow: visible">轮播顶图/视频：</span>
      </div>
      <div class="editor-container">
        <!--<pet-upload v-for="(item,index) in swiperImgList" :key="index" @on-success="uploadSwiperImage($event,item)"></pet-upload>-->
        <pet-upload :imgUrl="commodityData.topDrawUrl" @on-success="uploadSwiperImage($event,item)"></pet-upload>
      </div>
      <!--状态-->
      <div class="item-line" v-if="config&&config.id">
        <span class="item-title">状态切换：</span>
        <button class="btn down-btn" :class="{'selected': isSelectedDownBtn}" @click="downCommodity">下架</button>
        <span class="tips">因特殊情况需手动下架商品，请谨慎操作</span>
      </div>
      <!--按钮-->
      <div class="footer">
        <el-button type="danger" @click="preview">预览</el-button>
        <el-button type="danger" @click="audit">提交审核</el-button>
        <el-button type="info" @click="quit">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
/*eslint-disable*/
import _cloneDeep from 'loadsh/cloneDeep'

const token = localStorage.getItem('P_S_TOKEN_KEY');

export default {
  props:{
    config: {
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
      commodityData: {
        "classificId": '',  //二级分类id
        "delivery": [
          // {
          //   deliveryType: '',
          //   deliveryPrice: ''
          // }
        ],  //配送信息
        "discountPrice": '',  //打折商品金额
        "expParasite": [
          {
            ventionDate: '',
            ventionModel: '',
            ventionOrder: '',
          }
        ],  //驱虫信息
        "guarantee": "", //资质保障
        "id": '',
        "imageUrl": "",
        "petBirthday": "",  //宠物生日
        "petGrade": "", //宠物品级
        "petSex": "", //宠物性别
        "prodDesc": "", //商品描述
        "prodPrice": '',  //商品价格
        "thumbnailUrl": "", //缩略图
        "topDrawUrl": "", //轮播顶图/视频地址
        "vaccines": [
          {
            ventionDate: '',
            ventionModel: '',
            ventionOrder: '',
          }
        ],  //防疫信息
      },
      firstClassify: '',
      firstClassifyList: [],
      secondClassify: '',
      secondClassifyList: [],
      petGradeList: [],
      petBirthday: '',
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
      deliveryTypeList: [],
      guaranteeList: [],
      vaccinesOrderList: [],
      expParasiteOrderList: [],
      commodityId: '',
    }
  },
  methods:{
    //tab变化
    changeTab(index){
      console.log(index)
    },
    //选择一级分类
    selectFirstClassify(id){
      this.getSecondClassifyList(id)
    },
    //选择二级分类
    selectSecondClassify(id){
      console.log(id)
    },
    //获取一级分类
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
    //获取二级分类
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
    //设置配送方式
    setCommodityDelivery(){
      this.commodityData.delivery = [];
      this.deliveryTypeList.forEach((item,index)=>{
        this.commodityData.delivery.push({
          deliveryPrice: '',
          deliveryType: item.dictValue
        })
      })
    },
    //获取配送方式名称
    getDeliveryLabel(type){
      let delivery = this.deliveryTypeList.find((item)=>{ return item.dictValue === type });
      return delivery&&delivery.dictLabel;
    },
    //设置资质保障
    setCommodityGuarantee(){
      this.guaranteeList.forEach((item,index)=>{
        this.$set(item, 'isChecked', false)
      })
    },
    //改变资质保障实时设置接口所需参数格式
    changeGuarantee(){
      let guaranteeList = [];
      this.guaranteeList.forEach((item,index)=>{
        item.isChecked ? guaranteeList.push(item.dictValue) : '';
      })
      this.commodityData.guarantee = guaranteeList.join(',');
    },
    //添加驱虫疫苗记录
    addExpParasite(list){
      list.push({
        ventionDate: '',
        ventionModel: '',
        ventionOrder: '',
      })
    },
    //减少驱虫疫苗记录
    reduceExpParasite(index,list){
      list.splice(index,1);
    },
    ueditorChange(data){
      console.log('ueditor content: ',data)
    },
    uploadSmallImage(data){
      this.commodityData.thumbnailUrl = data.imageSmallUrl
    },
    uploadSwiperImage(data,item){
      this.commodityData.topDrawUrl = data.imageSmallUrl;
      // item.imgUrl = data.imageSmallUrl;
      // this.swiperImgList.length < 5 ? this.swiperImgList.push({imgUrl:''}) : '';
    },
    //预览
    preview(){},
    //审核
    audit(){
      // todo  check
      let params = _cloneDeep(this.commodityData);

      this.commodityId ? this.updateCommodity(params) : this.addCommodity(params);
      this.loading = true;
    },
    //新增商品
    addCommodity(params){
      this.$http.post('api/mgmt/mall/prod/save', params).then((res)=>{
        this.loading = false;
        if(res.code === 1000){
          this.$message({
            message: '新增成功',
            type: 'success'
          })

          this.quit();
        }
      })
    },
    //更新商品
    updateCommodity(params){
      this.$http.put('api/mgmt/mall/prod/save', params).then((res)=>{
        this.loading = false;
        if(res.code === 1000){
          this.$message({
            message: '更新成功',
            type: 'success'
          })

          this.quit();
        }
      })
    },
    //上下架
    downCommodity(){
      let params = {
        ids: this.config.id,
        isUpper: !this.isSelectedDownBtn
      }
      //当前是上架状态，点击下架
      this.$http.post('api/mgmt/mall/prod/handle',params).then((res)=>{
        if(res.code === 1000){
          this.$message({
            message: this.isSelectedDownBtn ? '下' : '上' + '架成功',
            type: 'success'
          })
          this.isSelectedDownBtn = !this.isSelectedDownBtn;
        }
      })
    },
    //获取商品详情
    getCommodityDetail(){
      this.loading = true;
      this.$http.get('api/mgmt/mall/prod/view/'+this.commodityId).then((res)=>{
        this.loading = false;
        if(res.code === 1000){
          this.commodityData = res.data;
        }
      })
    },
    //退出此页面
    quit(){
      this.$router.push({path: '/manage/commodity/online'})
    },
  },
  created(){
    this.getFirstClassifyList();
    //宠物品级
    this.petGradeList = _cloneDeep(this.$store.state.gradeList)
    //配送方式
    this.deliveryTypeList = _cloneDeep(this.$store.state.deliveryTypeList);
    this.setCommodityDelivery();
    //资质保障
    this.guaranteeList = _cloneDeep(this.$store.state.guaranteeList);
    this.setCommodityGuarantee();
    //驱虫、疫苗
    this.vaccinesOrderList = _cloneDeep(this.$store.state.vaccinesOrderList);
    this.expParasiteOrderList = _cloneDeep(this.$store.state.expParasiteOrderList);

    //如果url参数有id，则请求查看商品详情接口获取详情
    this.commodityId = this.$route.query&&this.$route.query.id;
    this.commodityId ? this.getCommodityDetail() : '';
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
      height: ~'calc(100% - 64px)';
      .item-line{
        margin-bottom: 10px;
        height: 40px;
        white-space: nowrap;
        position: relative;
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
