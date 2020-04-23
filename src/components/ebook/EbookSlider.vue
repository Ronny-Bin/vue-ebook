<template>
  <div class="book-slider-page">
    <div class="page-content">
      <div class="top-wrapper">
          <component :is="tab === 1 ?bookmark: content"></component>
      </div>
      <div class="footer-nav">
        <div class="left"  :class="{selected: tab === 1}"
             @click="selectTab(1)"
        >
          目录
        </div>
        <div class="right" :class="{selected: tab === 2}"
             @click="selectTab(2)"
        >
          书签
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import EbookSliderList from "./EbookSliderList";
  import EbookMark from "./EbookMark";
  import {ebookMixin} from "@/utils/mixin"
  export default {
    mixins:[ebookMixin],
    name: "EbookSlider",
    components: {EbookMark, EbookSliderList},
    data(){
      return{
        tab:1,
        content:'EbookMark' ,
        bookmark: 'EbookSliderList'
      }
    },
    methods:{
      selectTab(tab){
        this.tab = tab
      }
    },
    watch:{
      getIsBookmark(v){
        this.tab = 1
      }
    },
    created() {

    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/styles/common";
  .book-slider-page{
    .menuCommon;
    height: 100%;
    width: 80%;
    background-color: var(--color-background);
    color: var(--color-tint);
    z-index: 100;
    bottom: 0;
    box-shadow: 4px 0px 3px 6px  rgba(0,0,0,.1);
    .page-content{
      position: relative;
      width: 100%;
      height: 100%;
      .top-wrapper{
        position: absolute;
        width: 100%;
        top:0;
        bottom:75px ;

      }
      .footer-nav{
        background-color: var(--color-background);
        font-size: 26px;
        border-top: rgba(0,0,0,.1) 1px solid;
        width: 100%;
        height: 75px;
        position: absolute;
        display: flex;
        bottom: 0;
        justify-content: space-around;
        align-items: center;
        .selected{
          color: #5cacee;
        }
      }
    }
  }
</style>