<template>
  <div class="review-not">
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
          <th>checkbox</th>
          <th>序号</th>
          <th>商品名称</th>
          <th>图片</th>
          <th>描述</th>
          <th>时间</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr class="cursor_pointer" @click="isShowDetail = true">
          <td style="width: 4%">checkbox</td>
          <td style="width: 8%">1</td>
          <td style="width: 8%">比熊</td>
          <td style="width: 20%">图片</td>
          <td style="width: 40%">
            性情开朗、活泼、聪明、勇敢、机警、感情丰富，
            有较强的适应能力。它忠实于主人，但也具有坚强的个性。
            温和而守规矩，敏感、顽皮、且挚爱。愉快的态度是这个品种的特点，
            而且很容易因为小事情而满足。虽然个子小，卷毛比熊犬颇有个性，
            天性活泼、爱好自由。
          </td>
          <td style="width: 10%">2019-03-12</td>
          <td style="width: 10%">
            <div class="color-green cursor_pointer" @click="pass()">通过</div>
            <div class="color-red cursor_pointer" @click="back()">退回</div>
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

    <detail v-if="isShowDetail" :config="detail" @on-cancel="isShowDetail = false"></detail>
  </div>
</template>
<script>
/*eslint-disable*/
import detail from  '../detail/index'
export default {
  props:{},
  components: {detail},
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
      isShowDetail: false,
      detail: {},
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
    pass(){},
    back(){},
  },
  created(){
    this.getCommodityList();
  },
}
</script>
<style lang="less" scoped>
  .review-not{
    position: relative;
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
