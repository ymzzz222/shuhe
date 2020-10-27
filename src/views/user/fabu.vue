<template>
  <div class="user_fabu">
    <ul>
      <li v-for="(item,index) in details.records" :key="index">
        <div class="title flex flex_b flex_c">
          <p>{{item.title}}</p>
          <h6 :class="item.isAudit?'active':''">{{item.isAudit?'审核通过':'未审核'}}</h6>
        </div>
        <div class="mid flex flex_b flex_c">
          <p>发布时间：{{item.createDate}}</p>
          <div class="f flex flex_c">
            <i class="iconfont icondianzan"></i>
            <span>{{item.priseCount}}</span>
            <i class="iconfont iconxin"></i>
            <span>{{item.collectCount}}</span>
            <i class="iconfont iconkan"></i>
            <span>{{item.viewCount}}</span>
            <i class="iconfont iconpinglun"></i>
            <span>{{item.commentCount}}</span>
          </div>
        </div>
        <div class="content" v-html="item.content"></div>
      </li>
      <el-pagination v-if="details.total>10" background layout="prev, pager, next" :page-size="10" :total="details.total" class="totals" @current-change="changePage"></el-pagination>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      details: {},
      page:1,
    };
  },
  created() {
    this.getList()
  },
  methods:{
    changePage(next){
      this.page = next
      this.getList()
    },
    getList(){
      axios("/user/list/user/publish/article", "get", { page: this.page, pageSize: 10 }).then(
      (res) => {
        let list = res.records;
        list.forEach((item, index) => {
          if (item.content.length > 100) { // 限制字数17个字
            list[index].content = item.content.slice(0, 100) + '...'
          }
        })
        this.details = res;
      }
    );
    }
  }
};
</script>

<style lang="scss" scoped>
.user_fabu {
  width: 100%;
  ul {
    li {
      margin-bottom: 20px;
      border-bottom: 1px dashed #ccc;
      padding-bottom: 10px;
      .content {
        font-size: 14px;
        line-height: 1.8;
        color: #666;
      }
      .mid {
        margin-bottom: 20px;
        .f {
          color: #8590a6;
          span {
            padding: 0 10px 0 5px;
          }
        }
      }
      .title {
        margin-bottom: 20px;
        p {
          font-size: 20px;
          font-weight: 500;
        }
        h6 {
          background-color: #f4f4f5;
          border: 1px solid #e9e9eb;
          line-height: 30px;
          border-radius: 4px;
          color: #909399;
          padding: 0 10px;
          &.active {
            color: #409eff;
            background-color: #ecf5ff;
            border-color: #d9ecff;
          }
        }
      }
    }
  }
}
</style>