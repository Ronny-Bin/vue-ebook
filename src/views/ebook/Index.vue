<template>
  <div class="ebook-page" ref="book">
    <transition name="slide-down" >
      <ebook-title v-show="TitleAndMenuVisible"/>
    </transition>
    <book-mark/>
    <ebook-reader
            @getNavVisible="isNavVisible"/>
    <transition name="slide-up" >
      <ebook-menu v-show="TitleAndMenuVisible"
                  :TitleAndMenuVisible = 'TitleAndMenuVisible'
                  :isBoxShadow  = "isBoxShadow"
                  @setContent="setContent"/>
    </transition>
    <transition name="slide-cro" >
      <ebook-slider v-show="isShowSet&&TitleAndMenuVisible"  v-if="setContentItem=='slider'" key="slider">
      </ebook-slider>
    </transition>
    <transition name="slide-up-bar" >
      <menu-set-bar v-show="isShowSet&&TitleAndMenuVisible"  v-if="setContentItem=='font'" key="font">
        <ebook-set-font slot="content"/>
      </menu-set-bar>
      <menu-set-bar v-show="isShowSet&&TitleAndMenuVisible" v-if="setContentItem=='theme'" key="theme">
        <ebook-set-theme slot="content"/>
      </menu-set-bar>
      <menu-set-bar v-show="isShowSet&&TitleAndMenuVisible" v-if="setContentItem=='progress'" key="progress'">
        <ebook-set-progress slot="content" ref="progress"/>
      </menu-set-bar>
    </transition>
    <div class='popContainer' v-show="isShowSet&&TitleAndMenuVisible"  v-if="setContentItem=='slider'"
         @click="setShowSet"
    ></div>

  </div>
</template>

<script>
  import EbookReader from "../../components/ebook/EbookReader";
  import EbookTitle from "../../components/ebook/EbookTitle";
  import EbookMenu from "../../components/ebook/EbookMenu";
  import store from "@/store";
  import MenuSetBar from "../../components/common/MenuSetBar";
  import EbookSetFont from "../../components/ebook/EbookSetFont";
  import EbookSetTheme from "../../components/ebook/EbookSetTheme";
  import EbookSetProgress from "../../components/ebook/EbookSetProgress";
  import EbookSlider from "../../components/ebook/EbookSlider";
  import {ebookMixin} from "@/utils/mixin"
  import BookMark from "../../components/common/BookMark";
  export default {
    name: "Index",
    mixins:[ebookMixin],
    components:{
      BookMark,
      EbookSlider,
      EbookSetProgress,
      EbookSetTheme,
      EbookSetFont,
      MenuSetBar,
      EbookMenu,
      EbookTitle,
      EbookReader
    },
    data(){
      return{
        isShowSet:false,
        isBoxShadow:false,
        setContentItem:null,
      }
    },
    computed:{
      TitleAndMenuVisible(){
        return store.getters.getNavVisible
      }
    },
    created(){
      this.bus.$on('sliderChecked',()=>{
        this.setShowSet()
      })
    },
    watch:{
      getOffset(v){
       if(!this.getNavVisible&&!this.isLoading){
         if (v > 0) {
           this.move(v)
         } else if (v === 0) {
           this.restore()
         }
       }
      }
    },
    methods:{
      move(v){
        this.$refs.book.style.top = v + 'px'
        document.body.style.backgroundColor = '#797979'
      },
      restore() {
        this.$refs.book.style.transition = 'all .2s linear'//结束后请客不然会挂载
        this.$refs.book.style.top = 0
        setTimeout(() => {
          this.$refs.book.style.transition = ''
          this.changeCss()
        }, 200)
      },
      setShowSet(){
        this.isShowSet = false
        this.setNavVisible(false)
        this.setBoxShadow(false)
      },
      setContent(content){
        this.setContentItem = content
        this.isShowSet = true
        this.setBoxShadow(true)
        if(this.setContentItem=='progress'&&this.$refs.progress){
          this.$refs.progress.readerTimeHandle()
        }
      },
      isNavVisible(){
        this.isShowSet = false
        this.setBoxShadow(false)
      }
    },
    beforeRouteLeave (to, from, next) {
      document.body.style.backgroundColor = 'white'
      this.setNavVisible(false)
      this.setBoxShadow(false)
      next()
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/styles/common";
  .ebook-page{
    width: 100%;
    position: relative;
    left: 0;
    top: 0;
    div.popContainer{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 99;
      background: rgba(0,0,0,0.3);
    }
  }

</style>