<template>
  <div class="user_fabu">
    <ul>
      <li v-for="(item,index) in details.records" :key="index" class="flex flex_c">
        <img :src="getImg(item.head)" alt />
        <div class="mid">
          <p>{{item.nick}}</p>
          <h6>简介：{{item.introduce}}</h6>
          <h6>id：{{item.id}}</h6>
        </div>
      </li>
    </ul>
    <el-pagination v-if="details.total>10" background layout="prev, pager, next" :page-size="10" :total="details.total" class="totals" @current-change="changePage"></el-pagination>
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
      axios("/user/list/user/fans", "get", { page: this.page, pageSize: 10 }).then(
      (res) => {
        this.details = res;
      }
    );
    }
  }
};
</script>

<style lang="scss" scoped>
.user_fabu {
  .totals{
    text-align: center;
  }
  ul {
    li {
      margin-bottom: 20px;
      border-bottom: 1px dashed #ccc;
      padding-bottom: 10px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      h1 {
        margin-left: auto;
        border: 1px solid #d9ecff;
        padding: 0 10px;
        line-height: 30px;
        font-size: 12px;
        color: #409eff;
        background-color: #ecf5ff;
        cursor: pointer;
        &:hover {
          background-color: #409eff;
          color: #fff;
        }
      }
      .mid {
        margin-left: 50px;
        h6 {
          color: #666;
          font-size: 14px;
          line-height: 1.6;
        }
        p {
          font-size: 16px;
          color: #000;
          margin-bottom: 10px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>