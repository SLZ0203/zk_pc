<!--页面LOGO组件-->
<template>
  <h1 class="logoImg" @click="$router.replace('/home')" v-if="logoImg">
    <img :src="'http://yixin.581vv.com'+logoImg">
  </h1>
</template>

<script>
  export default {
    name: "Logo",
    props: {
      logoImg: String
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .logoImg
    width 157px
    height 48px
    position absolute
    top 60px
    left 60px
    cursor pointer
    z-index 100
</style>
