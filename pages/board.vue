<template>
	<div>
		<div class="board">
      <div v-for="(item,index) in items" :style="{transform: item.transform}" @click="itemClick(index)" 
        class="item" :item-code="String.fromCharCode(65 + index)">
        <component :is="item.compontent"></component>
      </div>
    </div>
	</div>
</template>

<script>
import ComponentTest from '@/components/board/ComponentTest'
import BaiduMap from '@/components/board/BaiduMap'
import Canvas from '@/components/board/Canvas'
import Experiment from '@/components/board/Experiment'
import Video from '@/components/board/Video'
import Signature from '@/components/board/Signature'

export default {
  data() {
    return {
      items: [
        {transform: 'translate(0, 0) scale(1)', compontent: Signature},
        {transform: 'translate(67%, -33.5%) scale(0.33)', compontent: BaiduMap},
        {transform: 'translate(67%, 0%) scale(0.33)', compontent: Canvas},
        {transform: 'translate(67%, 33.5%) scale(0.33)', compontent: Experiment},
        {transform: 'translate(-33.5%, 67%) scale(0.33)', compontent: Video},
        {transform: 'translate(0%, 67%) scale(0.33)', compontent: ComponentTest},
        {transform: 'translate(33.5%, 67%) scale(0.33)'},
        {transform: 'translate(67%, 67%) scale(0.33)'},
      ],
      currentItemIndex: 0
    }
  },
  methods: {
    itemClick (index) {
      if(index === this.currentItemIndex) return false
      let tmp = this.items[this.currentItemIndex].transform;
      this.items[this.currentItemIndex].transform = this.items[index].transform
      this.items[index].transform = tmp
      this.currentItemIndex = index
    }
  }
}
</script>

<style>
body {
  background: url(../static/images/board-bg.png) no-repeat;
  background-size: cover;
}
.board {
  position: fixed;
  left: 10%;
  right: 10%;
  top: 8%;
  bottom: 8%;
  background: rgba(255,255,255,0.3);
  box-shadow: 0 0 30px white;
  animation: boardEntry 1s;
}
.board:before {
  content: '';
  position: absolute;
  left: -2%;
  right: -2%;
  top: -3%;
  bottom: -3%;
  border-radius: 1%;
  box-shadow: 0 0 30px white inset;
}
.board .item{
  position: absolute;
  width: 75%;
  height: 75%; 
  background: rgba(0,0,0,0.2);
  box-shadow: 0 0 20px honeydew inset;
  border-radius: 1%;
  transition:all 0.3s;
  overflow: hidden;
}
.board .item:hover{
  box-shadow: 0 0 50px white inset;
  transition:all 0.1s;
}
.board .item:before{
  content: attr(item-code);
  font-size: 150px;
  line-height: 1;
  color: white;
  position: absolute;
  right: 20px;
  bottom: 10px;
  opacity: 0.2;
  z-index: 100;
}
</style>
