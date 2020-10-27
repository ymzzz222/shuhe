<template>
  <div class="xinwen">
    <ul>
      <li v-for="(item,index) in List" :key="index" :id="'content'+index">
        <img :src="getImg(item.imgs)" alt :title="item.title" />
      </li>
    </ul>
  <el-pagination background class="page" layout="prev, pager, next" :total="total" :page-size="10"  @current-change="changePage"></el-pagination>  </div>
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
    grid-template-columns: repeat(3, 32%);
    grid-gap: 20px 2%;
    li {
      width: 100%;
      position: relative;
      border: 1px solid #eee;
      box-sizing: border-box;
      border-radius: 10px;
      overflow: hidden;
      img {
        width: 100%;
        height: 210px;
      }
    }
  }
  .page {
    text-align: center;
    margin: 20px;
  }
}
</style>