<template>
  <div class="model_chanping">
    <el-dialog title="个人资料" :visible.sync="dialogVisible" width="900px" :before-close="closeModel">
      <el-form :model="ruleForma" ref="ruleForma" label-width="100px" class="demo-ruleForm">
        <el-form-item label="上传头像">
          <el-upload
            list-type="picture-card"
            action
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
        <el-form-item label="账号" prop="usera">
          <el-input disabled v-model="ruleForma.usera"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="usera">
          <el-input v-model="ruleForma.nick"></el-input>
        </el-form-item>
        <el-form-item label="标签" prop="userb">
          <el-input v-model="ruleForma.userb"></el-input>
        </el-form-item>
        <el-form-item label="自我介绍" prop="userc">
          <el-input v-model="ruleForma.userc"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="userd">
          <el-input v-model="ruleForma.userd"></el-input>
        </el-form-item>
        <el-form-item label="工作" prop="usere">
          <el-input v-model="ruleForma.usere"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="userf">
          <el-input v-model="ruleForma.userf"></el-input>
        </el-form-item>
        <el-form-item label="爱好" prop="userg">
          <el-input v-model="ruleForma.userg"></el-input>
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
  props: ["dialogVisible"],
  data() {
    return {
      //产品
      ruleForma: {
        usera: "",
        userb: "",
        userc: "",
        userd: "",
        usere: "",
        userf: "",
        userg: "",
        nick: ''
      },
      id: "",
      fileList: [],
      loading: false,
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getUser();
  },
  methods: {
    closeModel() {
      this.$emit("update:dialogVisible", false);
    },
    //提交表单
    submitForma(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.fileList[0].raw) {
            let form = new FormData();
            form.append("file", this.fileList[0].raw);
            let config = {
              headers: {
                "Content-Type": "multipart/form-data",
                token: localStorage.getItem("token"),
              },
            };
            this.$axios.post(this.globalurl + "/upload/head", form, config)
              .then((res) => {
                this.allsubmit(res.data.data.url);
              });
          }else{
            this.allsubmit();
          }
        }
      });
    },
    //图片上传成功修改
    allsubmit(url) {
      let data = {
        userName: this.ruleForma.usera,
        label: this.ruleForma.userb,
        head: url||'',
        introduce: this.ruleForma.userc,
        age: this.ruleForma.userd,
        work: this.ruleForma.usere,
        address: this.ruleForma.userf,
        hobby: this.ruleForma.userg,
        nick: this.ruleForma.nick
      };
      axios("/user/save", "post", data).then((res) => {
        this.loading = false
        this.$emit("update:dialogVisible",false)
        localStorage.setItem("Userimg",res.head)
        this.$router.go(0)
      });
    },
    //移除文件
    remove(file, fileList) {
      this.fileList = fileList;
    },
    //选择文件
    changeFile(file, fileList) {
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
    getUser() {
      axios("/user/info", "get", {}).then((res) => {
        this.ruleForma.usera = res.userName;
        this.ruleForma.userb = res.label;
        this.ruleForma.userc = res.introduce;
        this.ruleForma.userd = res.age;
        this.ruleForma.usere = res.work;
        this.ruleForma.userf = res.address;
        this.ruleForma.userg = res.hobby;
        this.ruleForma.nick = res.nick;
        this.fileList = [{ url: this.getImg(res.head), status: "ready" }];
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
    .el-upload,
    .el-upload-list__item {
      width: 100px;
      height: 100px;
      line-height: 110px;
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