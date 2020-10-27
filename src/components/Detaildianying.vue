<template>
  <div class="xinwen">
    <ul>
      <li v-for="(item, index) in List" :key="index" :id="'content' + index">
        <img :src="getImg(item.imgs)" alt="" />
        <div class="mid">
          <h6>{{item.title}}</h6>
          <p>导演：<span>{{item.director}}</span></p>
          <p>
            主演：<span>{{item.starring}}</span>
          </p>
          <p>类型：<span>{{item.mvType}}</span></p>
          <p>制片地区：<span>{{item.press}}</span></p>
          <p>语言：<span>{{item.language}}</span></p>
          <p>年代：<span>{{item.releaseDate}}</span></p>
          <p>片长：<span>{{item.mvTime}}分钟</span></p>
        </div>
        <div class="right">
          地址：
      
          <a href="javascript:;" @click="openurl(i.inputara)" target="_blank" rel="noopener noreferrer" v-for="(i,t) in JSON.parse(item.links)" :key="t"
            >{{i.inputala}}</a
          >
        </div>
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
        // for(let i = 0; i < res.records.total; i++){

        // }
        this.List = res.records
        
        this.total = res.total
      })
    },
    openurl(url){
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
    box-sizing: border-box;
    li {
      display: flex;
      margin-bottom: 20px;
      img {
        width: 160px;
        height: 210px;
      }
      .right {
        margin-left: auto;
        text-align: left;
        a {
          width: 300px;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #409eff;
        }
      }
      .mid {
        margin-left: 20px;
        h6 {
          font-size: 16px;
          color: #333;
          font-weight: bold;
          margin-bottom: 10px;
        }
        p {
          line-height: 1.8;
          font-size: 14px;
          color: #999;
          width: 300px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          span {
            color: #333;
          }
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