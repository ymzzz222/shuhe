<template>
  <div class="Login flex flex_c flex_a" v-if="Login">
    <div class="conty flex flex_c flex_a" v-loading="$store.state.loading" element-loading-background="rgba(0, 0, 0, 0.4)">
        <div class="contx">
          <ul class="flex flex_b">
            <li v-for="(item,index) in head" :key="index" :class="index==headIndex?'a':''" @click="changeHead(index)">{{item}}</li>
          </ul>
          <!-- 登录 -->
          <div class="activea" v-show="headIndex==0">
            <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm" label-position="left">
              <el-form-item prop="phone">
                <el-input v-model="ruleForm.phone" placeholder="请输入账号或手机号" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input show-password v-model="ruleForm.password" placeholder="请输入密码" autocomplete="off"></el-input>
              </el-form-item>
              <div class="forget flex flex_b">
                <el-checkbox v-model="checked">记住密码</el-checkbox>
                <p>忘记密码？</p>
              </div>
              <el-form-item class="suball">
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- 注册 -->
          <div class="activea" v-show="headIndex==1">
            <el-form :model="ruleFormy" :rules="rulesy" status-icon ref="ruleFormy" label-position="left">
              <el-form-item prop="phone">
                <el-input v-model="ruleFormy.phone" placeholder="请输入账号或手机号" input-placeholder='color:#000' autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input show-password v-model="ruleFormy.password" placeholder="请输入密码" input-placeholder='color:#000' autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item class="suball">
                <el-button type="primary" @click="submitFormy('ruleFormy')">注册</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      head:['登录','注册'],
      headIndex:0,//切换登录注册

      ruleForm: {
        phone: '',
        password:"",
      },//属性
      rules: {
        phone: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      },//规则
      ruleFormy: {
        phone: '',
        password:"",
      },//属性
      rulesy: {
        phone: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      },//规则
      checked: false,//是否忘记密码
    }
  },
  computed:{
    Login(){
      return this.$store.state.loginActive
    }
  },
  methods:{
    changeHead(req){
      this.headIndex = req
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios('/user/login','post',{userName:this.ruleForm.phone,password:this.ruleForm.password}).then(res=>{
            this.$message.success('登录成功！');
            this.$store.commit('setLoginActive',false)

            localStorage.setItem('token',res.token)
            localStorage.setItem('Userimg',res.head)
            localStorage.setItem("userInfo",JSON.stringify(res))
            location.reload()
          })
        } else {
          return false;
        }
      });
    },
    submitFormy(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios('/user/register','post',{userName:this.ruleFormy.phone,password:this.ruleFormy.password}).then(res=>{
            this.$message.success('注册成功！');
            this.changeHead(0)
          })
        } else {
          return false;
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.Login{
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 2222;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,.5);
  .conty{
    width: 680px;
    height: 680px;
    background-color: #abd0e4;
    box-shadow: 0 0px 20px 0 rgba(0, 0, 0, 0.3);
    .contx{
      background-image: url('~@/assets/img/login.png');
      background-size: 100% 100%;
      width: 510px;
      height: 426px;
      position: relative;
      .activea{
        padding: 44px;
        .forget p{
          color: #fff;
        }
        /deep/ .el-form{
          .suball{
            position: absolute;
            bottom: 22px;
            left: 95px;
            .el-button{
              width: 320px;
            }
          }
          .el-form-item{
            input {
              background-color: rgba(255, 255, 255, 0);
              border-color: #2f3f48;
            }
            input::-webkit-input-placeholder {
              color: #8f8f8f;
            }
            input::-moz-input-placeholder {
              color: #8f8f8f;
            }
            input::-ms-input-placeholder {
              color: #8f8f8f;
            }
            .el-input__inner{
              background-color: transparent;
            }
          }
        }
      }
      ul{
        width: 230px;
        height: 52px;
        margin:20px auto 0;
        li{
          font-size: 30px;
          height: 40px;
          padding: 5px 10px;
          cursor: pointer;
          color: #fff;
          line-height: normal;
          &.a{
            color: #2c7cc2;
            border-bottom: 2px solid #2c7cc2;
          }
        }
      }
    }
  }
}
</style>