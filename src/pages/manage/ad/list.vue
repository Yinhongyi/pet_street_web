<template>
  <div class="ad-manage" v-loading="loadAdList">
    <div class="new-ad">
      <el-button type="danger" @click="addAd">新增广告</el-button>
    </div>
    <div class="list-table">
      <table class="table">
        <thead>
        <tr>
          <th>序号</th>
          <th>缩略图</th>
          <th>目录</th>
          <th>URL</th>
          <th>描述</th>
          <th>创建时间</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in adList" :key="index">
          <td style="width: 8%">1</td>
          <td style="width: 12%">图片</td>
          <td style="width: 10%">APP首页</td>
          <td style="width: 20%">/uploads3/post_images/0/3677/_____-__1.png</td>
          <td style="width: 20%">2019春节促销</td>
          <td style="width: 10%">2019-03-12</td>
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
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <!--<div style="margin: 100px;font-size: 40px;">敬请期待...</div>-->
    <new-or-edit v-if="isShowNewAd" :config="adData" @on-cancel="closeModifyAd"></new-or-edit>

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
      adList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      isShowNewAd: false,
      adData: {},
      loadAdList: false,
    }
  },
  methods:{
    //选择过滤状态
    selectFilterStatus(data){

    },
    //获取广告列表
    getAdList(){
      let params = {
        page: this.currentPage,
        pageSize: this.pageSize
      }
      this.loadAdList = true;
      this.$http.post('api/mgmt/platform/advert/query', params).then((res) => {
        this.loadAdList = false;
        if (res.code === 1000) {
          this.total = res.data&&res.data.total || 0;
          this.adList = res.data&&res.data.rows || [];
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
    edit(item){
      console.log(item)
      this.adData = item
      this.isShowNewAd = true;
    },
    del(item){
      console.log(item)
      let params = {}
      this.$http.post('/api/mgmt/platform/advert/delete', params).then((res)=>{
        if(res.code === 1000){
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getAdList();
        }else{
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    addAd(){
      this.adData = {}
      this.isShowNewAd = true;
    },
    closeModifyAd(){
      this.isShowNewAd = false;
      this.getAdList();
    }
  },
  created(){
    this.getAdList();
  },
}
</script>
<style lang="less" scoped>
  .ad-manage{
    position: relative;
    .title-line{
      padding: 10px;
      background-color: #E0E0E0;
      font-weight: bold;
    }
    .new-ad{
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
