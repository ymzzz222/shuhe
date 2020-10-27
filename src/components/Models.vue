<template>
  <div class="com_models">
    <!-- 添加产品 -->
    <el-dialog title="添加产品" :visible.sync="dialogVisiblea" width="900px">
      <el-form :model="ruleForma" ref="ruleForma" label-width="100px" class="demo-ruleForm">
        <el-form-item label="产品图片">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            ref="uploada"
            :limit="4"
            :on-exceed="handleExceed"
            :before-upload="beforeUpload"
            :auto-upload="false"
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
        <el-button @click="dialogVisiblea = false">取 消</el-button>
        <el-button type="primary" @click="submitForma('ruleForma')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 发表文章 -->
    <el-dialog title="发表文章" :visible.sync="dialogVisibleb" width="900px">
      <el-form :model="ruleFormb" ref="ruleFormb" label-width="100px" class="demo-ruleForm">
        <el-form-item label="缩略图">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            ref="uploadb"
            :limit="1"
            :before-upload="beforeUpload"
            :auto-upload="false"
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
        <el-button @click="dialogVisibleb = false">取 消</el-button>
        <el-button type="primary" @click="submitFormb('ruleFormb')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 活动 -->
    <el-dialog title="添加公告" :visible.sync="dialogVisiblec" width="900px">
      <el-form :model="ruleFormc" ref="ruleFormc" label-width="100px" class="demo-ruleForm">
        <el-form-item label="活动图片">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            ref="uploadc"
            :limit="4"
            :on-exceed="handleExceed"
            :before-upload="beforeUpload"
            :auto-upload="false"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <p class="el-upload__tip">最多可上传4张，只能上传jpg/png文件，且每张不超过2MB</p>
        </el-form-item>
        <el-form-item
          label="活动名称"
          prop="name"
          :rules="{required: true,message: '请输入活动名称', trigger: 'blur' }"
        >
          <el-input v-model="ruleFormc.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblec = false">取 消</el-button>
        <el-button type="primary" @click="submitFormc('ruleFormc')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 外链 -->
    <el-dialog title="添加外链" :visible.sync="dialogVisibled" width="900px">
      <el-form :model="ruleFormd" ref="ruleFormd" label-width="100px" class="demo-ruleForm">
        <el-form-item
          label="名称"
          prop="name"
          :rules="{required: true,message: '请输入名称', trigger: 'blur' }"
        >
          <el-input v-model="ruleFormd.name"></el-input>
        </el-form-item>
        <el-form-item
          label="地址"
          prop="name"
          :rules="{required: true,message: '请输入地址', trigger: 'blur' }"
        >
          <el-input v-model="ruleFormd.desc"></el-input>
        </el-form-item>
        <el-form-item
          label="来源"
          prop="name"
          :rules="{required: true,message: '请输入来源', trigger: 'blur' }"
        >
          <el-input v-model="ruleFormd.edit"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibled = false">取 消</el-button>
        <el-button type="primary" @click="submitFormd('ruleFormd')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- ID -->
    <el-dialog title="添加ID" :visible.sync="dialogVisiblee" width="900px">
      <el-form :model="ruleForme" ref="ruleForme" label-width="100px" class="demo-ruleForm">
        <el-form-item label="关联ID" prop="region" :rules="{required: true,message: '请选择', trigger: 'blur' }">
          <el-select v-model="ruleForme.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblee = false">取 消</el-button>
        <el-button type="primary" @click="submitForme('ruleForme')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加书籍 -->
    <el-dialog title="添加书籍" :visible.sync="dialogVisiblef" width="900px">
      <el-form :model="ruleFormf" ref="ruleFormf" label-width="100px" class="demo-ruleForm">
        <el-form-item label="书籍图片">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            ref="uploadf"
            :limit="1"
            :before-upload="beforeUpload"
            :auto-upload="false"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <p class="el-upload__tip">最多可上传1张，只能上传jpg/png文件，且每张不超过2MB</p>
        </el-form-item>
        <el-form-item
          label="书籍名称"
          prop="name"
          :rules="{required: true,message: '请输入书籍名称', trigger: 'blur' }"
        >
          <el-input v-model="ruleFormf.name"></el-input>
        </el-form-item>
        <el-form-item
          label="作者"
          prop="athor"
          :rules="{required: true,message: '请输入作者', trigger: 'blur' }"
        >
          <el-input v-model="ruleFormf.athor"></el-input>
        </el-form-item>
        <el-form-item
          label="出版社"
          prop="chu"
          :rules="{required: true,message: '请输入出版社', trigger: 'blur' }"
        >
          <el-input v-model="ruleFormf.chu"></el-input>
        </el-form-item>
        <el-form-item
          label="副标题"
          prop="fu"
          :rules="{required: true,message: '请输入副标题', trigger: 'blur' }"
        >
          <el-input v-model="ruleFormf.fu"></el-input>
        </el-form-item>
        <el-form-item
          label="译者"
          prop="yi"
          :rules="{required: true,message: '请输入译者', trigger: 'blur' }"
        >
          <el-input v-model="ruleFormf.yi"></el-input>
        </el-form-item>
        <el-form-item
          label="出版年"
          prop="nian"
          :rules="{required: true,message: '请输入出版年', trigger: 'blur' }"
        >
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleFormf.nian" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item
          label="定价"
          prop="ding"
          :rules="{required: true,message: '请输入定价', trigger: 'blur' }"
        >
          <el-input  type="number" v-model="ruleFormf.ding"></el-input>
        </el-form-item>
        <el-form-item
          label="ISBN"
          prop="isbn"
          :rules="{required: true,message: '请输入ISBN', trigger: 'blur' }"
        >
          <el-input v-model="ruleFormf.isbn"></el-input>
        </el-form-item>
        <el-form-item
          label="豆瓣评分"
          prop="dou"
          :rules="{required: true,message: '请输入豆瓣评分', trigger: 'blur' }"
        >
          <el-input  type="number" v-model="ruleFormf.dou"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(domain, index) in ruleFormf.domains"
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
            <el-button type="danger" @click.prevent="removeDomainf(domain)">删除</el-button>
          </div>
        </el-form-item>
        <el-button
          type="primary"
          class="addplay"
          plain
          icon="el-icon-circle-plus-outline"
          @click="addDomainf"
        >点击添加购买地址，最多可添加6个</el-button>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblef = false">取 消</el-button>
        <el-button type="primary" @click="submitFormf('ruleFormf')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加视频 -->
    <el-dialog title="添加视频" :visible.sync="dialogVisibleg" width="900px">
      <el-form :model="ruleFormg" ref="ruleFormg" label-width="100px" class="demo-ruleForm">
        <el-form-item label="视频缩略图">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            ref="uploadg"
            :limit="1"
            :before-upload="beforeUploadf"
            :auto-upload="false"
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
            action="https://jsonplaceholder.typicode.com/posts/"
            :limit="1"
            ref="uploadgtop"
            :auto-upload="false"
            :accept="'.mp4'"
            >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传MP4文件，且不超过10MB</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleg = false">取 消</el-button>
        <el-button type="primary" @click="submitFormg('ruleFormg')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加电影 -->
    <el-dialog title="添加电影" :visible.sync="dialogVisibleh" width="900px">
      <el-form :model="ruleFormh" ref="ruleFormh" label-width="100px" class="demo-ruleForm">
        <el-form-item label="电影图片">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            ref="uploadh"
            :limit="1"
            :before-upload="beforeUpload"
            :auto-upload="false"
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
        <el-button @click="dialogVisibleh = false">取 消</el-button>
        <el-button type="primary" @click="submitFormh('ruleFormh')">确 定</el-button>
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
  components: {
    quillEditor
  },
  props: ["type"],
  data() {
    return {
      //产品
      dialogVisiblea: false,
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
      //文章
      dialogVisibleb:true,
      ruleFormb: {
        name: "",
        desc: "",
        edit:'',
      },
      //活动
      dialogVisiblec:false,
      ruleFormc: {
        name: "",
      },
      //外链
      dialogVisibled:false,
      ruleFormd: {
        name: "",
        desc: "",
        edit:'',
      },
      //ID
      dialogVisiblee:false,
      ruleForme: {
        region:''
      },
      //书籍
      dialogVisiblef: false,
      ruleFormf: {
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
      //视频
      dialogVisibleg:false,
      ruleFormg: {
        name: "",
      },
      //电影
      dialogVisibleh: false,
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
    };
  },
  methods: {
    //选择文件超过4个
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 4 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    //选择文件前
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    beforeUploadf(file) {
      const isLt2M = file.size / 1024 / 1024 < 10;

      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 10MB!");
      }
      return isLt2M;
    },
    //提交产品
    submitForma(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs.uploada.submit();
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //提交文章
    submitFormb(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs.uploadb.submit();
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //提交活动
    submitFormc(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs.uploadc.submit();
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //提交外链
    submitFormd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //提交ID
    submitForme(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //提交书籍
    submitFormf(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs.uploadf.submit();
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //提交视频
    submitFormg(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs.uploadg.submit();
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //提交电影
    submitFormh(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs.uploadh.submit();
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    removeDomain(item) {
      var index = this.ruleForma.domains.indexOf(item);
      if (index !== -1) {
        this.ruleForma.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.ruleForma.domains.push({
        value: "",
        key: Date.now(),
      });
    },
    removeDomainf(item) {
      var index = this.ruleFormf.domains.indexOf(item);
      if (index !== -1) {
        this.ruleFormf.domains.splice(index, 1);
      }
    },
    addDomainf() {
      this.ruleFormf.domains.push({
        value: "",
        key: Date.now(),
      });
    },
    removeDomainh(item) {
      var index = this.ruleFormh.domains.indexOf(item);
      if (index !== -1) {
        this.ruleFormh.domains.splice(index, 1);
      }
    },
    addDomainh() {
      this.ruleFormh.domains.push({
        value: "",
        key: Date.now(),
      });
    },
  },
  watch: {
    type(req) {
      if (req == 1) {
        this.dialogVisiblea = true;
      }else if(req== 2){
        this.dialogVisibleb = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.com_models {
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
    &.edity{
      .el-form-item__content{
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