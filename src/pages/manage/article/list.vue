<template>
  <div class="article-list" v-loading="loading">
    <div class="header">
      <el-select v-model="filterStatus" placeholder="请选择" @change="changeFilter()">
        <el-option
          v-for="item in statusConditions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="list-table">
      <table class="table">
        <thead>
        <tr>
          <th>序号</th>
          <th>缩略图</th>
          <th>文章类型</th>
          <th>文章标题</th>
          <th>创建时间</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in articleList" :key="index">
          <td style="width: 8%">{{index + 1}}</td>
          <td style="width: 12%">
            <img class="img-in-table" :src="item.thumbnail">
          </td>
          <td style="width: 10%">{{item.articleTypeDesc}}</td>
          <td style="width: 30%">{{item.title}}</td>
          <td style="width: 20%">{{item.createTime}}</td>
          <td style="width: 20%">
            <span class="color-green cursor_pointer" @click="previewDetail(item)">详情</span>
            <span class="color-red cursor_pointer" @click="verifyArticle(item)">审核</span>
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

    <!--文章详情-->
    <el-dialog title="文章详情" :visible.sync="articleShow" @close="closeArticleDetailDialog">
      <div class="detail-content">
        <div class="item" v-for="(item, index) in contentList" :key="index">
          <div v-if="item.indexOf('http://diaoyudaxian01.b0.upaiyun.com/fish') > -1">
            <img :src="item" alt="">
          </div>
          <div v-else v-html="item"></div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="articleShow = false">取 消</el-button>
        <el-button type="primary" @click="articleShow = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--文章审核-->
    <el-dialog
      title="文章审核"
      width="70%"
      :visible.sync="verifyDialog"
      :close-on-click-modal="false">
      <div class="detail-content">
        <div class="item" v-if="Number(curArticle.status) === 0||Number(curArticle.status) === 2">
          <span class="left">
            文章状态:
          </span>
          <span class="right">
            <el-radio v-model="verifyResult" :label="0">上架</el-radio>
            <el-radio v-model="verifyResult" :label="2">下架</el-radio>
          </span>
        </div>
        <div class="item" v-if="Number(curArticle.status) === 1&&Number(verifyResult) !== 2">
          <span class="left">
            审核结果:
          </span>
          <span class="right">
            <el-radio v-model="verifyResult" :label="0">审核通过</el-radio>
            <el-radio v-model="verifyResult" :label="4">审核拒绝</el-radio>
          </span>
        </div>
        <div style="text-align: center;margin-top: 40px">
          <el-button type="danger" @click="confirmVerify()">确定处理</el-button>
        </div>
      </div>
    </el-dialog>

  </div>
</template>
<script>
/*eslint-disable*/
export default {
  name: '',
  data () {
    return {
      statusConditions: [
        {
          label: '审核通过',
          value: 0
        },
        {
          label: '待审核',
          value: 1
        },
        {
          label: '文章下架',
          value: 2
        },
        {
          label: '文章上架',
          value: 3
        },
        {
          label: '审核拒绝',
          value: 4
        },
      ],
      filterStatus: 1,
      loading: false,
      articleList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      contentList: [],
      articleShow: false,
      curArticle: {},
      verifyDialog: false,
      verifyResult: '0'
    }
  },
  methods: {
    getArticleList(){
      this.loading = true;
      this.$http.get('api/mgmt/platform/query?articleType='+'01'+'&status='+this.filterStatus+'&pageNum='+this.currentPage+'&pageSize='+this.pageSize).then((res)=>{
        this.loading = false;
        if(res.code === 1000){
          this.articleList = res.data&&res.data.rows || [];
          this.total = res.data&&res.data.total || 0;
        }else{
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    handleSizeChange(){
      this.getArticleList()
    },
    handleCurrentChange(){
      this.getArticleList()
    },
    changeFilter(){
      this.getArticleList()
    },
    previewDetail(item){
      this.curArticle = item;
      this.$http.get('api/mgmt/platform/detail/'+this.curArticle.id).then((res)=>{
        if(res.code === 1000){
          let content = res.data && res.data.content
          try{
            this.contentList = JSON.parse(content)
          }catch (e) {
            this.contentList = [content]
          }
          this.articleShow = true
        }else{
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    verifyArticle(item){
      this.curArticle = item
      this.verifyResult = Number(this.curArticle.status)
      this.verifyDialog = true
    },
    confirmVerify(){
      let params = {
        articleIds: [this.curArticle.id],
        status: this.verifyResult
      }
      this.$http.patch('api/mgmt/platform/update', params).then((res)=>{
        if(res.code === 1000){
          this.curArticle = {}
          this.verifyDialog = false
        }
      })
    },
    closeArticleDetailDialog(){
      this.curArticle = {}
    }
  },
  created () {
    this.getArticleList()
  },
  }
</script>
<style lang="less" scoped>
  .article-list{
    position: relative;
    .title-line{
      padding: 10px;
      background-color: #E0E0E0;
      font-weight: bold;
    }
    .header{
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
    .detail-content{
      .item{
        white-space: normal;
        min-height: 40px;
      }
      img{
        width: 100%;
      }
    }
  }

</style>
