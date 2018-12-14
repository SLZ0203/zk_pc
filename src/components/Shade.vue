<!--遮罩层-->
<template>
  <transition name="fade">
    <div class="shade" @click="close"></div>
  </transition>
</template>

<script>
  export default {
    name: "Shad",
    props: {
      isShow: Boolean
    },
    methods:{
      close(){
        this.$emit('close',false)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .shade
    width 100%
    height 100%
    background rgba(0, 0, 0, .4)
    position absolute
    top 0
    left 0
    z-index 200
  .fade-enter-active, .fade-leave-active
    transition: opacity .5s

  .fade-enter, .fade-leave-active
    opacity: 0
</style>
