<template>
  <div class="ebook-mark-page">
    <div class="ebook-mark-page-top">
      <span>书签 {{bookmark?bookmark.length:0}}</span>
    </div>

    <div class="ebook-mark-page-wrapper">
      <scroll>
        <ul  slot="content">
          <li v-for="(item,index) in  bookmark" :key="index" @click="bookmarkto(item.cfi)">
            <div class="ebook-mark-page-wrapper-icon">
              <span class="icon-bookmark icon-bookmark-active"></span>
            </div>
            <div class="ebook-mark-page-wrapper-text">
              {{item.text}}
            </div>
          </li>
        </ul>

      </scroll>
    </div>
  </div>
</template>

<script>
  import Scroll from "../common/Scroll";
  import {userSet} from "../../utils/localStorage";
  import {ebookMixin} from "@/utils/mixin"
  export default {
    components:{
      Scroll
    },
    mixins:[ebookMixin],
    name: "Mark",
    data(){
      return{
        bookmark:null
      }
    },
    mounted() {
      this.bookmark = userSet.getBook(this.getFileName,'bookmark')
    },
    methods:{
      bookmarkto(cfi){
        this.display(cfi)
        this.bus.$emit('sliderChecked')
      }
    }
  }
</script>

<style lang="less" scoped>
  .ebook-mark-page{
    font-size: 18px;
    height: 100%;
    .ebook-mark-page-top{
      padding: 30px;
      border-bottom: rgba(0,0,0,.1) 1px solid;
    }
    .ebook-mark-page-wrapper-text{
      width: 100%;
      word-break:break-all;
      display:-webkit-box;
      -webkit-line-clamp:3;
      -webkit-box-orient:vertical;
      overflow:hidden;
    }
    .ebook-mark-page-wrapper{
      height: 91.5%;
      margin: 20px;
    }
    .ebook-mark-page-wrapper ul{
      overflow:hidden;
    }
    .ebook-mark-page-wrapper li{
      display: flex;
      margin: 20px;
      padding-bottom: 20px;
      border-bottom: rgba(0,0,0,.1) 1px solid;
    }
    .icon-bookmark-active{

    }
    .ebook-mark-page-wrapper-icon{
      align-items: center;
      text-align:center ;
      line-height: 45px;
      width: 40px;
      height:40px;
      border-radius: 20px;
      background: rgba(0,0,0,.1);
      margin-right: 20px;
    }
  }
</style>