<template>
	<div class="pad-paper-view" ref="paper">
    <table class="layout-table">
      <tr>
        <td><strong>实验名称：</strong></td>
        <td><strong>实验3：探究杠杆的平衡条件</strong></td>
      </tr>
      <tr>
        <td><strong>实验器材：</strong></td>
        <td>
          杠杆及其支架，钩码10个（50g），细线（器材确认完成后请点击确认）
          <strong class="confirmed" v-if="step > 0">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 0">确认</div>
        </td>
      </tr>
      <tr>
        <td><strong>实验步骤：</strong></td>
        <td>
          1、把杠杆的中点，支在支架的轴上，使杠杆能灵活转动。<br />
          2、调节杠杆两端的螺母，使杠杆处于水平位置平衡（完成后请点击确认）
          <strong class="confirmed" v-if="step > 1">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 1">确认</div><br />
          3、在杠杆两边挂好钩码，左边作动力，右边作阻力。改变钩码的位置，使杠杆处于水平位置平衡（完成后请点击确认）。读数并记录(杠杆上的每一格表示1cm)。
          <strong class="confirmed" v-if="step > 2">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 2">确认</div><br />
          4、按表格中设定的数据（共2次，每完成一次点击一次确认），改变动力或阻力的大小，同时改变钩码悬挂点在杠杆上的位置，使杠杆处于水平位置平衡。读数并记录。(g取10N/kg)
          <strong class="confirmed" v-if="step > 3">已确认{{step - 3 < 2 ? step - 3 : 2}}次</strong>
          <div class="button" @click="setTimePoint" v-if="step >= 3 && step <= 4">确认</div>
        </td>
      </tr>
      <tr>
        <td><strong>实验记录：</strong></td>
        <td>（第3次实验数据不要与前2次完全相同）</td>
      </tr>
      <tr>
        <td colspan="2">
          <table class="fill-table">
          	<tr>
          		<td>实验次数</td>
          		<td>动力F<sub>1</sub>/N</td>
          		<td>动力臂l<sub>1</sub>/m</td>
          		<td>动力×动力臂F<sub>1</sub>l<sub>1</sub>/N·m</td>
          		<td>阻力F<sub>2</sub>/N</td>
          		<td>阻力臂l<sub>2</sub>/m</td>
          		<td>阻力×阻力臂F<sub>2</sub>l<sub>2</sub>/N·m</td>
          	</tr>
          	<tr>
          		<td>1</td>
          		<td>1.5</td>
          		<td><span contenteditable="true" v-html="answer[0]" answer-index="0" @input="answerChange"></span></td>
          		<td><span contenteditable="true" v-html="answer[1]" answer-index="1" @input="answerChange"></span></td>
          		<td>1</td>
          		<td>0.15</td>
          		<td><span contenteditable="true" v-html="answer[2]" answer-index="2" @input="answerChange"></span></td>
          	</tr>
          	<tr>
          		<td>2</td>
          		<td>1</td>
          		<td>0.1</td>
          		<td><span contenteditable="true" v-html="answer[3]" answer-index="3" @input="answerChange"></span></td>
          		<td>0.5</td>
          		<td><span contenteditable="true" v-html="answer[4]" answer-index="4" @input="answerChange"></span></td>
          		<td><span contenteditable="true" v-html="answer[5]" answer-index="5" @input="answerChange"></span></td>
          	</tr>
          	<tr>
          		<td>3</td>
          		<td><span contenteditable="true" v-html="answer[6]" answer-index="6" @input="answerChange"></span></td>
          		<td><span contenteditable="true" v-html="answer[7]" answer-index="7" @input="answerChange"></span></td>
          		<td><span contenteditable="true" v-html="answer[8]" answer-index="8" @input="answerChange"></span></td>
          		<td><span contenteditable="true" v-html="answer[9]" answer-index="9" @input="answerChange"></span></td>
          		<td><span contenteditable="true" v-html="answer[10]" answer-index="10" @input="answerChange"></span></td>
          		<td><span contenteditable="true" v-html="answer[11]" answer-index="11" @input="answerChange"></span></td>
          	</tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="vertical-align: middle;"><strong>实验结论：</strong></td>
        <td>
          写出杠杆平衡条件：
          <span class="long-input" contenteditable="true" v-html="answer[12]" answer-index="12" @input="answerChange"></span>
        </td>
      </tr>
      <tr>
        <td style="vertical-align: middle;"><strong>整理仪器：</strong></td>
        <td>
          将仪器放回原处结束实验（整理完后点击确认）。
          <strong class="confirmed" v-if="step > 5">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 5">确认</div>
        </td>
      </tr>
      <tr>
        <td colspan="2" style="text-align: center;">
          <div class="button" @click="confirmSubmitPaper" v-if="step === 6">交卷</div>
        </td>
      </tr>
    </table>
	</div>
</template>

<script>
import exPaperMixin from '@/mixins/exPaperMixin'
export default {
  mixins: [exPaperMixin],
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style coped>

</style>
