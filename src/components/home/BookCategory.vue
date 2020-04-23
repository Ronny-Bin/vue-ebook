<template>
  <div class="book-category">
    <title-bar :label="label" :btn="btn" @onClick="allCategory"></title-bar>
    <div class="book-category-wrapper">
      <div class="book-category-list" v-for="(item,index) in showCategoryData" :key="index" @click="categoryDetail(index,item)">
        <div class="book-category-item" >
          <div class="content">
            <div class="category-name"> {{showCategory(index)}}</div>
            <div class="num">{{item.length}}本书</div>
          </div>
          <div class="img">
            <img class="img1"v-lazy="item[0].cover">
            <img class="img2" v-lazy="item.length>1?item[1].cover:item[0].cover">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import category from "@/utils/lang.js"
  import {getListData} from "@/api/api.js"
  import TitleBar from "../common/TitleBar";
  export default {
    name: "BookCategory",
    components: {TitleBar},
    data(){
      return{
        label:"分类",
        btn:"查看全部",
        showCategoryData:null
      }
    },
    mounted() {
      getListData().then((res)=>{
        this.showCategoryData = res.data.data
        console.log(res.data.data)
      })
    },
    methods:{
      showCategory(item){
        const key = item.replace(item[0],item[0].toLowerCase());
        return category[ key ]
      },
      allCategory(){
          this.$router.push({
            name:"List",//这个name就是你刚刚配置在router里边的name
            params:{
              category:"all",
              categoryText:"全部分类"
            }
          })
      },
      categoryDetail(index,item){
        const  text = this.showCategory(index)
        this.$router.push({
          name:"List",//这个name就是你刚刚配置在router里边的name
          params:{
            category:index,
            categoryText:text
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
.book-category{
  .book-category-wrapper{
    display: flex;
    flex-wrap: wrap;
    .book-category-list{
      padding: 10px;
      width: 50%;
      box-sizing: border-box;
      .book-category-item{
        background: #eee;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;

        .content{
          flex: 0 0 50%;
          text-align: center;
          .category-name{
            color: #444;
            font-weight: 700;
            font-size: 26px;
          }
          .num{
            color: #666;
            padding-top: 20px;
            font-size: 20px;
          }
        }
        .img{
          flex: 0 0 50%;
          position: relative;
          height: 50%;
          .img1{
            width: 50%;
            position: absolute;
            z-index: 1;

          }
          .img2{
            width: 35%;
            position: absolute;
            z-index: 0;
            right: 50px;
            top: 20px;
          }
        }
      }
    }
  }
}
</style>