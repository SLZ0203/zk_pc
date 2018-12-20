<!--合作单位的表单-->
<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <div class="first">
      <el-form-item label="公司名称：" prop="name">
        <el-input v-model="ruleForm.name" style="width: 266px" placeholder="请输入公司名称"></el-input>
      </el-form-item>
      <el-form-item label="省份/地址：" prop="region">
        <el-select v-model="ruleForm.region" style="width: 160px" placeholder="请选择">
          <div class="title">所在省</div>
          <el-option v-for="(item,index) in produce" :key="index" :value="item.name">
            <span>{{item.name}}</span>
          </el-option>
        </el-select>
      </el-form-item>
    </div>
    <el-form-item label="联系人：" prop="man">
      <el-input v-model="ruleForm.man" style="width: 266px" placeholder="请输入您的姓名"></el-input>
    </el-form-item>
    <el-form-item label="职位：" prop="post">
      <el-input v-model="ruleForm.post" style="width: 266px" placeholder="请输入您的职位"></el-input>
    </el-form-item>
    <el-form-item label="手机号：" prop="phone">
      <el-input v-model="ruleForm.phone" style="width: 266px" placeholder="请输入您的手机号"></el-input>
    </el-form-item>
    <el-form-item label="服务类别：" prop="type">
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox v-for="(item,index) in serviceType" :label="item.title" name="type" :key="index"></el-checkbox>
      </el-checkbox-group>
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
    name: "FormTwo",
    props: {
      serviceType: Array
    },
    data() {
      return {
        ruleForm: {
          name: '', //医院名称
          region: '', //省份
          type: [], //服务类别
          man: '', //联系人
          post: '', //职位
          phone: '', //手机号
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
            {type: 'array', required: true, message: '请至少选择一个服务类别', trigger: 'change'}
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
            {required: true, message: '请输入您的手机号', trigger: 'blur'},
            {min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur'}
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
        const {ruleForm} = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //填写提交表单的逻辑
            this.$axios.post('http://yixin.581vv.com/api/hospital_users', {
              corporate_name: ruleForm.name,
              city: ruleForm.region,
              servicetype_id: ruleForm.type,
              position: ruleForm.post,
              contacts: ruleForm.man,
              phone: ruleForm.phone,
              remarks: ruleForm.desc
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
