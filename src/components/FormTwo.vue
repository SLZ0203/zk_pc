<!--合作单位的表单-->
<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <div class="first">
      <el-form-item label="公司名称：" prop="name">
        <el-input v-model="ruleForm.name" style="width: 266px" placeholder="请输入公司名称"></el-input>
      </el-form-item>
      <div class="region">
        <span class="shengfen">省份:</span>
        <input type="text" :placeholder="city?city:'请选择'" @click="regionShow=!regionShow"
               readonly="readonly" :class="{noregion: regShow}">
        <i class="iconfont icon-shangjiantou" v-if="!regionShow" @click="regionShow=true"></i>
        <i class="iconfont icon-xiajiantou" v-else @click="regionShow=false"></i>
        <div class="region_wrap" v-show="regionShow">
          <div class="now_city">
            <span class="now">当前省份：</span>
            <span class="city">{{region}}</span>
            <span class="now">当前城市：</span>
            <span class="city">{{city}}</span>
          </div>
          <div class="title">所在省</div>
          <ul class="pro_list">
            <li class="pro_item" v-for="(item,index) in produce" :key="index"
                @click="choosePro(index,item.name,item.id)" :class="{select:proNum===index}">
              {{item.name}}
            </li>
          </ul>
          <div class="title">所在市/区</div>
          <ul class="city_list">
            <li class="city_item" v-for="(item,index) in cityArr[proNum]" :key="index"
                :class="{select:cityNum ===index}"
                @click="chooseCity(item.name,item.id,index)">
              {{item.name}}
            </li>
          </ul>
          <div class="btn_wrap">
            <span class="btn1" @click="cancleChoose">取消</span>
            <span class="btn2" @click="chooseOver">确定</span>
          </div>
        </div>
        <div class="error" v-show="regShow">请选择您的省份/市区</div>
      </div>
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
    <div class="type_wrap">
      <span class="name">服务类别：</span>
      <div class="check_wrap" v-show="serviceType">
        <div class="item" v-for="(item,index) in serviceType" :key="index" @click="chooseType(item.id,index)">
          <div class="checkbox" :class="{ischecked:typeNum===index}"></div>
          <div class="checktext">{{item.title}}</div>
        </div>
      </div>
      <p class="error" v-show="typeShow">请选择您的关注重点</p>
    </div>
    <el-form-item label="备注信息：" prop="desc">
      <el-input type="textarea" v-model="ruleForm.desc" placeholder="限制120字以内" maxlength="120"></el-input>
    </el-form-item>
    <el-form-item class="btn_right">
      <el-button @click="resetForm('ruleForm')">取消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    name: "FormTwo",
    props: {
      serviceType: Array,
      produce: Array
    },
    data() {
      return {
        cityArr: [],
        regionShow: false,
        region: '',
        city: '',
        proNum: '',
        cityNum: '',
        regionId: '',
        cityId: '',
        regShow: false, //未选省份提示
        typeId: '', //服务类别
        typeShow: false,
        typeNum: '',
        ruleForm: {
          name: '', //医院名称
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
      }
    },
    mounted() {
      const arr = [];
      this.produce.forEach(item => {
        arr.push(item.citys)
      });
      this.cityArr = arr
    },
    methods: {
      submitForm(formName) {
        if (!this.region && !this.city) {
          this.regShow = true
        }
        if (!this.typeId) {
          this.typeShow = true
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //填写提交表单的逻辑
            this.$axios.post('http://yixin.581vv.com/api/cooperation_unit', {
              corporate_name: this.ruleForm.name,
              city: this.cityId,
              servicetype_id: this.typeId,
              position: this.ruleForm.post,
              contacts: this.ruleForm.man,
              phone: this.ruleForm.phone,
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
      choosePro(index, pName, pId) {
        this.proNum = index;
        this.region = pName;
        this.regionId = pId;
      },
      chooseCity(cName, cId, index) {
        this.cityNum = index;
        this.city = cName;
        this.cityId = cId
      },
      cancleChoose() {
        this.city = '';
        this.regShow = true;
        this.regionShow = false;
      },
      chooseOver() {
        if (!this.region && !this.city) {
          this.regShow = true;
        } else {
          this.regionShow = false;
          this.regShow = false;
        }
      },
      resetForm(formName) {
        this.typeNum = '';
        this.region = '';
        this.city = '';
        this.$emit('close',false);
        this.$refs[formName].resetFields();
      },
      chooseType(id, index) {
        if (this.typeNum !== index) {
          this.typeId = id;
          this.typeNum = index;
          this.typeShow = false
        } else {
          this.typeId = '';
          this.typeNum = '';
        }
      },
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
      box-sizing: border-box;
      &::before
        content: '*';
        color: #f56c6c;
        margin-right: 4px;
    i
      cursor pointer
      position absolute
      right 11px
      top 13px
      color #647180
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
      box-sizing border-box;
      -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
      transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
      &.noregion
        border-color: #f56c6c;
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
    .region_wrap
      width: 445px;
      padding 22px 20px 14px
      box-sizing border-box
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 4px 10px 0px rgba(16, 45, 106, 0.15);
      border-radius: 8px;
      border: 1px solid #e4e7ed;
      position absolute
      right 0
      z-index 2034
      .now_city
        margin-bottom 22px
        font-size: 14px;
        font-family: FZLTHK--GBK1-0;
        .now
          color: #888888
        .city
          color #353535
      .title
        line-height 30px
        font-size: 16px;
        font-family: FZLTZHK--GBK1-0;
        font-weight: 600;
        color: rgba(53, 53, 53, 1);
      .pro_list, .city_list
        background #fff
        height 100px
        overflow auto
        list-style: none;
        padding: 6px 0;
        .pro_item, .city_item
          float left
          font-size: 14px;
          padding: 0 20px;
          text-align: center
          color: rgba(136, 136, 136, 1);
          height: 34px;
          line-height: 34px;
          box-sizing: border-box;
          cursor: pointer;
          &:hover
            background-color: #f5f7fa;
          &.select
            color: rgba(77, 103, 211, 1);
      .btn_wrap
        margin-top 33px
        text-align right
        span
          display inline-block
          width: 50px;
          height: 24px;
          font-size: 14px;
          font-family: FZLTHK--GBK1-0;
          font-weight: 400;
          text-align: center
          line-height 24px
          cursor pointer
        .btn1
          color: rgba(53, 53, 53, 1);
          background: rgba(234, 235, 244, 1);
        .btn2
          margin-left 20px
          color: rgba(255, 255, 255, 1);
          background: rgba(77, 103, 211, 1);

  .type_wrap
    width 100%
    height 40px
    margin-bottom 20px
    .name
      display inline-block
      width 100px
      text-align: right;
      font-size: 14px;
      font-family: FZLTHK--GBK1-0;
      color: rgba(100, 113, 129, 1);
      line-height: 40px;
      padding: 0 12px 0 0;
      box-sizing: border-box;
      &::before
        content: '*';
        color: #f56c6c;
        margin-right: 4px;
    .check_wrap
      height 100%
      display inline-block
      .item
        line-height 40px
        cursor: pointer;
        margin-right 30px
        align-items center
        display: inline-block;
        .checkbox
          display: inline-block;
          border: 1px solid #dcdfe6;
          border-radius: 4px;
          box-sizing: border-box;
          width: 16px;
          height: 16px;
          background-color: rgba(234, 235, 244, 1);
          background-size 100%
          background-repeat no-repeat
          z-index: 1;
          -webkit-transition: border-color .25s cubic-bezier(.71, -.46, .29, 1.46), background-color .25s cubic-bezier(.71, -.46, .29, 1.46);
          transition: border-color .25s cubic-bezier(.71, -.46, .29, 1.46), background-color .25s cubic-bezier(.71, -.46, .29, 1.46)
          &:hover
            border-color: #409EFF;
          &.ischecked
            background-image url("../../static/images/radio-sel.png")
        .checktext
          display: inline-block;
          color: #606266;
          font-weight: 500;
          font-size: 14px;
          padding-left 6px
    .error
      color: #f56c6c;
      font-size: 12px;
      line-height: 1;
      padding-top: 4px;
      margin-left 100px
</style>
