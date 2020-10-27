<template>
  <div id="app" class="apps">
    <!-- 头部 -->
    <Header></Header>
    <!-- 回到顶部 -->
    <el-backtop class="backtop" :bottom="100">
      <i class="iconhuojian iconfont"></i>
    </el-backtop>
    <!-- 页面 -->
    <router-view class="tops" />
    <!-- 页脚 -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'app',
  components:{
    Header,
    Footer
  }
}
</script>

<style lang="scss" scoped>
@import url('./assets/css/reset.css');
@import url('//at.alicdn.com/t/font_2074125_cszibjdz6so.css');
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: calc(100vh - 1px);
  background-color: #f8faf9;
  border-top: 1px solid transparent;
  min-width: 1722px;
  cursor: default;
  font-size: 14px;
  color: #2c3e50;
}
.apps{
  display: grid;
  grid-template-rows: auto 1fr auto;
}
.backtop i{
  font-size: 20px;
} 
</style>
