<template>
  <div>
    <div class='memory-box' :class="{'before':status === 0}">
      <div v-for="num,i in numList" :key='i' @click="clickNum(num)">
        <span :class="{'show': num < currentNum}">{{num}}</span>
      </div>
    </div>
    <el-button @click='_initNumList'>重新开始</el-button>
  </div>
</template>

<script>
	export default {
		data() {
			return {
        numList: [],
        currentNum: 1,
        status: 0,
        sto: null,
			}
		},
    mounted() {
      this._initNumList()
    },
    destroyed() {
    },
    methods: {
      _initNumList(){
        clearTimeout(this.sto)
        this.numList = []
        while(this.numList.length < 9) {
          let num = Math.floor(Math.random() * 9) + 1
          if(this.numList.indexOf(num) === -1) this.numList.push(num)
        }
        this.status = 0
        this.currentNum = 1
        this.sto = setTimeout(()=>{this.status = 1}, 5000)
      },
      clickNum(num) {
        if(this.status === 0) return
        this.currentNum = num === this.currentNum ? num + 1  : 1
        if(this.currentNum === 10) {
          this.status = 0
          this.$message.success('good boy')
        }
      }
    }
	}
</script>

<style coped>
.memory-box{
  height: 300px;
  width: 200px;
}
.memory-box > div{
  width: 30%;
  height: 30%;
  float:left;
  border: 1px solid #ddd;
  margin: 2px;
  text-align: center;
  display: table;
  cursor: pointer;
  background: gray;
}
.memory-box > div > span{
  height: 100%;
  vertical-align: middle;
  text-align: center;
  display: table-cell;
  font-size: 25px;
  opacity: 0;
  background: white;
}
.memory-box > div > .show{
  opacity: 1;
}
.before > div > span{
  opacity: 1;
}
</style>
