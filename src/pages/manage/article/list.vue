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
            <div class="color-green cursor_pointer" @click="previewDetail(item)">详情</div>
            <!--<div class="color-red cursor_pointer" @click="del(item)">删除</div>-->
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

    <el-dialog title="文章详情" :visible.sync="articleShow" v-loading="true">
      <div class="detail-content">
        <div class="item" v-for="(item, index) in contentList" :key="index">
          <div v-if="item.indexOf('http://diaoyudaxian01.b0.upaiyun.com/fish') > -1">
            <img :src="item" alt="">
          </div>
          <div v-else v-html="item"></div>
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
      articleShow: false
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
      let articleId = item.id;
      this.$http.get('api/mgmt/platform/detail/'+articleId).then((res)=>{
        if(res.code === 1000){
          let content = res.data && res.data.content
          this.contentList = JSON.parse(content)
          this.articleShow = true
        }else{
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
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
      }
      img{
        width: 100%;
      }
    }
  }

</style>
