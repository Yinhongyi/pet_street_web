<template>
  <div class="classify-second">
    <!--<div class="title-line">搜索条件</div>-->
    <div class="new-second-classify">
      <!--<el-input v-model="input" placeholder="请输入商品编号"></el-input>-->
      <el-button type="danger" @click="isShowNewSecondClassify = true">新增二级分类</el-button>

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
          <th>序号</th>
          <th>缩略图</th>
          <th>二级分类</th>
          <th>体型</th>
          <th>功能</th>
          <th>特点</th>
          <th>创建时间</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td style="width: 8%">1</td>
          <td style="width: 12%">图片</td>
          <td style="width: 10%">比熊</td>
          <td style="width: 10%">小型</td>
          <td style="width: 10%">家庭犬</td>
          <td style="width: 20%">聪明/粘人/不掉毛/不爱叫</td>
          <td style="width: 10%">2019-03-12</td>
          <td style="width: 20%">
            <div class="color-green cursor_pointer" @click="edit()">修改</div>
            <div class="color-red cursor_pointer" @click="del()">删除</div>
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

    <new-or-edit v-if="isShowNewSecondClassify" :config="classifyData" @on-quit="isShowNewSecondClassify = false"></new-or-edit>
  </div>
</template>
<script>
/*eslint-disable*/
import newOrEdit from './newOrEdit'
export default {
  props:{},
  components: {newOrEdit},
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
      isShowNewSecondClassify: false,
      classifyData: {},
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
    del(){},
  },
  created(){
    this.getCommodityList();
  },
}
</script>
<style lang="less" scoped>
  .classify-second{
    position: relative;
    .title-line{
      padding: 10px;
      background-color: #E0E0E0;
      font-weight: bold;
    }
    .new-second-classify{
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
