<template>
  <div class="themey_container">
    <div class="head">
      <div class="content">
        <ul class="flex">
          <li v-for="(i,t) in subjectInfo.keywords" :key="t">{{i}}</li>
        </ul>
        <div class="title flex flex_b flex_c">
          <div class="left">
            <p>{{subjectInfo.keyName}}</p>
            <!-- <h6>{{subjectInfo.content}}</h6> -->
          </div>
          <div class="right flex">
            <!-- <div class="ty">
              <p>关注人数</p>
              <span>{{subjectInfo.keyName}}</span>
            </div>
            <div class="ty">
              <p>收藏人数</p>
              <span>{{subjectInfo.keyName}}</span>
            </div>-->
          </div>
        </div>
        <div class="f flex flex_c">
          <i class="iconfont icondianzan"></i>
          <span>{{subjectInfo.priseCount}}</span>
          <i class="iconfont iconxin"></i>
          <span>{{subjectInfo.collectCount}}</span>
          <i class="iconfont iconkan"></i>
          <span>{{subjectInfo.viewCount}}</span>
          <i class="iconfont iconpinglun"></i>
          <span>{{subjectInfo.commentCount}}</span>

          <div style="margin-left:auto;">
            <el-button
              type="primary"
              @click="likeArticle"
              size="mini"
            >{{!subjectInfo.prise ? '点赞' : '取消点赞'}}</el-button>

            <el-button
              type="primary"
              @click="collectArticle"
              size="mini"
            >{{!subjectInfo.collect ? '收藏' : '取消收藏'}}</el-button>
            <el-button type="primary" @click="postArticle" size="mini">发布文章</el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex conty">
      <div class="left">
        <div class="item" v-for="(item,index) in List" :key="index">
          <div class="user flex flex_c">
            <img :src="getImg(item.userInfo.head)" alt />
            <div class="mid">
              <h1>{{item.userInfo.nick}}</h1>
              <h1>{{item.userInfo.introduce}}</h1>
            </div>
            <p>{{item.afterCreate}}</p>
          </div>
          <div class="content" v-html="item.content"></div>
          <div class="bot flex flex_c">
            <el-button icon="iconfont iconzan1" size="small" @click="changePrice(item.id,index)">{{item.prise?"取消赞同":"赞同"}}</el-button>
            <!-- <el-button icon="iconfont iconfabiaopinglun" size="small">发表评论</el-button> -->
            <el-button icon="iconfont iconpinglun1" size="small" @click="changeShow(index)">{{item.show?'收起评论':'查看评论'}}</el-button>
          </div>
          <div class="all" v-show="item.show">
            <ul v-if="item.List.length>0">
              <li v-for="(i,t) in item.List" :key="t">
                <div class="top flex flex_c">
                  <img :src="getImg(i.userInfo.head)" alt />
                  <p>{{i.userInfo.nick}}</p>
                  <span>{{i.afterCreate}}</span>
                </div>
                <div class="cont">{{i.content}}</div>
              </li>
            </ul>
            <el-pagination background layout="prev, pager, next" v-if="item.total>5" :page-size="5" :total="item.total" @current-change="changePage" @click.native="cahngui(index)"></el-pagination>
            <div class="input flex">
              <el-input type="textarea" autosize :rows="1" placeholder="请输入内容" v-model="item.textarea"></el-input>
              <el-button type="primary" size="small" @click="submitText(item.id,index)">提交评论</el-button>
            </div>
          </div>
        </div>
        <el-pagination background layout="prev, pager, next" v-if="total>10"  @current-change="changePageall" :total="total"></el-pagination>
      </div>
      <div class="right" v-if="subjectInfo.userInfo">
        <div class="a flex flex_b flex_c">
          <img :src="getImg(subjectInfo.userInfo.head)" alt />
          <!-- <span class="un">{{subjectInfo.userInfo.userName}}</span> -->
          <!-- <el-button type="primary" icon="el-icon-plus" size="mini" @click="followUser">关注</el-button> -->

          <el-button
            v-if="!subjectInfo.owner"
            type="primary"
            @click="followUser"
            icon="el-icon-plus"
            size="mini"
          >{{subjectInfo.userInfo.follow ? '取消关注' : '关注'}}</el-button>
        </div>
        <div class="item flex flex_b">
          <p>年龄:</p>
          <span>{{subjectInfo.userInfo.age}}</span>
        </div>
        <div class="item flex flex_b">
          <p>工作:</p>
          <span>{{subjectInfo.userInfo.work}}</span>
        </div>
        <div class="item flex flex_b">
          <p>地址:</p>
          <span>{{subjectInfo.userInfo.address}}</span>
        </div>
        <div class="item flex flex_b">
          <p>爱好:</p>
          <span>{{subjectInfo.userInfo.hobby}}</span>
        </div>
        <div class="item flex flex_b">
          <p>加入时间:</p>
          <span>{{subjectInfo.userInfo.createDate}}</span>
        </div>
      </div>
    </div>

    <Modelzhutiwen :dialogVisible.sync="dialogVisiblea" v-if="dialogVisiblea" />
  </div>
