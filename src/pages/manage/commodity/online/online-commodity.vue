<template>
  <div class="online-commodity">
    <div class="title-line">搜索条件</div>
    <div class="filter-condition">
      <el-input v-model="filterName" placeholder="请输入商品名称"></el-input>

      <el-date-picker
        v-model="filterTime"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期">
      </el-date-picker>

      <el-select v-model="filterStatus" placeholder="请选择" @change="selectFilterStatus($event)">
        <el-option
          v-for="item in statusConditions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-button type="danger" @click="getCommodityList">确定</el-button>

    </div>
    <div class="list-title">
      <span>宠物商品设置</span>
      <span class="add" @click="$router.push({path: '/manage/commodity/add'})">新增</span>
    </div>
    <div class="list-table">
      <table class="table" v-loading="loading">
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
        <tr v-for="(item,index) in commodityList" :key="index">
          <td style="width: 10%">{{index}}</td>
          <td style="width: 12%">{{item.name}}</td>
          <td style="width: 20%">
            <img class="img-in-table" :src="item.thumbnail">
          </td>
          <td style="width: 10%">{{item.petSex}}</td>
          <td style="width: 10%">{{item.prodPrice}}</td>
          <td style="width: 12%">{{item.createTime}}</td>
          <td style="width: 10%">{{item.upperStatus}}</td>
          <td style="width: 30%">
            <div>上架</div>
            <div>下架</div>
            <div @click="$router.push({path: '/manage/commodity/add', query: {id: item.id}})">修改</div>
            <div @click="preview">预览</div>
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
      filterName: '',
      filterTime: '',
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
      commodityList: [],
      loading: false
    }
  },
  methods:{
    //选择过滤状态
    selectFilterStatus(data){

    },
    //获取商品列表
    getCommodityList(){
      let params = {
        "classificName": "string",
        "id": 0,
        "prodStatus": "string",
        "salesTime": "string"
      };
      let type = 'online';
      this.loading = true;
      this.$http.get('api/mgmt/mall/prod/query/'+ type, params).then((res) => {
        this.loading = false;
        if (res.code === 1000) {
          this.commodityList = res.data;
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
    //预览
    preview(){},
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
