<template>
  <div class="user_fabu">
    <ul>
      <li v-for="(item,index) in cardList.records" :key="index" class="flex flex_c">
        <img :src="getImg(item.img)" alt />
        <div class="mid">
          <p>{{item.cardName}}</p>
          <h6>{{item.description}}</h6>
          <h6>id：{{item.id}}</h6>
        </div>
        <div class="right">
          <h1 v-if="item.permissions >= 1">创建人</h1>
          <h1 v-if="item.permissions >= 2">管理员</h1>
          <h1 v-if="item.permissions >= 4">官方</h1>
        </div>
      </li>
    </ul>
    <el-pagination
      v-if="cardList.total>10"
      background
      layout="prev, pager, next"
      :page-size="10"
      :total="cardList.total"
      class="totals"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  created(){
    this.getCardList()
  },
  data(){
    return{
      cardList:{},
      page: 1
    }
  },
  methods:{
    changePage(next) {
      this.page = next
      this.getCardList()
    },
    getCardList(){
      axios('/user/list/card', 'get', {page: this.page, pageSize: 10}).then(res=>{
        this.cardList = res
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.user_fabu {
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
      }
      .right{
        margin-left: auto;
        display: flex;
        h1{
          margin-left: 10px;
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