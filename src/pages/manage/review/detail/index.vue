<template>
  <div class="pet-detail">
    <div class="title-line">审核详情</div>
    <div class="container">
      <div class="item">
        <span class="left">编号：</span>
        <span class="right">12266556565656566556</span>
      </div>
      <div class="item">
        <span class="left">名称：</span>
        <span class="right">比熊</span>
      </div>
      <div class="item">
        <span class="left">商品描述：</span>
        <span class="right">
          性情开朗、活泼、聪明、勇敢、机警、感情丰富，有较强的适应能力。
          它忠实于主人，但也具有坚强的个性。温和而守规矩，敏感、顽皮、且挚爱。
          愉快的态度是这个品种的特点，而且很容易因为小事情而满足。
          虽然个子小，卷毛比熊犬颇有个性，天性活泼、爱好自由。
        </span>
      </div>
      <div class="item">
        <span class="left">缩略图/视频：</span>
        <span class="right">
        </span>
      </div>
      <div class="item">
        <span class="left">申请时间：</span>
        <span class="right">2019-03-12</span>
      </div>

      <div class="footer">
        <el-button type="danger">通过</el-button>
        <el-button type="info" @click="cancel()">退回</el-button>
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
      accountRole: '',
      accountRoleList: [
        {
          value: '1',
          label: '金毛'
        },
        {
          value: '2',
          label: '哈士奇'
        }

      ],
    }
  },
  methods:{
    selectAccountRole(data){
      console.log(data)
    },
    cancel(){
      this.$emit('on-cancel');
    }
  },
  created(){
  },
}
</script>
<style lang="less" scoped>
  .pet-detail{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: white;
    .title-line{
      padding: 10px;
      background-color: #E0E0E0;
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
