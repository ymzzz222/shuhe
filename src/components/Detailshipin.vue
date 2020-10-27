<template>
  <div class="chanpin">
    <ul>
      <li v-for="(item,index) in List" :key="index" :id="'content'+index">
        <img :src="getImg(item.imgs)" alt @click="changeItem(item.video)" />
        <h6>{{item.title}}</h6>
      </li>
    </ul>
    <el-pagination background class="page" layout="prev, pager, next" :total="total" :page-size="9"  @current-change="changePage"></el-pagination>
    <el-dialog
      :visible.sync="dialogVisible"
      width="800px">
      <video :src="videos"></video>
    </el-dialog>
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
      page: 1,
      videos:'',
      dialogVisible:false,
    }
  },
  created(){
    this.pageid = this.$route.query.id;
    this.getList()
  },
  methods:{
    changeItem(e){
      this.videos = this.getImg(e)
      this.dialogVisible = true;
    },
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
  /deep/ .el-dialog__wrapper{
    video{
      width: 100%;
    }
  }
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
      h6 {
        position: absolute;
        background: rgba(0, 0, 0, 0.4);
        bottom: 0;
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