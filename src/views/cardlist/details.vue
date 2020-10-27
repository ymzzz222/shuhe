<template>
  <div class="cardlisty_container">
    <div class="head">
      <div class="top flex flex_c">
        <img
          :src="getImg(details.img)"
          v-if="details.img"
          alt
        />
        <div class="mid">
          <p>{{details.cardName}}</p>
          <h6>简介：{{details.description}}</h6>
        </div>
        <div class="right">
          <p>ID: {{details.id}}</p>
          <p>创建时间：{{details.createDate}}</p>
          <p v-if="details.permissions == 3">管理员</p>
          <p v-if="details.permissions == 1">自己</p>
          <p v-if="details.permissions == 4">官方</p>
          <el-button
            type="primary"
            plain
            size="mini"
            v-if="details.permissions>0"
            @click="changepermissions"
          >编辑卡片</el-button>
        </div>
      </div>

      <div class="bot flex flex_c">
        <el-button
          type="primary"
          @click="followCard"
          plain
          size="mini"
        >{{!details.follow?'关注卡片':'取消关注'}}</el-button>
        <p>已有{{details.followerCount}}人关注</p>
        <div class="btn">
          <el-button
            plain
            size="mini"
            class="but"
            @click="dialogVisiblez=true"
          >申请官方</el-button>
          <el-button
            plain
            size="mini"
            class="shen"
            @click="dialogVisiblel=true"
          >申请管理</el-button>
        </div>
      </div>
    </div>

    <div class="conty">
      <div class="top">
        <el-button
          plain
          :class="wei?'active':''"
          icon="el-icon-house"
          size="small"
          @click="wei=true"
        >微主页</el-button>
        <el-button
          plain
          :class="!wei?'active':''"
          icon="el-icon-reading"
          size="small"
          @click="wei=false"
        >微社区</el-button>
      </div>
      <div
        class="weizhuye"
        v-show="wei"
      >
        <ul class="mid flex">
          <li
            v-for="(item,index) in details.classifications"
            :class="carActive==index?'active':''"
            :key="index"
            @click="changeHead(index,item.id)"
          >{{item.name}}</li>
        </ul>

        <!-- <ul class="line">
          <li v-for="(item,index) in details.classify3Name" :key="index">
            <p @click="changeActive(index)">{{item}}</p>
          </li>
        </ul> -->

        <div
          class="topy flex flex_b"
          v-if="details.classifications"
        >

          <p>{{details.classifications[carActive].name}}</p>
          <h6 @click="addsomething()">
            <i class="el-icon-folder-add"></i> 添加
          </h6>
        </div>

        <div
          class="bot"
          v-loading="loading"
        >
          <Detailchanpin
            :id="detailsid"
            v-if="show==2"
          />
          <Detailhuodong
            :id="detailsid"
            v-if="show==5"
          />
          <Detailxinwen
            :id="detailsid"
            v-if="show==1"
          />
          <Detailshuji
            :id="detailsid"
            v-if="show==3"
          />
          <Detaildianying
            :id="detailsid"
            v-if="show==4"
          />
          <Detailshipin
            :id="detailsid"
            v-if="show==6"
          />
          <Detaillianjie
            :id="detailsid"
            v-if="show==7"
          />
          <DetailId
            :id="detailsid"
            v-if="show==10"
          />
        </div>
      </div>
      <div
        class="shequ"
        v-show="!wei"
      >
        <div class="topy flex flex_b">
          <p></p>
          <h6 @click="dialogVisiblek=true">
            <i class="el-icon-folder-add"></i> 添加
          </h6>
        </div>
        <ul v-loading="loading">
          <li
            v-for="(item,index) in sqArtile"
            :key="index"
          >
            <router-link
              :to="'/home_details?id='+item.id"
              tag="p"
            >{{item.title}}</router-link>
            <div class="cont flex">
              <div v-if="item.yimg">
                <img
                  :src="getImg(item.yimg)"
                  alt
                />
              </div>
              <div class="right">
                <h6>{{item.description}}</h6>
                <router-link
                  :to="'/home_details?id='+item.id"
                  tag="h5"
                >阅读全文</router-link>
                <div class="foot">
                  <el-button
                    type="primary"
                    icon="iconfont iconzan1"
                    :class="item.prise?'active':''"
                    @click.stop="changeprise(index)"
                    :loading="item.loading"
                  >赞同{{item.priseCount||0}}</el-button>
                  <h2>
                    <i class="iconfont iconpinglun1"></i>
                    {{item.commentCount||0}}条评论
                  </h2>
                </div>
              </div>
            </div>
            <div class="footer flex">
              <h1>
                来自
                <router-link
                  v-if="item.dataType == 1 || item.dataType == 8 || item.dataType == 7"
                  :to="'/cardlist_details?id='+item.card.id"
                >{{item.card.cardName}}</router-link>
                <router-link
                  v-if="item.dataType == 9"
                  :to="'/group_details?id='+item.card.id"
                >{{item.card.name}}</router-link>
                {{item.sourceFrom}}
              </h1>
              <span>{{item.updateDate}}</span>
            </div>
          </li>
        </ul>
        <el-pagination
          v-if="sqtotal>10"
          background
          layout="prev, pager, next"
          :page-size="10"
          :total="sqtotal"
          class="totals"
          @current-change="loadArticle"
        ></el-pagination>
        <Detailchanpin></Detailchanpin>
      </div>
    </div>

    <sideHome :class="['animated',flag?'bounceInRight':'bounceOutRight']"></sideHome>

    <Modelchanping
      :pid="detailsid"
      v-if="dialogVisiblea"
      :dialogVisiblea.sync='dialogVisiblea'
    />
    <Modelwenzhang
      :pid="detailsid"
      v-if="dialogVisibleb"
      :dialogVisibleb.sync='dialogVisibleb'
    />
    <Modelhuodong
      :pid="detailsid"
      v-if="dialogVisiblec"
      :dialogVisiblec.sync='dialogVisiblec'
    />
    <Modelwailian
      :pid="detailsid"
      v-if="dialogVisibled"
      :dialogVisibled.sync='dialogVisibled'
    />
    <Modelid
      :pid="detailsid"
      v-if="dialogVisiblee"
      :dialogVisiblee.sync='dialogVisiblee'
    />
    <Modelshuji
      :pid="detailsid"
      v-if="dialogVisiblef"
      :dialogVisiblef.sync='dialogVisiblef'
    />
    <Modelshipin
      :pid="detailsid"
      v-if="dialogVisibleg"
      :dialogVisibleg.sync='dialogVisibleg'
    />
    <Modeldianying
      :pid="detailsid"
      v-if="dialogVisibleh"
      :dialogVisibleh.sync='dialogVisibleh'
    />
    <Modelwenzhangw
      :pid="detailsid"
      v-if="dialogVisiblek"
      :dialogVisibleb.sync='dialogVisiblek'
    />
    <Modelguanli
      :pid="detailsid"
      v-if="dialogVisiblel"
      :dialogVisiblec.sync='dialogVisiblel'
    />
    <Modelguanfang
      :pid="detailsid"
      v-if="dialogVisiblez"
      :dialogVisiblec.sync='dialogVisiblez'
    />

    <Modelshuhey :dialogVisiblei.sync="dialogVisiblei" />

  </div>
