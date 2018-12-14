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
    data() {
      return {
        isShow: false, //按钮列表切换显示隐藏
        num: '',
        btnList: ['应急联动', '机电运维', '后勤管理', '安全监测', '职工服务',] //右边按钮列表
      }
    },
    mounted() {
      this.$root.eventHub.$on('slideTab', this.slideTab);
    },
    methods: {
      goTo(index) {
        this.num = index;
        //点击导航按钮向swiper组件发射index
        this.$root.eventHub.$emit('changeTab', index);
      },
      slideTab(index) {
        this.num = index;
        let href = index === 0 ? '/one' :
          index === 1 ? '/two' :
            index === 2 ? '/three' :
              index === 3 ? '/four' :
                index === 4 ? '/five' : '/one';
        this.$router.push(href)
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
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
    transition: opacity .8s

  .fade-enter, .fade-leave-active
    opacity: 0
</style>
