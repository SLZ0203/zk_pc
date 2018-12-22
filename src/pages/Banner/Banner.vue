<!--轮播图页面-->
<template>
  <section class="banner_page">
    <Logo :logoImg="config.logo"/>
    <div class="btn_wrap">
      <img src="../../../static/images/btn-menu.png" class="menuBtn" @click="btnShow=!btnShow">
      <transition name="fade">
        <ul class="btn_list" v-show="btnShow">
          <li class="btn_item" v-for="(btn, index) in btnList" :key="index" @click="goTo(index)"
              :class="{on:btnNum===index}">
            <div class="before"></div>
            {{btn}}
            <div class="after"></div>
          </li>
        </ul>
      </transition>
    </div>
    <transition name="fade">
      <router-view/>
    </transition>
    <div class="from_wrap" v-show="fromShow">
      <div class="from_hd">
        <div class="choose">
          <span :class="{active:nowIndex===0}" @click="nowIndex=0">我是医院用户</span>
          <span :class="{active:nowIndex===1}" @click="nowIndex=1">我是合作单位</span>
        </div>
        <img src="../../../static/images/ic-close.png" @click="fromShow=false">
      </div>
      <div class="from_bd">
        <!--医院用户-->
        <form-one v-if="nowIndex===0" v-bind:fromShow="fromShow" @close="toClose" :focus="focus" :produce="produce"/>
        <!--合作单位-->
        <form-two v-else :serviceType="serviceType" :produce="produce"/>
      </div>
    </div>
    <img src="../../../static/images/more.png" class="more" @click="fromShow=true">
    <Shade v-bind:fromShow="fromShow" @close="toClose" v-show="fromShow"/>
  </section>
</template>


<script>
  import Logo from '../../components/Logo'
  import FormOne from '../../components/FormOne'
  import FormTwo from '../../components/FormTwo'
  import Shade from '../../components/Shade'
  import {baseUrl} from '../../api'

  export default {
    name: "Banner",
    data() {
      return {
        btnShow: false, //按钮列表显示/隐藏
        btnNum: 0,
        fromShow: false,//表单的显示/隐藏
        nowIndex: 0,
        btnList: [], //右边按钮列表
        config: {}, //网站基本配置信息
        focus: [], //关注重点
        serviceType: [], //服务类型
        produce: [] //省市列表
      };
    },
    mounted() {
      let result;
      //获取右边按钮列表
      this.$axios.get(baseUrl + '/api/get_navs').then(res => {
        result = res.data.data;
        const arr = [];
        result.forEach(item => {
          arr.push(item.name);
        })
        this.btnList = arr
      }).catch(error => {
        console.log(error);
      });
      //获取网站基本配置信息
      this.$axios.get(baseUrl + '/api/config').then(res => {
        result = res.data;
        this.config = result.data;
      }).catch(error => {
        console.log(error);
      });
      //获取省份
      this.$axios.get(baseUrl + '/api/get_province_city').then(res => {
        result = res.data;
        this.produce = result.data;
      });
      //获取关注重点
      this.$axios.get(baseUrl + '/api/focus').then(res => {
        result = res.data.data;
        this.focus = result;
      }).catch(error => {
        console.log(error);
      });
      //获取服务类型
      this.$axios.get(baseUrl + '/api/service_type').then(res => {
        result = res.data;
        this.serviceType = result.data;
      }).catch(error => {
        console.log(error);
      });
    },
    methods: {
      toClose(b) {
        this.fromShow = b
      },
      goTo(index) {
        this.btnNum = index;
        if (this.btnNum === 0) {
          return this.$router.push('/one')
        } else if (this.btnNum === 1) {
          return this.$router.push('/two')
        } else if (this.btnNum === 2) {
          return this.$router.push('/three')
        } else if (this.btnNum === 3) {
          return this.$router.push('/four')
        } else if (this.btnNum === 4) {
          return this.$router.push('/five')
        }
      }
    },
    components: {
      Logo,
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
          &.on
            border: 1px solid rgba(255, 255, 255, 1)
          &:hover .after
            transform scaleX(100)
            background #fff
          &:hover .before
            transform scaleX(100)
            background #fff
          .before, .after
            width: 1px;
            height 1px
            position absolute
            left 50%
            transition: all 280ms ease-in-out;
          .before
            top -1px
          .after
            bottom: -1px;

      .fade-enter-active, .fade-leave-active
        transition: opacity .8s
      .fade-enter, .fade-leave-active
        opacity: 0
    .from_wrap
      width: 676px;
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
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
    .fade-enter-active, .fade-leave-avtive
      transition: opacity 1s
    .fade-enter, .fade-leave-to
      opacity: 0
</style>
