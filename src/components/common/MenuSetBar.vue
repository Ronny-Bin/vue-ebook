<template>
  <div class="menu-set-bar">
    <slot name="content">
    </slot>
  </div>
</template>

<script>
  export default {
    name: "MenuSetBar"
  }
</script>

<style lang="less" scoped>
  @import "../../assets/styles/common";
  .menu-set-bar{
    .menuCommon;
    justify-content: space-around;
    height: 140px;
    z-index: 100;
    color: #666;
    font-size: 36px;
    bottom: 78px;
  }
</style>