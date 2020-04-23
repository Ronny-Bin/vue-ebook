<template>
  <div class="home-bar">
    <div class="home-bar-left">
        <slot name="left">

        </slot>
    </div>
    <div class="home-bar-center">
        <slot name="center">

        </slot>
    </div>
    <div class="home-bar-right">
        <slot name="right">

        </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeBar"
  }
</script>

<style lang="less" scoped>
  .home-bar{
    color: white;
    width: 100%;
    display: flex;
    justify-content: center;
    height: 104px;
    line-height: 104px;
    align-items: center;
    position: relative;

    .home-bar-left{
      width: 100%;
      float: left;
      padding-left: 30px;
      color: #666;
    }
    .home-bar-center{
      width: 100%;
      text-align: center;
    }
    .home-bar-right{
      width: 100%;
      float: right;
      padding-right: 30px;
      .icon{
        float: right;
        color: #666;
      }
    }
  }
</style>