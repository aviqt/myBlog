<template>
	<div class="pad-paper-view" ref="paper">
    <table class="layout-table">
      <tr>
        <td><strong>实验名称：</strong></td>
        <td><strong>实验2：探究凸透镜成像</strong></td>
      </tr>
      <tr>
        <td><strong>实验器材：</strong></td>
        <td>
          光具座、蜡烛、凸透镜（焦距f=
          <span contenteditable="true" v-html="answer[0]" answer-index="0" @input="answerChange"></span>
          cm）、光屏、火柴等（器材确认完成后请点击确认）
          <strong class="confirmed" v-if="step > 0">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 0">确认</div>
        </td>
      </tr>
      <tr>
        <td><strong>实验步骤：</strong></td>
        <td>
          1、在光具上放置蜡烛、凸透镜和光屏，并调节它们的高度（完成此项操作，请点击确认后再继续实验）。
          <strong class="confirmed" v-if="step > 1">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 1">确认</div><br />
          2、点燃蜡烛，把蜡烛放在离凸透镜大于两倍焦距（2f）的距离处，记录物距（u）。（完成后请点击确认）
          <strong class="confirmed" v-if="step > 2">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 2">确认</div><br />
          3、在光具上移动光屏，直到在光屏上出现清晰的烛焰的像。（完成后请点击确认）
          <strong class="confirmed" v-if="step > 3">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 3">确认</div><br />
          4、观察像的正倒、大小、虚实等特点并作记录。在光具座上读出像到凸透镜的距离即像距（υ），记录结果，并把它们跟焦距、二倍焦距进行比较。<br />
          5、移动蜡烛，减小物距，使蜡烛位于二倍焦距与一倍焦距之间，蜡烛放置的位置正确。记录物距。（完成后请点击确认）
          <strong class="confirmed" v-if="step > 4">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 4">确认</div><br />
          6、移动光屏，直到光屏上出现清晰的像为止。记录像的特点和像距。（完成后请点击确认）
          <strong class="confirmed" v-if="step > 5">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 5">确认</div>
        </td>
      </tr>
      <tr>
        <td><strong>实验记录：</strong></td>
        <td></td>
      </tr>
      <tr>
        <td colspan="2">
          <table class="fill-table">
          	<tr>
          		<td rowspan="2">物距u/cm</td>
          		<td rowspan="2">u与f、2f比较</td>
          		<td colspan="3">像的特点</td>
          		<td rowspan="2">像距υ/cm</td>
          		<td rowspan="2" >υ与f、2f比较</td>
          	</tr>
          	<tr>
          		<td>正立或倒立</td>
          		<td>放大或缩小</td>
          		<td>虚像或实像</td>
          	</tr>
          	<tr>
          		<td><span contenteditable="true" answer-index="1" @input="answerChange">{{answer[1]}}</span></td>
          		<td>u＞2f</td>
          		<td>倒立</td>
          		<td><span contenteditable="true" v-html="answer[2]" answer-index="2" @input="answerChange"></span></td>
          		<td><span contenteditable="true" v-html="answer[3]" answer-index="3" @input="answerChange"></span></td>
          		<td><span contenteditable="true" v-html="answer[4]" answer-index="4" @input="answerChange"></span></td>
          		<td><span contenteditable="true" v-html="answer[5]" answer-index="5" @input="answerChange"></span></td>
          	</tr>
          	<tr>
          		<td><span contenteditable="true" v-html="answer[6]" answer-index="6" @input="answerChange"></span></td>
          		<td>2f＞u＞f</td>
          		<td><span contenteditable="true" v-html="answer[7]" answer-index="7" @input="answerChange"></span></td>
          		<td><span contenteditable="true" v-html="answer[8]" answer-index="8" @input="answerChange"></span></td>
          		<td>实像</td>
          		<td><span contenteditable="true" v-html="answer[9]" answer-index="9" @input="answerChange"></span></td>
          		<td><span contenteditable="true" v-html="answer[10]" answer-index="10" @input="answerChange"></span></td>
          	</tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="vertical-align: middle;"><strong>整理仪器：</strong></td>
        <td>
          将仪器放回原处结束实验（整理完后点击确认）。
          <strong class="confirmed" v-if="step > 6">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 6">确认</div>
        </td>
      </tr>
      <tr>
        <td colspan="2" style="text-align: center;">
          <div class="button" @click="confirmSubmitPaper" v-if="step === 7">交卷</div>
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
