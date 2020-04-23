<template>
  <div class="shelf-item">
      <div class="book-img-wrapper add-book"  @click="showBookDetail(shelfItem)">
        <div class="down-msg" v-show="shelfItem.isDown"><span>已下载</span></div>
        <img v-lazy="shelfItem.cover">
      </div>
      <div class="book-title-wrapper">
        {{shelfItem.title}}
      </div>
      <slot name="selected"></slot>
  </div>
</template>

<script>
  import {ebookHome} from "@/utils/mixin.js"
  import ShelfItemAdd from "./ShelfItemAdd";
  export default {
    name: "ShelfItem",
    mixins:[ebookHome],
    components: {ShelfItemAdd},
    props:{
      shelfItem:{
        type:Object,
        default(){
          return {}
        }
      }
    }
  }
</script>

<style lang="less" scoped>
    .shelf-item{
      position: relative;
      flex: 0 0 33.33%;
      padding: 20px;
      box-sizing: border-box;
      .book-img-wrapper{
        width: 160px;
        height: 220px;
        position: relative;
        //border: 1px solid #ccc;
        box-shadow: 0 10px 10px rgba(0,0,0,.2);
        .down-msg{
          position: absolute;
          text-align: center;
          line-height: 20px;
          font-size: 15px;
          height: 20px;
          width: 100%;
          background: white;
          opacity: .7;

        }
        img{
          width: 100%;
        }
      }
      .book-title-wrapper{
        width: 160px;
        padding-top: 20px;
        font-size: 24px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        word-break: keep-all;
        white-space: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        overflow-wrap: break-word;
        color: #444;
      }
    }
</style>