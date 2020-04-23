<template>
  <div class="book-detail">
    <home-bar class="home-bar" :class="{active:ifShowBox}">
      <span class="icon-back" slot="left" @click="back"></span>
      <span slot="center"></span>
      <span class="icon-shelf icon" slot="right" @click="showFlapPage"></span>
    </home-bar>
    <scroll @onScroll="onScroll">
      <div class="detail-content" slot="content">
        <div class="detail-info">
          <div class="img">
            <img :src="cover">
          </div>
          <div class="text">
            <div class="title">
              {{title}}
            </div>
            <div class="author">
              {{author}}
            </div>
            <div class="category">
              {{category}}
            </div>
          </div>
        </div>
        <div class="detail-cop">
          <div class="cop-title">
            版权©️
          </div>
          <div class="cop-content">
            <div class="row">
              <div class="label">出版社</div>
              <div class="text">{{publisher}}</div>
            </div>
            <div class="row">
              <div class="label">分类</div>
              <div class="text">{{category}}</div>
            </div>
            <div class="row">
              <div class="label">语言</div>
              <div class="text">{{lang}}</div>
            </div>
            <div class="row">
              <div class="label">ISBN</div>
              <div class="text">{{isbn}}</div>
            </div>
          </div>
        </div>
        <div class="detail-nav">
          <div class="nav-title">
            目录
          </div>
          <div class="nav-wrapper">
            <div class="nav-item" v-for="(item,index) in navigation" :key="index"
            @click="readBook(item.href)">
              {{item.label}}
            </div>
          </div>
        </div>
      </div>
    </scroll>
    <book-audio class="book-audio" v-show="ifPlayBook"></book-audio>
    <div class="detail-bottom-nav" v-show="isShowNav" :class="{active:isShadow}">
      <div class="btn read" @click="readBook()">阅读</div>
      <div class="btn hear" @click="playBook()">听书</div>
      <div class="btn join" @click="remove" v-if="ifJoin"><span class="icon-check"></span> 已加入书架</div>
      <div class="btn join" @click="join" v-else>加入书架</div>
    </div>
  </div>
</template>

<script>
  import { Notify,Toast } from 'vant';
  import {bookShelfList} from "../../utils/localStorage";
  import {ebookHome} from "@/utils/mixin.js"
  import category from "@/utils/lang.js"
  import {detail} from "@/api/api.js"
  import Epub from 'epubjs'
  import HomeBar from "../common/HomeBar";
  import Scroll from "../common/Scroll";
  import BookAudio from "../common/BookAudio";
  export default {
    name: "Index",
    mixins:[ebookHome],
    components: {BookAudio, Scroll, HomeBar},
    data(){
      return{
        ifShowBox:false,
        category:null,
        bookItem:null,
        book: null,
        metadata: null,
        trialRead: null,
        cover: null,
        navigation: null,
        displayed: false,
        audio: null,
        randomLocation: null,
        description: null,
        toastText: '',
        trialText: null,
        categoryText: null,
        opf: null,
        fileName:null,
        isShowNav:false,
        ifJoin:false,
        ifPlayBook:false,
        isShadow:true
      }
    },
    computed:{
      lang() {
        return this.metadata ? this.metadata.language : '-'
      },
      isbn() {
        return this.metadata ? this.metadata.identifier : '-'
      },
      publisher() {
        return this.metadata ? this.metadata.publisher : '-'
      },
      title() {
        return this.metadata ? this.metadata.title : ''
      },
      author() {
        return this.metadata ? this.metadata.creator : ''
      },
    },
    mounted(){
      this.ifJoin = false
      this.showCategory()
      this.fileName = this.$route.params.fileName
      detail(this.fileName ).then((res)=>{
        const data = res.data.data
        console.log(data)
        this.bookItem = data
        console.log(this.bookItem)
        this.cover = this.bookItem.cover
        const rootFile = data.rootFile
        this.opf = `${process.env.VUE_APP_EPUB_OPF_URL}/${this.fileName}/${rootFile}`
        this.parseBook(this.opf)
        this.isShowNav = true
        //判断是否加入书架
        this.joinState()
      })

    },
    methods:{
      joinState(){
        const bookShelfListData = bookShelfList.getBookShelf()
        if(bookShelfListData && bookShelfListData.v){
          const flaShelf = bookShelfListData.v.filter((value)=>{
            return this.bookItem.id === value.id
          })
          if(flaShelf.length > 0){
            this.ifJoin = true
          }
        }
      },
      playBook(){
        this.ifPlayBook = !this.ifPlayBook
        if(this.isShadow){
          this.isShadow = false
        }else {
          setTimeout(()=>{
            this.isShadow = true
          },300)
        }

      },
      showCategory(){
        const item= this.$route.params.category
        const key = item.replace(item[0],item[0].toLowerCase());
        this.categoryText = item
        this.category = category[ key ]
      },
      back() {
        this.$router.go(-1)
      },
      parseBook(blob) {
        this.book = new Epub(blob)
        this.book.loaded.metadata.then(metadata => {
          this.metadata = metadata
        })
        this.book.loaded.navigation.then(nav => {
          this.navigation = nav.toc
        })
      },
      showFlapPage(){
        this.$router.push({
          name:"Shelf",
        })
      },
      onScroll(scrollTop){
        if(scrollTop>0){
          this.ifShowBox = true
        }else {
          this.ifShowBox = false
        }
      },
      readBook(href = null) {
        this.$router.push({
          name:"Read",
          params:{
            fileName:this.fileName,
            category:this.categoryText,
            opf:this.opf,
            model:0,
            href:href
          }
        })
      },
      join(){
        Toast.success('成功加入书架')
        bookShelfList.setBookShelf(this.bookItem)
        this.joinState()
      },
      remove(){

      }
    }
  }
