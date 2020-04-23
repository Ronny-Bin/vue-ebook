<template>
  <div class="shelf-title">
    <home-bar class="home-bar" :class="{active:ifShowBox}">
      <span class="clear" slot="left" @click="clear">清除缓存</span>
      <span slot="center">书架</span>
      <span class="edit" slot="right" @click="edit" v-if="!ifEdit">编辑</span>
      <span class="edit" slot="right" @click="edit" v-else>取消</span>
    </home-bar>
  </div>
</template>

<script>

  import { Notify,Toast } from 'vant';
  import {bookShelfList} from "../../utils/localStorage";
  import HomeBar from "../common/HomeBar";
  export default {
    name: "ShelfTitle",
    components: {HomeBar},
    data(){
      return{
        ifShowBox:false,
        ifEdit:false
      }
    },
    methods:{
      clear(){
        const shelfList =  bookShelfList.getBookShelf()
        if(shelfList && shelfList.v.length > 0){
          bookShelfList.clearBookShelf()
          Toast.success('已经清除书架');
          this.$router.push('/store')
        }else {
          Toast.fail('没有可清理的内容');
        }
      },
      edit(){
        this.ifEdit = !this.ifEdit
        this.$emit('editShelf',this.ifEdit)
      }
    }
  }
</script>

<style lang="less" scoped>
  .shelf-title{
    .home-bar{

      .clear{
        font-size: 28px;
        color: #666;
      }
      .edit{
        color: #666;
        font-size: 28px;
        float: right;
      }
    }
  }
</style>