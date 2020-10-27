<template>
  <div class="model_chanping">
    <el-dialog title="发表文章" :visible.sync="dialogVisibleb" width="900px" :before-close="closeModel"  v-loading="loading">
      <el-form :model="ruleFormb" ref="ruleFormb" label-width="100px" class="demo-ruleForm">
        <el-form-item label="缩略图">
          <el-upload
            list-type="picture-card"
            action=""
            ref="uploada"
            :limit="1"
            :file-list="fileList"
            :auto-upload="false"
            :on-change="changeFile"
            :on-remove="remove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item
          label="文章标题"
          prop="name"
          :rules="{required: true,message: '请输入文章标题', trigger: 'blur' }"
        >
          <el-input v-model="ruleFormb.name"></el-input>
        </el-form-item>
        <el-form-item
          label="文章简介"
          prop="desc"
          :rules="{required: true,message: '请输入简介', trigger: 'blur' }"
        >
          <el-input type="textarea" v-model="ruleFormb.desc"></el-input>
        </el-form-item>
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
  props: ["dialogVisibleb","pid"],
  components: {
    quillEditor
  },
  data() {
    return {
      //产品
      ruleFormb: {
        name: "",
        desc: "",
        edit:'',
      },
      id: "",
      fileList:[],
      loading:false,
    };
  },
  created() {
    this.id = this.$route.query.id;
  },
  methods: {
    closeModel() {
      this.$emit("update:dialogVisibleb", false);
    },
    //提交表单
    submitFormb(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.$refs.uploada.submit();
          // 上传图片
          this.loading = true
          let form = new FormData();
          form.append('file',this.fileList[0].raw)
          let config = {
            headers:{
              'Content-Type':'multipart/form-data',
              "token":localStorage.getItem("token")
            },
          }
          this.$axios.post(this.globalurl+'/upload/img',form,config).then(res=>{
            this.allsubmit(res.data.data.url)
          })
        }
      });
    },
    //图片上传成功再发布产品
    allsubmit(res) {
      let data = {
        type: 8,
        classify3Id:this.pid,
        cardId: this.id,
        article:{
          cardId: this.id,
          title: this.ruleFormb.name,
          description:this.ruleFormb.desc,
          imgs:res,
          content:this.ruleFormb.edit,
        }
      };
      this.$axios.post(this.globalurl + "/article/publish",data,{headers:{token: localStorage.getItem("token")}}).then(res=>{
        this.$router.go(0)
      })
    },
    //移除文件
    remove(file,fileList){
      this.fileList = fileList
    },
    //选择文件
    changeFile(file,fileList) {
      const isJPG = file.raw.type === "image/jpeg" || file.raw.type === "image/png";
      const isLt2M = file.raw.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      if(isJPG && isLt2M){
        this.fileList.push(file)
      }else{
        fileList.pop()
      }
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