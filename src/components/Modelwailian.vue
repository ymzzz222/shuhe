<template>
  <div class="model_chanping">
    <!-- 外链 -->
    <el-dialog title="添加外链" :visible.sync="dialogVisibled" width="900px" :before-close="closeModel">
      <el-form :model="ruleFormd" ref="ruleFormd" label-width="100px" class="demo-ruleForm">
        <el-form-item
          label="名称"
          prop="name"
          :rules="{required: true,message: '请输入名称', trigger: 'blur' }"
        >
          <el-input v-model="ruleFormd.name"></el-input>
        </el-form-item>
        <el-form-item
          label="地址"
          prop="name"
          :rules="{required: true,message: '请输入地址', trigger: 'blur' }"
        >
          <el-input v-model="ruleFormd.desc"></el-input>
        </el-form-item>
        <el-form-item
          label="来源"
          prop="name"
          :rules="{required: true,message: '请输入来源', trigger: 'blur' }"
        >
          <el-input v-model="ruleFormd.edit"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeModel">取 消</el-button>
        <el-button type="primary" @click="submitFormd('ruleFormd')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["dialogVisibled", 'pid'],
  data() {
    return {
      //产品
      ruleFormd: {
        name: "",
        desc: "",
        edit:'',
      },
      id: "",
      fileList:[],
    };
  },
  created() {
    this.id = this.$route.query.id;
  },
  methods: {
    closeModel() {
      this.$emit("update:dialogVisibled", false);
    },
    //提交表单
    submitFormd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.$refs.uploada.submit();
          // 上传图片
          let data = {
            type: 7,
            classify3Id:this.pid,
            cardId: this.id,
            article:{
              cardId: this.id,
              title: this.ruleFormd.name,
              content:this.ruleFormd.desc,
              description:this.ruleFormd.edit,
            }
          };
          this.$axios.post(this.globalurl + "/article/publish",data,{headers:{token: localStorage.getItem("token")}}).then(res=>{
            this.$router.go(0)
          })
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.model_chanping {
  /deep/ .el-upload-list {
    .el-upload-list__item-preview {
      display: none;
    }
  }
  .addplay {
    width: calc(100% - 100px);
    margin-left: 100px;
  }
  /deep/ .el-form-item {
    &.edity {
      .el-form-item__content {
        height: 400px;
      }
    }
    .el-form-item__label::before {
      content: "*";
      color: #f56c6c;
      margin-right: 4px;
    }
    .delete {
      .top {
        width: 30%;
      }
      .heng {
        display: block;
        margin: 0 20px;
        color: #ccc;
      }
      .bot {
        width: 50%;
      }
      .el-button {
        margin-left: auto;
      }
    }
  }
}
</style>