<template>
  <div class="model_chanping">
    <!-- ID -->
    <el-dialog title="添加ID" :visible.sync="dialogVisiblee" width="900px" :before-close="closeModel">
      <el-form :model="ruleForme" ref="ruleForme" label-width="100px" class="demo-ruleForm">
        <el-form-item label="关联ID" prop="region" :rules="{required: true,message: '请选择', trigger: 'blur' }">
          <el-select v-model="ruleForme.region" placeholder="请选择">
            <el-option :label="item.cardName" :value="item.id" v-for="(item,index) in List" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeModel">取 消</el-button>
        <el-button type="primary" @click="submitForme('ruleForme')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["dialogVisiblee", "pid"],
  data() {
    return {
      ruleForme: {
        region:''
      },
      id: "",
      fileList:[],
      List:[],
    };
  },
  created() {
    this.id = this.$route.query.id;
    axios('/card/simple/list', 'get').then(res=>{
      this.List = res
    })
  },
  methods: {
    closeModel() {
      this.$emit("update:dialogVisiblee", false);
    },
    //提交表单
    submitForme(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.$refs.uploada.submit();
          // 上传图片
          let data = {
            classify3Id:this.pid,
            cardId: this.id,
            toCardId:this.ruleForme.region
          };

          axios('/card/union', 'post', data).then(res=>{
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