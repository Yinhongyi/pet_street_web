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

          <span>add icon</span>
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

          <span>add icon</span>
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
        <el-button type="primary" plain>下架</el-button>
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
  },
  created(){
    let params = {
      "channelId": "string",
      "channelType": "iOS001",
      "deviceModel": "iPhone 5s / 小米4A",
      "deviceToken": "string",
      "deviceType": "iPhone",
      "idfa": "string",
      "imei": "string",
      "latitude": "39.961405",
      "longitude": "116.400819",
      "mobile": "string",
      "sysVersion": "iOS 8.0",
      "version": "1.0.0"
    };
    this.$http.post('api/v2/msg/send/smscode', params).then((res)=>{
      console.log(res)
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
