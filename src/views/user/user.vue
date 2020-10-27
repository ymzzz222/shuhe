<template>
  <div class="user_container">
    <div class="user_head">
      <img :src="getImg(userInfo.head)" alt />
      <div class="mid">
        <p @click="showModel">
          编辑资料
          <i class="iconfont iconbianji"></i>
        </p>
        <h6>用户名：{{userInfo.nick}}</h6>
        <h5>
          标签：
          <span v-for="(i,t) in userInfo.label" :key="t">{{i}}</span>
        </h5>
      </div>
      <div class="right">
        <h6>加入时间：{{userInfo.createDate}}</h6>
        <h6>
          <span>年龄：{{userInfo.age}}</span>
          <span>职业：{{userInfo.professional}}</span>
        </h6>
        <h6>地址：{{userInfo.address}}</h6>
      </div>
    </div>
    <div class="user_cont flex">
      <ul class="left">
        <router-link
          :to="item.url"
          v-for="(item,index) in tab"
          tag="li"
          :key="index"
          @click.native="changetab(index)"
          :class="index==tabactive?'active':''"
        >{{item.name}}</router-link>
      </ul>
      <div class="right">
        <router-view />
      </div>
    </div>

    <Modeluser :dialogVisible.sync="dialogVisible" />
  </div>
</template>

<script>
import Modeluser from '@/components/Modeluser'
export default {
  components: {
    Modeluser,
  },
  data() {
    return {
      tab: [
        { name: "发布", url: "/user/fabu" },
        { name: "数和卡", url: "/user/shuhe" },
        { name: "收藏", url: "/user/shouchang" },
        { name: "关注", url: "/user/guanzhu" },
        { name: "粉丝", url: "/user/fensi" },
      ],
      tabactive: 0,
      userInfo:{},//用户数据
      dialogVisible:false,
    };
  },
  created() {
    this.watchTab(this.$route);
    axios("/user/info",'get').then(res=>{
      res.label = res.label.split(',');
      this.userInfo = res
    })
  },
  watch: {
    $route(go) {
      this.watchTab(go);
    },
  },
  methods: {
    showModel(){
      this.dialogVisible = true
    },
    changetab(index) {
      this.tabactive = index;
    },
    watchTab(go) {
      let to = go.path.split("user")[1];
      if (to.indexOf("fabu") != -1) {
        this.tabactive = 0;
      } else if (to.indexOf("shuhe") != -1) {
        this.tabactive = 1;
      } else if (to.indexOf("shouchang") != -1) {
        this.tabactive = 2;
      } else if (to.indexOf("guanzhu") != -1) {
        this.tabactive = 3;
      } else if (to.indexOf("fensi") != -1) {
        this.tabactive = 4;
      }
    },
    getHead(){
      console.log(111)
    }
  },
};
</script>

<style lang="scss" scoped>
.user_container {
  .user_cont {
    width: 100%;
    align-items: flex-start;
    .right {
      padding: 20px;
      box-shadow: 0 0 5px #ccc;
      background-color: #fff;
      flex: 1;
    }
    .left {
      width: 100px;
      padding: 20px;
      background-color: #fff;
      margin-right: 20px;
      border: 1px solid #eee;
      li {
        text-align: center;
        font-size: 16px;
        cursor: pointer;
        line-height: 40px;
        &.active {
          color: #409eff;
        }
      }
    }
  }
  .user_head {
    width: 100%;
    background-color: #fff;
    border-radius: 68px;
    height: 136px;
    padding-right: 162px;
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.11);
    margin: 40px auto;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding-left: 20px;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    .mid {
      margin-left: 20px;
    }
    p {
      font-size: 16px;
      color: #1989fa;
      margin-bottom: 16px;
      cursor: pointer;
    }
    h6 {
      color: #8f8f8f;
      font-size: 14px;
      margin-bottom: 16px;
      span {
        display: inline-block;
        width: 100px;
      }
    }
    .right {
      margin-left: auto;
    }
    h5 {
      color: #8f8f8f;
      font-size: 14px;
      span {
        background-color: #ecf5ff;
        border-color: #d9ecff;
        display: inline-block;
        padding: 0 10px;
        line-height: 24px;
        font-size: 12px;
        color: #409eff;
        border-width: 1px;
        border-style: solid;
        border-radius: 4px;
        box-sizing: border-box;
        white-space: nowrap;
        margin-right: 10px;
      }
    }
  }
}
</style>