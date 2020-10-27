<template>
  <div class="model_chanping">
    <!-- 注册数和卡 -->
    <el-dialog
      title="注册数和卡"
      :visible.sync="dialogVisiblei"
      width="900px"
      :before-close="closeModel"
    >
      <el-form :model="ruleForma" ref="ruleForma" label-width="100px" class="demo-ruleForm">
        <el-form-item label="卡片图片">
          <el-upload
            list-type="picture-card"
            action
            ref="uploada"
            :limit="1"
            :file-list="fileList"
            :auto-upload="false"
            :on-exceed="handleExceed"
            :on-change="changeFile"
            :on-remove="remove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <p class="el-upload__tip">最多可上传1张，只能上传jpg/png文件，且每张不超过2MB</p>
        </el-form-item>
        <el-form-item
          label="卡片名称"
          prop="name"
          :rules="{required: true,message: '请输入卡片名称', trigger: 'blur' }"
        >
          <el-input v-model="ruleForma.name"></el-input>
        </el-form-item>
        <el-form-item
          label="卡片简介"
          prop="desc"
          :rules="{required: true,message: '请输入卡片简介', trigger: 'blur' }"
        >
          <el-input maxlength="100" type="input" v-model="ruleForma.desc"></el-input>
        </el-form-item>
        <el-form-item label="卡片分类" prop="desc">
          <el-select v-model="value" placeholder="请选择" disabled>
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select v-model="valuey" placeholder="请选择" disabled>
            <el-option
              v-for="item in optionsy"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="卡片类别"
          prop="desc"
        >
          <el-checkbox-group v-model="checkList">
            <el-checkbox v-for="(item,index) in check" :disabled="item.bool" :key="index" :label="item.id" >{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeModel">取 消</el-button>
        <el-button type="primary" @click="submitForma('ruleForma')" :loading="loading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["dialogVisiblei"],
  data() {
    return {
      checkList:[],
      check:[],
      options:[],
      value:'',
      optionsy:[],
      valuey:'',
      //产品
      ruleForma: {
        name: "",
        desc: "",
      },
      id: "",
      fileList: [],
      loading:false,
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getInfo()
  },
  methods: {
    getInfo(){
      axios('/card/info', 'get', {cardId:this.id}).then(res=>{
        this.fileList = [{url:this.getImg(res.img)}]
        this.ruleForma.name = res.cardName
        this.ruleForma.desc = res.description
        this.value = res.classify1Name
        this.valuey = res.classify2Name
        axios('/category/list', 'get', {parentId:res.classify2}).then(resp=>{
          this.checkList = res.classify3.split(',')
          for(let i=0;i<this.checkList.length;i++){
            for(let n=0;n<resp.length;n++){
              if(this.checkList[i] == resp[n].id){
                resp[n].bool = true;
              }
            }
          }
          this.check = resp;
        })
      })
    },
    closeModel() {
      this.$emit("update:dialogVisiblei", false);
    },
    //提交表单
    submitForma(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.$refs.uploada.submit();
          // 上传图片
          this.loading = true
          if(this.fileList[0].raw){
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
          }else{
            this.allsubmit()
          }
        }
      });
    },
    //图片上传成功再发布产品
    allsubmit(url) {
      let data = {
        cardId:this.id,
        cardName: this.ruleForma.name,
        cardDescription: this.ruleForma.desc,
        img:url||'',
        classify3Ids:this.checkList.toString(),
      };
      axios("/card/modify", "post", data).then((res) => {
        this.$router.go(0)
      });
    },
    //选择文件超过4个
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    //移除文件
    remove(file, fileList) {
      this.fileList = fileList;
    },
    //选择文件
    changeFile(file, fileList) {
      console.log(fileList)
      const isJPG =
        file.raw.type === "image/jpeg" || file.raw.type === "image/png";
      const isLt2M = file.raw.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      if (isJPG && isLt2M) {
        this.fileList.push(file);
      } else {
        fileList.pop();
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
    .el-select{
      margin-right: 20px;
    }
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