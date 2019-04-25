<template>
  <div class="order-list">
    <div class="title-line">搜索条件</div>
    <div class="filter-condition">
      <el-select v-model="filterStatus" placeholder="请选择" @change="selectFilterStatus($event)">
        <el-option
          v-for="item in statusConditions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="title-line">订单信息</div>

<!--
    <div class="list-title">
      <span>宠物商品设置</span>
      <span class="add" @click="$router.push({path: '/manage/commodity/add'})">新增</span>
    </div>
-->
    <div class="list-table">
      <table class="table" v-loading="false">
        <thead>
        <tr>
          <th>订单编号</th>
          <th>收件人</th>
          <th>联系方式</th>
          <th>收货地址</th>
          <th>商品名称及价格</th>
          <th>合计价格</th>
          <th>实付金额</th>
          <th>建立时间</th>
          <th>付款时间</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in orderList" :key="index">
          <td style="width: 10%">CGTJ1289183923829YSTY</td>
          <td style="width: 6%">秦进辉</td>
          <td style="width: 10%">1828921995</td>
          <td style="width: 10%">上海市普陀区兰溪路XXXXXXXX</td>
          <td style="width: 10%">
            泰迪 x1 ；￥2000
            比熊 x1 ；￥2000
           </td>
          <td style="width: 8%">￥4000</td>
          <td style="width: 8%">￥4000</td>
          <td style="width: 10%">2017-5-12 18:42:44</td>
          <td style="width: 10%">2017-5-12 18:45:10</td>
          <td style="width: 8%">已付款</td>
          <td>
            <div class="cursor_pointer" @click="openDetailDialog(item.id)">查看</div>
          </td>
        </tr>
        </tbody>
      </table>

      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000">
      </el-pagination>
    </div>

    <el-dialog title="订单详情" :visible.sync="dialogDetailShow" v-loading="true">
      <div class="detail-content">
        <div class="item">
          <span class="left">订单号：</span>
          <span class="right">201705271348551547</span>
        </div>
        <div class="item">
          <span class="left">收货人名称：</span>
          <span class="right">靳元海</span>
        </div>
        <div class="item">
          <span class="left">收货人电话：</span>
          <span class="right">18616281761</span>
        </div>
        <div class="item">
          <span class="left">收货地址：</span>
          <span class="right">上海普陀区XXXXXXXX</span>
        </div>
        <div class="item">
          <span class="left">商品名称：</span>
          <span class="right">泰迪</span>
        </div>
        <div class="item">
          <span class="left">数量：</span>
          <span class="right">2</span>
        </div>
        <div class="item">
          <span class="left">邮费：</span>
          <span class="right">300元</span>
        </div>
        <div class="item">
          <span class="left">实际付款金额：</span>
          <span class="right">2300元</span>
        </div>
        <div class="item">
          <span class="left">支付方式：</span>
          <span class="right">微信支付</span>
        </div>
        <div class="item">
          <span class="left">购买人电话：</span>
          <span class="right">XXXXXXXXXXX</span>
        </div>
        <div class="item">
          <span class="left">购买时间：</span>
          <span class="right">2017-05-27 13:48:55</span>
        </div>
        <div class="item">
          <span class="left">支付时间：</span>
          <span class="right">2017-05-27 13:49:00</span>
        </div>
        <div class="item">
          <span class="left">支付信息：</span>
          <span class="right">微信付款凭证： XXXXXXXXXXXXXXXXXXXXXXX</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
/*eslint-disable*/
export default {
  props:{},
  components: {},
  data(){
    return {
      orderList: [],
      filterStatus: '',
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
      beginCreateTime: '',
      endCreateTime: '',
    }
  },
  methods:{
    //选择过滤状态
    selectFilterStatus(data){

    },
    //获取订单列表
    getOrderList(){
      // WAIT_FOR_PAY(待付款),CANCEL,PAYING(已取消),WAIT_FOR_DELIVERY(待发货),DELIVERED(已发货),RECEIVED(已收货),EVALUATED(已评价),FINISH(已完成)
      let params = {
        "beginCreateTime": this.beginCreateTime,
        "endCreateTime": this.endCreateTime,
        "orderNo": "",
        "pageNum": this.currentPage,
        "pageSize": 10,
        "status": [
          // "WAIT_FOR_PAY", "CANCEL", "PAYING", "WAIT_FOR_DELIVERY", "DELIVERED", "RECEIVED", "EVALUATED", "FINISH"
        ]
      };
      this.$http.post('api/mgmt/mall/query', params).then((res)=>{
        if(res.code === 1000){
          console.log(res)
        }
      })
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
  .order-list{
    .title-line{
      padding: 10px;
      background-color: #E0E0E0;
      font-weight: bold;
    }
    .filter-condition{
      padding: 10px;
    }
    .list-title{
      padding: 10px;
      border-bottom: 2px solid #E0E0E0;
      span{
        display: inline-block;
        margin-right: 20px;
      }
      .add{
        color: #E51C23;
        font-weight: bold;
      }
      .add:hover{
        cursor: pointer;
      }
    }
    .list-table{
      overflow: auto;
      .table thead th{
        background-color: white;
        border-bottom: 1px solid #939598;
      }
      .pagination{
        float: right;
        margin: 12px;
      }
    }
    .detail-content{
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
