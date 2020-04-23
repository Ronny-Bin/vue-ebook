<template>
  <div class="home-title-wrapper">
    <div class="label">{{label}}</div>
    <div class="btn" :class="{'touch': ifOnTouch}"
         @touchstart="onTouchStart"
         @touchend="onTouchEnd"
         @mousedown="onTouchStart"
         @mouseup="onTouchEnd"
         @click="click">{{btn}}</div>
  </div>
</template>

<script >
  export default {
    name:'TitleBar',
    props: {
      label: String,
      btn: String
    },
    data() {
      return {
        ifOnTouch: false
      }
    },
    methods: {
      onTouchStart() {
        this.ifOnTouch = true
      },
      onTouchEnd() {
        this.ifOnTouch = false
      },
      click() {
        this.$emit('onClick')
      }
    }
  }
</script>

<style lang="less" scoped>
  .home-title-wrapper {
    padding: 25px  20px;
    display: flex;
    justify-content: space-between;
    .label {
      flex: 1;
      font-size: 28px;
      color: #333;
      font-weight: bold;
    }
    .btn {
      font-size:24px;
      color: rgba(64, 158, 255, 1);
      &.touch {
        color: rgba(64, 158, 255, .5);
      }
    }
  }
</style>
