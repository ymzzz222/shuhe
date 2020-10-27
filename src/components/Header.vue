<template>
  <header>
    <div class="container">
      <!--左边 -->
      <div class="left-box flex">
        <router-link to='/' tag='div' class="flex">
          <img
            src="@/assets/img/logo.png"
            alt="logo"
            style="width:62px;height:65px;margin-right:24px"
          />
          <div class="title-box">
            <div class="top">
              <p class="title">数和网</p>
              <p class="en-title">shuhe</p>
            </div>
            <div class="bottom">
              <p class="desc">分享自己，就能共享世界</p>
            </div>
          </div>
        </router-link>
        <!-- nav -->
        <ul class="cate-box">
          <router-link tag="li" :to="item.url"
            @click.native="chooseItem(index)"
            v-for="(item,index) in list"
            :key="item.id"
            :class="hindex==index?'select':'no-select'"
          >{{item.title}}</router-link>
        </ul>
      </div>
      <!--右边 -->
      <div class="right-box">
        <p class="login" v-if="token">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <el-avatar icon="el-icon-user-solid" v-if="MyUserImg == null"></el-avatar>
              <img
                v-else
                :src="getImg(MyUserImg)"
                alt="用户头像"
                srcset
                style="width:40px;heght:40px;border-radius:50%;border:1px soid #ccc;"
              />
            </span>
            <el-dropdown-menu style="width:100px" slot="dropdown">
              <el-dropdown-item command="a">个人中心</el-dropdown-item>
              <el-dropdown-item command="b">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </p>
        <p class="login" @click="show_LoginModl=true" v-if="!token">登录/注册</p>
        <div class="icon-box">
          <transition name="el-fade-in">
            <i @click="changeFlag" :class="flag?'el-icon-s-unfold':'el-icon-s-fold'"></i>
          </transition>
          <!-- <transition name="el-fade-in">
            <i @click="$emit('click')" v-if="flag" class="el-icon-s-unfold"></i>
          </transition> -->
        </div>
      </div>
    </div>
    <Login></Login>
  </header>
</template>
<script>
import Login from './Login'
export default {
  components:{
    Login
  },
  data() {
    return {
      token: "",//token
      is_login: false,//是否登录
      // flag: true,//是否显示侧边
      MyUserImg: localStorage.getItem("Userimg"),
      list: [
        {
          title: "社区",
          url: "/",
          id: 1,
        },
        {
          title: "数和小组",
          url: "/group",
          id: 2,
        },
        {
          title: "数和卡",
          url: "/cardlist",
          id: 3,
        },
        {
          title: "主题",
          url: "/theme",
          id: 4,
        },
        // {
        //   title: "发现",
        //   url: "/find",
        //   id: 5,
        // },
      ],
      hindex: -1,
    };
  },
  created() {
    this.token = localStorage.getItem("token") || "";
    if(!this.token){
      this.$store.commit('setLoginActive',true)
    }
  },
  computed:{
    flag(){
      return this.$store.state.headIconActive
    }
  },
  watch:{
    $route(to,from){
      if(to.path.indexOf("home")!=-1){
        this.hindex = 0
      }else if(to.path.indexOf("group")!=-1){
        this.hindex = 1
      }else if(to.path.indexOf("cardlist")!=-1){
        this.hindex = 2
      }else if(to.path.indexOf("theme")!=-1){
        this.hindex = 3
      }else{
        this.hindex = -1
      }
    }
  },
  methods: {
    handleCommand(command) {
      console.log(command)
      if (command == "a") {
        this.$router.push("/user");
      } else {
        // 退出登录
        axios('/user/logout','post').then((res) => {
          localStorage.clear();
          location.reload();
        });
      }
    },
    // 关闭模态框
    closeModal(val) {
      // console.log(val)
      this.show_LoginModl = false;
    },
    backIndex() {
      this.$router.push("/");
    },
    chooseItem(i) {
      this.hindex = i;
    },
    // 个人中心页面
    navigate() {
      this.$router.push("/user");
    },
    changeFlag(){
      this.$store.commit('setheadIconActive',!this.flag)
    }
  },
};
</script>
<style lang='scss' scoped>
header {
  width: 100%;
  height: 76px;
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 3px 10px #e5e7e8;
  .container {
    width: 1046px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    .left-box {
      min-width: 896px;

      img {
        cursor: pointer;
      }

      .title-box {
        display: flex;
        flex-direction: column;
        min-width: 176px;
        cursor: pointer;
        line-height: 1.5;

        .top {
          display: flex;
          align-items: flex-end;
          color: #333333;
          justify-content: space-between;

          .title {
            font-size: 30px;
            font-weight: 500;
          }

          .en-title {
            font-size: 24px;
          }
        }

        .bottom {
          color: #333333;
          text-align: center;

          .desc {
            font-size: 16px;
          }
        }
      }

      .cate-box {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 82px;

        li {
          margin-right: 55px;
          font-size: 16px;
          height: 76px;
          line-height: 76px;
          cursor: pointer;

          &:hover {
            color: #65a6dc;
          }
        }
      }
    }

    .right-box {
      width: 150px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;

      .login {
        font-size: 16px;
        color: #8f8f8f;
      }
    }
  }
}

.select {
  border-bottom: 2px solid #65a6dc;
  color: #65a6dc;
}

.no-select {
  border-bottom: 2px solid rgba(255, 255, 255, 0);
}

.icon-box i {
  color: #c0c4cc;
  font-size: 30px;
}
</style>
