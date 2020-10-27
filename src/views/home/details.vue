<template>
  <div class="home_details">
    <div class="title">
      <router-link to="/" tag="span">社区</router-link>> 社区详情
    </div>
    <div class="flex conty">
      <div class="left">
        <div class="a">{{details.title}}</div>
        <div class="b" v-html="details.content"></div>
        <div class="c"></div>
        <div class="d flex flex_b">
          <div class="e flex">
            <el-button
              type="primary"
              @click="likeArticle"
              plain
              size="small"
            >{{!details.prise ? '点赞' : '取消点赞'}}</el-button>

            <el-button
              type="primary"
              @click="collectArticle"
              plain
              size="small"
            >{{!details.collect ? '收藏' : '取消收藏'}}</el-button>
          </div>
          <div class="f flex flex_c">
            <i class="iconfont icondianzan"></i>
            <span>{{details.priseCount}}</span>
            <i class="iconfont iconxin"></i>
            <span>{{details.collectCount}}</span>
            <i class="iconfont iconkan"></i>
            <span>{{details.viewCount}}</span>
            <i class="iconfont iconpinglun"></i>
            <span>{{details.commentCount}}</span>
          </div>
        </div>
        <div class="g">{{details.afterCreate}}</div>
        <div class="h flex">
          <el-input type="textarea" autosize placeholder="请输入内容" v-model="textarea_article"></el-input>
          <el-button type="primary" size="small" @click="subComment">提交评论</el-button>
        </div>
        <div class="item" v-for="(item,index) in commentData.records" :key="index">
          <div class="flex flex_b flex_c head">
            <div class="flex flex_c">
              <img :src="item.userInfo.head" alt />
              <p>{{item.userInfo.nick}}</p>
            </div>
            <h1>{{item.createDate}}</h1>
          </div>
          <div class="conts">{{item.comments}}</div>
          <div class="none">
            <div class="flex flex_c">
              <i class="iconfont icondianzan"></i>
              <span>0</span>
            </div>
            <div class="flex flex_c" @click="changeItemShow(index)">
              <i class="iconfont iconpinglun"></i>
              <span>回复评论</span>
            </div>
          </div>
          <div class="hui flex" v-if="item.show">
            <el-input type="textarea" autosize placeholder="请输入内容" v-model="item.textarea"></el-input>
            <el-button type="primary" plain size="small" @click="commentSub(item.id, index)">回复</el-button>
          </div>
          <div class="all">
            <div class="items" v-for="(itm,index) in item.subComment" :key="index">
              <div class="top flex flex_c">
                <img :src="itm.userInfo.head" alt />
                <p>
                  <span>{{itm.userInfo.nick}}</span> 回复
                  <span>{{item.userInfo.nick}}</span>
                </p>
                <h6>{{itm.afterCreate}}</h6>
              </div>
              <div class="cont">{{itm.comments}}</div>
            </div>
          </div>
        </div>
        <el-pagination
          v-if="commentData.total>10"
          background
          layout="prev, pager, next"
          :page-size="10"
          :total="commentData.total"
          class="totals"
          @current-change="changePage"
        ></el-pagination>
      </div>
      <div class="right" v-if="details.userInfo">
        <div class="a flex flex_b flex_c">
          <img v-if="details.userInfo.head" :src="getImg(details.userInfo.head)" alt />
          <el-button
            v-if="!details.owner"
            type="primary"
            @click="followUser"
            icon="el-icon-plus"
            size="mini"
          >{{details.userInfo.follow ? '取消关注' : '关注'}}</el-button>
        </div>
        <div class="item flex flex_b">
          <p>年龄:</p>
          <span>{{details.userInfo.age}}</span>
        </div>
        <div class="item flex flex_b">
          <p>工作:</p>
          <span>{{details.userInfo.work}}</span>
        </div>
        <div class="item flex flex_b">
          <p>地址:</p>
          <span>{{details.userInfo.address}}</span>
        </div>
        <div class="item flex flex_b">
          <p>爱好:</p>
          <span>{{details.userInfo.hobby}}</span>
        </div>
        <div class="item flex flex_b">
          <p>加入时间:</p>
          <span>{{details.userInfo.createDate}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea_article: "",
      id: "",
      details: {},
      commentContent: "",
      parentCommentId: "",
      page: 1,
      commentData: {},
    };
  },
  created() {
    this.id = this.$route.query.id;
    axios("/article/get", "get", { id: this.id }).then((res) => {
      this.details = res;
    });
    this.getComment();
  },
  methods: {
    changeItemShow(index) {
      if (this.commentData.records[index].show) {
        this.commentData.records[index].show = false;
      } else {
        this.commentData.records[index].show = true;
      }
      this.commentData.records.push("");
      this.commentData.records.pop();
    },
    changePage(next) {
      this.page = next;
      this.getComment();
    },
    getComment() {
      axios("/article/comment", "get", {
        articleId: this.id,
        page: this.page,
        pageSize: 10,
      }).then((res) => {
        this.commentData = res;
      });
    },
    followUser() {
      axios("/user/follow", "post", { userId: this.details.userInfo.id }).then(
        (res) => {
          if (res == 1) {
            //关注
            this.$message({
              showClose: true,
              message: "关注成功",
              type: "success",
            });
            this.details.userInfo.follow = true;
          }
          if (res == 2) {
            //取消关注
            this.$message({
              showClose: true,
              message: "取消关注成功",
              type: "success",
            });
            this.details.userInfo.follow = false;
          }
        }
      );
    },
    likeArticle() {
      axios("/article/prise", "post", { articleId: this.id }).then((res) => {
        if (res == 1) {
          //关注
          this.details.prise = true;
          this.details.priseCount = this.details.priseCount + 1;
        }
        if (res == 2) {
          this.details.prise = false;
          this.details.priseCount = this.details.priseCount - 1;
          // this.details.collect = false
        }
      });
    },
    collectArticle() {
      axios("/article/collect", "post", { articleId: this.id }).then((res) => {
        if (res == 1) {
          //关注
          this.details.collect = true;
          this.details.collectCount = this.details.collectCount + 1;
        }
        if (res == 2) {
          this.details.collect = false;
          this.details.collectCount = this.details.collectCount - 1;
          // this.details.collect = false
        }
      });
    },
    subComment() {
      this.commentContent = this.textarea_article;
      this.parentCommentId = undefined;
      this.comment();
      this.commentContent = "";
      this.textarea_article = "";
    },
    comment() {
      axios("/article/comment", "post", {
        articleId: this.id,
        content: this.commentContent,
        parentCommentId: this.parentCommentId,
      }).then((res) => {
        if (this.parentCommentId) {
          this.commentData.records.subComment.unshift(res);
        } else {
          this.commentData.records.unshift(res);
        }
      });
    },
    commentSub(parentCommentId, index) {
      this.commentContent = this.commentData.records[index].textarea;
      if (!this.commentContent) {
        this.$message.error("评论不能为空!");
      } else {
        this.parentCommentId = parentCommentId;
        console.log(parentCommentId);
        this.comment();
        this.commentData.records[index].textarea = "";
        this.commentContent = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.home_details {
  .conty {
    padding-top: 40px;
    align-items: flex-start;
    .left {
      min-height: 800px;
      background-color: #fff;
      width: 740px;
      padding: 20px;
      box-sizing: border-box;
      .item {
        padding: 20px 0;
        border-top: 1px solid #eee;
        .all {
          margin-top: 20px;
          margin-left: 50px;
          .items {
            padding: 20px 0;
            border-top: 1px solid #eee;
            .cont {
              margin-top: 16px;
              font-size: 16px;
              color: #8f8f8f;
              line-height: 1.8;
            }
            .top {
              color: #8590a6;
              font-size: 14px;
              img {
                width: 20px;
                height: 20px;
                margin-right: 10px;
              }
              h6 {
                margin-left: auto;
              }
              span {
                color: #2c3e50;
              }
            }
          }
        }
        .hui {
          align-items: flex-start;
          margin-left: 50px;
          .el-button {
            margin-left: 30px;
          }
        }
        .none {
          font-size: 12px;
          color: #8590a6;
          height: 36px;
          display: flex;
          align-items: center;
          > div {
            &:hover {
              color: #409eff;
            }
          }
          span {
            display: block;
            margin: 0 10px 0 5px;
          }
        }
        .conts {
          margin-top: 10px;
          font-size: 16px;
          line-height: 1.8;
          color: #333;
        }
        .head {
          img {
            width: 25px;
            height: 25px;
            margin-right: 10px;
          }
          p {
            font-size: 16px;
            color: #333;
          }
          h1 {
            color: #8590a6;
            font-size: 14px;
          }
        }
      }
      .h {
        align-items: flex-start;
        padding-bottom: 20px;
        .el-button {
          margin-left: 10px;
        }
      }
      .g {
        margin: 20px;
        color: #8f8f8f;
        font-size: 14px;
      }
      .f {
        color: #8590a6;
        span {
          padding: 0 10px 0 5px;
        }
      }
      .d {
        margin-top: 26px;
      }
      .c {
        margin-top: 16px;
      }
      .b {
        margin-top: 10px;
        font-size: 14px;
        color: #8f8f8f;
        font-style: normal;
        /deep/ img{
          max-width: 80%;
        }
        i {
          font-style: italic;
        }
        overflow: hidden;
        
      }
      .a {
        margin-top: 12px;
        margin-bottom: 4px;
        font-size: 26px;
        font-weight: 600;
        font-synthesis: style;
        line-height: 32px;
        color: #1a1a1a;
      }
    }
    .right {
      margin-left: 20px;
      width: 336px;
      padding: 20px;
      background-color: #fff;
      box-sizing: border-box;
      border-radius: 5px;
      box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.11);
      .a {
        img {
          width: 50px;
          height: 50px;
        }
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
        margin-bottom: 10px;
      }
      .item {
        line-height: 2;
        font-size: 14px;
        color: #8f8f8f;
      }
    }
  }
  .title {
    color: #606266;
    span {
      color: #303133;
      font-weight: 700;
      cursor: pointer;
    }
  }
  .totals {
    text-align: center;
  }
}
</style>