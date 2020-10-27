<template>
  <div class="cardlist_container">
    <div class="conty">
      <div class="head flex flex_c">
        <el-input v-model="input" placeholder="请输入内容" clearable></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button class="but" type="success" plain @click="showModel" >注册数和卡</el-button>
      </div>
      <ul  v-loading="$store.state.loading">
        <router-link tag="li" :to="'/cardlist_details?id='+item.id" class="flex flex_c" v-for="(item,index) in details.records" :key="index">
          <img :src="getImg(item.img)" alt />
          <div class="mid">
            <p>{{item.cardName}}</p>
            <h6>{{item.description}}</h6>
          </div>
          <div class="right">
            <h5>关注人数：{{item.followerCount}}</h5>
            <h4 class="flex flex_c">
              所属分类：
              <span>{{item.classify1Name}}</span>
            </h4>
          </div>
        </router-link>
      </ul>
      <el-pagination
      v-if="details.total>10"
      background
      layout="prev, pager, next"
      :page-size="10"
      :total="details.total"
      class="totals"
      @current-change="changePage"
    ></el-pagination>
    </div>

    <sideHome :class="['animated',flag?'bounceInRight':'bounceOutRight']" />
    <Modelshuhe :dialogVisiblei.sync="dialogVisiblei" />
  </div>
</template>

<script>
import sideHome from "@/components/SideHome";
import Modelshuhe from '@/components/Modelshuhe'
export default {
  components: {
    sideHome,
    Modelshuhe,
  },
  data() {
    return {
      input: "",
      details: {},
      page: 1,
      dialogVisiblei:false,
    };
  },
  computed: {
    flag() {
      return this.$store.state.headIconActive;
    },
  },
  changePage(next) {
      this.page = next
      this.getList()
  },
  created(){
      this.getList()
  },
  methods:{
    getList(){
      axios('/card/list', 'get', {
        page: this.page,
        pageSize: 10,
        keywords: this.input
      }).then((result) => {
        this.details = result
      })
    },
    search(){
      this.page = 1
      this.getList()
    },
    showModel(){
      this.dialogVisiblei = true
    }
  }
};
</script>

<style lang="scss" scoped>
.cardlist_container {
  position: relative;
  .conty {
    background-color: #fff;
    box-shadow: 0 0 5px #ccc;
    width: 980px;
    box-sizing: border-box;
    ul {
      min-height: 500px;
      li {
        border-top: 1px solid #eee;
        padding: 20px 40px;
        position: relative;
        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
        .right {
          margin-left: auto;
          text-align: right;
          font-size: 14px;
          h5 {
            margin-bottom: 10px;
          }
          span {
            background-color: #ecf5ff;
            border:1px solid #d9ecff;
            font-size: 12px;
            cursor: pointer;
            border-radius: 4px;
            display: inline-block;
            padding: 0 8px;
            line-height: 1.8;
          }
        }
        .mid {
          margin-left: 20px;
          p {
            font-size: 16px;
            color: #000;
            margin-bottom: 20px;
            cursor: pointer;
            font-weight: 700;
          }
          h6 {
            color: #666;
            width: 200px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
          }
        }
      }
    }
    .head {
      height: 60px;
      .el-input {
        width: 300px;
        margin: 0 20px;
      }
      .but{
        margin-left: auto;
        margin-right: 20px;
      }
    }
  }
}
</style>