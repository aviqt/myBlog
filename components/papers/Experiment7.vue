<template>
	<div class="pad-paper-view" ref="paper">
    <table class="layout-table">
      <tr>
        <td><strong>实验名称：</strong></td>
        <td><strong>实验7：探究稀硫酸的化学性质</strong></td>
      </tr>
      <tr>
        <td><strong>实验器材：</strong></td>
        <td>
          实验药品及仪器：稀H<sub>2</sub>SO<sub>4</sub>、锌粒、Na<sub>2</sub>CO<sub>3</sub>溶液、NaOH溶液、石蕊试液、镊子、试管夹、试管架、酚酞试液、试管若干、滴管等。（器材确认完成后请点击确认）
          <strong class="confirmed" v-if="step > 0">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 0">确认</div>
        </td>
      </tr>
      <tr>
        <td><strong>实验步骤：</strong></td>
        <td>
          1、稀H<sub>2</sub>SO<sub>4</sub>与无色酚酞试液和紫色石蕊试液反应，观察现象（完成后请点击确认）。
          <strong class="confirmed" v-if="step > 1">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 1">确认</div><br />
          2、稀H<sub>2</sub>SO<sub>4</sub>与锌粒反应，观察现象（完成后请点击确认）。
          <strong class="confirmed" v-if="step > 2">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 2">确认</div><br />
          3、在试管中加入NaOH溶液并滴加酚酞试液，再滴入稀H<sub>2</sub>SO<sub>4</sub>至NaOH溶液完全反应，观察现象（完成后请点击确认）。
          <strong class="confirmed" v-if="step > 3">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 3">确认</div><br />
          4、往Na<sub>2</sub>CO<sub>3</sub>溶液中滴入稀H<sub>2</sub>SO<sub>4</sub>，观察现象（完成后请点击确认）。
          <strong class="confirmed" v-if="step > 4">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 4">确认</div><br />
        </td>
      </tr>
      <tr>
        <td><strong>实验结果：</strong></td>
        <td>
          （1）稀H<sub>2</sub>SO<sub>4</sub>与无色酚酞试液反应，观察到的现象是
          <span class="long-input"  contenteditable="true" v-html="answer[0]" answer-index="0" @input="answerChange"></span>。<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          稀H<sub>2</sub>SO<sub>4</sub>与紫色石蕊试液反应，观察到的现象是
          <span class="long-input"  contenteditable="true" v-html="answer[1]" answer-index="1" @input="answerChange"></span>。<br />
          （2）稀H<sub>2</sub>SO<sub>4</sub>与锌粒反应，观察到的现象是
          <span class="long-input"  contenteditable="true" v-html="answer[2]" answer-index="2" @input="answerChange"></span>。<br />
          （3）稀H<sub>2</sub>SO<sub>4</sub>与NaOH溶液反应，观察到的现象是
          <span class="long-input"  contenteditable="true" v-html="answer[3]" answer-index="3" @input="answerChange"></span>。<br />
          （4）稀H<sub>2</sub>SO<sub>4</sub>与Na<sub>2</sub>CO<sub>3</sub>溶液反应，观察到的现象是
          <span class="long-input"  contenteditable="true" v-html="answer[4]" answer-index="4" @input="answerChange"></span>。<br />
          
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
