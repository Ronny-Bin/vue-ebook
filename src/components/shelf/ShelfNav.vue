<template>
  <div class="shelf-nav" :class="{'is-selected':isSelectedState}">
    <div class="shelf-download" >
      <div class="shelf-download-wrapper" @click="showPopup">
        <span class="icon-download"></span>
        <div class="text">离线阅读</div>
      </div>
    </div>
    <div class="shelf-remove">
      <div class="shelf-remove-wrapper" @click="removeShelf">
        <span class="icon-shelf"></span>
        <div class="text">移出书架</div>
      </div>
    </div>
    <van-popup v-model="show"  position="bottom" :style="{ height: '20%' }" >
      <div class="popup-wrapper">
        <div class="msg" ><span>开启后，将自动缓存所选书籍内容</span></div>
        <div class="confirm" @click="openDownload"><span>开启</span></div>
        <div class="cancel" @click="cancel"><span>取消</span></div>
      </div>
    </van-popup>
  </div>
</template>

<script>


  export default {
    name: "ShelfNav",
    props:{
      isSelectedState:{
        type:Boolean,
        default(){
          return false
        }
      }
    },
    data() {
      return {
        show: false,
      };
    },
    methods:{
      removeShelf(){
        this.$emit('removeShelf')
      },
      showPopup() {
        this.show = true;
      },

      openDownload(){
        this.$emit('openDownload')
        this.show = false
      },
      cancel(){
        this.show = false
      }
    }
  }
</script>

<style lang="less" scoped>
  .shelf-nav{
    background: white;
    opacity: .5;
    color: #666;
    bottom:0;
    width: 100%;
    height: 100px;
    display: flex;
    justify-items: center;
    text-align: center;
    justify-content: space-between;
    box-shadow: 0 -4px 4px 0 rgba(0,0,0,0.1);
    &.is-selected{
      opacity: 1;
    }
    .shelf-download{
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .shelf-download-wrapper{

      .text{
        font-size: 26px;
      }
      }
    }
    .shelf-remove{
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      width: 100%;
      .shelf-remove-wrapper{
        margin:0px auto;
      .text{
        font-size: 26px;
      }
      }
    }
    .popup-wrapper{
      display: flex;
      flex-direction: column;
      text-align: center;
      height: 100%;
      .msg{
        color: #999;
        border-bottom: 1px solid #eee;
        opacity: 1;
        flex: 0 0 20%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
      }
      .confirm{
        color: #666;
        font-weight: 700;
        border-bottom: 1px solid #eee;
        opacity: 1;
        flex: 0 0 40%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .cancel{
        .confirm();
        border-bottom:0;
        flex: 0 0 40%;
      }
    }
  }

</style>