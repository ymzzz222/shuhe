<template>
  <div class="model_chanping">
    <!-- 添加电影 -->
    <el-dialog title="添加电影" :visible.sync="dialogVisibleh" width="900px" :before-close="closeModel">
      <el-form :model="ruleFormh" ref="ruleFormh" label-width="100px" class="demo-ruleForm">
        <el-form-item label="电影图片">
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
          <p class="el-upload__tip">最多可上传1张，只能上传jpg/png文件，且每张不超过2MB</p>
        </el-form-item>
        <el-form-item
          label="电影名称"
          prop="name"
          :rules="{required: true,message: '请输入电影名称', trigger: 'blur' }"
        >
          <el-input v-model="ruleFormh.name"></el-input>
        </el-form-item>
        <el-form-item
          label="导演"
          prop="athor"
          :rules="{required: true,message: '请输入导演', trigger: 'blur' }"
        >
          <el-input v-model="ruleFormh.athor"></el-input>
        </el-form-item>
        <el-form-item
          label="编剧"
          prop="chu"
          :rules="{required: true,message: '请输入编剧', trigger: 'blur' }"
        >
          <el-input v-model="ruleFormh.chu"></el-input>
        </el-form-item>
        <el-form-item
          label="主演"
          prop="fu"
          :rules="{required: true,message: '请输入主演', trigger: 'blur' }"
        >
          <el-input v-model="ruleFormh.fu"></el-input>
        </el-form-item>
        <el-form-item
          label="类型"
          prop="yi"
          :rules="{required: true,message: '请输入类型', trigger: 'blur' }"
        >
          <el-input v-model="ruleFormh.yi"></el-input>
        </el-form-item>
        <el-form-item
          label="上映时间"
          prop="nian"
          :rules="{required: true,message: '请输入上映时间', trigger: 'blur' }"
        >
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleFormh.nian" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item
          label="地区"
          prop="ding"
          :rules="{required: true,message: '请输入地区', trigger: 'blur' }"
        >
          <el-input v-model="ruleFormh.ding"></el-input>
        </el-form-item>
        <el-form-item
          label="语言"
          prop="isbn"
          :rules="{required: true,message: '请输入语言', trigger: 'blur' }"
        >
          <el-input v-model="ruleFormh.isbn"></el-input>
        </el-form-item>
        <el-form-item
          label="片长"
          prop="dou"
          :rules="{required: true,message: '请输入片长', trigger: 'blur' }"
        >
          <el-input  type="number" v-model="ruleFormh.dou"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(domain, index) in ruleFormh.domains"
          :label="'观看网站'+(index+1)"
          :key="index"
          :prop="'domains.' + index + '.inputala'"
          :rules="{
      required: true, message: '请输入观看网站', trigger: 'blur'
    }"
        >
          <div class="flex delete">
            <el-input class="top" v-model="domain.inputala" placeholder="请输入名称"></el-input>
            <span class="heng">—</span>
            <el-input class="bot" placeholder="请输入观看网站" v-model="domain.inputara">
              <i slot="prefix" class="el-input__icon el-icon-paperclip"></i>
            </el-input>
            <el-button type="danger" @click.prevent="removeDomainh(domain)">删除</el-button>
          </div>
        </el-form-item>
        <el-button
          type="primary"
          class="addplay"
          plain
          icon="el-icon-circle-plus-outline"
          @click="addDomainh"
        >点击添加购买地址，最多可添加6个</el-button>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeModel">取 消</el-button>
        <el-button type="primary" @click="submitFormh('ruleFormh')" :loading="loading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["dialogVisibleh",'pid'],
  data() {
    return {
      ruleFormh: {
        name: "",
        athor:'',
        chu:'',
        fu:'',
        yi:'',
        nian:'',
        ding:'',
        isbn:'',
        dou:'',
        domains: [
          {
            inputala: "",
            inputara: "",
          },
        ],
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
      this.$emit("update:dialogVisibleh", false);
    },
    //提交表单
    submitFormh(formName) {
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
      console.log(this.ruleFormh)
      let d = new Date(this.ruleFormh.nian);
      let data = {
        type: 4,
        classify3Id:this.pid,
        cardId: this.id,
        article:{
          cardId: this.id,
          title: this.ruleFormh.name,
          director:this.ruleFormh.athor,
          writers:this.ruleFormh.chu,
          starring:this.ruleFormh.fu,
          mvType:this.ruleFormh.yi,
          releaseDate:d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(),
          press:this.ruleFormh.ding,
          language:this.ruleFormh.isbn,
          mvTime:this.ruleFormh.dou,
          imgs:url,
          links:JSON.stringify(this.ruleFormh.domains),
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
    addDomainh() {
      if (this.ruleFormh.domains.length < 6) {
        this.ruleFormh.domains.push({
          value: "",
          key: Date.now(),
        });
      }
    },
    removeDomainh(item) {
      var index = this.ruleFormh.domains.indexOf(item);
      if (index !== -1) {
        this.ruleFormh.domains.splice(index, 1);
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