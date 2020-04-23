import {mapGetters,mapActions} from 'vuex'
import {userSet} from "./localStorage.js";
import {THEME_LIST} from '@/utils/books'
export const ebookMixin = {
  computed:{
    ...mapGetters(['getFileName','getNavVisible','getDefaultFontSize'
      ,'getDefaultFontFamily','getCurrentBook','getPagelist','getNavigation',
      'getTheme','getBookAvailable','getOffset','getProgress','getSection',
      'getCover','getMetadata','getPaginate','getBoxShadow','getIsBookmark','isLoading']),
    getSectionName(){
      const sectionInfo = this.book.section(this.getSection)
      if(sectionInfo){
        return this.getNavigation[this.getSection].label
      }
    },
  },
  methods:{
    ...mapActions(['setFileName','setNavVisible','setDefaultFontSize'
      ,'setDefaultFontFamily','setCurrentBook','setTheme','setPagelist','setNavigation',
      'setBookAvailable','setOffset','setProgress','setSection',
      'setCover','setMetadata','setPaginate','setBoxShadow','setIsBookmark','setIsLoading']),
    refreshLocation(){
      return new Promise(() =>{
        const currentLocation = this.getCurrentBook.rendition.currentLocation()
        if (currentLocation.start && currentLocation.start.index) {
          let startCfi = currentLocation.start.cfi
          let index = currentLocation.start.index
          const progress = this.getCurrentBook.locations.percentageFromCfi(currentLocation.start.cfi)
          this.setSection(index)
          this.setProgress(Math.floor(progress * 100))
          userSet.setBook(this.getFileName,'location',startCfi)
        }

        //书签显示
        const cfi = currentLocation.start.cfi
        this.bookmark = userSet.getBook(this.getFileName,'bookmark')
        if(this.bookmark){
          const isBookMark = this.bookmark.filter(function (v) {
            return v['cfi'] === cfi
          })
          if(isBookMark.length > 0){
            this.setIsBookmark(true)
          }else {
            this.setIsBookmark(false)
          }
        }
      })
    },
    display(target = null, cb = null) {
      if (target) {
        this.getCurrentBook.rendition.display(target).then(() => {
          this.refreshLocation()
          if (cb) cb()
        })
      } else {
        this.getCurrentBook.rendition.display().then(() => {
          this.refreshLocation()
          if (cb) cb()
        })
      }
    },
    changeCss(){
      var color
      var background
      THEME_LIST.forEach(theme => {
        this.getCurrentBook.rendition.themes.register(theme.name, theme.style)
        if(theme.name === this.getTheme){
          const styles = theme.style.body
          color = styles.color
          background = styles.background
        }
      })
      document.body.style.backgroundColor = background;
      var nod = document.createElement('style'),
          str = ':root {--color-tint: '+color+';--color-background: '+background+';}';
      nod.type='text/css';
      if (nod.styleSheet) { //ie下
        nod.styleSheet.cssText = str;
      } else {
        nod.innerHTML = str; //或者写成 nod.appendChild(document.createTextNode(str))
      }
      document.getElementsByTagName('head')[0].appendChild(nod);
    },
    transTime(data) {
      const date=new Date();
      const time = date.getTime()-data
      if(time === '') {
        return '';
      } else {
        var result = '';
        if(time >= 1000) {
          var day = parseInt(time / (24*60*60*1000));
          var hour = parseInt((time % (24*60*60*1000)) / (60*60*1000));
          var minute = parseInt(((time % (24*60*60*1000)) % (60*60*1000)) / (60*1000));
          var second = parseInt((((time % (24*60*60*1000)) % (60*60*1000)) % (60*1000)) / 1000);
          if(day != 0) {
            result += day + '天';
          }
          if(hour != 0) {
            result += hour + '时';
          }
          if(minute != 0) {
            result += minute + '分';
          }
          if(second != 0) {
            result += second + '秒';
          }
        }
        if(result == '') {
          result = '0秒';
        }
        return result;
      }
    }
  }
}

export const ebookHome = {
  methods: {
    showBookDetail(item) {
      this.$router.push({
        name:"Detail",//这个name就是你刚刚配置在router里边的name
        params:{
          category:item.categoryText,
          fileName:item.fileName
        }
      })
    }
  }
}