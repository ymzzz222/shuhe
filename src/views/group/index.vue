<template>
  <div class="group_container">
    <div class="fenlei flex">
      <p>一级：</p> 
      <h6 class="flex"><span v-for="(item,index) in heada" :key="index" :class="activea==index?'active':''" @click="getHead(item.id,2,index)">{{item.name}}</span></h6>
    </div>
    <div class="fenlei flex flex_c">
      <p>二级：</p> 
      <h6 class="flex"><span v-if="headb.length == 0">无数据</span><span v-for="(item,index) in headb" :key="item.id" :class="activeb==index?'active':''" @click="getHead(item.id,3,index)">{{item.name}}</span></h6>
    </div>
    <div class="fenlei flex flex_c">
      <p>三级：</p> 
      <h6 class="flex"><span v-if="headc.length == 0">无数据</span> <span v-for="(item,index) in headc" :key="item.id" :class="activec==index?'active':''" @click="getListy(index,item.id)">{{item.name}}</span></h6>
    </div>
    <div class="flex newgroup flex_c">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        size="small"
        v-model="input">
      </el-input>
      <h6 @click="dialogVisiblei=true">生成新小组</h6>
    </div>

    <div class="cont flex">
      <router-link :to="'/group_details?id='+item.id" class="item" v-for="(item,index) in List" :key="index">
        <div class="img"><img :src="getImg(item.logo)" alt=""></div>
        <p>{{item.introduction}}</p>
        <h6>{{item.name}}</h6>
      </router-link>
    </div>

    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="getList"
      :page-size="16"
      v-if="total>16"
      :total="total">
    </el-pagination>

    <Modelxiaozu v-if="dialogVisiblei" :dialogVisiblei.sync='dialogVisiblei' />

  </div>
</template>

<script>
import Modelxiaozu from '@/components/Modelxiaozu'
export default {
  components:{
    Modelxiaozu,
  },
  data(){
    return{
      input:'',
      id:"",
      List:[],
      heada:[],
      headb:[],
      headc:[],
      activea:0,
      activeb:0,
      activec:-1,
      total:0,
      dialogVisiblei:false,
    }
  },
  created(){
    this.getAllHead()
    this.getList(1)
  },
  methods:{
    getListy(index,id){
      this.activec = index
      this.id = id
      this.getList(1)
    },
    getList(next){
      let data = {
        page:next,
        pageSize:16,
        classify3Id:this.id,
        keywords:this.input,
      }
      axios('/group/list', 'get', data).then(res=>{
        this.List = res.records
        this.total = res.total
      })
    },
    getHead(id,index,i){
      axios('/category/list', 'get', {parentId:id}).then(res=>{
        if(index == 2){
          this.headb = res
          this.headc = []
          this.activea = i
          this.activeb = -1
        }else if(index == 3){
          this.headc = res
          this.activeb = i
        }
      })
    },
    getAllHead(){
      axios('/category/list', 'get').then(res=>{
        this.heada = res
        if(res.length>0){
          axios('/category/list', 'get',{parentId:res[0].id}).then(resp=>{
            this.headb = resp
            if(resp.length>0){
              axios('/category/list', 'get',{parentId:resp[0].id}).then(respo=>{
                this.headc = respo
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.group_container{
  width: 1046px;
  padding: 20px 0 20px 24px;
  box-sizing: border-box;
  background-color: #fff;
  .el-pagination{
    text-align: center;
    margin: 20px 0;
  }
  .newgroup{
    margin-top: 10px;
    margin-bottom: 20px;
     h6 {
      height: 32px;
      line-height: 32px;
      text-align: center;
      background: #0084ff;
      color: #fff;
      border-radius: 5px;
      cursor: pointer;
      width: 200px;
      margin-left: 20px;
    }
  }
  .cont{
    flex-wrap: wrap;
    .item{
      width: 230px;
      margin-right: 25px;
      margin-bottom: 25px;
      position: relative;
      p{
        position: absolute;
        left: 0;
        top: 190px;
        z-index: 2;
        width: 100%;
        height: 40px;
        line-height: 40px;
        background-color: rgba(110,116,119,.4);
        color: #fff;
        text-align: center;
        font-size: 16px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
      h6{
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        color: #2c3e50;
      }
      .img{
        width: 230px;
        height: 230px;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
          transition: all 0.6s;
          &:hover{
            transform: scale(1.2);
          }
        }
      }
    }
  }
  .el-input{
    width: 50%;
  }
  .fenlei{
    p{
      font-size: 16px;
      font-weight: 700;
      color: #333;
      line-height: 1.9;
    }
    h6{
      flex-wrap: wrap;
      flex: 1;
    }
    span{
      font-size: 14px;
      line-height: 2;
      display: block;
      margin-right: 10px;
      color: #999;
      cursor: pointer;
      &.active{
        color: #65a6dc;
      }
    }
  }
}
</style>