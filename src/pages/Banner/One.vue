<!--页面一-->
<template>
  <div class="outer_wrap">
    <img :src="'http://yixin.581vv.com' + banner[0]">
    <div class="blank_wrap"></div>
  </div>
</template>

<script>
  export default {
    name: "One",
    props: {
      banner: Array
    },
    data() {
      return {
        num: this.$route.query.num,
      }
    },
    mounted() {
      const arr = this.banner.slice(0, 1);
      console.log(arr);
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .outer_wrap
    width 100%
    height 100%
    position relative
    img
      width 100%
      height 100%
    .blank_wrap
      position absolute
      height 230px
      bottom 0
      width 100%
      background: -webkit-linear-gradient(180deg, transparent, #000);
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, .6));
</style>
