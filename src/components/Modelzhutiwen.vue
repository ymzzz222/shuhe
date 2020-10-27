<template>
  <div class="model_chanping">
    <el-dialog title="发表文章" :visible.sync="dialogVisible" width="900px" :before-close="closeModel">
      <el-form :model="ruleFormb" ref="ruleFormb" label-width="100px" class="demo-ruleForm">
        <el-form-item
          label="文章内容"
          prop="edit"
          class="edity"
          :rules="{required: true,message: '请输入文章内容', trigger: 'blur' }"
        >
          <quill-editor ref="myTextEditor" v-model="ruleFormb.edit" style="height:300px;"></quill-editor>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeModel">取 消</el-button>
        <el-button type="primary" @click="submitFormb('ruleFormb')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  props: ["dialogVisible"],
  components: {
    quillEditor
  },
  data() {
    return {
      //产品
      ruleFormb: {
        edit:'',
      },
      id: "",
    };
  },
  created() {
    this.id = this.$route.query.id;
  },
  methods: {
    closeModel() {
      this.$emit("update:dialogVisible", false);
    },
    //提交表单
    submitFormb(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          
          // this.$refs.uploada.submit();
          this.$axios.post(this.globalurl + "/theme/article/publish",{subjectId:this.id,content:this.ruleFormb.edit},{headers:{token: localStorage.getItem("token")}}).then(res=>{
            this.$router.go(0)
          })
          // axios('/theme/article/publish', 'post', {subjectId:this.id,content:this.ruleFormb.edit}).then(res=>{
          //   console.log(res)
          //   this.closeModel()
          // })
        }
      });
    },
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