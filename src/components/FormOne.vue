<!--医院用户的表单-->
<template>
  <section class="from_one">
    <div class="first">
      <div class="hospital_wrap">
        <span class="name">医院名称：</span>
        <input type="text" placeholder="请输入医院名称" v-model="name" :class="{noregion: nameShow}">
        <p class="error" v-show="nameShow">请输入医院名称</p>
      </div>
      <div class="region">
        <span class="shengfen">省份:</span>
        <input type="text" :placeholder="region?region:'请选择'" @click="regionShow=!regionShow"
               readonly="readonly" :class="{noregion: regShow}">
        <i class="iconfont icon-shangjiantou" v-if="!regionShow" @click="regionShow=true"></i>
        <i class="iconfont icon-xiajiantou" v-else @click="regionShow=false"></i>
        <div class="region_wrap" v-show="regionShow">
          <div class="now_city">
            <span class="now">当前省份：</span>
            <span class="city">{{region}}</span>
          </div>
          <div class="title">所在省</div>
          <ul class="pro_list">
            <li class="pro_item" v-for="(item,index) in produce" :class="{select:proNum===index}" :key="index"
                @click="choosePro(index,item.name,item.id)">
              {{item.name}}
            </li>
          </ul>
          <div class="btn_wrap">
            <span class="btn1" @click="cancleChoose">取消</span>
            <span class="btn2" @click="chooseOver">确定</span>
          </div>
        </div>
        <div class="error" v-show="regShow">请选择您的省份</div>
      </div>
    </div>
    <div class="type_wrap">
      <span class="name">关注重点：</span>
      <div class="check_wrap" v-show="focus">
        <div class="item" v-for="(item,index) in focus" :key="index" @click="chooseType(item.id,index)">
          <div class="checkbox" :class="{ischecked:typeNum===index}"></div>
          <div class="checktext">{{item.title}}</div>
        </div>
      </div>
      <p class="error" v-show="typeShow">请选择您的关注重点</p>
    </div>
    <div class="hospital_wrap">
      <span class="name">联系人：</span>
      <input type="text" placeholder="请输入您的姓名" v-model="man" :class="{noregion: manShow}">
      <p class="error" v-show="manShow">请输入您的姓名</p>
    </div>
    <div class="hospital_wrap">
      <span class="name">职位：</span>
      <input type="text" placeholder="请输入您的职位" v-model="post" :class="{noregion: postShow}">
      <p class="error" v-show="postShow">请输入您的职位</p>
    </div>
    <div class="hospital_wrap">
      <span class="name">联系方式：</span>
      <input type="tel" v-model="phone" placeholder="请输入您的联系方式" oninput="value=value.replace(/[^\d]/g,'')"
             maxlength="11" :class="{noregion: telShow}">
      <span class="error" v-show="telShow">请输入正确的联系方式</span>
    </div>
    <div class="desc_wrap">
      <span class="title">备注信息：</span>
      <textarea v-model="desc" placeholder="限制120字以内" maxlength="120"></textarea>
    </div>
    <div class="btn_wrap">
      <button @click="resetForm" class="btn1">取消</button>
      <button type="primary" @click="submitForm" class="btn2">确定</button>
    </div>
  </section>
