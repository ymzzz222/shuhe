<template>
  <div class="chanpin">
    <ul>
      <li v-for="(item,index) in List" :key="index" :id="'content'+index">
        <img :src="getImg(item.imgs)" alt />
        <p>{{item.content}}</p>
        <h6>{{item.title}}</h6>
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
      axios('/card/union/article', 'get', {cardId:this.pageid,classify3Id:this.id, page: this.page, pageSize: 9}).then(res=>{
        this.List = res.records
        this.total = res.total
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.chanpin {
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
      img {
        width: 100%;
        height: 280px;
      }
      p {
        line-height: 40px;
        text-align: center;
        cursor: pointer;
      }
      h6 {
        position: absolute;
        background: rgba(0, 0, 0, 0.4);
        bottom: 40px;
        left: 0;
        color: #fff;
        font-size: 14px;
        text-align: left;
        line-height: 36px;
        padding: 0 20px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: calc(100% - 40px);
      }
    }
  }
  .page {
    text-align: center;
    margin: 20px;
  }
}
</style>