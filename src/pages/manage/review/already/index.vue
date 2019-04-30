<template>
  <div class="review-already">
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
          <th>编号</th>
          <th>商品名称</th>
          <th>图片</th>
          <th>描述</th>
          <th>状态</th>
          <th>提现</th>
          <th>时间</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in auditedList" :key="index">
          <td style="width: 8%">{{index+1}}</td>
          <td style="width: 8%">{{item.classificName}}</td>
          <td style="width: 20%">
            <img class="img-in-table" :src="item.thumbnailUrl">
          </td>
          <td style="width: 38%">
            {{item.prodDesc}}
          </td>
          <td style="width: 8%">
            <span>通过</span>
          </td>
          <td style="width: 8%">
            <span>可提现</span>
          </td>
          <td style="width: 12%">{{item.createTime.split(' ')[0]}}<br>{{item.createTime.split(' ')[1]}}</td>
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
      loading: false,
      auditedList: [],
    }
  },
  methods:{
    //选择过滤状态
    selectFilterStatus(data){

    },
    //获取已审核列表
    getAuditedList(){
      let params = {
        pageNum: 1,
        pageSize: 10,
        prodId: ''
      }
      this.loading = true;
      this.$http.post('api/mgmt/platform/prod/query/audited', params).then((res)=>{
        this.loading = false;
        if(res.code === 1000){
          this.auditedList = res.data.rows;
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
    this.getAuditedList();
  },
}
</script>
<style lang="less" scoped>
  .review-already{
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
