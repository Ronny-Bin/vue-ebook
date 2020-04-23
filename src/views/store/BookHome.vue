<template>
  <div class="book-home">
    <div class="book-home-bar" :class="{'show-search': ifShowSearch}">
      <transition>
        <home-bar class="home-bar">
          <span class="icon-back" slot="left" @click="back"></span>
          <span slot="center">书城</span>
          <span class="icon-shake icon" slot="right" @click="showFlapPage"></span>
        </home-bar>
      </transition>
      <transition>
        <div class="search-bar" :class="{'show-search': ifShowSearch}">
          <div class="search-wrapper">
            <span class="icon-search"></span>
            <input type="text" name="" id="" @focus='showSearchPage' placeholder="计算机科学和软件工程" v-model="keyWord"
                   @keyup.enter="searchSubmit"/>
          </div>
        </div>
      </transition>
    </div>
    <transition>
    <div class="book-home-content"  :class="{'show-search': ifShowSearch}">
      <hot-search v-if="ifShowSearchPage"></hot-search>
      <scroll  @onScroll="onScroll" ref="Box" >
        <div class="book-home-wrapper" slot="content" >
          <div class="banner-wrapper">
            <div class="banner" :style="bannerStyle"></div>
          </div>
          <guess-like :LikeData="LikeData"/>
          <recommend :recommendData="recommendData"/>
          <featured :featuredData="featuredData"/>
          <book-category/>
        </div>
      </scroll>
    </div>
    </transition>
    <div class="flap-card-wrapper" v-show="isFlapPage">
      <is-loading v-if="isLoading"></is-loading>
      <div class="flap-card-content" v-if="random">
        <div class="flap-card-head" >
          <div class="flap-card-img">
            <img :src="random.cover">
          </div>
          <span class="flap-card-title">{{random.title}}</span>
          <span class="flap-card-publisher">{{random.publisher}}</span>
        </div>
        <div class="flap-card-footer" @click="showBookDetail(random)">
          Read Now
        </div>
      </div>
      <div class="flap-card-close" @click="closeFlap">X</div>
    </div>
  </div>
</template>


<script>
  import {ebookHome} from "@/utils/mixin.js"
  import HomeBar from "../../components/common/HomeBar";
  import Scroll from "../../components/common/Scroll";
  import HotSearch from "../../components/home/hotSearch";
  import IsLoading from "../../components/common/IsLoading";
  import {getHomeData} from "@/api/api.js"
  import GuessLike from "../../components/home/GuessLike";
  import Recommend from "../../components/home/Recommend";
  import Featured from "../../components/home/Featured";
  import BookCategory from "../../components/home/BookCategory";
  function debounce(func, wait=100){ //可以放入项目中的公共方法中进行调用（鹅只是省事）
    let timeout;
    return function(){
      let context = this;
      let args = arguments
      if(timeout)  clearTimeout(timeout);
      let callNow = !timeout
      timeout = setTimeout(()=>{
        timeout= null
      },wait)
      if(callNow) func.apply(context,args)
    }
  }
  export default {
    name: "BookHome",
    mixins:[ebookHome],
    data(){
      return{
        data:null,
        search:null,
        ifShowSearch:false,
        ifShowSearchPage:false,
        isFlapPage:false,
        random:null,
        isLoading:false,
        bannerStyle: {},
        LikeData:null,
        recommendData:null,
        featuredData:null,
        keyWord:null,
        scrollTop:null,
        flag:[]
      }
    },
    computed:{

    },
    mounted(){
      getHomeData().then(res=>{
        this.data = res.data
        this.bannerStyle = {
          backgroundImage: 'url(' + this.data.banner + ')'
        }
        this.LikeData = this.data.guessYouLike
        this.recommendData = this.data.recommend
        this.featuredData = this.data.featured
      })

    },
    components: {BookCategory, Featured, Recommend, GuessLike, IsLoading, HotSearch, Scroll, HomeBar},
    methods:{
      onScroll(scrollTop){
        var _this = this
        if(scrollTop>0){
          _this.ifShowSearch = true
        }else{
          this.flag.push(scrollTop)
          _this.ifShowSearch = false
        }
      },
      showSearchPage(){
        this.ifShowSearch = true
        this.ifShowSearchPage = true
      },
      back(){
        if(this.ifShowSearchPage ){
          this.ifShowSearchPage = false
        }else {
          this.$router.back(-1)
        }
      },
      showFlapPage(){
        this.random =  null
        this.isFlapPage = true
        this.isLoading = true
        setTimeout(()=>{
          this.isLoading = false
          if(this.data){
            this.random = this.data.random[Math.floor(Math.random()*this.data.random.length)]
          }
        },1000)
      },
      closeFlap(){
        this.isFlapPage = false
      },
      readNow(){

      },
      searchSubmit(){
        if(this.keyWord){
          this.$router.push({
            name:"List",//这个name就是你刚刚配置在router里边的name
            params:{
              category:"search",
              categoryText:this.keyWord
            }
          })
        }else {
        }
      },
    },
    activated() {
      this.$refs.Box.$el.scrollTop = this.scrollTop
    },
    deactivated() {
      this.scrollTop = this.$refs.Box.$el.scrollTop
    }
  }
