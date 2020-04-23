<template>
  <div class="progress-page">
    <div class="progress-top">
      已阅读{{readerTime}}
      <span class="icon-forward"></span>
    </div>
    <div class="progress-center">
      <div class="preview" @click="backProgress">
        <span class="icon-back"></span>
      </div>
      <div class="progress-main">
        <van-slider v-model="progressInfo"
                    active-color="#797979"
                    button-size="50px"
                    inactive-color="#ebedf0"
                    max="100"
                    min="0"
                    @change="changeEnd"
                    :disabled="!bookAvailable"
        >
          <template #button>
            <div class="custom-button">
              {{progressInfo}}
            </div>
          </template>
        </van-slider>
      </div>
      <div class="preview" @click="forwardProgress">
        <span class="icon-forward"></span>
      </div>
    </div>
    <div class="progress-bottom">
     <div class="progress-bottom-wrapper">
       <span >{{getSectionName}}</span>
       <span class="progress-section-text" v-show="!bookAvailable">加载中……</span>
     </div>
    </div>
  </div>
</template>

<script>
  import vueSlider from 'vue-slider-component';
  import 'vue-slider-component/theme/antd.css'
  import {ebookMixin} from "@/utils/mixin"
  import {userSet} from "../../utils/localStorage";
  export default {
    mixins:[ebookMixin],
    name: "EbookSetProgress",
    components: {
      vueSlider
    },
    data () {
      return {
        readerTime:null,
        stepValue:{'Val':0},
        sectionValue:0,
        exeAwait:false,
        book:null,
      }
    },

    created(){
      this.book = this.getCurrentBook
      this.readerTimeHandle()
      this.sectionValue = this.getSection
    },
    computed:{
      progressInfo:{
        get(){
          return this.getProgress
        },
        set(v){
          this.setProgress(v)
        }
      },
      bookAvailable(){
        return this.getBookAvailable
      },
    },
    methods: {
      readerTimeHandle(){
        const date=new Date();
        if(! userSet.getBook(this.getFileName,'time')){
          userSet.setBook(this.getFileName,'time',date.getTime())
          this.readerTime = '0分钟'
        }else {
          this.readerTime = this.transTime(userSet.getBook(this.getFileName,'time'))
        }
      },
      changeEnd(){
        const cfi = this.book.locations.cfiFromPercentage(this.progressInfo / 100)
        this.book.rendition.display(cfi).then(res=>{
          this.refreshLocation()
        })
      },
      forwardProgress(){
        const sectionLength = this.book.spine.length
        if (this.sectionValue < sectionLength-1) {
          this.displaySection(this.sectionValue+1,(res)=>{
            res?this.sectionValue += 1:null
          })
        }
      },
      backProgress(){
        if (this.sectionValue > 0) {
          this.displaySection(this.sectionValue-1,(res)=>{
            res&&this.sectionValue > 0?this.sectionValue -= 1:null
          })
        }
      },
      displaySection(section,callback) {
        const sectionInfo = this.book.section(section)
        if (!this.exeAwait&&sectionInfo) {
          this.exeAwait = true
          this.book.rendition.display(sectionInfo.href).then((res)=>{
            this.refreshLocation()
            callback(true)
            this.exeAwait = false
            userSet.setBook(this.getFileName,'section',section)
          })
        }else {
          return false
        }
      },
    }
  }
</script>

<style lang="less" scoped>
  .progress-page{
    width: 100%;
    text-align: center;
    color: var(--color-tint);
    .progress-bottom{
      .progress-bottom-wrapper{
        width: 70%;
        overflow:hidden;
        text-overflow:ellipsis;
        -o-text-overflow:ellipsis;
        -webkit-text-overflow:ellipsis;
        -moz-text-overflow:ellipsis;
        white-space:nowrap;
      }
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;

    }
    .progress-top{
      font-size:22px;
      margin-bottom: 10px;
    }
    .progress-center{
      width: 100%;
      display: flex;
      font-size: 34px;
      align-items: center;

      .preview{
        flex: 0 0 100px;
      }
      .progress-main{
        flex: 1;
        display: flex;
        input[type="range"] {
          /*-webkit-box-shadow: 0 1px 0 0px #424242, 0 1px 0 #060607 inset, 0px 2px 10px 0px black inset, 1px 0px 2px rgba(0, 0, 0, 0.4) inset, 0 0px 1px rgba(0, 0, 0, 0.6) inset;*/
          -webkit-appearance: none; /*去除默认样式*/

          background-color:  #b2b3b7;;
          /*border-radius: 15px;*/
          width: 100% !important;
          height:4px;
          padding: 0;
          border: none;

          /*input的长度为80%，margin-left的长度为10%*/
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;/*去除默认样式*/
          cursor: default;
          top: 0;
          height: 34px;
          width: 34px;
          transform: translateY(0px);
          /*background: none repeat scroll 0 0 #5891f5;*/
          background:  #e9e9e9;
          border-radius: 50%;
          box-shadow: 0px 5px 5px -2px  rgba(0,0,0,.3);
          /*-webkit-box-shadow: 0 -1px 1px #fc7701 inset;*/
        }
        .progress{
          width: 100%;
          height:6px;
        }
      }
    }
    .progress-bottom{
      font-size: 22px;
      margin-top: 10px;
    }

  }
  .custom-button {
    width: 36px;
    font-size: 13px;
    line-height: 22px;
    text-align: center;
    background-color: white;
    border-radius: 100px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    color: #999999;
  }
</style>