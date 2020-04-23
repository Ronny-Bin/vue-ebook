<template>
  <div class="ebook-reader" @click="toggleTitleAndMenu">
   <van-loading class='loading-page' size="30" color="#1989fa" v-show="isLoading"/>
    <div id="read"  @click="start()">
    </div>
    <div class="book-mask"
         @touchmove="handleTouchMove"
         @touchstart="handleTouchStart"
         @touchend="handleTouchEnd">
    </div>
  </div>
</template>

<script>
  import Epub from "epubjs"
  import {support,setLocalForage,getLocalForage} from "../../utils/localForage";
  import {ebookMixin} from "@/utils/mixin"
  import {userSet} from "../../utils/localStorage";
  export default {
    mixins:[ebookMixin],
    name: "EbookReader",
    data(){
      return{
        book:null,
        rendition:null,
        flag: false,
        startX: 0,
        endX: 0,
        firstOffsetY:0,
        isOnline:false
      }
    },
    mounted(){
      //阅读时间初始化
      const date=new Date();
      const fileNameParams = this.$route.params
      const fileName = fileNameParams.fileName
      if (fileNameParams.model === "0") {
        this.setFileName(
            fileNameParams.fileName
        ).then(() => {
              // 实时下载电子书
              this.isOnline = false
              this.initEpub(`${process.env.VUE_APP_EPUB_URL}/${fileNameParams.category}/${this.getFileName}.epub`)
            })
      } else {
        this.setFileName(fileName).then(() => {
              getLocalForage(this.getFileName, (err, blob) => {
                if (!err) {
                  if (blob) {
                    console.log(blob)
                    // 离线阅读模式
                    this.isOnline = false
                    this.initEpub(blob)
                  } else {
                    // 在线阅读模式
                    this.isOnline = true
                    const opf = fileNameParams.opf
                    if (opf) {
                      this.initEpub(opf)
                    }
                  }
                }
              })
            })
      }


      if(!userSet.getBook(fileName,'time')){
        userSet.setBook(fileName,'time',date.getTime())
      }
    },
    methods:{
      handleTouchMove(event){
        let offsetY = 0
        if (this.firstOffsetY) {
          offsetY = event.changedTouches[0].clientY - this.firstOffsetY
          this.setOffset(offsetY)
        } else {
          this.firstOffsetY = event.changedTouches[0].clientY
        }
        event.preventDefault()
        event.stopPropagation()
      },
      handleTouchStart(event){
        this.flag = true;
        this.startX = event.touches[0].clientX;

      },
      handleTouchEnd(event){
        this.setOffset(0)
        this.firstOffsetY = null
        if(this.flag){
          this.flag = false;
          var moveX = event.changedTouches[0].clientX - this.startX;  //计算滑动的距离
          if(moveX < -130){
            this.nextPage()
          }else if(moveX > 130 ){
            this.prevPage()
          }
        }
      },

      prevPage() {
        if (this.book.rendition) {
          this.book.rendition.prev().then(() => {
            this.refreshLocation()
          })
        }
      },
      nextPage() {
        if (this.rendition) {
          this.rendition.next().then(() => {
            this.refreshLocation()
          })
        }
      },
      parseBook() {
        this.book.loaded.metadata.then(metadata => {
          this.setMetadata(metadata)
          userSet.setBook(this.getFileName, 'metadata',metadata)
        })
        if (this.isOnline) {
          this.book.coverUrl().then(url => {
            this.setCover(url)
          })
        } else {
          this.book.loaded.cover.then(cover => {
            this.book.archive.createUrl(cover).then(url => {
              this.setCover(url)
            })
          })
        }

        this.book.loaded.navigation.then(nav => {
          const navItem = (function flatten(arr) {
            return [].concat(...arr.map(v => [v, ...flatten(v.subitems)]))
          })(nav.toc)
          function find(item, v = 0) {
            const parent = navItem.filter(it => it.id === item.parent)[0]
            return !item.parent ? v : (parent ? find(parent, ++v) : v)
          }
          navItem.forEach(item => {
            item.level = find(item)
            item.total = 0
            item.pagelist = []
            if (item.href.match(/^(.*)\.html$/)) {
              item.idhref = item.href.match(/^(.*)\.html$/)[1]
            } else if (item.href.match(/^(.*)\.xhtml$/)) {
              item.idhref = item.href.match(/^(.*)\.xhtml$/)[1]
            }
          })
          this.setNavigation(navItem)
          console.log(navItem)
        })
        this.book.ready.then(() => {
          this.setCurrentBook(this.book)
         return this.book.locations.generate(750 * (window.innerWidth / 375) * ( 16/this.getDefaultFontSize))
        }).then(locations => {
          locations.forEach(location => {
            const loc = location.match(/\[(.*)\]!/)[1]
            this.getNavigation.forEach(item => {
              if (item.idhref && item.idhref.indexOf(loc) >= 0) {
                item.pagelist.push(location)
              }
            })
            let currentPage = 1
            this.getNavigation.forEach((item, index) => {
              if (index === 0) {
                item.page = 1
              } else {
                item.page = currentPage
              }
              currentPage += item.pagelist.length + 1
            })
          })
          this.setPagelist(locations)
          this.setBookAvailable(true)
          this.refreshLocation()
          this.setIsLoading(false)
        })
      },
      initFontSize(){
        this.rendition.themes.fontSize(this.getDefaultFontSize + 'px')
      },
      initFontFamily(){
        if(this.getDefaultFontFamily === 'Default'){
          this.rendition.themes.font('Times New Roman')
        }else {
          this.getCurrentBook.rendition.themes.font(this.getDefaultFontFamily)
        }
      },
      initTheme() {
        this.changeCss()
        this.book.rendition.themes.select(this.getTheme)
        //设置标题栏主题
      },
      toggleTitleAndMenu(){
        if(!this.isLoading){
          this.setNavVisible(!this.getNavVisible).then(()=>{
            if(!this.getNavVisible){
              this.$emit('getNavVisible');
            }
          })
        }
      },
      initRendition(){
        this.rendition = this.book.renderTo('read', {
          width: innerWidth,
          height: innerHeight,
          method: 'default'
        })
        this.initFontSize()
        this.initTheme()
        const location = userSet.getBook(this.getFileName,'location')
        if(this.$route.params.href) {
          this.rendition.display(this.$route.params.href).then(()=>{
            })
        } else if (location) {
          this.display(location)
        } else {
          this.display()
        }
        this.rendition.hooks.content.register(contents => {
          Promise.all([
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`)
          ]).then(() => {
            this.initFontFamily()
          })
        })

      },
      initEpub(url){
        this.setIsLoading(true)
        this.book = new Epub(url)
        this.setCurrentBook(this.book)
        this.initRendition()
        this.parseBook()
      }
    }
  }
</script>

<style scoped>
  .loading-page{
    height: 100vh;
    width: 100%;
    text-align: center;
    align-items: start;
    line-height: 100vh;
  }
  .book-mask{
    position: absolute;
    z-index: 50;
    width: 100%;
    height: 100%;
    bottom: 0;
  }
</style>