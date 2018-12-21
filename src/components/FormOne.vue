<!--医院用户的表单-->
<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <div class="first">
      <el-form-item label="医院名称：" prop="name">
        <el-input v-model="ruleForm.name" style="width: 266px" placeholder="请输入医院名称"></el-input>
      </el-form-item>
      <div class="region">
        <span class="shengfen">省份:</span>
        <input type="text" :placeholder="ruleForm.region?ruleForm.region:'请选择'" @click="regionShow=!regionShow"
               readonly="readonly">
        <ul class="pro_list" v-show="regionShow">
          <div class="title">所在省</div>
          <li class="pro_item" v-for="(item,index) in produce" :class="{select:num===index}" :key="index"
              @click="choose(index,item.name,item.id)">
            {{item.name}}
          </li>
        </ul>
        <div class="error" v-show="hintShow">请选择您的省份</div>
      </div>
    </div>
    <el-form-item label="关注重点：" prop="type">
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox v-for="(item,index) in focus" :label="item.title" name="type" :key="index"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="联系人：" prop="man">
      <el-input v-model="ruleForm.man" style="width: 266px" placeholder="请输入您的姓名"></el-input>
    </el-form-item>
    <el-form-item label="职位：" prop="post">
      <el-input v-model="ruleForm.post" style="width: 266px" placeholder="请输入您的职位"></el-input>
    </el-form-item>
    <el-form-item label="联系方式：" prop="phone">
      <el-input v-model="ruleForm.phone" style="width: 266px" placeholder="请输入您的联系方式"></el-input>
    </el-form-item>
    <el-form-item label="备注信息：" prop="desc">
      <el-input type="textarea" v-model="ruleForm.desc" placeholder="限制120字以内" maxlength="120"></el-input>
    </el-form-item>
    <el-form-item class="btn_right">
      <el-button @click="resetForm('ruleForm')">清空</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    name: "FromOne",
    props: {
      isShow: Boolean,
      focus: Array
    },
    data() {
      return {
        regionShow: false,
        num: 0,
        hintShow: false,
        ruleForm: {
          name: '', //医院名称
          region: '', //省份
          regionId: '',
          type: [], //关注重点
          man: '', //联系人
          post: '', //职位
          phone: '', //联系方式
          desc: '',  //备注信息
        },
        rules: {
          name: [
            {required: true, message: '请输入医院名称', trigger: 'blur'},
            {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
          ],
          type: [
            {type: 'array', required: true, message: '请至少选择一个关注重点', trigger: 'change'}
          ],
          man: [
            {required: true, message: '请输入您的姓名', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
          ],
          post: [
            {required: true, message: '请输入您的职位', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入您的联系方式', trigger: 'blur'},
            {min: 2, max: 11, message: '长度在 2 到 11 个字符', trigger: 'blur'}
          ],
        },
        produce: []
      }
    },
    mounted() {
      this.$axios.get('http://yixin.581vv.com/api/get_province_city').then(res => {
        const result = res.data;
        this.produce = result.data;
      })
    },
    methods: {
      submitForm(formName) {
        if (!this.ruleForm.region) {
          return this.hintShow = true
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //填写提交表单的逻辑
            this.$axios.post('http://yixin.581vv.com/api/hospital_users', {
              hospital_name: this.ruleForm.name,
              province: this.regionId,
              focus_id: this.ruleForm.type,
              position: this.ruleForm.post,
              contacts: this.ruleForm.man,
              contact_info: this.ruleForm.phone,
              remarks: this.ruleForm.desc
            }).then(res => {
              const result = res.data;
              alert(result.msg);
              this.$emit('close', false);
            }).catch(error => {
              console.log(error);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      choose(index, item, id) {
        this.num = index;
        this.ruleForm.region = item;
        this.regionId = id;
        this.regionShow = false;
        this.hintShow = false
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .first
    display flex
    position relative

  .btn_right
    text-align right

  .region
    width 265px
    position relative
    .shengfen
      display inline-block
      width 95px
      text-align: right;
      font-size: 14px;
      font-family: FZLTHK--GBK1-0;
      color: rgba(100, 113, 129, 1);
      line-height: 40px;
      padding: 0 12px 0 0;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      &::before
        content: '*';
        color: #f56c6c;
        margin-right: 4px;
    input
      width 160px
      height 40px
      font-size 14px
      outline 0
      cursor: pointer;
      background-color: #fff;
      border-radius: 8px;
      padding-left 15px
      border: 1px solid rgba(216, 222, 231, 1);
      box-sizing border-box
      &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        color: #333;
      }
      &::-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #333;
      }
      &::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #333;
      }
      &::-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #333;
      }

    .error
      color: #f56c6c;
      font-size: 12px;
      line-height: 1;
      padding-top: 4px;
      padding-left 100px
    .pro_list
      background #fff
      position absolute
      z-index 2034
      right 0
      width 160px
      height 270px
      overflow hidden
      list-style: none;
      padding: 6px 0;
      box-sizing: border-box;
      border-radius: 4px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
      margin: 5px 0;
      border: 1px solid #e4e7ed;
      .pro_item
        font-size: 14px;
        padding: 0 20px;
        text-align: center
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: rgba(136, 136, 136, 1);
        height: 34px;
        line-height: 34px;
        box-sizing: border-box;
        cursor: pointer;
        &:hover
          background-color: #f5f7fa;
        &.select
          color: rgba(77, 103, 211, 1);

  .title
    line-height 30px
    font-size: 16px;
    font-family: FZLTZHK--GBK1-0;
    font-weight: 600;
    color: rgba(53, 53, 53, 1);
    padding 0 20px
</style>
