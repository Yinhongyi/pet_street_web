<template>
  <div class="return-commodity">
    <div class="title-line">搜索条件</div>
    <div class="filter-condition">
      <el-input v-model="input" placeholder="请输入商品编号"></el-input>
      <el-button type="danger" @click="filterSearch()">确定</el-button>

<!--
      <el-select v-model="filterStatus" placeholder="请选择" @change="selectFilterStatus($event)">
        <el-option
          v-for="item in statusConditions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
-->
    </div>
    <div class="list-table">
      <table class="table" v-loading="false">
        <thead>
        <tr>
          <th>编号</th>
          <th>商品名称</th>
          <th>缩略图</th>
          <th>性别</th>
          <th>价格</th>
          <th>时间</th>
          <th>状态</th>
          <th>退回原因</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td style="width: 8%">1</td>
          <td style="width: 8%">比熊</td>
          <td style="width: 20%">图片</td>
          <td style="width: 8%">男</td>
          <td style="width: 8%">￥1200</td>
          <td style="width: 10%">2019-03-12</td>
          <td style="width: 8%">上架</td>
          <td style="width: 20%">图文不符</td>
          <td style="width: 10%">
            <div class="color-green cursor_pointer" @click="edit()">修改</div>
            <div class="color-green cursor_pointer" @click="preview()">预览</div>
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
      input: '',
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
    filterSearch(){

    },
    edit(){},
    preview(){},
  },
  created(){
    this.getCommodityList();
  },
}
</script>
<style lang="less" scoped>
  .return-commodity{
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
