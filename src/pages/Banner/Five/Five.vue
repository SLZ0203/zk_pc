<template>
  <section class="five_wrap">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in banner" :key="index">
          <img :src="item.image" alt="">
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
      <!-- 如果需要导航按钮 -->
      <div class="btn_wrap">
        <div class="swiper-button-prev">
          <img src="../../../../static/images/ic-left.png">
        </div>
        <div class="swiper-button-next">
          <img src="../../../../static/images/ic-right.png">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import {baseUrl} from '../../../api'

  export default {
    name: "Five",
    data() {
      return {
        banner: [], //轮播图列表
      }
    },
    mounted() {
      //获取轮播图图片
      this.$axios.get(baseUrl + '/api/get_navs').then(res => {
        const result = res.data.data;
        result.forEach((item, index) => {
          if (index === 4) {
            item.images.forEach(item => {
              item.image = baseUrl + '/upload/' + item.image
            });
            this.banner = item.images
          }
        });
        this._initBanner()
      }).catch(error => {
        console.log(error);
      });
    },
    methods: {
      _initBanner() {
        this.$nextTick(() => {
          this.mySwiper = new Swiper('.swiper-container', {
            loop: true,
            autoplay: true,
            slideToClickedSlide: true,
            // 如果需要分页器
            pagination: {el: '.swiper-pagination',},
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            effect: 'coverflow',
            grabCursor: true,
          });
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .five_wrap
    width 100%
    height 100%
    .swiper-slide
      img
        width 100%
        height 100%
    .btn_wrap
      width 560px
      display flex
      justify-content space-between
      position absolute
      z-index 10
      bottom 3%
      left 50%
      transform translateX(-50%)
</style>
