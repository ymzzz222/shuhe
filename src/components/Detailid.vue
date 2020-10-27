<template>
  <div class="xinwen">
    <ul>
      <li v-for="(item,index) in List" :key="index" :id="'content'+index">
        <img :src="getImg(item.img)" alt="">
        <div class="right">
          <h6>{{item.cardName}}</h6>
          <p>简介：{{item.description}}</p>
          <p>关注：{{item.followerCount}}人</p>
        </div>
      </li>
    </ul>
    <el-pagination background class="page" layout="prev, pager, next" :total="total" :page-size="9"  @current-change="changePage"></el-pagination>
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
      axios('/card/union/card', 'get', {cardId:this.pageid,classify3Id:this.id, page: this.page, pageSize: 10}).then(res=>{
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
    grid-template-columns: repeat(3, 32%);
    grid-gap: 50px 2%;
    li {
      width: 100%;
      display: flex;
      align-items: center;
      .right{
        margin-left: 10px;
        h6{
              font-size: 18px;
    margin-bottom: 10px;
    font-weight: bold;
        }
        p{
              color: #666;
    line-height: 1.5;
    font-size: 14px;
        }
      }
      img {
        width: 100px;
        height: 100px;
        border-radius: 100%;
      }
    }
  }
  .page {
    text-align: center;
    margin: 20px;
  }
}
</style>