</script>

<style lang="less" scoped>
  .book-detail{
    height: 100vh;
    display: flex;
    flex-direction: column;
    .home-bar{
      &.active{
        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .1);
      }
    }
    .detail-content{
      width: 100%;
      height: 100%;
      .detail-info{
        display: flex;
        padding: 30px;
        box-sizing: border-box;
        width: 100%;
        border-bottom: 1px solid #eee;
        .img{
          flex: 0 0 30%;
          width: 200px;
          img{
            width: 100%;
          }
        }
        .text{
          padding-left: 20px;
          .title{
            color: #333;
            font-weight: 700;
            font-size: 28px;
            padding-top: 20px;
          }
          .author{
            color: #4aabff;
            font-size: 20px;
            padding-top: 30px;
          }
          .category{
            font-size: 24px;
            padding-top: 20px;
            color: #666666;
          }
        }
      }
      .detail-cop{
        padding: 30px;
        border-bottom: 1px solid #eee;
        .cop-title{
          font-weight: 700;
        }
        .cop-content{
          .row{
            padding-top: 20px;
            display: flex;
            color: #666;;
            font-size: 28px;
            .label{
              flex: 0 0 25%;
              overflow:hidden;
              text-overflow:ellipsis;
              -o-text-overflow:ellipsis;
              -webkit-text-overflow:ellipsis;
              -moz-text-overflow:ellipsis;
              white-space:nowrap;
            }
            .text{
              overflow:hidden;
              text-overflow:ellipsis;
              -o-text-overflow:ellipsis;
              -webkit-text-overflow:ellipsis;
              -moz-text-overflow:ellipsis;
              white-space:nowrap;
            }
          }
        }
      }
      .detail-nav{
        padding: 30px;
        border-bottom: 1px solid #eee;
        .nav-title{
          font-weight: 700;
        }
        .nav-wrapper{
          color: #666;
          font-size: 28px;
          .nav-item{
            padding: 30px 0;
            border-bottom: 1px solid #eee;
          }
        }
      }
    }
    .detail-bottom-nav{
      background: white;
      position: relative;
      z-index: 200;
      color: #4aabff;
      width: 100%;
      height: 99px;
      line-height: 104px;
      display: flex;
      justify-content: center;
      font-size: 28px;
     // border-top: 1px rgba(0,0,0,0.3) solid;
      &.active{
        box-shadow: 0 -4px 4px rgba(0, 0, 0, .1);
        border-top: none;
      }
      .btn{
        flex: 1;
        text-align: center;

      }
    }
    .book-audio{
      bottom: 99px;
      z-index: 100;
    }
  }
</style>