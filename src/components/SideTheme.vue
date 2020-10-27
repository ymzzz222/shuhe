<template>
  <div class="theme_side">
    <el-button type="primary" class="head" @click="showModel">发表主题</el-button>
    <div class="top">
      <div class="title">主题分类</div>
      <div class="cont">
        <el-collapse v-model="activeNames" accordion>
          <el-collapse-item
            :title="item.name"
            :name="index"
            v-for="(item,index) in List"
            :key="item.show"
            @click.native="changeHandle(index)"
          >
            <div v-for="(i,t) in item.fenlei" :key="t" @click="changeHead(index,t)">{{i.name}}</div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['dialogVisible','List',"Head"],
  data() {
    return {
      activeNames: [],
    };
  },
  methods: {
    changeHandle(index){
      if(!this.List[index].active){
        axios('/category/list', 'get', {parentId:this.List[index].id}).then(res=>{
          let arr = this.List
          arr[index].fenlei = res
          arr[index].active = true
          arr[index].show = (new Date()).getTime()
          this.$emit("update:list",arr)
        })
      }
    },
    showModel(){
      this.$emit("update:dialogVisible", true);
    },
    changeHead(index,t){
      let list = this.List
      axios('/category/list', 'get', {parentId:list[index].fenlei[t].id}).then(res=>{
        this.$emit("update:head",res)
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.theme_side {
  position: absolute;
  top: 0;
  right: -338px;
  width: 338px;
  box-sizing: border-box;
  /deep/ .el-collapse{
    .el-collapse-item__content{
      display: flex;
      flex-wrap: wrap;
      div{
        margin-right: 10px;
        font-size: 15px;
        &:hover{
          color: #409eff;
          cursor: pointer;
        }
      }
    }
  }
  .head {
    width: 100%;
    margin-bottom: 20px;
  }
  .top {
    background-color: #fff;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.11);
    border: 1px solid #e5e5e5;
    margin-bottom: 40px;
    .title {
      padding: 0 20px;
      background: #efefef;
      line-height: 45px;
      font-size: 16px;
      color: #333;
      text-shadow: 0 0 1px #333;
    }
    .cont {
      padding: 0 20px 20px 20px;
      p {
        line-height: 42px;
        font-size: 16px;
        border-bottom: 1px solid #f4f4f4;
        font-weight: 700;
      }
      ul {
        padding-left: 20px;
        flex-wrap: wrap;
        li {
          line-height: 2;
          font-size: 16px;
          color: #666;
          margin-right: 20px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>