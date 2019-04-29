<template>
    <div class="img-view-box">
      <img :src="imgInfo.picList[imgInfo.currentIndex].picUrl" :style="imgStyle" alt="" 
        @mousedown="_handleMd($event)" 
        @mousemove="_handleMm($event)" 
        @mousewheel="_handleWheel($event)"
       />
      <div class="operation-bar">
        <el-button type="primary" size="small" @click='imgInfo.currentIndex--'  :disabled="imgInfo.currentIndex === 0">上一张</el-button>
        <el-button type="primary" size="small" @click='imgInfo.currentIndex++' :disabled="imgInfo.currentIndex === imgInfo.picList.length - 1">下一张</el-button>
        <el-button type="danger" size="small" @click="handleCancelClick">关闭</el-button>
      </div>
    </div>
</template>

<script>
export default {
  props: ['imgInfo'],
  data () {
    return {
      imgStyle: {
        height: '',
      },
      imgMoveLock: true,
      mouseAt: {
        X: 0,
        Y: 0
      }
    }
  },
  mounted () {
    window.addEventListener('mouseup' , this._handleMu)
  },
  destroyed () {
    window.addEventListener('mouseup' , this._handleMu)
  },
  methods: {
    handleCancelClick () {
      this.imgInfo.show = false
      this.imgInfo.handlCancleEvent && this.imgInfo.handlCancleEvent()
    },
    _handleMd(e){
      this.imgMoveLock = false
      console.log(e)
      this.mouseAt = {
        X: e.pageX - e.target.offsetLeft ,
        Y: e.pageY - e.target.offsetTop
      }
      e.preventDefault()
    },
    _handleMu(e){
      this.imgMoveLock = true
      e.preventDefault()
    },
    _handleMm(e){
      if(this.imgMoveLock) return
      this._initImgStyle()
      this.imgStyle.left = e.pageX - this.mouseAt.X + 'px'
      this.imgStyle.top = e.pageY - this.mouseAt.Y + 'px'
      e.preventDefault()
    },
    _handleWheel(e){
      this._initImgStyle()
      this.imgStyle.height = e.wheelDelta > 0 ? e.target.height * 1.1 + 'px' : e.target.height * 0.9 + 'px' 
      this.imgStyle.left = e.wheelDelta > 0 ? e.target.offsetLeft - e.target.width * 0.05 + 'px' : e.target.offsetLeft + e.target.width * 0.05 + 'px' 
      this.imgStyle.top = e.wheelDelta > 0 ? e.target.offsetTop - e.target.height * 0.05 + 'px' : e.target.offsetTop + e.target.height * 0.05 + 'px' 
      this.imgStyle = {
        ...this.imgStyle,
        'max-height':'none'
      }
      e.preventDefault()
    },
    _initImgStyle() {
      this.imgStyle = {
        ...this.imgStyle,
        position: 'absolute',
        display: 'block',
      }
    }
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.img-view-box{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0,0.8);
  transition: all 0.5s;
  text-align: center;
}
.operation-bar{
  position: absolute;
  right: 30px;
  top: 30px;
}
.img-view-box > img {
  max-height: 100%;
  cursor: move;
}
</style>
