<template>
  <div class="model_chanping">
    <!-- 外链 -->
    <el-dialog title="编辑小组" :visible.sync="dialogVisibled" width="900px" :before-close="closeModel">
      <el-form :model="ruleFormd" ref="ruleFormd" label-width="100px" class="demo-ruleForm">
        <el-form-item
          label="简介"
          prop="name"
          :rules="{required: true,message: '请输入简介', trigger: 'blur' }"
        >
          <el-input v-model="ruleFormd.name" placeholder="请输入简介"></el-input>
        </el-form-item>
        <el-form-item
          label="新增关键字"
          prop="name"
          :rules='{required: true,message: `请输入新增关键字`, trigger: "blur" }'
        >
          <el-input v-model="ruleFormd.desc" placeholder="请输入新增关键字。用','隔开"></el-input>
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
  props: ["dialogVisibled", 'pid','name'],
  data() {
    return {
      //产品
      ruleFormd: {
        name: "",
        desc: "",
      },
      id: "",
      fileList:[],
    };
  },
  created() {
    this.ruleFormd.name = this.name
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
          let data = {
            groupId:this.id,
            introduction:this.ruleFormd.name,
            sharedNames:this.ruleFormd.desc
          };
          axios('/group/modify', 'post', data).then(res=>{
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