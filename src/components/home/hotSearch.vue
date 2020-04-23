<template>
  <scroll >
    <div slot="content">
      <div class="hot-search-title">
        <span class="label">{{label}}</span>
        <span class="btn">{{btn}}</span>
      </div>
      <div class="hot-search-list">
        <div class="hot-search-item" v-for="(item, index) in searchList.hotSearch" :key="index" @click="searchSubmit(item.text)">
          <div class="icon-wrapper">
            <span class="icon-book icon" v-if="item.type === 1"></span>
            <span class="icon-search icon" v-if="item.type === 2"></span>
          </div>
          <div class="hot-search-text-wrapper">
            <div class="text" ref="searchText">{{item.text}}</div>
            <div class="num" v-if="item.num">{{item.num}}人搜索</div>
          </div>
        </div>
      </div>
      <div class="split-line"></div>
      <div class="hot-search-title">
        <span class="label">搜索记录</span>
        <span class="btn">清空</span>
      </div>
      <div class="hot-search-list">
        <div class="hot-search-item" v-for="(item, index) in searchList.historySearch" :key="index" @click="searchSubmit(item.text)">
          <div class="icon-wrapper">
            <span class="icon-book icon" v-if="item.type === 1"></span>
            <span class="icon-search icon" v-if="item.type === 2"></span>
          </div>
          <div class="hot-search-text-wrapper">
            <div class="text" ref="searchText">{{item.text}}</div>
          </div>
        </div>
      </div>
    </div>
  </scroll>
</template>

<script>
  import Scroll from "../common/Scroll";
  export default {
    name: "hotSearch",
    components: {Scroll},
    data(){
      return{
        label:'热门搜索',
        btn:'换一批',
        searchList: {
          hotSearch: [
            {
              type: 1,
              text: 'Self-Reported Population Health',
              num: '1.8万'
            },
            {
              type: 1,
              text: 'Library and Information Sciences',
              num: '1.1万'
            },
            {
              type: 1,
              text: 'Global Business Strategy',
              num: '1.3万'
            },
            {
              type: 1,
              text: 'Corporate Data Quality',
              num: '1.0万'
            },
            {
              type: 1,
              text: 'Verrechnungspreise',
              num: '3.9万'
            }
          ],
          historySearch: [
            {
              type: 2,
              text: 'Computer Science'
            },
            {
              type: 1,
              text: 'Building the Infrastructure for Cloud Security'
            },
            {
              type: 2,
              text: 'ePub'
            },
            {
              type: 2,
              text: 'api'
            },
            {
              type: 2,
              text: 'Vue.js'
            },
            {
              type: 2,
              text: 'Nginx'
            },
            {
              type: 2,
              text: 'Java'
            },
            {
              type: 2,
              text: 'hdfs'
            },
            {
              type: 2,
              text: 'vuejs'
            },
            {
              type: 2,
              text: 'es6'
            },
            {
              type: 2,
              text: 'Intel'
            },
            {
              type: 1,
              text: 'Pro Git'
            },
            {
              type: 2,
              text: 'imooc'
            },
            {
              type: 2,
              text: 'Education'
            },
            {
              type: 2,
              text: 'Springer'
            },
            {
              type: 2,
              text: 'Environment'
            }
          ]
        }
      }
    },
    mounted() {

    },
    methods:{
      searchSubmit(item){
        this.$router.push({
          name:"List",//这个name就是你刚刚配置在router里边的name
          params:{
            category:"search",
            categoryText:item
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .split-line{

    border-bottom: 1px #f4f4f4 solid;
    margin: 30px;
  }
  .hot-search-title {
    display: flex;
    width: 100%;
    font-size:23px;
    padding: 23px;
    box-sizing: border-box;
    .label {
      flex: 1;
      text-align: left;
      font-weight: bold;
      color: #666;
    }
    .btn {
      flex: 1;
      text-align: right;
      font-weight: bold;
      color: #409EFF;
    }
  }
  .hot-search-list {
    width: 100%;
    padding: 0 23px;
    box-sizing: border-box;
    .hot-search-item {
      padding: 30px;
      display: flex;
      .icon-wrapper {
        flex: 0 0 23px;
        padding-right: 20px;
        .icon-book {
          font-size: 23px;
        }
        .icon-search {
          font-size: 23px;
        }
      }
      .hot-search-text-wrapper {
        flex: 1;
        height: 23px;
        font-size:23px;
        .text {
          flex: 1;
          height: 100%;
          font-size:23px;
          font-weight: bold;
          color: #666;
        }
        .num {
          font-size:23px;
          color: #999;
          margin-top: 13px;
        }
      }
    }
  }
</style>
