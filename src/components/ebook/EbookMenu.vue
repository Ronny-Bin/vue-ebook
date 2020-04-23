<template>
  <div class="menu-down" :class="{active:getBoxShadow}">
    <span class="icon-menu"  @click="setContent('slider')"></span>
    <span class="icon-progress" @click="setContent('progress')"></span>
    <span class="icon-bright" @click="setContent('theme')"></span>
    <span class="icon-A" @click="setContent('font')"></span>
  </div>
</template>

<script>
  import {ebookMixin} from "@/utils/mixin"
  export default {
    name: "EbookMenu",
    mixins:[ebookMixin],
    methods:{
      setContent(content){
        this.setBoxShadow(true)
        this.$emit('setContent',content)
      },
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../assets/styles/common";
  .menu-down{
    .menuCommon;
    padding: 10px;
    bottom: 0;
    height: 58px;
    justify-content: space-around;
    z-index: 98;
    font-size: 36px;
    &.active{
      box-shadow:none;
    }
  }
</style>