</template>

<script>
import sideHome from "@/components/SideHome";
import Detailchanpin from "@/components/Detailchanpin";
import Detailhuodong from "@/components/Detailhuodong";
import Detailxinwen from "@/components/Detailxinwen";
import Detailshuji from "@/components/Detailshuji";
import Detaildianying from "@/components/Detaildianying";
import Detailshipin from "@/components/Detailshipin";
import Detaillianjie from "@/components/Detaillianjie";
import DetailId from "@/components/Detailid";
import Modelchanping from "@/components/Modelchanping";
import Modelwenzhang from "@/components/Modelwenzhang";
import Modelwenzhangw from "@/components/Modelwenzhangw";
import Modelhuodong from "@/components/Modelhuodong";
import Modelwailian from "@/components/Modelwailian";
import Modelid from "@/components/Modelid";
import Modelshuji from "@/components/Modelshuji";
import Modelshipin from "@/components/Modelshipin";
import Modeldianying from "@/components/Modeldianying";
import Modelshuhey from "@/components/Modelshuhey";
import Modelguanli from "@/components/Modelguanli";
import Modelguanfang from "@/components/Modelguanfang";
export default {
  components: {
    sideHome,
    Detailchanpin,
    Detailhuodong,
    Detailxinwen,
    Detailshuji,
    Detaildianying,
    Detailshipin,
    Detaillianjie,
    DetailId,
    Modelguanfang,
    Modelchanping,
    Modelwenzhang,
    Modelhuodong,
    Modelwailian,
    Modelid,
    Modelshuji,
    Modelshipin,
    Modeldianying,
    Modelshuhey,
    Modelwenzhangw,
    Modelguanli,
  },
  watch: {
    $route(to, from) {
      //监听路由是否变化
      if (to.query.id != from.query.id) {
        this.$router.go(0); //重新加载数据
      }
    },
  },
  created() {
    this.id = this.$route.query.id;
    this.getData();
    this.loadArticle(1);
  },
  data() {
    return {
      wei: true,
      carActive: 0,
      show: 2,
      id: "",
      details: {},
      loading: false,
      detailsid: "",
      dialogVisiblea: false, //添加产品 2
      dialogVisibleb: false, //添加文章 1
      dialogVisiblec: false, //添加活动 5
      dialogVisibled: false, //添加外链 7
      dialogVisiblee: false, //添加ID  10
      dialogVisiblef: false, //添加书籍 3
      dialogVisibleg: false, //添加视频 6
      dialogVisibleh: false, //添加电影 4
      dialogVisiblek: false, //添加 8
      dialogVisiblel: false,
      dialogVisiblez: false,

      dialogVisiblei: false, //数和卡
      sqArtile: [],
      sqtotal: 0,
    };
  },
  computed: {
    flag() {
      return this.$store.state.headIconActive;
    },
  },
  methods: {
    changePage(next) {
      this.sqPage = next;
      this.getList();
    },
    changepermissions() {
      this.dialogVisiblei = true;
    },
    loadArticle(page) {
      axios("/card/article/list", "get", {
        cardId: this.id,
        page,
        pageSize: 10,
      }).then((res) => {
        this.sqArtile = res.records;
        this.sqtotal = res.total;
      });
    },
    //显示添加类型
    addsomething() {
      let type = this.details.classifications[this.carActive].type;
      if (type == 1) {
        this.dialogVisibleb = true;
      } else if (type == 2) {
        this.dialogVisiblea = true;
      } else if (type == 3) {
        this.dialogVisiblef = true;
      } else if (type == 4) {
        this.dialogVisibleh = true;
      } else if (type == 5) {
        this.dialogVisiblec = true;
      } else if (type == 6) {
        this.dialogVisibleg = true;
      } else if (type == 7) {
        this.dialogVisibled = true;
      } else if (type == 10) {
        this.dialogVisiblee = true;
      }
    },
    changeActive(index) {
      document.getElementById("content" + index).scrollIntoView({
        behavior: "smooth",
        inline: "start",
      });
    },
    changeHead(index, id) {
      this.carActive = index;
      this.show = this.details.classifications[index].type;
      this.detailsid = id;
    },
    getData() {
      axios("/card/info", "get", { cardId: this.id }).then((result) => {
        result.classify3Name = result.classify3Name.split(",");
        this.details = result;
        this.changeHead(0, this.details.classifications[0].id);
      });
    },
    followCard() {
      axios("/card/follow", "post", { cardId: this.id }).then((res) => {
        if (res == 1) {
          //关注
          this.$message({
            showClose: true,
            message: "关注成功",
            type: "success",
          });
          this.details.follow = true;
          this.details.followerCount = this.details.followerCount + 1;
        }
        if (res == 2) {
          //取消关注
          this.$message({
            showClose: true,
            message: "取消关注成功",
            type: "success",
          });
          this.details.follow = false;
          this.details.followerCount = this.details.followerCount - 1;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.cardlisty_container {
  position: relative;
  min-height: 400px;
  .conty {
    margin-top: 20px;
    background-color: #fff;
    box-shadow: 0 0 5px #bbb;
    box-sizing: border-box;
    width: 980px;
    position: relative;
    .weizhuye {
      .bot {
        padding: 20px;
      }
      .line {
        position: absolute;
        top: 150px;
        right: -386px;
        width: 300px;
        li {
          margin-bottom: 15px;
          position: relative;
          &::before {
            content: "";
            position: absolute;
            top: 11px;
            left: -20px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #e4e7ed;
          }
          &::after {
            content: "";
            position: absolute;
            top: 18px;
            left: -16px;
            width: 2px;
            height: 44px;
            background-color: #e4e7ed;
          }
          &:last-child::after {
            background-color: transparent;
          }
          p {
            background: #303133;
            color: #fff;
            padding: 10px;
            cursor: pointer;
            border-radius: 4px;
            position: relative;
            max-width: 300px;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
            &::before {
              content: "";
              position: absolute;
              top: 11px;
              left: -12px;
              border-style: solid;
              border-right-color: #303133;
              border-width: 6px;
            }
          }
        }
      }
      .topy {
        line-height: 40px;
        font-size: 16px;
        padding: 20px;
        h6 {
          color: #409eff;
          font-size: 14px;
          cursor: pointer;
        }
      }
      .mid {
        border-bottom: 1px solid #ccc;
        padding: 10px 20px;
        background-color: #fff;
        li {
          color: #8f8f8f;
          cursor: pointer;
          display: inline-block;
          height: 30px;
          line-height: 30px;
          text-align: center;
          font-size: 14px;
          border-radius: 2px;
          margin-right: 20px;
          &.active {
            color: #409eff;
          }
        }
      }
    }
    .shequ {
      padding: 20px;
      .topy {
        line-height: 40px;
        font-size: 16px;
        padding: 20px;
        h6 {
          color: #409eff;
          font-size: 14px;
          cursor: pointer;
        }
      }
      ul {
        min-height: 500px;
        li {
          padding: 20px;
          box-sizing: border-box;
          border-bottom: 1px solid #eee;
          .footer {
            margin-top: 20px;
            padding-left: 20px;
            span {
              margin-left: 20px;
            }
            a {
              color: #2c7cc2;
            }
          }
          p {
            font-size: 20px;
            color: #333;
            line-height: 2;
            padding-bottom: 10px;
            cursor: pointer;
          }
          img {
            width: 280px;
            height: 210px;
            margin-right: 40px;
            cursor: pointer;
          }
          h6 {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 5;
            -webkit-box-orient: vertical;
            line-height: 2;
            font-size: 14px;
            color: #8f8f8f;
            white-space: normal;
          }
          h5 {
            cursor: pointer;
            display: inline-block;
            color: #4e99cc;
            line-height: 1.8;
            font-size: 14px;
          }
          h2 {
            margin-right: 20px;
            i {
              display: inline-block;
              margin-right: 4px;
            }
            &.l {
              cursor: pointer;
            }
            &.active {
              color: #409eff;
            }
          }
          .right {
            height: 212px;
            display: flex;
            flex-direction: column;
          }
          .foot {
            margin-top: auto;
            display: flex;
            align-items: center;
            /deep/ .el-button {
              padding: 0;
              background: transparent;
              color: #2c3e50;
              border: none;
              margin-right: 20px;
              &.active {
                color: #409eff;
              }
              span {
                margin-left: 6px;
                display: inline-block;
                font-weight: normal;
              }
            }
          }
        }
      }
    }
    .top {
      padding: 20px;
      border-bottom: 1px solid #eee;
      .active {
        background-color: #409eff;
        color: #fff;
      }
    }
  }
  .head {
    padding: 20px;
    background-color: #fff;
    -webkit-box-shadow: 0 0 5px #bbb;
    box-shadow: 0 0 5px #bbb;
    width: 940px;
    .top {
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      .right {
        margin-left: auto;
        text-align: right;
        line-height: 2;
        font-size: 14px;
      }
      .mid {
        margin-left: 20px;
        p {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 16px;
        }
        h6 {
          font-size: 16px;
          width: 500px;
          line-height: 1.4;
        }
      }
    }

    .bot {
      margin-top: 30px;
      p {
        margin-left: 10px;
      }
      .shen {
        margin-left: auto;
      }
      .btn {
        margin-left: auto;
      }
      .el-button {
        margin-left: 10px;
      }
    }
  }
}
</style>