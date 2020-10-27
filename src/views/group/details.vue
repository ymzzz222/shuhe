<template>
  <div class="groupy_container flex">
    <div class="left">
      <ul v-infinite-scroll="load">
        <li @click="openGroup(item.id)" v-for="(item,index) in Left" :key="index">{{item.name}}</li>
      </ul>
      <p @click="$router.go(-1)">加入新小组</p>
      <!-- <h6 @click="dialogVisiblei=true">生成新小组</h6> -->
    </div>
    <div class="right">
      <div class="top">
        <div class="head flex flex_c">
          <div class="ul">
            <ul class="flex">
              <router-link :to="'cardlist_details?id='+item.id" tag="li" v-for="(item,index) in cardList.records" :key="index">{{item.cardName}}</router-link>
            </ul>
          </div>
          <!-- <p @click.stop="showGroup">小组资料</p> -->
        </div>

        <div class="groupdetails" v-if="group">
          <p class="flex flex_b"><span>{{group.name}}</span> <span v-if="group.owner" @click="dialogVisiblej=true">编辑</span></p>
          <div class="flex">
            <h6>
              创建者：
              <span v-if="group.userInfo">{{group.userInfo.nick}}</span>
            </h6>
            <h6>
              简介：
              <span>{{group.introduction}}</span>
            </h6>
          </div>
          <div class="flex">
            <h6>
              共享关键字：
              <span>{{group.shardNames}}</span>
            </h6>
            <h6>
              数和共享：
              <span>{{group.sharedKeywords}}</span>
            </h6>
          </div>
          <div class="foot">
            <h4 @click="attention">{{group.follow ? '取消关注' : '关注'}}</h4>
            <span>{{group.followCount||0}}人</span>
          </div>
        </div>

        <!-- <div class="title flex flex_b flex_c" @click="changeType(1)">
          <p>人物</p>
          <div class="r" @click="addtop">
            <i class="el-icon-folder-add"></i> 添加
          </div>
        </div>
        <ul class="man flex">
          <li>
            <a href="http://www.baidu.com" target="_blank" rel="noopener noreferrer">2020年全国两会</a>(百度百科)
          </li>
          <li>
            <a href="http://www.baidu.com" target="_blank" rel="noopener noreferrer">2020年全国两会</a>(百度百科)
          </li>
        </ul>
        <div class="title flex flex_b flex_c"  @click="changeType(2)">
          <p>官网百科</p>
          <div class="r">
            <i class="el-icon-folder-add"></i> 添加
          </div>
        </div>
        <div class="conts">
          <div class="item">
            <p>爱他美联合腾讯活动</p>
            <div class="flex">
              <img src="@/assets/img/login.png" alt />
              <div class="r">
                <h6>爱他美联合腾讯活动，全部五折</h6>
                <h5>阅读全文</h5>
              </div>
            </div>
            <div class="rights">
              <div class="flex flex_c">
                <h2 class="l active">
                  <i class="iconfont iconzan1"></i>赞同0
                </h2>
                <h2>
                  <i class="iconfont iconpinglun1"></i>0条评论
                </h2>
              </div>
            </div>
            <div class="date">2020-08-23 09:36:02</div>
          </div>
        </div> -->
      </div>
      <div class="but">
        <div class="head flex flex_b flex_c">
          <p>微社区</p>
          <h6 @click="dialogVisiblek=true">发表</h6>
        </div>
        <div class="conty">

          <div class="itemt flex flex_b flex_c" v-for="(item,index) in sqArtile.records" :key="index">
            <div class="lefts">
              <router-link :to="'/home_details?id='+item.id">{{item.title}}</router-link>
              <h6 v-html="item.content"></h6>
              <h5>
                作者：
                <span v-if="item.userInfo">{{item.userInfo.nick}}</span>
              </h5>
            </div>
            <img :src="getImg(item.imgs)" alt />
          </div>
          
          <el-pagination
          v-if="sqArtile.total>10"
          background
          layout="prev, pager, next"
          :page-size="10"
          :total="sqArtile.total"
          class="totals"
          @current-change="changePage"
        ></el-pagination>

        </div>
      </div>
    </div>

    <!-- 新小组 -->
    
    <Modelwenzhangs :pid="detailsid" v-if="dialogVisiblek" :dialogVisibleb.sync='dialogVisiblek' />
    <Modelbianji :pid="detailsid" v-if="dialogVisiblej" :dialogVisibled.sync='dialogVisiblej' :name="group.introduction" />

    <Modelchanping :pid="detailsid" v-if="dialogVisiblea" :dialogVisiblea.sync='dialogVisiblea' />
    <Modelwenzhang :pid="detailsid" v-if="dialogVisibleb" :dialogVisibleb.sync='dialogVisibleb' />
    <Modelhuodong :pid="detailsid" v-if="dialogVisiblec" :dialogVisiblec.sync='dialogVisiblec' />
    <Modelwailian :pid="detailsid" v-if="dialogVisibled" :dialogVisibled.sync='dialogVisibled' />
    <Modelid :pid="detailsid" v-if="dialogVisiblee" :dialogVisiblee.sync='dialogVisiblee' />
    <Modelshuji :pid="detailsid" v-if="dialogVisiblef" :dialogVisiblef.sync='dialogVisiblef' />
    <Modelshipin :pid="detailsid" v-if="dialogVisibleg" :dialogVisibleg.sync='dialogVisibleg' />
    <Modeldianying :pid="detailsid" v-if="dialogVisibleh" :dialogVisibleh.sync='dialogVisibleh' />
  </div>
