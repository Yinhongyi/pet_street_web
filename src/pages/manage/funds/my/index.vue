<template>
  <div class="my-funds">
    <div class="title-line">我的资金</div>
    <div class="content">
      <div class="item">
        <span class="left">可提现金额：</span>
        <span class="right"><span class="color-red">6888</span>元</span>
      </div>
      <div class="item">
        <span class="left">锁定期金额：</span>
        <span class="right"><span class="color-red">1200</span>元</span>
      </div>
      <div class="item">
        <el-input v-model="input" placeholder="请输入提现金额"></el-input>
        <el-button type="danger">提现</el-button>
      </div>
      <div class="item">
        <span>每月有2次免费提现金额，超过2次每笔收取5元手续费。</span>
      </div>
    </div>
  </div>
</template>
<script>
/*eslint-disable*/
export default {
  props:{},
  components: {},
  data(){
    return {
      input: '',
      statusConditions: [
        {
          value: 0,
          label: '全部'
        },
        {
          value: 1,
          label: '未售出'
        },
        {
          value: 2,
          label: '已售出'
        },
        {
          value: 3,
          label: '交易中'
        },
        {
          value: 4,
          label: '退回'
        },
      ],
      currentPage: 1,
      dialogDetailShow: false,
      currentDetail: '',
    }
  },
  methods:{
    //选择过滤状态
    selectFilterStatus(data){

    },
    //获取订单列表
    getOrderList(){

    },
    //分页器页码改变
    handleSizeChange(data){

    },
    handleCurrentChange(data){

    },
    //
    openDetailDialog(id){
      this.dialogDetailShow = true;
      this.currentDetail = id;
    }
  },
  created(){
    this.getOrderList();
  },
}
</script>
<style lang="less" scoped>
  .my-funds{
    .title-line{
      width: 96%;
      height: 22px;
      margin: 0 2%;
      padding: 10px 0;
      border-bottom: 2px solid #E0E0E0;
    }
    .content{
      padding: 20px 46px;
      .item{
        margin-bottom: 10px;
        span{
          display: inline-block;
        }
        .left{
          width: 100px;
          margin-right: 10px;
          word-break: break-all;
          white-space: normal;
          vertical-align: top;
        }
        .right{
          width: ~'calc(100% - 110px)';
          word-break: break-all;
          white-space: normal;
          vertical-align: top;
        }
      }
    }
  }
</style>
