<template>
  <div class="list-page">
    <div class="book-list-info">
      <div class="book-content-img">
        <img :src="getCover">
      </div>
      <div class="book-content-info">
        <div class="book-title">{{getMetadata.title}} </div>
        <div class="book-author">{{getMetadata.creator}}</div>
      </div>
      <div class="book-content-progress">
        <div class="progress">{{getProgress}}%已读</div>
        <div class="progress-text">{{bookProgress.time}}</div>
      </div>
    </div>
    <div class="book-list-wrapper">
      <scroll>
        <div slot="content">
          <ul v-for="(item,index) in getNavigation" @click="display(item.href,index)"
          :class="{active:isChecked==index}">
            <li>
              <div class="content-left" :style="{paddingLeft:item.level*10 + 'px'}">{{item.label}}</div>
              <div class="content-right">{{item.page}}</div>
            </li>
          </ul>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>

  import {ebookMixin} from "@/utils/mixin"
  import {userSet} from "../../utils/localStorage";
  import Scroll from "../common/Scroll";
  export default {
    name: "EbookSliderList",
    components: {Scroll},
    mixins:[ebookMixin],
    data(){
      return{
        bookProgress:{val:0,time:0},
        isChecked:0
      }
    },
    created() {
      const bookIndex = this.getCurrentBook.rendition.currentLocation().start.index
      this.isChecked =bookIndex?bookIndex:0
      this.bookProgress.val = this.Progress
      this.bookProgress.time =
          this.transTime(userSet.getBook(this.getFileName,'time')?userSet.getBook(this.getFileName,'time'):0)
    },
    methods:{
      display(href,index) {
          const currentBook = this.getCurrentBook.rendition
          currentBook.display(href).then(()=>{
            const startNum = currentBook.currentLocation().start.percentage
            console.log(startNum)
            const bookLocations = parseInt(startNum * 100)
            userSet.setBook(this.getFileName,'slider',bookLocations)
            userSet.setBook(this.getFileName,'section',index)
            this.setProgress(bookLocations)
            this.setSection(index)
            this.isChecked = index
            this.refreshLocation()
            this.bus.$emit('sliderChecked')
          })
      }
    }
  }
</script>

<style lang="less" scoped>
  .list-page{
    height: 100%;
    font-size: 26px;
    overflow:hidden;
    .book-list-info{
      display: flex;
      padding: 40px 20px;
      align-items: center;
      border-bottom: rgba(0,0,0,.1) 1px solid;;
      color: var(--color-tint);
      box-sizing: border-box;
      height: 15%;
      .book-content-img{
        width: 14%;
        img{
          width: 100%;
        }
      }
      .book-content-info{
        margin: 0 20px;
        width: 50%;
        .book-title{
          word-break:break-all;
          display:-webkit-box;
          -webkit-line-clamp:2;
          -webkit-box-orient:vertical;
          overflow:hidden;
        }
        .book-author{
          font-size: 22px;
          color:#6c6c64 !important;
          padding-top: 10px;
        }
      }
      .book-content-progress{
        width: 30%;
        .progress-text{
          margin-top: 10px;
          overflow:hidden;
          text-overflow:ellipsis;
          -o-text-overflow:ellipsis;
          -webkit-text-overflow:ellipsis;
          -moz-text-overflow:ellipsis;
          white-space:nowrap;
        }
      }
    }
    .book-list-wrapper{
      height: 85%;
      margin: 20px;
      ul{
        padding: 30px 0;
        border-bottom: rgba(0,0,0,.1) 1px solid;
        overflow:hidden;
        text-overflow:ellipsis;
        -o-text-overflow:ellipsis;
        -webkit-text-overflow:ellipsis;
        -moz-text-overflow:ellipsis;
        white-space:nowrap;
        li{
          display: flex;
          justify-content: space-between;
          .content-left{
            width: 90%;
            overflow:hidden;
            text-overflow:ellipsis;
            -o-text-overflow:ellipsis;
            -webkit-text-overflow:ellipsis;
            -moz-text-overflow:ellipsis;
            white-space:nowrap;
          }
          .content-right{
            opacity:0.5;
          }
        }
      }
      .active{
        color: #5cacee;
      }
    }
  }
</style>