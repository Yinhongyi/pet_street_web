<template>
  <div class="online-commodity">
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
    <div class="list-title">
      <span>宠物商品设置</span>
      <span class="add" @click="$router.push({path: '/manage/commodity/add'})">新增</span>
    </div>
    <div class="list-table">
      <table class="table" v-loading="true">
        <thead>
        <tr>
          <th>编号</th>
          <th>商品名称</th>
          <th>缩略图</th>
          <th>性别</th>
          <th>价格</th>
          <th>时间</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td style="width: 10%">1</td>
          <td style="width: 12%">比熊</td>
          <td style="width: 20%">图片</td>
          <td style="width: 10%">男</td>
          <td style="width: 10%">￥1200</td>
          <td style="width: 12%">2019-03-12</td>
          <td style="width: 10%">上架</td>
          <td style="width: 30%">
            <div>上架</div>
            <div>下架</div>
            <div>修改</div>
            <div>预览</div>
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
    }
  },
  methods:{
    //选择过滤状态
    selectFilterStatus(data){

    },
    //获取商品列表
    getCommodityList(){

    },
    //分页器页码改变
    handleSizeChange(data){

    },
    handleCurrentChange(data){

    },
  },
  created(){
    this.getCommodityList();
  },
}
</script>
<style lang="less" scoped>
  .online-commodity{
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
      .pagination{
        float: right;
        margin: 12px;
      }
    }
  }
</style>
