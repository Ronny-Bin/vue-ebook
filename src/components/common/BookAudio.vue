<template>
  <transition name="shelf-audio" >
    <div class="shelf-audio">
      <!-- 播放视图 -->
      <div class="audio-div">
        <div class="bg-blur"></div>
        <div class="audio-block">
          <div class="header">
            <label class="startTime">{{ audio.currentTime | formatSecond}}</label>
            <div class="silder">
              <div class="slider" @touchstart="handleTouchStart">
                <div class="slider-track"></div>
                <div class="silderNone" :style="'width:'+silderNone+'%'"></div>
                <div class="slider-fill" :style="'width:'+sliderTime+'%'"></div>
                <div class="slider-thumb" :style="'left:'+sliderTime+'%'"></div><!--'+sliderTime+'-->
              </div>
              <!--  -->
              <audio
                      ref="audio"
                      @pause="onPause"
                      @play="onPlay"
                      @timeupdate="onTimeupdate"
                      @loadeddata="onLoadedmetadata"
                      :src="current.audioHttp"
                      controls="controls"
                      style="display:none;"
                      @canplaythrough="canplay"
              ></audio>
            </div>
            <label class="endtime">{{ audio.maxTime | formatSecond}}</label>
          </div>
          <!-- <label class="playname">{{current.title}}</label> -->
          <div class="model-div">
            <div class="play-last" >
              <i class="fa fa-backward"></i>
            </div>
            <div class="play"
                 v-show="play&&isCanPlay"
                 @click="startPlayOrPause">
              <span class="icon-play_pause"></span>
            </div>
            <div class="play"
                 @click="startPlayOrPause"
                 v-show="!play&&isCanPlay">
              <span class="icon-play_go"></span>
            </div>
            <div class="play" v-show="!isCanPlay">
              <i class="fa fa-spinner fa-pulse"></i>
            </div>
            <div class="play-next">
              <span class="fa fa-forward"></span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </transition>
</template>