</template>

<script>
import Modelzhutiwen from "@/components/Modelzhutiwen";
export default {
  components: {
    Modelzhutiwen,
  },
  data() {
    return {
      textarea: "",
      id: "",
      subjectInfo: {},
      articleInfo: {},
      dialogVisiblea: false,
      //文章列表
      List:[],
      page:1,
      total:0,
      next:0,
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getSubjectInfo();
    this.getList()
  },
  methods: {
    //提交评论
    submitText(id,index){
      axios('/theme/article/comment', 'post', {articleId:id,content:this.List[index].textarea}).then(res=>{
        this.List[index].List.push(res)
        this.List[index].textarea = ''
      })
    },
    //评论列表
    getComList(id,index){
      axios('/theme/article/list/comments', 'get', {articleId:id,page:this.List[index].page,pageSize:5}).then(res=>{
        this.List[index].List = res.records
        this.List[index].total = res.total
        
      })
    },
    //分页
    changePageall(next){
      this.page = next
      this.getList()
    },
    //评论分页
    cahngui(index){
      this.List[index].page = this.next
      this.getComList(this.List[index].id,index)
    },
    changePage(next) {
      this.next = next
    },
    //点赞
    changePrice(id,index){
      axios('/theme/article/prise', 'post', {subjectId:this.id,saId:id}).then(res=>{
        this.List[index].prise = !this.List[index].prise
      })
    },
    //获取文章列表
    getList(){
      axios('/theme/article/list', 'get', {page:this.page,pageSize:10,subjectId:this.id}).then(res=>{
        for(let i=0;i<res.records.length;i++){
          res.records[i].List = []
          res.records[i].page = 1
        }
        this.List = res.records
        this.total = res.total
      })
    },
    //显示评论
    changeShow(index){
      if(this.List[index].show){
        this.List[index].show = false
      }else{
        this.List[index].show = true
        if(!this.List[index].active){
          this.List[index].active = true
          this.getComList(this.List[index].id,index)
        }
      }
      // this.List.push('')
      // this.List.pop()
      this.$forceUpdate();
    },
    //发布文章
    postArticle() {
      this.dialogVisiblea = true;
    },
    //获取
    getSubjectInfo() {
      axios("/subject/info", "get", { subjectId: this.id }).then((res) => {
        res.keywords = res.keywords.split(",");
        this.subjectInfo = res;
      });
    },
    likeArticle() {
      axios("/subject/prise", "post", { subjectId: this.id }).then((res) => {
        if (res == 1) {
          //关注
          this.subjectInfo.prise = true;
          this.subjectInfo.priseCount = this.subjectInfo.priseCount + 1;
        }
        if (res == 2) {
          this.subjectInfo.prise = false;
          this.subjectInfo.priseCount = this.subjectInfo.priseCount - 1;
          // this.details.collect = false
        }
      });
    },
    collectArticle() {
      axios("/subject/collect", "post", { subjectId: this.id }).then((res) => {
        if (res == 1) {
          //关注
          this.subjectInfo.collect = true;
          this.subjectInfo.collectCount = this.subjectInfo.collectCount + 1;
        }
        if (res == 2) {
          this.subjectInfo.collect = false;
          this.subjectInfo.collectCount = this.subjectInfo.collectCount - 1;
        }
      });
    },
    followUser() {
      axios("/user/follow", "post", {
        userId: this.subjectInfo.userInfo.id,
      }).then((res) => {
        if (res == 1) {
          //关注
          this.$message({
            showClose: true,
            message: "关注成功",
            type: "success",
          });
          this.subjectInfo.userInfo.follow = true;
        }
        if (res == 2) {
          //取消关注
          this.$message({
            showClose: true,
            message: "取消关注成功",
            type: "success",
          });
          this.subjectInfo.userInfo.follow = false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.themey_container {
  .el-dialog {
    .dialog-footer {
      .el-button {
        margin-left: auto;
      }
    }
    ul {
      max-height: 600px;
      overflow-y: auto;
      li {
        img {
          width: 40px;
          height: 40px;
        }
        p {
          margin-left: 10px;
        }
        span {
          margin-left: auto;
          color: #8590a6;
        }
        .cont {
          padding: 20px 0;
          border-bottom: 1px solid #eee;
        }
        margin-bottom: 20px;
      }
    }
  }
  .conty {
    padding-top: 40px;
    align-items: flex-start;
    .left {
      width: 740px;
      .el-pagination{
        text-align: center;
      }
      .item {
        box-sizing: border-box;
        padding: 20px;
        background-color: #fff;
        width: 100%;
        margin-bottom: 20px;
        background: #fff;
        -webkit-box-shadow: 0 0 5px #ccc;
        box-shadow: 0 0 5px #ccc;
        border-radius: 10px;
        .content {
          margin: 20px 0;
          line-height: 1.6;
          /deep/ img{
            max-width: 80%;
          }
        }
        .user {
          border-bottom: 1px solid #eeeeee;
          padding-bottom: 10px;
          img {
            width: 40px;
            height: 40px;
          }
          .mid{
            margin-left: 10px;
            h1{
              line-height: 1.4;
            }
          }
          p {
            width: 300px;
            text-align: right;
            color: #8590a6;
            margin-left: auto;
          }
        }
        .input {
          margin-top: 20px;
          align-items: flex-start;
          .el-button {
            margin-left: 10px;
          }
        }
        .all {
          margin-top: 10px;
          padding: 10px;
          box-shadow: 0 1px 3px rgba(18,18,18,.1);
              border-radius: 4px;
                  border: 1px solid #ebebeb;
          .el-pagination{
            text-align: center;
          }
          ul {
            // max-height: 600px;
            // overflow-y: auto;
            li {
              img {
                width: 40px;
                height: 40px;
              }
              p {
                margin-left: 10px;
              }
              span {
                margin-left: auto;
                color: #8590a6;
              }
              .cont {
                padding: 20px 0;
                border-bottom: 1px solid #eee;
              }
              margin-bottom: 20px;
            }
          }
        }
        .bot {
          /deep/ .el-button {
            i {
              font-size: 12px;
              margin-right: 6px;
            }
          }
        }
      }
    }
    > .right {
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
  .head {
    width: 100%;
    background-color: #fff;
    box-shadow: 0 0 5px #ccc;
    padding: 20px;
    box-sizing: border-box;
    .f {
      color: #8590a6;
      margin-top: 20px;
      span {
        padding: 0 10px 0 5px;
      }
    }
    .title {
      margin-top: 20px;
      .right {
        text-align: center;
        .ty {
          &:first-child {
            border-right: 1px solid #ebebeb;
          }
          padding: 0 10px;
          height: 50px;
          p {
            color: #8590a6;
            font-size: 14px;
            padding-bottom: 10px;
          }
        }
      }
      .left {
        p {
          font-size: 22px;
          padding: 10px 0;
        }
        h6 {
          color: #666;
        }
      }
    }
    ul {
      li {
        border-radius: 16px;
        cursor: pointer;
        margin-right: 15px;
        padding: 0 20px;
        background-color: #ecf5ff;
        line-height: 30px;
        border-color: #d9ecff;
        border-width: 1px;
        color: #409eff;
        border-style: solid;
        font-size: 12px;
      }
    }
  }
}
</style>