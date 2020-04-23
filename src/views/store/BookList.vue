<template>
  <div class="book-list">
    <home-bar class="home-bar" :class="{active:ifShowBox}">
      <span class="icon-back" slot="left" @click="back"></span>
      <span slot="center">共{{bookTotal}}本图书</span>
      <span class="icon-shelf icon" slot="right" @click="showFlapPage"></span>
    </home-bar>
    <scroll @onScroll="onScroll">
      <div slot="content">
        <div v-for="(categoryItem, categoryIndex) in showCategoryDetail" :key="categoryIndex">
          <div class="book-list-title">
            {{showCategory(categoryIndex)}}
          </div>
          <div class="list-wrapper" >
            <div class="list-wrapper-item" v-for="(item, index) in categoryItem" :key="index" @click="showBookDetail(item)">
              <div class="img-wrapper">
                <img class="img" v-lazy="item.cover" :key="item.cover">
              </div>
              <div class="content-wrapper">
                <div class="title title-big" ref="title">{{item.title}}</div>
                <div class="author sub-title" ref="author">{{item.author}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import {ebookHome} from "@/utils/mixin.js"
  import category from "@/utils/lang.js"
  import HomeBar from "../../components/common/HomeBar";
  import {getListData} from "@/api/api.js"
  import Scroll from "../../components/common/Scroll";
  export default {
    mixins:[ebookHome],
    name: "BookList",
    data(){
      return{
        title:null,
        showCategoryDetail:{},
        ifShowBox:false,
        bookTotal:null
      }
    },
    components: {Scroll, HomeBar},
    created() {
      this.title = this.$route.params.categoryText
      const  index = this.$route.params.category
      getListData().then((res)=>{
        const data = res.data.data
        if(index === "all"){
          this.showCategoryDetail = data
        }else if(index === "search"){
          console.log(this.title.toLowerCase())
          const result = {};
          Object.keys(data).forEach(key => {
            const newData = data[key].filter(value=>{
              const searchWord = this.title.toLowerCase().replace(/\s*/g,"")
              const searchData= value.fileName.toLowerCase().replace(/\s*/g,"")
              return searchData.indexOf(searchWord)!== -1
            })
            if(newData.length>0){
              result[key] = newData
            }
          })
          this.showCategoryDetail = result
        }else {
          this.showCategoryDetail = this.getTargetObject(data,[index])
        }
        var num = null
        for(let i in this.showCategoryDetail){
          num += this.showCategoryDetail[i].length
        }
        this.bookTotal =  num

      })
    },
    computed: {

    },
    methods:{
      getTargetObject(targetObject, propsArray) {
        const result = {};
        Object.keys(targetObject).filter(key => propsArray.includes(key)).forEach(key => {
          result[key] = targetObject[key];
        })
        return result;
      },
      showCategory(item){
        const key = item.replace(item[0],item[0].toLowerCase());
        return category[ key ]
      },
      back(){
        this.$router.back(-1)
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
    }

  }
</script>

<style lang="less" scoped>
  .book-list{
    height: 100vh;
    display: flex;
    flex-direction: column;
    .home-bar{
      &.active{
        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .1);
      }
    }
    .book-list-title{
      color: #333;
      font-weight: 700;
      height: 40px;
      line-height: 40px;
      padding-left: 30px;
    }
    .list-wrapper{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .list-wrapper-item{
        padding-top: 20px;
        width: 50%;
        display: flex;
        padding: 20px;
        box-sizing: border-box;
        .img-wrapper{
          flex: 0 0 30%;
          width: 100%;
          .img{
            width: 100%;
          }
        }
        .content-wrapper{
          padding-left: 10px;
          .title{
            font-size: 26px;
            color: #444;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            word-break: keep-all;
            white-space: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            overflow-wrap: break-word;
          }
          .author{
            padding-top: 20px;
            font-size: 20px;
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
        }
      }
    }
  }
</style>