<template>
  <div class="set-theme-nav">
    <div class="set-theme-item" v-for="(item,index) in themeList"
         @click="changeTheme(index,item)"
    >
      <div class="preview" :style="{backgroundColor:item.style.body.background}"
           :class="{active:item.name==themeActive}">

      </div>
      <div class="text" :style="{color:checkedColor}">
        {{item.alias}}
      </div>
    </div>
  </div>
</template>

<script>
  import { THEME_LIST} from '@/utils/books'
  import {ebookMixin} from "@/utils/mixin"
  import {userSet} from "@/utils/localStorage"
  export default {
    mixins:[ebookMixin],
    name: "EbookSetTheme",
    data(){
      return {
        themeList:THEME_LIST,
        checkedColor:null
      }
    },
    computed:{
      themeActive: {
        get(){//回调函数 当需要读取当前属性值是执行，根据相关数据计算并返回当前属性的值
          return this.getTheme
        },
        set(val){
          return val
        }
      }
    },
    methods:{
      changeTheme(index,item){
        this.getCurrentBook.rendition.themes.select(item.name)
        userSet.setTheme(item.name)
        this.setTheme(item.name)
        this.changeCss()
      }
    }
  }
</script>

<style lang="less" scoped>
  .set-theme-nav{
    display: flex;
    width: 100%;
    font-size: 16px;
    justify-content: space-around;
    .set-theme-item{
      .preview{
        width: 100px;
        height: 60px;
        &.active{
          border: #5c6b77 1px solid;
          box-shadow: 0 5px 5px rgba(0,0,0,.15);
        }
      }
      .text{
        text-align: center;
        padding-top: 10px;
      }
    }
  }
</style>