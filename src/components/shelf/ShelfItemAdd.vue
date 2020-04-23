<template>
  <div class="shelf-item" @click="addShelf">

    <div class="book-img-wrapper add-book">
      <span class="icon-add icon"></span>
    </div>
    <div class="book-title-wrapper">
    </div>
  </div>
</template>

<script>
  export default {
    name: "ShelfItemAdd",
    methods:{
      addShelf(){
        this.$router.push("/store")
      }
    }
  }
</script>

<style lang="less" scoped>
  .shelf-item{
    flex: 0 0 33.33%;
    padding: 20px;
    box-sizing: border-box;
    .book-img-wrapper{
      width: 160px;
      height: 220px;
      line-height: 220px;
      text-align: center;
      border: 1px solid #ccc;
      font-size: 40px;
      color: #ccc;

    }
    .book-title-wrapper{
      width: 160px;
      padding-top: 20px;
      font-size: 24px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      word-break: keep-all;
      white-space: normal;
      overflow: hidden;
      text-overflow: ellipsis;
      overflow-wrap: break-word;
      color: #444;
    }
  }
</style>