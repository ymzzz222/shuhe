<template>
  <div class="home_container">
    <sideHome :class="['animated',flag?'bounceInRight':'bounceOutRight']"></sideHome>
    <div class="conty">
      <div class="head flex">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
      <ul v-loading="loading">
        <li v-for="(item,index) in details.records" :key="index">
          <router-link :to="'/home_details?id='+item.id" tag="p">{{item.title}}</router-link>
          <div class="cont flex">
            <div v-if="item.yimg">
              <img :src="getImg(item.yimg)" alt />
            </div>
            <div class="right">
              <h6>{{item.description}}</h6>
              <router-link :to="'/home_details?id='+item.id" tag="h5">阅读全文</router-link>
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
              <router-link v-if="item.dataType == 1 || item.dataType == 8 || item.dataType == 7" :to="'/cardlist_details?id='+item.card.id">{{item.card.cardName}}</router-link>
              <router-link v-if="item.dataType == 9" :to="'/group_details?id='+item.card.id">{{item.card.name}}</router-link>
              {{item.sourceFrom}}
            </h1>
            <span>{{item.updateDate}}</span>
          </div>
        </li>
      </ul>
      <div class="more">
        <el-pagination
          v-if="details.total>10"
          background
          layout="prev, pager, next"
          :total="details.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import sideHome from "@/components/SideHome";
export default {
  components: {
    sideHome,
  },
  data() {
    return {
      input: "",//搜索
      page: 1,//
      details: {},//获取列表
      loading:false,//列表等待
      // loadingbut:false,//点赞等待
    };
  },
  computed: {
    flag() {
      return this.$store.state.headIconActive;
    },
  },
  created() {
    this.getList();
  },
  methods: {
    search(){
      if(this.input){
        this.getList(this.input);
      }else{
        this.$message('请输入内容～');
      }
    },
    getList(req) {
      let data = {
        page: this.page,
        pageSize: 10,
        type: -1,
        keywords: req || "",
      };
      this.loading = true
      axios("/article/list", "get", data).then((res) => {
        let list = res.records;
        list.forEach((item, index) => {
          if (item.content.length > 100) { // 限制字数17个字
            list[index].content = item.content.slice(0, 100) + '...'
          }
        })
        for (let i = 0; i < res.records.length; i++) {
          res.records[i].yimg = res.records[i].imgs.split(",")[0];
        }
        this.details = res;
        this.loading = false
      });
    },
    changeprise(index) {
      let arr = this.details.records;
      this.details.records[index].loading = true
      this.details.records.push('')
      this.details.records.pop()
      axios("/article/prise", "post", {articleId: arr[index].id}).then((res) => {
        this.details.records[index].loading = false
        if(arr[index].prise){
          arr[index].priseCount -= 1
        }else{
          arr[index].priseCount += 1
        }
        arr[index].prise = !arr[index].prise
        this.details.records = arr
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.home_container {
  position: relative;
  .conty {
    background-color: #fff;
    box-shadow: 0 0 5px #ccc;
    width: 980px;
    box-sizing: border-box;
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
          /deep/ .el-button{
            padding: 0;
            background: transparent;
            color: #2c3e50;
            border: none;
            margin-right: 20px;
            &.active{
              color: #409eff;
            }
            span{
              margin-left: 6px;
              display: inline-block;
              font-weight: normal;
            }
          }
        }
      }
    }
    .head {
      padding: 20px;
      border-bottom: 1px solid #eee;
      /deep/ .el-input {
        width: 600px;
        margin-right: 20px;
      }
    }
  }
}
</style>