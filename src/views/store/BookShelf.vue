<template>
  <div class="book-shelf">
    <shelf-title class="shelf-title" :class="{active:ifShowBox}" @editShelf="editShelf" ref="shelfTitle"> </shelf-title>
    <scroll @onScroll="onScroll">
      <shelf-list slot="content"
                  :isEdit="isEdit"
                  :shelfList="shelfListData"
                  @selectedState="selectedState"></shelf-list>
    </scroll>
    <shelf-nav v-show="isEdit"
               :isSelectedState="isSelectedState"
               @removeShelf="removeShelf"
               @openDownload="openDownload"
    ></shelf-nav>
  </div>
</template>

<script>
  import Epub from "epubjs"
  import {support,setLocalForage,getLocalForage} from "../../utils/localForage";
  import { Notify,Toast } from 'vant';
  import {download} from '@/api/api.js'
  import {bookShelfList} from "../../utils/localStorage";
  import ShelfTitle from "../../components/shelf/ShelfTitle";
  import ShelfList from "../../components/shelf/ShelfList";
  import Scroll from "../../components/common/Scroll";
  import ShelfNav from "../../components/shelf/ShelfNav";
  export default {
    name: "BookShelf",
    components: {ShelfNav, Scroll, ShelfList, ShelfTitle},
    data(){
      return{
        ifShowBox:false,
        isEdit:false,
        isSelectedState:false,
        shelfListData:[],
        selectedList:[],
        isDownLoading:false,
      }
    },
    mounted(){
      this.getBookShelfData()
    },
    methods:{
      handleClick(){

      },
      getBookShelfData(){
        const bookShelfListData = bookShelfList.getBookShelf()
        if(bookShelfListData){
          this.shelfListData =  bookShelfListData.v
        }
      },
      onScroll(scrollTop){
        if(scrollTop>0){
          this.ifShowBox = true
        }else {
          this.ifShowBox = false
        }
      },
      editShelf(v){
        this.isEdit = v
        this.isSelectedState = false
      },
      selectedState(v){
        this.selectedList = v
        if(v.length>0){
          this.isSelectedState = true
        }else {
          this.isSelectedState = false
        }
      },
      removeShelf(){
        bookShelfList.removeBookShelf(this.selectedList)
        this.getBookShelfData()
        Toast.success('移出书架成功');
        this.isSelectedState = false
        this.$refs.shelfTitle.edit();
      },
      //离线加载
      async openDownload(){
        if(support()){
          const selectedShelfListData = []
          this.selectedList.forEach((v_key)=>{
            if(this.shelfListData.hasOwnProperty(v_key)){
              selectedShelfListData.push(this.shelfListData[v_key])
            }
          })
          // //更新状态更改
          this.isSelectedState = false
          this.$refs.shelfTitle.edit();
          for (let i = 0; i <  selectedShelfListData.length; i++) {
            this.isDownLoading = true
            Toast.loading({
              message: '加载中...',
              forbidClick: this.isDownLoading,
              loadingType: 'spinner',
            });
              await this.downloadBook(selectedShelfListData[i]).then(()=>{
              Toast.success('离线下载成功');
              bookShelfList.updateBookShelfDown([this.selectedList[i]])
              this.getBookShelfData()
            })
          }
        }
      },
      downloadBook(item) {
        return new Promise((resolve, reject) => {
          getLocalForage(item.fileName, (err, value) => {
            if (!err && value instanceof Blob) {
              console.log(`[${item.fileName}]读取成功...`, value, new Epub(value))
              resolve()
            } else {
              download(item, item => {
                console.log('[' + item.fileName + ']下载成功...')
                resolve()
              }, reject, reject, progressEvent => {
                this.isDownLoading = false
                const progress = Math.floor(progressEvent.loaded / progressEvent.total * 100) + '%'
                this.toastText = '开启离线'+ `${item.fileName}.epub(${progress})`
                Toast(this.toastText);
              })
            }
          })
        })
      },
      download
    }
  }
</script>

<style lang="less" scoped>
  .book-shelf{
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    .shelf-title{
      &.active{
        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .1);
      }
    }
  }
</style>