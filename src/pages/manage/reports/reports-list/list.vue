<template>
  <div class="reports-list">
<!--
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
-->
    <div class="title-line">举报信息</div>
    <div class="list-table" v-loading="loading">
      <table class="table">
        <thead>
        <tr>
          <th>类型</th>
          <th>举报类型</th>
          <th>举报原因</th>
          <th>举报人</th>
          <th>是否处理</th>
          <th>处理人</th>
          <th>处理意见</th>
          <th>处理结果</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in reportsList" :key="index">
          <td style="width: 10%">{{item.dataTypeDesc}}</td>
          <td style="width: 15%">{{item.reportTypeDesc}}</td>
          <td style="width: 10%">{{item.reportReason}}</td>
          <td style="width: 10%">{{item.userId}}</td>
          <td style="width: 7%">{{item.handle ? '是' : '否'}}</td>
          <td style="width: 10%">{{item.handlingOperatorName}}</td>
          <td style="width: 10%">{{item.handlingOpinions}}</td>
          <td style="width: 18%">{{item.handlingResultDesc}}</td>
          <td style="width: 10%">
            <span class="cursor_pointer" @click="openPreviewDialog(item)">查看</span>
            <span class="cursor_pointer" @click="openHandleDialog(item)">处理</span>
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

    <!--查看详情-->
    <el-dialog
      :title="currentTitle"
      width="70%"
      :visible.sync="previewDialog"
      :close-on-click-modal="false">
      <div class="detail-content" v-loading="loadingDetail">
        <div class="item" v-for="(item, index) in contentList" :key="index">
          <div v-if="item.indexOf('http://diaoyudaxian01.b0.upaiyun.com/fish') > -1">
            <img :src="item" alt="图片没有加载出来">
          </div>
          <div v-else v-html="item"></div>
        </div>
      </div>
    </el-dialog>

    <!--处理举报-->
    <el-dialog
      title="处理举报"
      width="70%"
      :visible.sync="handleDialog"
      :close-on-click-modal="false"
      @close="closeHandleDialog">
      <div class="detail-content">
        <div class="item">
          <span class="left">
            处理结果:
          </span>
          <span class="right">
            <el-radio v-model="handleResult" label="0">忽略举报</el-radio>
            <el-radio v-model="handleResult" label="1">同意举报</el-radio>
          </span>
        </div>
        <div class="item">
          <span class="left">
            处理意见:
          </span>
          <span class="right">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请填写处理意见"
              v-model="handleOpinions">
            </el-input>
          </span>
        </div>
        <div style="text-align: center;margin-top: 40px">
          <el-button type="danger" @click="confirmHandle()">确定处理</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
/*eslint-disable*/
export default {
  props:{},
  components: {},
  data(){
    return {
      loading: '',
      reportsList: [],
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
      pageSize: 10,
      total: 0,
      previewDialog: false,
      handleDialog: false,
      currentTitle: '',
      loadingDetail: false,
      contentList: [],
      handleReportId: '',
      handleResult: '1',
      handleOpinions: '',
    }
  },
  methods:{
    //选择过滤状态
    selectFilterStatus(data){

    },
    //获取订单列表
    getReportsList(){
      let url = 'api/mgmt/platform/reports/list?pageNum=' + this.currentPage + '&pageSize=' + this.pageSize
      // if(false){
      //   url += ('&dataType='+this.dataType)
      // }
      // if(false){
      //   url += ('&handle='+this.handle)
      // }
      // if(false){
      //   url += ('&reportType='+this.reportType)
      // }
      this.loading = true;
      this.$http.get(url).then((res)=>{
        this.loading = false;
        if(res.code === 1000){
          this.total = res.data.total;
          this.reportsList = res.data.rows;
          console.log(this.reportsList)
        }
      })
    },
    //分页器页码改变
    handleSizeChange(data){

    },
    handleCurrentChange(data){

    },
    // 打开查看弹窗
    openPreviewDialog(item){
      this.contentList = []
      this.loadingDetail = true
      if(Number(item.dataType) === 0){
        this.getArticleDetail(item.dataId)
      }else if(Number(item.dataType) === 1){
        this.getCommentDetail(item.dataId)
      }
      this.previewDialog = true
    },
    // 打开处理弹窗
    openHandleDialog(item){
      this.handleReportId = item.dataId
      this.handleDialog = true
    },
    // 获取文章详情
    getArticleDetail(id){
      this.$http.get('api/mgmt/platform/reports/article/'+id).then((res)=>{
        this.loadingDetail = false;
        if(res.code === 1000){
          this.currentTitle = '文章详情'
          try {
            this.contentList = JSON.parse(res.data.content)
          }catch (e) {
            this.contentList = []
          }
        }
      })
    },
    // 获取评论详情
    getCommentDetail(id){
      this.$http.get('api/mgmt/platform/reports/comment/'+id).then((res)=>{
        this.loadingDetail = false;
        if(res.code === 1000){
          this.currentTitle = '评论详情'
          try {
            this.contentList = JSON.parse(res.data.content)
          }catch (e) {
            this.contentList = []
          }
        }
      })
    },
    // 处理举报
    confirmHandle(){
      let params = {
        result: this.handleResult,
        opinions: this.handleOpinions
      }
      this.$http.patch('api/mgmt/platform/reports/handle/'+this.handleReportId, params).then((res)=>{
        if(res.code === 1000){
          this.handleReportId = ''
          this.handleDialog = false
          console.log(res)
        }
      })
    },
    closeHandleDialog(){
      this.handleReportId = ''
      this.handleResult = '1'
      this.handleOpinions = ''
    }
  },
  created(){
    this.getReportsList();
  },
}
</script>
<style lang="less" scoped>
  .reports-list{
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
      .table thead th{
        background-color: white;
        border-bottom: 1px solid #939598;
      }
      .pagination{
        float: right;
        margin: 12px;
      }
    }
    .detail-content{
      .item{
        margin-bottom: 10px;
        span{
          display: inline-block;
        }
        .left{
          width: 100px;
          margin-right: 10px;
          word-break: break-all;
          white-space: normal;
          vertical-align: top;
        }
        .right{
          width: ~'calc(100% - 110px)';
          word-break: break-all;
          white-space: normal;
          vertical-align: top;
        }
        img{
          width: 100%;
        }
      }
    }
  }
</style>
