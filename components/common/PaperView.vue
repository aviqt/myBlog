<template>
	<div class="view-paper" id="paper">
    <div>
      <span style="font-weight: bold;" >实验名称：</span>
      <div style="font-weight: bold;" v-html="paper.name"></div>
    </div>
    <div>
      <span>实验器材：</span>
      <div v-html="paper.equipments"></div>
    </div>
    <div>
      <span>实验步骤：</span>
      <div class="step">
        <span v-for="(item,index) in stepsHtml.split('__________')">
          <input type="text" v-if="index > 0" v-model="answers[index-1]" :style="{width: (answers[ index - 1 ].length * 16 + 20 )+ 'px'}">
          <span v-html="item"></span>
        </span>
      </div>
    </div>
    <div  v-html="paper.content"></div>
    <el-input placeholder="请输入具体的实验步骤" v-model="stepsStr" type="textarea" rows="8" v-if="stepsStr.length !== 0"> </el-input>
	</div>
</template>

<script>
export default {
  props: ['paper'],
  data() {
    return {
      answers: [],
      stepsHtml: "",
      stepsStr: ""
    }
  },
  created() {
    this.stepsHtml = this.paper.steps.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ')
  	this.answers = new Array( this.stepsHtml.split('__________').length - 1 ).fill("")
    /* this.stepsStr = this.stepsHtml.replace(/<br\/>/g, '\n') */
    // sconsole.log(this.paper)
  }
}
</script>

<style scoped>
.view-paper {
}
.view-paper > div {
  overflow: hidden;
  margin-bottom: 10px;
  line-height: 1.8;
}
.view-paper > div > span{
  float: left;
  width: 80px;
  text-align: right;
}
.view-paper > div > div{
  margin-left: 80px;
}
.step {
  
}
.step input{
  outline: none;
  border: none;
  border-bottom: 1px solid #333;
  text-align: center;
  font-size: 16px;
  min-width: 80px;
  color: #2E75FA;
  background: none;
}
</style>
