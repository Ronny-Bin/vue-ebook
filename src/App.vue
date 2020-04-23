<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  import {ebookMixin} from "@/utils/mixin"
  import {userSet} from "@/utils/localStorage"
  export default {
    mixins:[ebookMixin],
    name: 'App',
    created() {
      userSet.getFontFamily()?this.setDefaultFontFamily(userSet.getFontFamily()):null
      userSet.getFontSize()? this.setDefaultFontSize(userSet.getFontSize()):null
      userSet.getTheme()? this.setTheme(userSet.getTheme()):null
    }
  }


</script>
<style lang="less">

  #app {

  }
</style>
