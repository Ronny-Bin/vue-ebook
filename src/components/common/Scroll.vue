<template>
  <div class="scroll-wrapper" @scroll.passive="handleScroll">
    <slot name="content"></slot>
  </div>
</template>

<script>
  export default {
    name: "Scroll",
    mounted () {

    },
    methods:{
      handleScroll (e) {
        const scrollTop = e.target.scrollTop || window.pageYOffset || document.body.scrollTop
        this.$emit('onScroll', scrollTop)
      },
    }
  }
</script>

<style lang="less" scoped>
  .scroll-wrapper {
    height: 100%;
    position: relative;
    z-index: 100;
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {display:none}
    &.no-scroll {
      overflow: scroll;
    }
  }
</style>