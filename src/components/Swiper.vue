<!--轮播图组件-->
<template>
  <div class="swiper-container" v-show="banner">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,index) in list" :key="index">
        <keep-alive>
          <component :is="item.component" :banner="banner"></component>
        </keep-alive>
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div class="btn_wrap">
      <div class="swiper-button-prev">
        <img src="../../static/images/ic-left.png">
      </div>
      <div class="swiper-button-next">
        <img src="../../static/images/ic-right.png">
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import One from '../pages/Banner/One'
  import Two from '../pages/Banner/Two'
  import Three from '../pages/Banner/Three'
  import Four from '../pages/Banner/Four'
  import Five from '../pages/Banner/Five'

  export default {
    name: "Swiper",
    props: {
      banner: Array
    },
    data() {
      return {
        list: [
          {path: '/one', component: One},
          {path: '/two', component: Two},
          {path: '/three', component: Three},
          {path: '/four', component: Four},
          {path: '/five', component: Five},
        ]
      }
    },
    mounted() {
      var mySwiper = new Swiper('.swiper-container', {
        //loop: true,
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
        //设定初始化时slide的值
        initialSlide: this.$route.path === '/one' ? 0 :
          this.$route.path === '/two' ? 1 :
            this.$route.path === '/three' ? 2 :
              this.$route.path === '/four' ? 3 :
                this.$route.path === '/five' ? 4 : 0
      });
      mySwiper.on('slideChange', () => {
        //左右滑动时把当前slide的索引值发送到BtnList组件
        this.$root.eventHub.$emit('slideTab', mySwiper.activeIndex)
      });
      //接收BtnList组件传过来的导航按钮索引，跳转到相应内容区
      this.$root.eventHub.$on('changeTab', (index) => {
        mySwiper.slideTo(index)
      })
    },
    components: {
      One,
      Two,
      Three,
      Four,
      Five,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .btn_wrap
    width 560px
    display flex
    justify-content space-between
    position absolute
    z-index 10
    bottom 21px
    left 50%
    transform translateX(-50%)
</style>
