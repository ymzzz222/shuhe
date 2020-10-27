<template>
  <div class="model_chanping">
    <el-dialog title="添加产品" :visible.sync="dialogVisiblea" width="900px" :before-close="closeModel">
      <el-form :model="ruleForma" ref="ruleForma" label-width="100px" class="demo-ruleForm">
        <el-form-item label="产品图片">
          <el-upload
            list-type="picture-card"
            action=""
            ref="uploada"
            :limit="4"
            :file-list="fileList"
            :auto-upload="false"
            :on-exceed="handleExceed"
            :on-change="changeFile"
            :on-remove="remove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <p class="el-upload__tip">最多可上传4张，只能上传jpg/png文件，且每张不超过2MB</p>
        </el-form-item>
        <el-form-item
          label="产品名称"
          prop="name"
          :rules="{required: true,message: '请输入产品名称', trigger: 'blur' }"
        >
          <el-input v-model="ruleForma.name"></el-input>
        </el-form-item>
        <el-form-item
          label="推荐理由"
          prop="desc"
          :rules="{required: true,message: '请输入推荐理由', trigger: 'blur' }"
        >
          <el-input type="textarea" v-model="ruleForma.desc"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(domain, index) in ruleForma.domains"
          :label="'购买地址'+(index+1)"
          :key="index"
          :prop="'domains.' + index + '.inputala'"
          :rules="{
      required: true, message: '请输入购买地址', trigger: 'blur'
    }"
        >
          <div class="flex delete">
            <el-input class="top" v-model="domain.inputala" placeholder="请输入名称"></el-input>
            <span class="heng">—</span>
            <el-input class="bot" placeholder="请输入购买地址" v-model="domain.inputara">
              <i slot="prefix" class="el-input__icon el-icon-paperclip"></i>
            </el-input>
            <el-button type="danger" @click.prevent="removeDomain(domain)">删除</el-button>
          </div>
        </el-form-item>
        <el-button
          type="primary"
          class="addplay"
          plain
          icon="el-icon-circle-plus-outline"
          @click="addDomain"
        >点击添加购买地址，最多可添加6个</el-button>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeModel">取 消</el-button>
        <el-button type="primary" @click="submitForma('ruleForma')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["dialogVisiblea","pid"],
  data() {
    return {
      //产品
      ruleForma: {
        name: "",
        desc: "",
        domains: [
          {
            inputala: "",
            inputara: "",
          },
        ],
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
      this.$emit("update:dialogVisiblea", false);
    },
    //提交表单
    submitForma(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.$refs.uploada.submit();
          // 上传图片
          let arr = [];
          for(let i=0;i<this.fileList.length;i++){
            this.uploadImg(i).then(res=>{
              arr.push(res)
              if(arr.length==this.fileList.length){
                this.allsubmit(arr.toString())
              }
            })
          }
        }
      });
    },
    //图片上传成功再发布产品
    allsubmit(url) {
      let data = {
        type: 2,
        classify3Id:this.pid,
        cardId: this.id,
        article:{
          cardId: this.id,
          title: this.ruleForma.name,
          content:this.ruleForma.desc,
          imgs:url,
          links:JSON.stringify(this.ruleForma.domains),
        }
      };
      this.$axios.post(this.globalurl + "/article/publish",data,{headers:{token: localStorage.getItem("token")}}).then(res=>{
        this.$router.go(0)
      })
    },
    //选择文件超过4个
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 4 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
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
    uploadImg(i){
      return new Promise((resolve,reject)=>{
        let form = new FormData();
        form.append('file',this.fileList[i].raw)
        let config = {
          headers:{
            'Content-Type':'multipart/form-data',
            "token":localStorage.getItem("token")
          },
        }
        this.$axios.post(this.globalurl+'/upload/img',form,config).then(res=>{
          resolve(res.data.data.url)
        })
      })
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