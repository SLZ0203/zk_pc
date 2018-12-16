<!--医院用户的表单-->
<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <div class="first">
      <el-form-item label="医院名称：" prop="name">
        <el-input v-model="ruleForm.name" style="width: 266px" placeholder="请输入医院名称"></el-input>
      </el-form-item>
      <el-form-item label="省份：" prop="region">
        <el-select v-model="ruleForm.region" style="width: 160px" placeholder="请选择">
          <div class="title">所在省</div>
          <el-option v-for="item in produce" :key="item.value" :label="item.label" :value="item.value">
            <span style="float: left">{{item.label}}</span>
            <span style="float: right; font-size: 14px">{{ item.value }}</span>
          </el-option>
        </el-select>
      </el-form-item>
    </div>
    <el-form-item label="关注重点：" prop="type">
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox label="医院安全" name="type"></el-checkbox>
        <el-checkbox label="员工服务" name="type"></el-checkbox>
        <el-checkbox label="后勤管理" name="type"></el-checkbox>
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
      isShow: Boolean
    },
    data() {
      return {
        ruleForm: {
          name: '', //医院名称
          region: '', //省份
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
          region: [
            {required: true, message: '请选择您的省份', trigger: 'change'}
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
        produce: [
          {value: 'Beijing', label: '北京'},
          {value: 'Tianjin', label: '天津'},
          {value: 'Hebei', label: '河北'},
          {value: 'Shanxi', label: '山西'},
          {value: 'Neimenggu', label: '内蒙古'},
          {value: 'Jilin', label: '吉林'},
          {value: 'Heilongjiang', label: '黑龙江'},
          {value: 'Shanghai', label: '上海'},
          {value: 'Jiangsu', label: '江苏'},
          {value: 'Zhejiang', label: '浙江'},
          {value: 'Fujian', label: '福建'},
          {value: 'Guangdong', label: '广东'},
          {value: 'Hainan', label: '海南'},
          {value: 'Yunnan', label: '云南'},
        ]
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //填写提交表单的逻辑
            console.log(this.ruleForm);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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

  .title
    line-height 30px
    font-size: 16px;
    font-family: FZLTZHK--GBK1-0;
    font-weight: 600;
    color: rgba(53, 53, 53, 1);
    padding 0 20px
</style>
