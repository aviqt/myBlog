<template>
	<canvas id="myCanvas"></canvas>
</template>

<script>
	export default {
		data() {
			return {
        ctx: null,
        animationID: null
			}
		},
    mounted() {
    	this._initCanvas()
      window.addEventListener('resize', this._initCanvas, false)
    },
    destroyed() {
      window.removeEventListener('resize', this._initCanvas, false)
      cancelAnimationFrame(this.animationID)
    },
    methods: {
      _initCanvas() {
        let c = document.getElementById("myCanvas")
        c.width = c.clientWidth
        c.height = c.clientHeight
        this.ctx = c.getContext("2d")
        this.ctx.translate(.5 * c.clientWidth, .5 * c.clientHeight)
        
        this._draw()
      },
      _draw () {
        this.ctx.save()
        let time = new Date()
        this.ctx.rotate( 2 * Math.PI  * ( time.getMilliseconds() / 1000 +  time.getSeconds() ) / 60 )
        this.ctx.clearRect(0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight)
        this.ctx.strokeStyle = "rgba(22,0,255,0.5)"
        this.ctx.lineWidth = 10
        this.ctx.lineJoin = 'miter'
        
        this.ctx.beginPath()
        this.ctx.moveTo(40, 100) //起始点
        this.ctx.quadraticCurveTo(40, 50, 180 , 100)
        // this.ctx.bezierCurveTo(50, 100, 100, 120, 180, 180)
        this.ctx.bezierCurveTo(50, 100, 100, 120, 40, 100)
        this.ctx.closePath()
        
        this.ctx.stroke()
        this.ctx.restore()
        
        this.animationID = requestAnimationFrame(this._draw);
      }
    }
	}
  
  
</script>

<style coped>
#myCanvas {
  height: 100%;
  width: 100%;
  
}
</style>
