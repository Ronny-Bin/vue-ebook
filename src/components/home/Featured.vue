<template>
  <div class="feature-page">
    <title-bar :label="label" :btn="btn"></title-bar>
    <div class="list-wrapper">
      <div class="list-wrapper-item" v-for="(item, index) in featuredData" :key="index" @click="showBookDetail(item)">
        <div class="img-wrapper">
          <img class="img" v-lazy="item.cover" :key="item.cover">
        </div>
        <div class="content-wrapper">
          <div class="title title-big" ref="title">{{item.title}}</div>
          <div class="author sub-title" ref="author">{{item.author}}</div>
          <div class="category" >{{showCategory(item.categoryText)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import category from "@/utils/lang.js"
  import {ebookHome} from "@/utils/mixin.js"
  import TitleBar from "../common/TitleBar";
  export default {
    name: "Featured",
    mixins:[ebookHome],
    components:{TitleBar},
    props:{
      featuredData:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        label:"精选",
        btn:null,
        categoryData:null
      }
    },
    computed:{

    },
    mounted() {

    },
    methods:{
      showCategory(item){
        if(this.featuredData){
        const key = item.replace(item[0],item[0].toLowerCase());
        return category[ key ]
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.feature-page{
  .list-wrapper{
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .list-wrapper-item{
      padding-top: 20px;
      width: 50%;
      display: flex;
      padding: 20px;
      box-sizing: border-box;
      .img-wrapper{
        flex: 0 0 30%;
        width: 100%;
        .img{
          width: 100%;
        }
      }
      .content-wrapper{
        padding-left: 10px;
        .title{
          font-size: 30px;
          color: #444;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          word-break: keep-all;
          white-space: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          overflow-wrap: break-word;
        }
        .author{
          padding-top: 20px;
          font-size: 24px;
          color: #666;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          word-break: keep-all;
          white-space: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          overflow-wrap: break-word;
        }
        .category{
          .author();
          font-size: 20px;
        }
      }
    }
  }
}
</style>