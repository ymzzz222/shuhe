<template>
  <div class="home_side">
    <div class="top">
      <div class="title">我的关注</div>
      <div class="cont">
        <!-- <div class="item" v-for="(item,index) in followData.records" :to="'/cardlist_details?id='+item.id" :key="index">{{item.cardName}}</div> -->
        <router-link tag="div" :to="'/cardlist_details?id='+item.id" class="item" v-for="(item,index) in followData.records" :key="index">{{item.cardName}}</router-link>
      </div>
    </div>
    <div class="top">
      <div class="title">热门社区</div>
      <div class="cont">
        <!-- <div class="item" v-for="(item,index) in 6" :key="index">生活百科</div> -->
        <router-link tag="div" :to="'/cardlist_details?id='+item.id" class="item" v-for="(item,index) in hotData.records" :key="index">{{item.cardName}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
      return{
        followData: {},
        followPage: 1,
        hotData:{},
        hotPage: 1
      }
  },
  created(){
      axios('/user/list/flower/card', 'get', {page: this.followPage, pageSize: 20}).then(res=>{
        this.followData = res;
      })
      axios('/card/list/hot', 'get', {page: this.hotPage, pageSize: 20}).then(res=>{
        this.hotData = res;
      })
  }
}
</script>

<style lang="scss" scoped>
.home_side{
  position: absolute;
  top: 0;
  right: -338px;
  width: 338px;
  box-sizing: border-box;
  .top{
    background-color: #fff;
    box-shadow: 0 5px 10px 0 rgba(0,0,0,.11);
    border: 1px solid #e5e5e5;
    margin-bottom: 40px;
    .title{
      padding: 0 20px;
      background: #efefef;
      line-height: 45px;
      font-size: 16px;
      color: #333;
      text-shadow: 0 0 1px #333;
    }
    .cont{
      padding: 0 10px 0 20px;
      display: flex;
      flex-wrap: wrap;
      .item{
        font-size: 14px;
        line-height: 36px;
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>