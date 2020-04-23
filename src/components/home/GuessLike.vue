<template>
  <div class="guess-you-like">
    <title-bar :label="label" :btn="btn" @onClick="change"></title-bar>
    <div class="guess-you-like-list">
      <div class="guess-you-like-item" v-for="(item, index) in showLikeData" :key="index" @click="showBookDetail(item)">
        <div class="img-wrapper">
          <img class="img" v-lazy="item.cover" :key="item.cover">
        </div>
        <div class="content-wrapper">
          <div class="title title-big" ref="title">{{item.title}}</div>
          <div class="author sub-title" ref="author">{{item.author}}</div>
          <div class="result third-title" ref="result">{{resultText(item)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import TitleBar from "../common/TitleBar";
  import {ebookHome} from "@/utils/mixin.js"
  export default {
    name: "GuessLike.vue",
    mixins:[ebookHome],
    props:{
      LikeData:{
        type:Array,
        default(){
          return []
        }
      }
    },
    components: {TitleBar},
    data(){
      return{
        label:"猜你喜欢",
        btn:"换一批",
        showLikeData:null
      }
    },
    mounted(){
        this.getShowLikeData()
    },
    watch: {
      LikeData(v) {
        this.getShowLikeData()
      }
    },
    methods:{
      getShowLikeData(){
        if (this.LikeData) {
          this.showLikeData = this.getRandomArrayElements(this.LikeData,3)
        } else {
          this.showLikeData =  []
        }
      },
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
      change(){
        this.getShowLikeData()
      },
      resultText(item) {
        if (item && item.type && item.result) {
          switch (item.type) {
            case 1:
              return "与$1同作者'".replace('$1', item.result)
            case 2:
              return '对$1感兴趣的人也在读'.replace('$1', item.result)
            case 3:
              return '阅读$2的人，$1都在读'.replace('$1', item.percent).replace('$2', item.result)
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .guess-you-like{
    width: 100%;
    height: 100%;
  }
  .guess-you-like-item{
    display: flex;
    padding: 20px;
    .img-wrapper{
      flex: 0 0 20%;
      .img{
        width: 100%;
      }
    }
    .content-wrapper{
      margin-left: 20px;
      .title{
        font-size: 30px;
        color: #444;
        font-weight: 700;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        word-break: keep-all;
        white-space: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        overflow-wrap: break-word;
      }
      .author{
        padding-top: 20px;
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
      .result{
        .author();
        color: #999;
        font-size: 24px;
        line-height: 30px;
        -webkit-line-clamp: 1;
      }
    }
  }
</style>