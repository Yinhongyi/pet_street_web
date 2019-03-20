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
        <tr>
          <td style="width: 10%">CGTJ1289183923829YSTY</td>
          <td style="width: 12%">秦进辉</td>
          <td style="width: 20%">1828921995</td>
          <td style="width: 10%">上海市普陀区兰溪路XXXXXXXX</td>
          <td style="width: 10%">
            泰迪 x1 ；￥2000
            比熊 x1 ；￥2000
           </td>
          <td style="width: 12%">￥4000</td>
          <td style="width: 10%">￥4000</td>
          <td style="width: 10%">2017-5-12 18:42:44</td>
          <td style="width: 10%">2017-5-12 18:45:10</td>
          <td style="width: 10%">已付款</td>
          <td style="width: 30%">
            <div @click="openDetailDialog()">查看</div>
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
      <div>sdfasdf</div>
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
  }
</style>
