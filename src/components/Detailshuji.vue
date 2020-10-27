<template>
  <div class="xinwen">
    <ul>
      <li v-for="(item, index) in List" :key="index" :id="'content' + index">
        <img src="@/assets/img/head.png" alt="" />
        <div class="mid">
          <h6>{{item.title}}</h6>
          <p>作者：{{item.author}}</p>
          <p>出版社：{{item.press}}</p>
          <p>译者：{{item.translation}}</p>
          <p>出版年：{{item.releaseDate}}</p>
          <p>定价：{{item.price}}</p>
          <p>豆瓣评分：{{item.score}}</p>
        </div>
        <h5>{{item.translation}}</h5>
      </li>
    </ul>
    <el-pagination background class="page" v-if="total>10" layout="prev, pager, next" :total="total" @current-change="changePage"></el-pagination>
  </div>
</template>

<script>
export default {
  props:['id'],
  data(){
    return{
      List:[],
      total:0,
      pageid:'',
      page: 1
    }
  },
  created(){
    this.pageid = this.$route.query.id;
    this.getList()
  },
  methods:{
    changePage(next){
      this.page = next
      this.getList()
    },
    getList(){
      axios('/card/union/article', 'get', {cardId:this.pageid,classify3Id:this.id, page: this.page}).then(res=>{
        this.List = res.records
        this.total = res.total
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.xinwen {
  ul {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(2, 49%);
    grid-gap: 20px 2%;
    li {
      width: 100%;
      display: flex;
      align-items: flex-start;
      img {
        width: 160px;
        height: 210px;
      }
      .mid {
        margin-left: 20px;
        h6 {
          font-weight: bold;
          font-size: 16px;
          margin-bottom: 10px;
          color: #333;
        }
        p {
          line-height: 1.5;
          font-size: 14px;
          color: #666;
        }
      }
          h5{
            background-color: #ecf5ff;
            padding: 0 10px;
            line-height: 30px;
            font-size: 12px;
            color: #409eff;
            border: 1px solid #d9ecff;
            border-radius: 4px;
            box-sizing: border-box;
            white-space: nowrap;
            text-decoration: none;
          }
    }
  }
  .page {
    text-align: center;
    margin: 20px;
  }
}
</style>