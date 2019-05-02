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
    <div class="list-table" v-loading="loading">
      <table class="table">
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
        <tr v-for="(item,index) in unauditedList" :key="index" class="cursor_pointer" @click="isShowDetail = true">
          <td style="width: 4%">checkbox</td>
          <td style="width: 8%">{{index+1}}</td>
          <td style="width: 8%">{{item.classificName}}</td>
          <td style="width: 20%">
            <img class="img-in-table" :src="item.thumbnailUrl">
          </td>
          <td style="width: 40%">
            {{item.prodDesc}}
          </td>
          <td style="width: 10%">{{item.createTime}}</td>
          <td style="width: 10%">
            <div class="color-green cursor_pointer" @click.stop="pass()">通过</div>
            <div class="color-red cursor_pointer" @click.stop="back()">退回</div>
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
      loading: false,
      unauditedList: []
    }
  },
  methods:{
    //选择过滤状态
    selectFilterStatus(data){

    },
    //获取未审核列表
    getUnauditedList(){
      let params = {
        pageNum: 1,
        pageSize: 10,
        prodId: ''
      }
      this.loading = true;
      this.$http.post('api/mgmt/platform/prod/query/unaudited', params).then((res)=>{
        this.loading = false;
        if(res.code === 1000){
          this.unauditedList = res.data.rows;
        }else{
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
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
    this.getUnauditedList();
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
      table{
        .img-in-table{
          width: 80px;
          height: 80px;
        }
      }
      .pagination{
        float: right;
        margin: 12px;
      }
    }
  }
</style>
