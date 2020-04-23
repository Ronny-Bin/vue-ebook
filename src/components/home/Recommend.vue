<template>
  <div class="recommend">
    <title-bar :label="label" :btn="btn" ></title-bar>
    <div class="recommend-list">
      <div class="recommend-item" v-for="(item, index) in showRecommendData" :key="index" @click="showBookDetail(item)">
        <div class="img-wrapper">
          <img class="img" v-lazy="item.cover">
        </div>
        <div class="content-wrapper">
          <div class="title title-medium" ref="title">{{item.title}}</div>
          <div class="num sub-title" ref="num">{{item.readers}}人同时在读</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import TitleBar from "../common/TitleBar";
  import {ebookHome} from "@/utils/mixin.js"
  export default {
    name: "Recommend",
    mixins:[ebookHome],
    components: {TitleBar},
    props:{
      recommendData:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        label:"热门推荐",
        btn:null,
      }
    },
    computed:{
      showRecommendData(){
        if (this.recommendData) {
          return this.getRandomArrayElements(this.recommendData,3)
        } else {
          return  []
        }
      },
    },
    methods:{
      getRandomArrayElements(arr, count) {
        var shuffled = arr.slice(0), i = arr.length,min = i - count, temp, index;
        while (i-- > min) {
          index = Math.floor((i + 1) * Math.random());
          temp = shuffled[index];
          shuffled[index] = shuffled[i];
          shuffled[i] = temp;
        }
        return shuffled.slice(min);
      },
      allCategory(){

      }
    }
  }
</script>


<style lang="less" scoped>
  .recommend{
    width: 100%;
    height: 100%;
  }
  .recommend-list{
    display: flex;
    justify-content: space-between;
    .recommend-item{
      flex: 0 0 33.33%;
      width: 33.33%;
      padding: 20px;
      box-sizing: border-box;
      .img-wrapper{
        flex: 0 0 20%;
        text-align: center;
        .img{
          width: 85%;
        }
      }
      .content-wrapper{
          width: 100%;
          padding-top: 20px;
        .title{
          font-size: 30px;
          color: #444;
          font-weight: 700;
          text-align: center;
          word-break:break-all;
          display:-webkit-box;
          -webkit-line-clamp:2;
          -webkit-box-orient:vertical;
          overflow:hidden;
        }
        .num{
          padding-top: 20px;
          color: #666;
          text-align: center;
          font-size: 24px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          word-break: keep-all;
          white-space: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          overflow-wrap: break-word;
        }
      }
    }
  }
</style>