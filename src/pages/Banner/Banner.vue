<!--轮播图页面-->
<template>
  <section class="banner_page">
    <Logo/>
    <BtnList/>
    <Swiper/>
    <div class="from_wrap" v-show="isShow">
      <div class="from_hd">
        <div class="choose">
          <span :class="{active:nowIndex===0}" @click="nowIndex=0">我是医院用户</span>
          <span :class="{active:nowIndex===1}" @click="nowIndex=1">我是合作单位</span>
        </div>
        <img src="../../../static/images/ic-close.png" @click="isShow=false">
      </div>
      <div class="from_bd">
        <!--医院用户-->
        <form-one v-if="nowIndex===0" v-bind:isShow="isShow"/>
        <!--合作单位-->
        <form-two v-else/>
      </div>
    </div>
    <img src="../../../static/images/more.png" class="more" @click="isShow=true">
    <Shade v-show="isShow" v-bind:isShow="isShow" @close="toClose"/>
  </section>
</template>


<script>
  import Logo from '../../components/Logo'
  import BtnList from '../../components/BtnList'
  import Swiper from '../../components/Swiper'
  import FormOne from '../../components/FormOne'
  import FormTwo from '../../components/FormTwo'
  import Shade from '../../components/Shade'

  export default {
    name: "Banner",
    data() {
      return {
        isShow: false,//表单的显示/隐藏
        nowIndex: 0,
      };
    },
    methods: {
      toClose(b) {
        this.isShow = b
      },
    },
    components: {
      Logo,
      BtnList,
      Swiper,
      FormOne,
      FormTwo,
      Shade,
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .banner_page
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    position relative
    .button_wrap
      position absolute
      left 50%
      transform translateX(-50%)
      bottom 21px
      z-index 100
      width 560px
      display flex
      justify-content space-between
    .from_wrap
      width: 676px;
      position absolute
      top 50%
      left 50%
      transform translate(-50%,-50%)
      z-index 1000
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 4px 10px 0 rgba(16, 45, 106, 0.15);
      border-radius: 8px;
      .from_hd
        width 100%
        height 75px
        background #4B63D6
        border-radius: 8px 8px 0 0;
        padding 0 25px
        box-sizing border-box
        display flex
        align-items center
        justify-content space-between
        .choose
          height 100%
          span
            position relative
            cursor pointer
            line-height 75px
            display inline-block
            width 193px
            height 100%
            font-size: 18px;
            text-align: center
            margin-right 40px
            font-family: FZLTZHK--GBK1-0;
            font-weight: 600;
            color: rgba(255, 255, 255, 1);
            opacity: 0.8;
            &.active
              font-size: 26px;
              font-weight: 600;
              opacity: 1;
              color: rgba(255, 255, 255, 1);
              &::after
                content ''
                position absolute
                left 50%
                bottom 0
                width 0
                height 0
                border 15px solid
                border-color transparent transparent #fff transparent
                transform translateX(-50%)
        img
          cursor pointer
      .from_bd
        width 100%
        padding 25px 25px 0
        box-sizing border-box
        .first
          display flex
          position relative
        .btn_right
          text-align right
    .more
      cursor pointer
      z-index 100
      position absolute
      bottom 20px
      right 51px
</style>
