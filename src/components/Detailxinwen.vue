<template>
  <div class="jiesao">
    <ul>
      <li v-for="(item,index) in List" :key="index" :id="'content'+index">
        <p>{{item.title}}</p>
        <div class="flex">
          <img :src="getImg(item.imgs)" alt />
          <div class="r">
            <h6>{{item.name}}</h6>
            <h5>阅读全文</h5>
          </div>
        </div>
        <div class="rights">
          <div class="flex flex_c">
            <h2 class="l active">
              <i class="iconfont iconzanpress"></i>赞同{{item.priseCount}}
            </h2>
            <h2>
              <i class="iconfont iconpinglun1"></i>{{item.commentCount}}条评论
            </h2>
          </div>
        </div>
        <div class="date">{{item.afterCreate}}</div>
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
      page: 1,
      pageid:'',
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
.jiesao {
  ul {
    box-sizing: border-box;
    li {
      border-top: 1px solid #eee;
      padding: 20px 0;
      box-sizing: border-box;
      .date {
        margin-top: 20px;
        font-size: 14px;
      }
      .rights {
        display: flex;
        flex-direction: row-reverse;
        margin-top: 20px;
        .l {
          cursor: pointer;
          &.active {
            color: #409eff;
          }
        }
        i {
          display: inline-block;
          margin: 0 5px 0 10px;
        }
      }
      p {
        color: #333;
        font-size: 20px;
        line-height: 2;
        padding-bottom: 10px;
        cursor: pointer;
      }
      .flex {
        img {
          width: 200px;
          height: 200px;
          margin-right: 10px;
        }
        h6 {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          line-height: 1.5;
          margin-bottom: 10px;
        }
        h5 {
          color: #4e99cc;
          cursor: pointer;
          display: inline-block;
        }
      }
    }
  }
  .page {
    text-align: center;
    margin: 20px;
  }
}
</style>