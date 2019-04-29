<template>
  <div class="signature-box">
    <canvas id="signature"></canvas>
    <el-button type="danger" @click="clear">清除</el-button>
    <el-button type="primary" @click="save">保存</el-button>
    <span>{{platform}}</span>
    <span>{{status}}</span>
    <img :src="url" alt="">
  </div>
</template>

<script>
let preHandler = (e) => {
  e.preventDefault()
}
  
	export default {
		data() {
			return {
        url: '',
        canvas: null,
        cxt: null,
        status: 0 ,
        platform: '',
        eventStr: {
          PC: {
            start: "mousedown",
            end: "mouseup",
            drawing: "mousemove"
          },
          MOBILE: {
            start: "touchstart",
            end: "touchend",
            drawing: "touchmove"
          }
        }
			}
		},
    mounted() {
      this.canvas = document.getElementById('signature')
      this.cxt = this.canvas.getContext('2d')
      this.canvas.width = this.canvas.clientWidth
      this.canvas.height = this.canvas.clientHeight
      this.initDraw()
      this.clear() 
    },
    destroyed() {
    },
    methods: {
      initDraw() {
        this.platform = navigator.platform.indexOf('Win32') != -1 ? 'PC' : 'MOBILE'
        this.canvas.addEventListener(this.eventStr[this.platform].start, event => {
          this.status = 1
          this.drawBegin(event)
          document.addEventListener(this.eventStr[this.platform].start, preHandler, false)
          //event.preventDefault()
        })
        this.canvas.addEventListener(this.eventStr[this.platform].drawing, event => {
          this.drawing(event)
          document.addEventListener(this.eventStr[this.platform].drawing, preHandler, false)
        })
        document.addEventListener(this.eventStr[this.platform].end, event => {
          this.drawEnd(event)
          //event.preventDefault()
        })
      },
      drawBegin(e) {
        //if(this.platform != "PC"){
        //  winodw.getSelection() 
        //    ? window.getSelection().removeAllRanges()
        //    : document.selection.empty()
        //}
        this.cxt.strokeStyle = "#f00"
        this.cxt.beginPath()
        let X = this.platform === "PC" ? e.clientX : e.changedTouches[0].clientX
        let Y = this.platform === "PC" ? e.clientY : e.changedTouches[0].clientY
        this.cxt.moveTo(
          X - this.canvas.getBoundingClientRect().left ,
          Y - this.canvas.getBoundingClientRect().top
        )
      },
      drawing(e) {
        if(this.status === 0) return
        let X = this.platform === "PC" ? e.clientX : e.changedTouches[0].clientX
        let Y = this.platform === "PC" ? e.clientY : e.changedTouches[0].clientY
        this.cxt.lineTo(
          X - this.canvas.getBoundingClientRect().left ,
          Y - this.canvas.getBoundingClientRect().top
        )
        this.cxt.stroke()
      },
      drawEnd() {
        this.status = 0
        document.removeEventListener(this.eventStr[this.platform].start, preHandler, false)
        document.removeEventListener(this.eventStr[this.platform].drawing, preHandler, false)
      },
      clear() {
        this.cxt.clearRect(0, 0, this.cxt.canvas.clientWidth, this.cxt.canvas.clientHeight)
        this.url = this.canvas.toDataURL('image/png')
      },
      save() {
        this.url = this.canvas.toDataURL('image/png')
      }
    }
	}
</script>

<style coped>
.signature-box {
  height: 100%;
  width: 100%;
  overflow: auto;
  background: white;
}
#signature {
  height: 300px;
  width: 600px;
  background: white;
  border: 1px solid #ddd;
}
</style>
