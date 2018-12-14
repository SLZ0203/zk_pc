<!--首页-->
<template>
  <section class="home_wrap">
    <Logo/>
    <img src="../../../static/images/标题.png" class="titleImg">
    <div class="btn_wrap">
      <img src="../../../static/images/btn-menu.png" class="menuBtn" @click="isShow=!isShow">
      <transition name="fade">
        <ul class="btn_list" v-show="isShow">
          <li class="btn_item" v-for="(btn, index) in btnList" :key="index" @click="goTo(index)">
            <div class="before"></div>
            {{btn}}
            <div class="after"></div>
          </li>
        </ul>
      </transition>
    </div>
    <transition name="fade">
      <div class="code_wrap" v-show="isShow2">
        <div class="top_wrap">
          <img src="../../../static/images/中科医信二维码.png" alt="">
          <div class="text">
            <p class="p1">关注公众号</p>
            <p class="p2">快速，及时了解
              更多医院相关服务</p>
          </div>
        </div>
        <div class="sanjiao"></div>
      </div>
    </transition>
    <transition name="fade">
      <div class="statement" :class="{left:isShow2}" v-show="isShow1">
        CopyrightTM2018 SINOMIS. All Rights Reserved
        <span class="line"></span>
        京IP备17052614号-2
        <div class="sanjiao"></div>
      </div>
    </transition>
    <div class="test"></div>
    <div class="icon_wrap">
      <img src="../../../static/images/ic-版权.png" @mouseenter="isShow1=true" @mouseleave="isShow1=false">
      <img src="../../../static/images/ic-二维码.png" @mouseenter="isShow2=true" @mouseleave="isShow2=false">
    </div>
  </section>
</template>

<script>
  import Logo from '../../components/Logo'
  import BtnList from '../../components/BtnList'

  export default {
    name: "Home",
    data() {
      return {
        num: '',
        isShow: false, //按钮列表显示/隐藏
        isShow1: false, //声明显示/隐藏
        isShow2: false, //二维码显示/隐藏
        btnList: ['应急联动', '机电运维', '后勤管理', '安全监测', '职工服务'] //右边按钮列表
      }
    },
    methods: {
      goTo(index) {
        this.num = index;
        if (this.num === 0) {
          return this.$router.push('/one')
        } else if (this.num === 1) {
          return this.$router.push('/two')
        } else if (this.num === 2) {
          return this.$router.push('/three')
        } else if (this.num === 3) {
          return this.$router.push('/four')
        } else if (this.num === 4) {
          return this.$router.push('/five')
        }
      }
    },
    components: {
      Logo,
      BtnList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .home_wrap
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    background url("../../../static/images/bg.png") no-repeat
    position relative
    .titleImg
      width 635px
      height 342px
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
    .btn_wrap
      position absolute
      top 51px
      right 52px
      z-index 100
      width 106px
      text-align: center
      .menuBtn
        width 87px
        height 87px
        cursor pointer
        margin-bottom 37px
      .btn_list
        .btn_item
          width 100%
          height 34px
          text-align: center
          line-height 34px
          font-size: 20px;
          font-family: FZLTZHK--GBK1-0;
          font-weight: 600;
          color: rgba(255, 255, 255, 1)
          margin-bottom 30px
          box-sizing border-box
          cursor pointer
          position relative
          &:hover .after
            transform scaleX(100)
            background #fff
          &:hover .before
            transform scaleX(100)
            background #fff
          .before,.after
            width: 1px;
            height 1px
            position absolute
            left 50%
            transition: all 280ms ease-in-out;
          .before
            top 0
          .after
            bottom: 0;
    .fade-enter-active, .fade-leave-active
      transition: opacity 1s
    .fade-enter, .fade-leave-active
      opacity: 0
    .code_wrap
      position absolute
      bottom 112px
      right 59px
      .top_wrap
        width: 330px;
        height: 153px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0 4px 10px 0 rgba(16, 45, 106, 0.15);
        border-radius: 8px;
        padding 8px 18px
        box-sizing border-box
        display flex
        .text
          margin-left 15px
          .p1
            font-size: 16px;
            font-family: FZLTZHK--GBK1-0;
            font-weight: 600;
            color: rgba(53, 53, 53, 1);
            margin-top 30px
          .p2
            font-size: 16px;
            font-family: FZLTHK--GBK1-0;
            font-weight: 400;
            color: rgba(178, 178, 178, 1);
            margin-top 18px
      .sanjiao
        width 0
        height 0
        border 15px solid
        border-color #fff transparent transparent transparent
        position absolute
        bottom -30px
        right 40px
    .statement
      width: 446px;
      height: 36px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 4px 10px 0 rgba(16, 45, 106, 0.15);
      border-radius: 8px;
      line-height 36px
      font-size: 12px;
      padding 0 18px
      box-sizing border-box
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(53, 53, 53, 1);
      position absolute
      bottom 112px
      right 125px
      &.left
        right 426px
      .line
        width 1px
        height 15px
        display inline-block
        background: rgba(229, 229, 229, 1);
        margin 0 9px
      .sanjiao
        width 0
        height 0
        border 15px solid
        border-color #fff transparent transparent transparent
        position absolute
        bottom -30px
        right 40px
    .icon_wrap
      position absolute
      bottom 39px
      right 92px
      img
        cursor pointer
        margin-left 20px
</style>
