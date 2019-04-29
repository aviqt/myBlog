<template>
	<div class="video-box">
		<video id="_video" preload="metadata" >
		  <source :src="videoProps.src" >
		  your browser does not support the video tag
		</video>
    <div class="pause-area" @click="_play"></div>
    <i class="iconfont icon-playcircle" @click="_play" v-if="video.paused"></i>
    <div class="control-bar">
      <div class="progress-bar" @click="_clickProgressBar" ref="progressBar">
        <div class="progress-bar-line">
          <div class="progress-bar-inner" :style="{'width':progressBarInnerWidth}"></div>
        </div>
      </div>
      <i class="iconfont" @click="_play"  :class="{'icon-playcircle':video.paused,'icon-pause':!video.paused}"></i>
      <span class="time-warp">{{computedVideoProps.currentTime}} / {{computedVideoProps.duration}}</span>
      <div class="speed-change">
        倍速播放
        <div class="speed-list">
          <span v-for="item in [0.5, 1, 2, 4, 8]" :key="item" @click="_changeSpeed(item)"
            :style="{color: item === videoProps.playbackRate ? 'orange':''}">{{item}}</span>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
	export default {
    props: ['src'],
		data() {
			return {
				video: [],
        videoProps:{
          currentTime: 0,
          duration: 0,
          playbackRate: 1,
          src: ''
        }
			}
		},
    mounted() {
      this.videoProps.src = this.src ? this.src : 'http://www.w3school.com.cn/example/html5/mov_bbb.mp4'
    	this.video = document.getElementById("_video")
      this._initVideoEvent()
    },
    methods: {
      _initVideoEvent(){
        this.video.addEventListener('timeupdate' , () => {
          this.videoProps.currentTime = this.video.currentTime
          this.videoProps.duration = this.video.duration
        })
      },
      _play () {
        if(this.video.paused){
          this.video.play()
        } else {
          this.video.pause()
        }
      },
      _changeSpeed(speed){
        this.videoProps.playbackRate = speed
        this.video.playbackRate = speed
      },
      _clickProgressBar(event){
        let progressBar = this.$refs.progressBar
        let clickX = event.clientX - this.elementPageX(progressBar)
        this.video.currentTime = clickX / progressBar.offsetWidth * this.video.duration
      },
      elementPageX(e){
        return e.offsetParent ? e.offsetLeft + this.elementPageX(e.offsetParent) : e.offsetLeft
      }
    },
    computed: {
      progressBarInnerWidth () {
        if(this.videoProps.duration === 0) return 0
        return (this.videoProps.currentTime / this.videoProps.duration) * 100 + '%'
      },
      computedVideoProps () {
        let currentTime = parseInt(this.videoProps.currentTime/60).toString().padStart(2,'00') + ':' + parseInt(this.videoProps.currentTime%60).toString().padStart(2,'00')
        let duration = parseInt(this.videoProps.duration/60).toString().padStart(2,'00') + ':' + parseInt(this.videoProps.duration%60).toString().padStart(2,'00')
        return {
          currentTime,
          duration
        }
      }
    }
	}
</script>

<style scoped>
.video-box{
  width: 100%;
  height: 100%;
  position: relative;
}
#_video {
  object-fit: fill;
  width: 100%;
  height: 100%;
}
.video-box > .iconfont {
  position: absolute;
  font-size: 100px;
  margin: -50px 0 0 -50px; 
  cursor: pointer;
  left: 50%;
  top: 50%;
  color: white;
}
.video-box > .pause-area {
  position: absolute;
  height: 100%;
  width: 100%;
  cursor: pointer;
  left: 0;
  top: 0;
  background: rgba(0,0,0,0.1);
  display: none;
}
.video-box:hover > .pause-area {
  display: block;
}
.video-box .control-bar{
  position: absolute;
  height: 70px;
  width: 100%;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0,0.5);
  opacity: 0;
  transition: all 0.2s;
  color: white;
}
.video-box:hover .control-bar{
  opacity: 1;
}
.control-bar .speed-change {
  position: absolute;
  right: 30px;
  top: 18px;
  cursor: pointer;
  line-height: 40px;
  width: 100px;
  text-align: center;
}
.control-bar .speed-change:hover {
  background: rgba(0,0,0,0.5);
}
.speed-change .speed-list{
  position: absolute;
  left: 0;
  bottom: 100%;
  width: 100px;
  background: rgba(0,0,0,0.5);
  display: none;
}
.control-bar .speed-change:hover .speed-list{
  display: block;
}
.speed-change .speed-list span{
  display: block;
  text-align: center;
}
.speed-change .speed-list span:hover{
  color: darkorange;
  background: rgba(255,255,255,0.1);
}
.control-bar .time-warp {
  position: absolute;
  left: 70px;
  top: 27px;
}
.control-bar .iconfont{
  position: absolute;
  font-size: 40px;
  cursor: pointer;
  left: 15px;
  top: 15px;
}
.control-bar .progress-bar {
  height: 15px;
  width: 100%;
  cursor: pointer;
  position:relative;
  margin-top: -5px;
}
.progress-bar .progress-bar-line {
  top: 5px;
  height: 5px;
  width: 100%;
  padding-right: 16px;
  background: white;
  background: rgba(255,255,255,0.2);
  position: absolute;
}
.progress-bar-line .progress-bar-inner {
  height: 100%;
  background: #df953a;
  position:relative;
}
.progress-bar-line .progress-bar-inner:before {
  content: '';
  height: 16px;
  width: 16px;
  left: 100%;
  top: -6px;
  border-radius: 50%;
  border: 5px solid white;
  background: #df953a;
  position:absolute;
}

</style>