</template>

<script>
import Modelchanping from '@/components/Modelchanping'
import Modelwenzhang from '@/components/Modelwenzhang'
import Modelhuodong from '@/components/Modelhuodong'
import Modelwailian from '@/components/Modelwailian'
import Modelid from '@/components/Modelid'
import Modelshuji from '@/components/Modelshuji'
import Modelshipin from '@/components/Modelshipin'
import Modeldianying from '@/components/Modeldianying'

import Modelbianji from '@/components/Modelbianji'
import Modelwenzhangs from '@/components/Modelwenzhangs'
export default {
  components:{
    Modelchanping,
    Modelwenzhang,
    Modelhuodong,
    Modelwailian,
    Modelid,
    Modelshuji,
    Modelshipin,
    Modeldianying,
    Modelbianji,
    Modelwenzhangs,
  },
  data() {
    return {
      groupActive: false,
      id:"",

      type:-1,
      detailsid:'',
      dialogVisiblea:false,//添加产品 2
      dialogVisibleb:false,//添加文章 1
      dialogVisiblec:false,//添加活动 5
      dialogVisibled:false,//添加外链 7
      dialogVisiblee:false,//添加ID  10
      dialogVisiblef:false,//添加书籍 3
      dialogVisibleg:false,//添加视频 6
      dialogVisibleh:false,//添加电影 4
      
      dialogVisiblej:false,
      dialogVisiblek:false,

      leftPage:1,//关注列表分页
      loadleft:true,
      Left:[],
      group:{},
      cardList: {},
      sqArtile: {},
      sqPage: 1
    };
  },
  methods: {
     changePage(next) {
      this.sqPage = next;
      this.loadArticle();
    },
    getGroup(){
      axios('/group/info', 'get', {groupId:this.id}).then(res=>{
        this.group = res
      })
    },
    //关注的列表
    load(){
      if(this.loadleft){
        axios('/group/follow/list', 'get', {page:this.leftPage,pageSize:10}).then(res=>{
          if(res.records.length<10){
            this.loadleft = false
          }
          this.leftPage++
          this.Left.push(...res.records)
        })
      }
    },
    //添加小组
    changeType(req){
      this.type = req
    },
    //关注小组
    attention() {
      axios('/group/follow', 'post', {groupId: this.id}).then(res=>{
        // if(res == 1){
        //     this.group.follow = true
        //     this.group.followCount = this.group.followCount + 1
        // }else if(res == 2){
        //     this.group.follow = false
        //     this.group.followCount = this.group.followCount - 1
        // }
        this.$router.go(0)
      })
    },
    openGroup(id){
        this.$router.push('group_details?id='+id)
        this.$router.go(0)
    },
    //添加
    addtop() {},
    //生成新小组
    generateGroup() {
      this.dialogVisiblei = true;
    },
    loadCard(){
      axios('/group/card/list', 'get', {groupId: this.id, page: 1, pageSize: 10}).then(res=>{
        this.cardList = res
      })
    },
    loadArticle(){
      axios('/group/article/list', 'get', {groupId: this.id, page: this.sqPage, pageSize:10}).then(res=>{
        let list = res.records;
        list.forEach((item, index) => {
          if (item.content.length > 100) { // 限制字数17个字
            list[index].content = item.content.slice(0, 100) + '...'
          }
        })
        this.sqArtile = res
      })
    },
  },
  mounted() {
    this.id = this.$route.query.id;
    // this.load()
    this.getGroup()
    this.loadCard()
    this.loadArticle()
  },
};
</script>

