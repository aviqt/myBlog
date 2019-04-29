<template>
	<div class="pad-paper-view" ref="paper">
    <table class="layout-table">
      <tr>
        <td><strong>实验名称：</strong></td>
        <td><strong>实验4：测定小灯泡的电功率</strong></td>
      </tr>
      <tr>
        <td><strong>实验器材：</strong></td>
        <td>
          电压表、电流表、滑动变阻器、开关、小灯泡（额定电压为
          <span contenteditable="true" v-html="answer[0]" answer-index="0" @input="answerChange"></span>
          V）、电源（总电压高于灯泡的额定电压）、导线若干（器材确认完成后请点击确认）
          <strong class="confirmed" v-if="step > 0">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 0">确认</div>
        </td>
      </tr>
      <tr>
        <td><strong>实验步骤：</strong></td>
        <td>
          1、按电路图将实物元件连接成电路（电路连接完毕请点确认）。
          <strong class="confirmed" v-if="step > 1">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 1">确认</div><br />
          <img src="@/static/images/pad/circuitry.png" /><br />
          2、闭合开关，调节滑动变阻器滑片的位置，使小灯泡两端的电压等于额定电压，小灯泡正常发光（完成后请点确认）。观察小灯泡的亮度，读出电表的读数，并将数据记录在下面表格中。
          <strong class="confirmed" v-if="step > 2">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 2">确认</div><br />
          3、调节滑动变阻器滑片的位置，使小灯泡两端的电压约为额定电压的0.8倍。观察小灯泡的亮度变化（变亮、变暗或亮度正常），读出电表的读数（完成后请点确认），并将数据记入在下面表格中。
          <strong class="confirmed" v-if="step > 3">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 3">确认</div><br />
        </td>
      </tr>
      <tr>
        <td><strong>数据记录：</strong></td>
        <td></td>
      </tr>
      <tr>
        <td colspan="2">
          <table class="fill-table">
          	<tr>
          		<td>实验次数</td>
          		<td>电压U/V</td>
          		<td>电流I/A</td>
          		<td>功率P/W</td>
          		<td>灯泡亮暗</td>
          	</tr>
          	<tr>
          		<td>1</td>
          		<td><span contenteditable="true" v-html="answer[1]" answer-index="1" @input="answerChange"></span></td>
          		<td><span contenteditable="true" v-html="answer[2]" answer-index="2" @input="answerChange"></span></td>
          		<td><span contenteditable="true" v-html="answer[3]" answer-index="3" @input="answerChange"></span></td>
          		<td>亮度正常</td>
          	</tr>
          	<tr>
          		<td>2</td>
          		<td><span contenteditable="true" v-html="answer[4]" answer-index="4" @input="answerChange"></span></td>
          		<td><span contenteditable="true" v-html="answer[5]" answer-index="5" @input="answerChange"></span></td>
          		<td><span contenteditable="true" v-html="answer[6]" answer-index="6" @input="answerChange"></span></td>
          		<td><span contenteditable="true" v-html="answer[7]" answer-index="7" @input="answerChange"></span></td>
          	</tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="vertical-align: middle;"><strong>整理仪器：</strong></td>
        <td>
          将仪器放回原处结束实验（整理完后点击确认）。
          <strong class="confirmed" v-if="step > 4">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 4">确认</div>
        </td>
      </tr>
      <tr>
        <td colspan="2" style="text-align: center;">
          <div class="button" @click="confirmSubmitPaper" v-if="step === 5">交卷</div>
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
