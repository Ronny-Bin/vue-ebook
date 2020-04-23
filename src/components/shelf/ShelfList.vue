<template>
  <div class="shelf-list" >
    <shelf-item v-for="(item,index) in shelfList" :shelfItem="item">
      <div class="selected-wrapper" slot="selected" v-show="isEdit" @click="selected(item,index)">
        <span class="icon-selected" :class="{active:selectedList.includes(index)}"></span>
      </div>
    </shelf-item>
    <shelf-item-add></shelf-item-add>
  </div>
</template>

<script>
  import {bookShelfList} from "../../utils/localStorage";
  import ShelfItem from "./ShelfItem";
  import ShelfItemAdd from "./ShelfItemAdd";
  import Scroll from "../common/Scroll";
  export default {
    name: "ShelfList",
    components: {Scroll, ShelfItemAdd, ShelfItem},
    props:{
      isEdit:{
        type:Boolean,
        default(){
          return false
        }
      },
      shelfList:{
        type:Array,
        default(){
          return []
        }
      }
    },
    watch:{
      isEdit(v){
        this.selectedList = []
      },

    },
    data(){
      return{
        selectedList:[]
      }
    },
    mounted() {
    },
    methods:{
      selected(item,index){
        const indexFlg = this.selectedList.indexOf(index)
        if(this.selectedList.includes(index)){
          this.selectedList.splice(indexFlg,1);
        }else {
          this.selectedList.push(index)
        }
        this.$emit("selectedState",this.selectedList)
      }
    }

  }
</script>

<style lang="less" scoped>
  .shelf-list{
    display: flex;
    padding: 30px;
    width: 100%;
    box-sizing: border-box;
    flex-wrap:wrap;
    .selected-wrapper{
      width: 160px;
      height: 220px;
      position: absolute;
      z-index: 100;
      bottom: 0;
      top: 20px;
      .icon-selected{
        position: absolute;
        bottom:5px;
        right: 10px;
        color: rgba(0,0,0,.4);
        &.active{
          color: #4aabff;
        }
      }
    }
  }
</style>