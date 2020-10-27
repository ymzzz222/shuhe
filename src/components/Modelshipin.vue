<template>
  <div class="model_chanping">
    <!-- 添加视频 -->
    <el-dialog title="添加视频" :visible.sync="dialogVisibleg" width="900px" :before-close="closeModel">
      <el-form :model="ruleFormg" ref="ruleFormg" label-width="100px" class="demo-ruleForm">
        <el-form-item label="视频缩略图">
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
          label="视频名称"
          prop="name"
          :rules="{required: true,message: '请输入视频名称', trigger: 'blur' }"
        >
          <el-input v-model="ruleFormg.name"></el-input>
        </el-form-item>
        <el-form-item label="选择文件">
          <el-upload
            class="upload-demo"
            action=""
            :limit="1"
            ref="uploadgtop"
            :file-list="fileLista"
            :auto-upload="false"
            :accept="'.mp4'"
            :on-change="changeFilea"
            :on-remove="removea"
            >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传MP4文件，且不超过10MB</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeModel">取 消</el-button>
        <el-button type="primary" @click="submitFormg('ruleFormg')" :loading="loading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["dialogVisibleg","pid"],
  data() {
    return {
      //产品
      ruleFormg: {
        name: "",
      },
      id: "",
      fileList:[],
      fileLista:[],
      loading:false
    };
  },
  created() {
    this.id = this.$route.query.id;
  },
  methods: {
    closeModel() {
      this.$emit("update:dialogVisibleg", false);
    },
    //提交表单
    submitFormg(formName) {
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
            let forma = new FormData();
            forma.append('file',this.fileLista[0].raw)
            this.$axios.post(this.globalurl+'/upload/video',forma,config).then(e=>{
              this.allsubmit(res.data.data.url,e.data.data.url)
            })
          })
        }
      });
    },
    //图片上传成功再发布产品
    allsubmit(img,url) {
      let data = {
        type: 6,
        classify3Id:this.pid,
        cardId: this.id,
        article:{
          cardId: this.id,
          title: this.ruleFormg.name,
          imgs:img,
          video:url
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
    },
    //移除文件
    removea(file,fileList){
      this.fileLista = fileList
    },
    //选择文件
    changeFilea(file,fileList) {
      this.fileLista.push(file)
    },
    addDomain() {
      if (this.ruleForma.domains.length < 6) {
        this.ruleForma.domains.push({
          value: "",
          key: Date.now(),
        });
      }
    },
    removeDomain(item) {
      var index = this.ruleForma.domains.indexOf(item);
      if (index !== -1) {
        this.ruleForma.domains.splice(index, 1);
      }
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