<script>
  export default {
    name: "BookAudio",
    data() {
      return {
        sliderTime: 0,
        silderNone: 0,
        isCanPlay:true,
        audio: {
          // 该字段是音频是否处于播放状态的属性
          playing: false,
          // 音频当前播放时长
          currentTime: 0,
          // 音频最大播放时长
          maxTime: 0,
          minTime: 0,
          step: 0.1
        },
        lefticon: "",
        play: false, // 播放暂停按钮
        current: {
          startTime: "00:00",
          endtime: "00:00",
          index: 1,
          nextIndex: 1,
          name: "第一节:",
          author: "暂无",
          audioHttp: "http://run.huiyinapp.cn/static/06.mp3",
          title: "四大基础险种",
          desc: "主讲老师:郭冲老师",
          times: ""
        }
      };
    },
    mounted() {
      //this.$refs.audio.play();
      var that=this;
      that.play = false;
      //this.$refs.audio.pause();
    },
    filters: {
      // 使用组件过滤器来动态改变按钮的显示
      transPlayPause(value) {
        return value ? "暂停" : "播放";
      },
      // 将整数转化成时分秒
      formatSecond(second = 0) {
        var secondType = typeof second;
        if (secondType === "number" || secondType === "string") {
          second = parseInt(second);
          var hours = Math.floor(second / 3600);
          second = second - hours * 3600;
          var mimute = Math.floor(second / 60);
          second = second - mimute * 60;
          return ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2);
        } else {
          return "0:00:00";
        }
      }
    },
    methods:{
      // 播放音频
      canplay(){
        if(!this.isCanPlay){
          this.play = true;
        }
        console.log(2222)
        this.isCanPlay = true
        this.audio.playing = true
        var times = setInterval(() => {
          this.silderNone = this.silderNone+1;
          if(this.silderNone >=100){
            window.clearInterval(times);
          }
        }, 100);

      },
      // 暂停音频
      pause() {
        this.$refs.audio.pause();
      },
      // 当音频播放
      onPlay() {
        //this.audio.playing = true;
      },
      // 当音频暂停
      onPause() {
        var startTime = parseInt(this.audio.currentTime);
        //
        this.play = false;
        if (startTime === this.audio.maxTime) {
          this.sliderTime = 0;
          this.audio.currentTime = "00:00";
        }
      },
      // 当加载语音流元数据完成后，会触发该事件的回调函数
      // 语音元数据主要是语音的长度之类的数据
      // 结束时间
      onLoadedmetadata(res) {
        this.audio.maxTime = parseInt(res.target.duration);
      },
      // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
      // 当音频当前时间改变后，进度条也要改变
      onTimeupdate(res) {
        this.audio.currentTime = res.target.currentTime;
        this.sliderTime = parseInt(
            (this.audio.currentTime / this.audio.maxTime) * 100
        );
      },

      // 进度条格式化toolTip
      formatProcessToolTip(index = 0) {
        index = parseInt((this.audio.maxTime / 100) * index);
        return "进度条: " + realFormatSecond(index);
      },

      handleTouchStart(e) {
        //this.setValue(e.touches[0]);
        document.addEventListener("touchmove", this.handleTouchMove);
        document.addEventListener("touchup", this.handleTouchEnd);
        document.addEventListener("touchend", this.handleTouchEnd);
        document.addEventListener("touchcancel", this.handleTouchEnd);

      },
      handleTouchMove(e) {
        this.setValue(e.changedTouches[0]);
      },
      handleTouchEnd(e) {

        this.setValue(e.changedTouches[0]);
        document.removeEventListener("touchmove", this.handleTouchMove);
        document.removeEventListener("touchup", this.handleTouchEnd);
        document.removeEventListener("touchend", this.handleTouchEnd);
        document.removeEventListener("touchcancel", this.handleTouchEnd);
      },
      // 从点击位置更新 value
      setValue(e) {
        const $el = this.$el;
        const { maxTime, minTime, step } = this.audio;
        let value =
            ((e.clientX ) / $el.offsetWidth/0.68) *
            (maxTime - minTime) - $el.offsetWidth*0.32*2;
        console.log(e.clientX)
        value = Math.round(value / step) * step + minTime;
        value = parseFloat(value.toFixed(5));

        if (value > maxTime) {
          value = maxTime;
        } else if (value < minTime) {
          value = minTime;
        }
        this.$refs.audio.currentTime = value;
      },
      // 拖动进度条，改变当前时间，index是进度条改变时的回调函数的参数0-100之间，需要换算成实际时间
      changeCurrentTime(index) {
        console.log("拖动进度条");
        this.$refs.audio.currentTime = parseInt(
            (index / 100) * this.audio.maxTime
        );
      },
      /**
       * 控制音频的播放与暂停 {三元运算方式简单/后期优化}
       */
      startPlayOrPause() {
        if (this.audio.playing) {
          if(this.play){
            this.$refs.audio.pause();
            this.play = false;
          }else {
            this.$refs.audio.play()
            this.play = true
          }
        }else {
          this.$refs.audio.play()
          this.isCanPlay = false
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/styles/common";
  .shelf-audio{
    width: 100%;
    height: 200px;
    position: fixed;
    background: white;
    box-shadow:0 -5px 5px rgba(0,0,0,.1) ;
    .audio-div {
      position: relative;
      width: 100%;
      height: 200px;
      background: #fff;
      margin-top: 50px;
      .audio-block {
        width: 100%;
        height: 9px;
        display: inline-block;
        position: relative;
        .header {
          position: relative;
          width: 68%;
          display: inline-block;
          top: 0;
          text-align: center;
          height: 70px;
          line-height:70px;
          .slider {
            width: 100%;
            position: relative;
            height: 1px;
            left: 120px;
            display: flex;
            align-items: center;
            bottom: 10px;
            cursor: default;
            border-radius: 30px;
            user-select: none;
            outline: none;
          }
          .silderNone {
            position: absolute;
            height: 5px;
            width: 100%;
            background-color:#ccc;
            left: 0;
            border-radius: 3px;
            top: 50%;
            margin-top: px;
          }

          .slider-track {
            position: absolute;
            height: 5px;
            left: 0;
            right: 0;
            border-radius: 3px;
            top: 50%;
            background-color: #e4e4e4;
          }

          .slider-fill {
            position: absolute;
            height: 5px;
            width: 100%;
            background-color: #ffbb38;
            left: 0;
            border-radius:3px;
            top: 50%;

          }

          .slider-thumb {
            position: absolute;
            width: 20px;
            top: 1.5px;
            height: 20px;
            background-color: #ffbb38;
            color: #ffbb38;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            cursor: pointer;
          }

          .startTime {

            position: absolute;
            z-index: 2;
            left: 35px;
            font-size: 26px;
            bottom: 45px;
            color: #666666;
          }
          .endtime {
            color: #666666;
            font-size: 25px;
            position: absolute;
            z-index: 2;
            left: 650px;
            bottom: 45px;
          }
        }
      }

      .model-div {
        position: relative;
        width: 100%;
        bottom: 30px;
        height: 10px;
        text-align: center;
        display: flex;
        justify-content: space-around;
        color: #4aabff;
        .play{
          font-size: 80px;
        }
        .play-last{
          margin-top: 20px;
        }
        .play-next{
          margin-top: 20px;
        }
      }
      .playicon {
        width: 10px;
        height: 10px;
        position: relative;
        display: inline-block;
        top: 0;
      }
      .lasticon {
        position: absolute;
        width:70px;
        height: 74px;
        left: 12px;
        top: 2px;
      }

      .nexticon {
        position: absolute;
        width: 74px;
        height: 74px;
        right: 12px;
        top:2px;
      }
    }
  }
</style>