<template>
  <div class="classify-second">
    <div class="new-second-classify">
      <el-button type="danger" @click="newSecondClassify">新增二级分类</el-button>
      <el-select v-model="filterStatus" placeholder="请选择" @change="getSecondClassifyList()">
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
          <th>二级分类</th>
          <th>体型</th>
          <th>功能</th>
          <th>特点</th>
          <!--<th>创建时间</th>-->
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in secondClassifyList" :key="index">
          <td style="width: 8%">{{index + 1}}</td>
          <td style="width: 12%">
            <img class="img-in-table" :src="item.thumbnail">
          </td>
          <td style="width: 10%">{{item.name}}</td>
          <td style="width: 10%">{{item.shapeName}}</td>
          <td style="width: 10%">{{item.featuresNames}}</td>
          <td style="width: 20%">{{item.characteristicNames}}</td>
          <!--<td style="width: 10%">{{item.createTime}}</td>-->
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

    <new-or-edit v-if="isShowNewSecondClassify" :config="classifyData"  @on-quit="refreshList()"></new-or-edit>
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
      secondClassifyList: [],
      loading: false,
      currentPage: 1,
      isShowNewSecondClassify: false,
      classifyData: {},
    }
  },
  methods:{
    newSecondClassify(){
      this.isShowNewSecondClassify = true;
      this.classifyData = {};
    },
    //获取商品列表
    getSecondClassifyList(){
      this.loading = true;
      this.$http.get('api/mgmt/public/classific/query?level=2&status='+this.filterStatus).then((res)=>{
        this.loading = false;
        if(res.code === 1000){
          this.secondClassifyList = res.data
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
      this.isShowNewSecondClassify = true;
    },
    del(item){
      let params = {
        ids: [item.id]
      }
      this.loading = true;

      this.$http.delete('api/mgmt/platform/classific/del',{data:params}).then((res)=>{
        this.loading = false;
        if(res.code === 1000){
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.getSecondClassifyList()
        }else{
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    refreshList(){
      this.isShowNewSecondClassify = false;
      this.getSecondClassifyList();
    },
  },
  created(){
    this.getSecondClassifyList();
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