</script>

<style lang="less" scoped>
  .book-home{
    width: 100%;
    height: 100vh;
    font-size: 30px;
    display: flex;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    flex-direction: column;
    height: 100vh;
    .flap-card-wrapper{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      background: rgba(0,0,0,.7);
      z-index: 120;
      display: flex;
      flex-direction:column;
      justify-content: center;
      align-items: center;
      .flap-card-content{
        position: relative;
        border-radius: 30px;
        width: 450px;
        height: 600px;
        background: white;
        .flap-card-head{
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction:column;
          text-align: center;
          .flap-card-img{
            padding: 40px 0;
          }
          .flap-card-img img{
            vertical-align: middle;
            width: 200px;
            height: 280px;
          }
          .flap-card-publisher{

            color: #666;
            padding: 0 50px;
            padding-top: 20px;
            font-size: 24px;
            word-break:break-all;
            display:-webkit-box;
            -webkit-line-clamp:2;
            -webkit-box-orient:vertical;
            overflow:hidden;
          }
          .flap-card-title{
            padding: 0 50px;
            font-size: 30px;
            word-break:break-all;
            display:-webkit-box;
            -webkit-line-clamp:2;
            -webkit-box-orient:vertical;
            overflow:hidden;
          }
        }
        .flap-card-footer{
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 80px;
          background:#4aabff ;
          border-bottom-left-radius: 30px;
          border-bottom-right-radius: 30px;
          color: white;
          font-size: 30px;
          text-align: center;
          line-height: 80px;
        }
      }
      .flap-card-close{
        margin-top: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        width: 60px;
        height: 60px;
        font-size: 30px;
        border-radius: 50%;
        opacity: 1;
        background-color: #333;
      }
    }
    .book-home-content{
      width: 100%;
      height: 100%;
      overflow:hidden;
      margin-top: 104px;
      translate3d: all .2s linear;
      &.show-search{
       margin-top: 10px;
      }
      .book-home-wrapper{
        width: 100%;
        .banner-wrapper{
          padding: 20px;
          .banner{
            width: 100%;
            height: 260px;
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
    .book-home-bar{
      position: relative;
      .home-bar{  translate3d: all .2s linear;}
      &.show-search{
        display: flex;
        .home-bar{
          height: 104px;
          translate3d: all 0.2s linear;
          box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .1);
        }
      }
      .search-bar{
        position: absolute;
        z-index: 100;
        display: flex;
        align-items: center;
        width: 100%;
        height: 104px;
        background: white;
        top: 84px;
        right: 0;
        translate3d: all .2s linear;
        &.show-search{
          top: 0px;
          width: 90%;
          right: 0;
          translate3d: all .2s linear;
        }

      }
      .search-wrapper{
        display: flex;
        color:#666;
        align-items: center;
        margin: 0px 30px;
        border-radius: 40px;
        width: 100%;
        height: 70px;
        background: #f4f4f4;
      }
      .search-wrapper span{
        padding: 0 30px;
      }
      .search-wrapper input{
        width: 100%;
        padding-right: 30px;
        background:none;
        outline:none;
        border:none;
        color: #5c6b77;
        font-size: 24px;
      }
    }
  }
</style>