<template>
  <div class="model_chanping">
    <!-- 活动 -->
    <el-dialog title="申请管理" :visible.sync="dialogVisiblec" :before-close="closeModel" width="900px">
      <el-form :model="ruleFormc" ref="ruleFormc" label-width="100px" class="demo-ruleForm">
        <el-form-item label="LOGO">
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
          <!-- <p class="el-upload__tip">最多可上传4张，只能上传jpg/png文件，且每张不超过2MB</p> -->
        </el-form-item>
        <el-form-item
          label="申请人"
          prop="name"
          :rules="{required: true,message: '请输入申请人', trigger: 'blur' }"
        >
          <el-input v-model="ruleFormc.name"></el-input>
        </el-form-item>
        <el-form-item
          label="申请理由"
          prop="name"
          :rules="{required: true,message: '请输入申请理由', trigger: 'blur' }"
        >
          <el-input v-model="ruleFormc.li"></el-input>
        </el-form-item>
        <el-form-item
          label="申请人电话"
          prop="name"
          :rules="{required: true,message: '请输入申请人电话', trigger: 'blur' }"
        >
          <el-input v-model="ruleFormc.phone" type="number"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeModel">取 消</el-button>
        <el-button type="primary" @click="submitFormc('ruleFormc')" :loading="loading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["dialogVisiblec",'pid'],
  data() {
    return {
      //产品
      ruleFormc: {
        name: "",
        li:"",
        phone:"",
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
      this.$emit("update:dialogVisiblec", false);
    },
    //提交表单
    submitFormc(formName) {
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
    allsubmit(url) {
      let data = {
        logo:url,
        applyName:this.ruleFormc.name,
        cardId:this.id,
        contact:this.ruleFormc.phone,
        reason:this.ruleFormc.li,
      };
      axios('/card/appManagement', 'post', data).then(res=>{
        this.$router.go(0)
      })
    },
    //
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