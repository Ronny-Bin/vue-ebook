<template>
  <div class="mark-page" ref="bookmark">
    <div class="mark-page-text-wrapper">
      <div class="mark-page-down-wrapper" ref="iconDown">
        <span class="icon-down"></span>
      </div>
      <div class="mark-page-text">
        {{text}}书签
      </div>
    </div>
    <div class="mark-page-icon"  ref="iconmark"
         :class="{active:getIsBookmark}"
    ></div>
  </div>
</template>

<script>
  import {userSet} from "../../utils/localStorage";
  import {ebookMixin} from "@/utils/mixin"
  export default {
    mixins:[ebookMixin],
    name: "BookMark",
    data(){
      return{
        text:'下拉添加',
        isFixed:false,
      }
    },
    created(){
      this.bookmark = userSet.getBook(this.getFileName,'bookmark')
    },
    methods:{
      realPx(px) {
        const maxWidth = window.innerWidth > 375 ? window.innerWidth:375
        return px * (maxWidth / 375)
      },
      setAndSaveBookmark() {
        this.bookmark = userSet.getBook(this.getFileName,'bookmark')
        if (!this.bookmark) {
          this.bookmark = []
        }
        console.log(this.bookmark)
        var cfi
        const currentLocation = this.getCurrentBook.rendition.currentLocation()
        const cfibase = currentLocation.start.cfi.replace(/!.*/, '').replace('epubcfi(', '')
        const cfistart = currentLocation.start.cfi.replace(/.*!/, '').replace(/\)/, '')
        const cfiend = currentLocation.end.cfi.replace(/.*!/, '').replace(/\)/, '')
        const cfiRange = `epubcfi(${cfibase}!,${cfistart},${cfiend})`
        cfi = currentLocation.start.cfi
        this.getCurrentBook.getRange(cfiRange).then(range => {
          let text = range.toString()
          text = text.replace(/\s\s/g, '')
          text = text.replace(/\r/g, '')
          text = text.replace(/\n/g, '')
          text = text.replace(/\t/g, '')
          text = text.replace(/\f/g, '')
          this.bookmark.push({
            cfi: cfi,
            text: text
          })
          userSet.setBook(this.getFileName,'bookmark',this.bookmark)
        })

      },
      removeBookmark() {
        const currentLocation = this.getCurrentBook.rendition.currentLocation()
        const cfi = currentLocation.start.cfi
        if (this.bookmark) {
          this.bookmark = this.bookmark.filter(item => item.cfi !== cfi)
          userSet.setBook(this.getFileName,'bookmark',this.bookmark)
        }
      }
    },
    watch:{
      getOffset(v){
        if(!this.getNavVisible&&!this.isLoading){
          if(v > this.realPx(40)&& v <  this.realPx(50) ){
            this.$refs.bookmark.style.top = '-'+v+'px'
            if(this.$refs.iconDown.style.transform === 'rotate(180deg)'){
              this.$refs.iconDown.style.transform = 'rotate(0deg)'
            }
            if(this.getIsBookmark){
              this.text = '下拉删除'
            }else{
              this.text = '下拉添加'
            }
            this.isFixed = false
          }
          else if(v>=this.realPx(50)){
            this.$refs.bookmark.style.top = '-'+v+'px'
            this.isFixed = true
            if(this.getIsBookmark){
              this.text = '松手删除'
            }else{
              this.text = '松手添加'
            }
            if(this.$refs.iconDown.style.transform === '' ||
                this.$refs.iconDown.style.transform ==='rotate(0deg)'
            ){
              this.$refs.iconDown.style.transform = 'rotate(180deg)'
            }
          }
          else if(v===0) {
            setTimeout(() => {
              this.$refs.bookmark.style.top = '-'+this.realPx(35)+'px'
            }, 200)
            if(this.isFixed){
              if(this.getIsBookmark){
                console.log(1111)
                this.setIsBookmark(false)
                this.removeBookmark()
              }else {
                this.setIsBookmark(true)
                this.setAndSaveBookmark()
              }
            }
          }
          else  {
            if(this.getIsBookmark){
              this.text = '下拉删除'
            }else{
              this.text = '下拉添加'
            }
            this.isFixed = false
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .mark-page{
    position: absolute;
    top: -70px;
    height: 70px;
    z-index: 70;
    width: 100%;
    font-size: 14px;
    color: white;
    .mark-page-icon {
      position: absolute;
      width: 0;
      right: 0;
      height:0;
      font-weight: bold;
      margin-right: 20px;
      line-height: 0;
      border-width: 70px 15px 10px 15px;
      border-style: solid;
      bottom: 0;
      border-color: white white transparent white;
      &.active{
        border-color: blue blue transparent blue;
        position: fixed;
        top: 0;
      }
    }
    .mark-page-text-wrapper{
      position: absolute;
      right: 45px;
      bottom: 0;
      display: flex;
      padding-right: 20px;
      .mark-page-down-wrapper{
        transition: all .2s;
      }
    }
  }
</style>