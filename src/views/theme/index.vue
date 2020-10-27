<template>
  <div class="theme_container">
    <SideTheme :class="['animated',flag?'bounceInRight':'bounceOutRight']" :dialogVisible.sync="dialogVisible" :List.sync="List" :Head.sync="Head"></SideTheme>
    <div class="conty">
      <div class="head">
        <div class="top">
          <el-button
            @click="changeHead(index)"
            :class="active==index?'active':''"
            v-for="(item,index) in Head"
            :key="index"
            type="primary"
            size="small"
            plain
          >{{item.name}}</el-button>
          <el-button
            @click="changeHead(-1)"
            :class="active==-1?'active':''"
            type="primary"
            size="small"
            plain
          >全部</el-button>
        </div>
        <div class="bot flex flex_c">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
          <el-button type="primary" @click="search" icon="el-icon-search">搜索</el-button>
          <div class="right flex">
            <p>关键字：</p>
            <span>同龄人</span>
            <span>衰老</span>
            <span>爱他美</span>
          </div>
        </div>
      </div>
      <div class="contx">
        <ul v-loading="loading">
          <li v-for="(item,index) in subList.records" :key="index">
            <div class="title flex flex_b flex_c">
              <router-link :to="'/theme_details?id='+item.id" tag="p">{{item.keyName}}</router-link>
              <h6>
                <span>{{item.commentCount}}</span>人回复
              </h6>
            </div>
            <!-- <p class="p">{{content}}</p> -->
            <div class="bot flex flex_c flex_b">
              <h6></h6>
              <h5>
                关键词：
                <span v-for="(i,t) in item.keywords" :key="t">{{i}}</span>
              </h5>
            </div>
            <!-- <img src="@/assets/img/head.png" alt class="headimg" /> -->
            <div class="content">{{item.content}}</div>
            <div class="pinglun">
              <!-- <div class="ping">
                <img src="@/assets/img/head.png" alt />
                <p>发发发</p>
              </div>-->
              <div class="lun flex flex_b flex_c">
                <!-- <p>
                  <i class="iconfont iconfabiaopinglun"></i>发表
                </p>-->
                <h6>最新回复：{{item.lastCommentDate ? item.lastCommentDate : '暂无回复'}}</h6>
                <router-link :to="'/theme_details?id='+item.id" tag="p">查看全部</router-link>
              </div>
              <div class="input flex" v-if="false">
                <el-input type="textarea" autosize :rows="1" placeholder="请输入内容" v-model="textarea"></el-input>
                <el-button type="primary" size="small">提交评论</el-button>
              </div>
            </div>
          </li>
        </ul>
        <div class="more">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="subList.total"
            :page-size="10"
            @current-change="changePage"
          ></el-pagination>
        </div>
      </div>
    </div>
    <Modelzhuti :dialogVisible.sync="dialogVisible" v-if="dialogVisible" />
  </div>
</template>

<script>
import SideTheme from "@/components/SideTheme";
import Modelzhuti from "@/components/Modelzhuti";
export default {
  components: {
    SideTheme,
    Modelzhuti,
  },
  data() {
    return {
      input: "", //搜索
      loading: false, //
      textarea: "", //
      dialogVisible: false, //发表主题弹窗
      List: [], //一级分类
      Head: [], //三级分类
      active: -1, //选取三级分类
      page: 1,
      subList: {},//

    };
  },
  computed: {
    flag() {
      return this.$store.state.headIconActive;
    },
  },
  methods: {
    changePage(next) {
      this.page = next;
      this.getList();
    },
    getList() {
      let classify3 = this.active == -1 ? "" : this.Head[this.active];
      axios("/subject/list", "GET", {
        classify3: classify3,
        keywords: this.input,
        page: this.page,
        pageSize: 10,
      }).then((res) => {
        res.records.forEach((e) => {
          e.keywords = e.keywords.split(",");
        });

        this.subList = res;
      });
    },
    changeHead(index) {
      this.active = index;
    },
    search() {
      this.getList();
    },
  },
  created() {
    this.getList();
    axios("/category/list", "get", { parentId: "" }).then((res) => {
      for (let i = 0; i < res.length; i++) {
        res[i].show = i;
      }
      this.List = res;
    });
  },
};
</script>

<style lang="scss" scoped>
.theme_container {
  position: relative;
  .conty {
    width: 980px;
    box-sizing: border-box;
    .pinglun {
      .ping {
        margin-top: 20px;
        // border-bottom: 1px solid #eee;
        img {
          width: 40px;
          height: 40px;
          border-radius: 5px;
          margin-bottom: 10px;
        }
        p {
          line-height: 1.6;
          margin-bottom: 10px;
        }
      }
      .lun {
        margin-top: 10px;
        cursor: pointer;
        font-size: 16px;
        h6{
          font-size: 14px;
        }
        p {
          color: #409eff;
        }
      }
      .input {
        margin-top: 20px;
        align-items: flex-start;
        .el-button {
          margin-left: 10px;
        }
      }
    }
    .more {
      padding: 20px 0 40px;
      display: flex;
      justify-content: space-around;
    }
    ul {
      min-height: 500px;
      li {
        padding: 20px;
        box-sizing: border-box;
        background-color: #fff;
        box-shadow: 0 0 5px #ccc;
        margin-bottom: 20px;
        .content {
          margin-top: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }
        .headimg {
          width: 40px;
          height: 40px;
          border-radius: 5px;
        }
        .title {
          p {
            font-size: 20px;
            color: #333;
            line-height: 2;
            padding-bottom: 10px;
            cursor: pointer;
          }
          h6 {
            font-size: 14px;
            color: #666;
            span {
              color: #409eff;
            }
          }
        }
        .p {
          font-size: 14px;
          color: #8f8f8f;
          margin-bottom: 40px;
        }
        .bot {
          border-bottom: 1px solid #eee;
          padding-bottom: 20px;
          margin-bottom: 20px;
          h5 {
            color: #999;
            span {
              color: #409eff;
              padding-left: 15px;
            }
          }
        }
      }
    }
    .head {
      padding: 20px;
      background-color: #fff;
      margin-bottom: 20px;
      /deep/ .el-input {
        width: 400px;
        margin-right: 20px;
      }
      box-shadow: 0 0 5px #ccc;
      .top {
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
        margin-bottom: 20px;
        .el-button.active {
          background-color: #409eff;
          color: #fff;
        }
      }
      .right {
        margin-left: auto;
        p {
          color: #999;
        }
        span {
          margin-left: 14px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>