</template>
<script>
  export default {
    name: "FromOne",
    props: {
      isShow: Boolean,
      focus: Array,
      produce: Array,
    },
    data() {
      return {
        regionShow: false,
        region: '',
        proNum: '',
        regionId: '',
        regShow: false, //未选省份提示
        typeId: '',
        typeNum: '',
        typeShow: false, //未选关注重点提示
        name: '', //医院名称
        nameShow: false,//未填医院名称提示
        man: '', //联系人
        manShow: false, //未填联系人姓名提示
        post: '', //职位
        postShow: false,//未填职位提示
        phone: '', //手机号
        telShow: false, //未填电话提示
        desc: '',  //备注信息
      }
    },
    mounted() {
    },
    methods: {
      submitForm() {
        if (!this.name) {
          this.nameShow = true;
          setTimeout(() => {
            this.nameShow = false;
          }, 3000)
        } else if (!this.region && !this.city) {
          this.regShow = true;
          setTimeout(() => {
            this.regShow = false;
          }, 3000)
        } else if (!this.typeId) {
          this.typeShow = true;
          setTimeout(() => {
            this.typeShow = false;
          }, 3000)
        } else if (!this.man) {
          this.manShow = true;
          setTimeout(() => {
            this.manShow = false;
          }, 3000)
        } else if (!this.post) {
          this.postShow = true;
          setTimeout(() => {
            this.postShow = false;
          }, 3000)
        } else if (!this.isRightPhone) {
          this.telShow = true;
          setTimeout(() => {
            this.telShow = false;
          }, 3000)
        } else {
          //填写提交表单的逻辑
          this.$axios.post('http://www.sinomis.com/api/hospital_users', {
            hospital_name: this.name,
            province_id: this.regionId,
            focus_id: this.typeId,
            position: this.post,
            contacts: this.man,
            contact_info: this.phone,
            remarks: this.desc
          }).then(res => {
            const result = res.data;
            alert(result.msg);
            this.$emit('close', false);
            this.name = '';
            this.cityId = '';
            this.typeNum = '';
            this.post = '';
            this.man = '';
            this.phone = '';
            this.desc = '';
          }).catch(error => {
            console.log(error);
          })
        }
      },
      resetForm() {
        this.name = '';
        this.nameShow = false;
        this.region = '';
        this.regShow = false;
        this.typeNum = '';
        this.typeShow = false;
        this.man = '';
        this.manShow = false;
        this.post = '';
        this.postShow = false;
        this.phone = '';
        this.telShow = false;
        this.$emit('close', false);
      },
      choosePro(index, item, id) {
        this.proNum = index;
        this.region = item;
        this.regionId = id;
      },
      chooseOver() {
        this.regShow = false;
        if (!this.region) {
          this.regShow = true;
        } else {
          this.regionShow = false;
        }
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
      cancleChoose() {
        this.region = '';
        this.regShow = true;
        this.regionShow = false;
      }
    },
    computed: {
      isRightPhone() {
        if (this.phone.length < 7) {
          return false
        } else {
          return true
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .from_one
    padding-bottom 19px
    .first
      display flex
      position relative
    .hospital_wrap
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
      input
        width 255px
        height 40px
        font-size 14px
        outline 0
        cursor: pointer;
        background-color: #fff;
        border-radius: 8px;
        padding-left 15px
        border: 1px solid rgba(216, 222, 231, 1);
        box-sizing border-box;
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        &.noregion
          border-color: #f56c6c;
        &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
          color: #ccc;
        }
        &::-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          color: #ccc;
        }
        &::-moz-placeholder { /* Mozilla Firefox 19+ */
          color: #ccc;
        }
        &::-ms-input-placeholder { /* Internet Explorer 10-11 */
          color: #ccc;
        }
      .error
        color: #f56c6c;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;

    .region
      width 265px
      height 40px
      position relative
      margin-bottom 20px
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
        .pro_list
          background #fff
          height 137px
          overflow auto
          list-style: none;
          padding: 6px 0;
          .pro_item
            float left
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
      margin-bottom 20px
      display flex
      .name
        display inline-block
        width 100px
        text-align: right;
        font-size: 14px;
        font-family: FZLTHK--GBK1-0;
        color: rgba(100, 113, 129, 1);
        padding: 0 12px 0 0;
        box-sizing: border-box;
        margin-top 3px
        &::before
          content: '*';
          color: #f56c6c;
          margin-right: 4px;
      .check_wrap
        width 80%
        .item
          cursor: pointer;
          margin-right 30px
          display: inline-block;
          margin-bottom 8px
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
    .error
      color: #f56c6c;
      font-size: 12px;
      line-height: 1;
      padding-top: 4px;
      margin-left 100px

    .desc_wrap
      .title
        display inline-block
        width 100px
        text-align: right;
        font-size: 14px;
        font-family: FZLTHK--GBK1-0;
        color: rgba(100, 113, 129, 1);
        padding: 0 12px 0 0;
        box-sizing: border-box;
      textarea
        font-family: FZLTHK--GBK1-0;
        resize: none;
        padding: 5px 15px;
        line-height: 1.5;
        box-sizing: border-box;
        width: 80%
        height: 74px;
        font-size: 14px;
        color: #606266;
        background-color: #fff;
        background-image: none;
        border: 1px solid #dcdfe6;
        border-radius: 8px;
        outline 0
        &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
          color: #ccc;
        }
        &::-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          color: #ccc;
        }
        &::-moz-placeholder { /* Mozilla Firefox 19+ */
          color: #ccc;
        }
        &::-ms-input-placeholder { /* Internet Explorer 10-11 */
          color: #ccc;
        }
    .btn_wrap
      text-align right
      margin-top 20px
      button
        width: 101px;
        height: 37px;
        display: inline-block;
        line-height: 1;
        cursor: pointer;
        color: #353535;
        text-align: center;
        outline: 0;
        margin: 0;
        border none
        transition: .1s;
        font-weight: 400;
        font-size: 20px;
        font-family: FZLTHK--GBK1-0;
        &:hover
          opacity 0.6
      .btn1
        color #353535
        background: rgba(234, 235, 244, 1);
      .btn2
        margin-left 17px
        color #fff
        background: rgba(77, 103, 211, 1);
</style>
