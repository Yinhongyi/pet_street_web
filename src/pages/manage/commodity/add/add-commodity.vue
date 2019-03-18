<template>
  <div>
    <y-tab style="background-color: #F0F0F2" :tabList="tabList" @change="changeTab($event)"></y-tab>
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
    }
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
  .title-line{
    width: 96%;
    margin: 0 2%;
    padding: 10px 0;
    border-bottom: 2px solid #E0E0E0;
  }
  .container{
    width: 96%;
    padding-left: 2%;
    padding-top: 20px;
    .item-line{
      margin-bottom: 10px;
      height: 40px;
      .item-title{
        display: inline-block;
        width: 100px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: sub;
      }
    }
  }
</style>
