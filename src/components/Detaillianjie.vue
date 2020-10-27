<template>
  <div class="xinwen">
    <ul>
      <li v-for="(item,index) in List" :key="index" :id="'content'+index">
        <p><a href="javascript:;" @click="openUrl(item.content)" rel="noopener noreferrer">{{item.title}}</a>（{{item.description}}）</p>
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
      axios('/card/union/article', 'get', {cardId:this.pageid,classify3Id:this.id, page: this.page}).then(res=>{
        this.List = res.records
        this.total = res.total
      })
    },
    openUrl(url){
        if(url.indexOf('http') != 0 ){
          url = 'http://' + url
      }
      window.open(url)
    }
  }
};
</script>

<style lang="scss" scoped>
.xinwen {
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 50%;margin-bottom: 20px;
    }
  }
  .page {
    text-align: center;
    margin: 20px;
  }
}
</style>