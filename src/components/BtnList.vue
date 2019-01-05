<!--按钮列表-->
<template>
  <div class="btn_wrap">
    <img src="../../static/images/btn-menu.png" class="menuBtn" @click="isShow=!isShow">
    <transition name="fade">
      <ul class="btn_list" v-show="isShow">
        <li class="btn_item" v-for="(btn, index) in btnList" :key="index" @click="goTo(index)"
            :class="{on:num===index}">
          <div class="before"></div>
          {{btn}}
          <div class="after"></div>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "BtnList",
    props: {
      btnList: Array
    },
    data() {
      return {
        isShow: false, //按钮列表切换显示隐藏
        num: '',
      }
    },
    mounted() {
    },
    methods: {
      goTo(index) {
        this.num = index;
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .btn_wrap
    position absolute
    top 4.7%
    right 2.6%
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
</style>