<style lang="scss" scoped>
.groupy_container {
  width: 1046px;
  .right {
    width: 714px;
    margin-left: 20px;
    .but {
      box-sizing: border-box;
      padding: 20px 28px;
      background-color: #fff;
      -webkit-box-shadow: 0 0 5px #ccc;
      box-shadow: 0 0 5px #ccc;
      margin-top: 15px;
      .conty {
        .itemt {
          margin-bottom: 20px;
          img {
            width: 120px;
            height: 88px;
          }
          .lefts {
            p {
              color: #000;
            }
            h6 {
              margin: 8px 0;
              span {
                color: #0084ff;
              }
              line-height: 22px;
            }
            h5 span {
              color: #0084ff;
            }
          }
        }
      }
      .head {
        margin-bottom: 24px;
        h6 {
          cursor: pointer;
          width: 80px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          background: #0084ff;
          color: #fff;
          border-radius: 5px;
        }
      }
    }
    .conts {
      min-height: 500px;
    }
    .item {
      margin: 0 20px;
      border-top: 1px solid #eee;
      padding: 20px 0 20px 20px;
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
          width: 30px;
          height: 30px;
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
    .man {
      flex-wrap: wrap;
      margin: 0 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
      li {
        width: 50%;
        a {
          line-height: 2;
          text-decoration: underline;
        }
      }
    }
    .title {
      margin: 0 20px;
      height: 80px;
      .r {
        color: #409eff;
        cursor: pointer;
      }
    }
    .top {
      box-shadow: 0 0 5px #ccc;
      background-color: #fff;
      position: relative;
      .groupdetails {
        
        width: 100%;
        background: #fff;
        padding: 16px;
        box-sizing: border-box;
        color: #a3a3a3;
        font-size: 14px;
        .foot {
          color: #333;
          h4 {
            display: inline-block;
            cursor: pointer;
            padding: 6px 14px;
            background: #f2f9ff;
            border-radius: 5px;
            color: #0084ff;
            margin-right: 10px;
          }
        }
        p {
          color: #0084ff;
          margin-bottom: 15px;
          font-size: 16px;
        }
        h6 {
          margin-right: 20px;
          span {
            color: #333;
          }
        }
        > div {
          margin-bottom: 10px;
          line-height: 1.8;
        }
      }
      .head {
        height: 55px;
        padding-left: 20px;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
        .ul{
          width: 100%;
          overflow-x: scroll;
        }
        li {
          height: 30px;
          line-height: 30px;
          color: #8f8f8f;
          border-radius: 4px;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          margin-right: 20px;
          padding: 0 10px;
          font-size: 14px;
          cursor: pointer;
          &.active {
            background: #0084ff;
            color: #fff;
          }
        }
        p {
          margin-left: auto;
          height: 55px;
          line-height: 55px;
          text-align: center;
          width: 116px;
          background: #e5f2ff;
          color: #0084ff;
          cursor: pointer;
        }
      }
    }
  }
  .left {
    width: 266px;
    p {
      height: 48px;
      line-height: 48px;
      text-align: center;
      border: 1px solid #0084ff;
      border-radius: 5px;
      color: #0084ff;
      margin: 30px 0;
      cursor: pointer;
    }
    h6 {
      height: 50px;
      line-height: 50px;
      text-align: center;
      background: #0084ff;
      color: #fff;
      border-radius: 5px;
      cursor: pointer;
    }
    ul {
      border: 1px solid #ccc;
      background: #fff;
      max-height: 504px;
      overflow-y: auto;
      li {
        border-top: 1px solid #eee;
        height: 56px;
        line-height: 56px;
        text-align: center;
        font-size: 16px;
        border-top: 1px solid #f2f2f2;
        cursor: pointer;
        &:first-child {
          border-top: none;
        }
      }
    }
  }
}
</style>