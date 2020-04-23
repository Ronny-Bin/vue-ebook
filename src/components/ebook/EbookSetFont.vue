<template>
  <div class="set-font-nav">
    <div class="set-font-size">
      <div class="preview left"
           :style="{fontSize: fontSizeList[0].fontSize + 'px'}">A</div>
      <div class="center-wrapper">
        <div class="select-wrapper" v-for="(item,index) in fontSizeList" :key="index"
             @click="selectFontSize(index,item)">
          <div class="line"></div>
          <div class="point-wrapper" >
            <div class="point" v-if="item.fontSize==DefaultFontSize">
              <div class="point-center">
              </div>
            </div>
          </div>
          <div class="line"></div>
        </div>
      </div>
      <div class="preview right"
           :style="{fontSize: fontSizeList[fontSizeList.length-1].fontSize + 'px'}">A</div>
    </div>
    <div class="set-font-family" @click="selectShow">
      {{getDefaultFontFamily}} >
    </div>
    <transition name="slide-up" >
      <div class="select-font-family" v-if="isShowSelect">
        <div class="title" @click="selectClose">
          <span class="icon-down2"></span>
          <span class="">选择字体</span>
        </div>
        <div class="select-wrapper">
          <div class="select_item" v-for="(item,index) in fontFamilyList"
               :class="{active:DefaultFontFamily==item.font}"
               @click="changeFontFamily(index,item)">
            <div class="item-text">{{item.font}}</div>
            <div class="item-checked" v-if="DefaultFontFamily==item.font">
              <span class="icon-check"></span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { FONT_SIZE_LIST,FONT_FAMILY } from '@/utils/books'
  import {ebookMixin} from "@/utils/mixin"
  import {userSet} from "@/utils/localStorage"
  export default {
    name: "EbookSetFont",
    mixins:[ebookMixin],
    data(){
      return{
        DefaultFontSize:null,
        DefaultFontFamily:null,
        isShowSelect:false,
        fontSizeList:FONT_SIZE_LIST,
        fontFamilyList:FONT_FAMILY
      }
    },
    created(){
      this.DefaultFontSize = this.getDefaultFontSize
      this.DefaultFontFamily = this.getDefaultFontFamily
    },
    methods:{
      selectClose(){
        this.isShowSelect = false
      },
      selectShow(){
        this.isShowSelect = true
      },
      selectFontSize(index,item){
        this.DefaultFontSize = item.fontSize
        this.setDefaultFontSize(item.fontSize)
        userSet.saveFontSize(item.fontSize)
        this.getCurrentBook.rendition.themes.fontSize(item.fontSize + 'px')
      },
      changeFontFamily(index,item){
        this.DefaultFontFamily = item.font
        this.setDefaultFontFamily(item.font)
        userSet.setFontFamily(item.font)
        if(item.font == 'Default'){
          this.getCurrentBook.rendition.themes.font('Times New Roman')
        }else {
          this.getCurrentBook.rendition.themes.font(item.font)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/styles/common";
  .set-font-nav{
    position: relative;
    width: 100%;
    .select-wrapper{
      width: 100%;
      .select_item{
        display: flex;
        justify-content: space-between;
        padding: 40px 20px 0 ;
        font-size: 28px;
        &.active{
          color: #5cacee;
        }
      }
    }
    .select-font-family{
      position: absolute;
      z-index: 200;
      box-shadow: 0px -2px 3px -1px  rgba(0,0,0,.1);
      background-color: var(--color-background);
      color: var(--color-tint);
      width: 100%;
      padding-bottom: 30px;
      bottom: -108px;
      .title{
        text-align: center;
        font-size: 26px;
        font-weight: bold;
        padding: 20px;
        border-bottom: rgba(0,0,0,.1)  1px solid;
        .icon-down2{
          float: left;
          font-size: 30px;
        }
      }
    }
    .set-font-family{
      font-size: 26px;
      text-align: center;
      padding-top: 20px;
    }
    .set-font-size{
      display: flex;
      height: 100%;
      width: 100%;
      .preview{
        display: flex;
        flex: 0 0 70px;
        align-items: center;
      }
      .left{
        justify-content: flex-end;
      }
      .right{
        justify-content: left;
      }
      .center-wrapper{
        display: flex;
        width: 100%;
        .select-wrapper{
          flex: 1;
          display: flex;
          align-items: center;
          &:first-child{
            .line:first-child{
              border-top:0;
            }
          }
          &:last-child{
            .line:last-child{
              border-top:0;
            }
          }
          .line{
            align-items: center;
            width: 100%;
            height: 0;
            border-top:1px var(--color-tint) solid;/*no*/
          }
          .point-wrapper{
            width: 0;
            height: 20px;
            position: relative;
            z-index: 10;
            border-left:1px var(--color-tint) solid;/*no*/
            .point{
              width: 36px;
              height: 36px;
              background-color: white;
              border-radius: 50%;
              margin-left: -18px;
              margin-top: -10px;
              box-shadow: 0 5px 5px rgba(0,0,0,.15);
              display: flex;
              justify-content: center;
              align-items: center;
              .point-center{
                width: 10px;
                height: 10px;
                background-color: #5c6b77;
                border-radius: 50%;
              }
            }
          }

        }
      }
    }
  }
</style>