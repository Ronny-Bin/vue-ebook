<template>
    <div class="nav-down" >
      <div class="nav-left" @click="back">
        <span class="icon-back"></span>
      </div>
      <div class="nav-right">
        <span class="icon-shelf"></span>
        <span class="icon-cart" @click="$router.push('/store/shelf')"></span>
        <span class="icon-more" @click="$router.push('/store')"></span>
      </div>
    </div>
</template>

<script>
  import store from "@/store";
  export default {
    name: "EbookTitle",
    methods:{
      back(){
        this.$router.go(-1)
      }
    },

  }
</script>

<style lang="less" scoped>
  @import "../../assets/styles/common";
  .nav-down{
    .menuCommon;
    padding: 10px 20px;
    height: 58px;
    justify-content: space-between;
    z-index: 99;
    box-shadow: 0px 2px 10px 1px  rgba(0,0,0,.1);
    font-size: 36px;
    /* 顺序为: offset-x, offset-y, blur-size, spread-size, color */
    .nav-left{}
    .nav-right{
      span{
        padding-left: 20px
      }
    }
  }


</style>