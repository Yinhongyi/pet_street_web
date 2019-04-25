<template>
  <div class="classify-first">
    <div class="new-first-classify">
      <el-button type="danger" @click="newFirstClassify">新增一级分类</el-button>
      <el-select v-model="filterStatus" placeholder="请选择" @change="getFirstClassifyList()">
        <el-option
          v-for="item in statusConditions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="list-table">
      <table class="table" v-loading="loading">
        <thead>
        <tr>
          <th>序号</th>
          <th>缩略图</th>
          <th>一级分类</th>
          <!--<th>创建时间</th>-->
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in firstClassifyList" :key="index">
          <td style="width: 8%">{{index+1}}</td>
          <td style="width: 20%">
            <img class="img-in-table" :src="item.thumbnail">
          </td>
          <td style="width: 20%">{{item.name}}</td>
          <!--<td style="width: 20%">{{item.createTime}}</td>-->
          <td style="width: 20%">
            <div class="color-green cursor_pointer" @click="edit(item)">修改</div>
            <div class="color-red cursor_pointer" @click="del(item)">删除</div>
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
    <new-or-edit v-if="isShowNewFirstClassify" :config="classifyData" @on-quit="refreshList()"></new-or-edit>
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
      filterStatus: '0',
      statusConditions: [
        {
          value: '0',
          label: '使用中'
        },
        {
          value: '1',
          label: '审核中'
        },
        {
          value: '2',
          label: '停用中'
        },
      ],
      firstClassifyList: [],
      currentPage: 1,
      loading: false,
      isShowNewFirstClassify: false,
      classifyData: {}
    }
  },
  methods:{
    newFirstClassify(){
      this.classifyData = {};
      this.isShowNewFirstClassify = true;
    },
    //获取商品列表
    getFirstClassifyList(){
      this.loading = true;
      this.$http.get('api/mgmt/public/classific/1?status='+this.filterStatus).then((res)=>{
        this.loading = false;
        if(res.code === 1000){
          this.firstClassifyList = res.data;
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
    edit(item){
      this.classifyData = item;
      this.isShowNewFirstClassify = true;
    },
    del(item){
      let params = {
        ids: [item.id]
      }
      this.loading = true;
      // todo
      this.$http.delete('api/mgmt/platform/classific/del',{data: params}).then((res)=>{
        this.loading = false;
        if(res.code === 1000){
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.getFirstClassifyList()
        }else{
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    refreshList(){
      this.isShowNewFirstClassify = false;
      this.getFirstClassifyList();
    },
  },
  created(){
    this.getFirstClassifyList();
  },
}
</script>
<style lang="less" scoped>
  .classify-first{
    position: relative;
    .title-line{
      padding: 10px;
      background-color: #E0E0E0;
      font-weight: bold;
    }
    .new-first-classify{
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
