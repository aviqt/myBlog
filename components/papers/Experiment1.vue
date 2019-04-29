<template>
	<div class="pad-paper-view" ref="paper">
    <table class="layout-table">
      <tr>
        <td><strong>实验名称：</strong></td>
        <td><strong>实验1：测量物质的密度</strong></td>
      </tr>
      <tr>
        <td><strong>实验器材：</strong></td>
        <td>
          托盘天平（附砝码）、量筒、烧杯、水（100mL左右）、细线、形状不规则的小石块，胶头滴管（器材确认完成后请点击确认）
          <strong class="confirmed" v-if="step > 0">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 0">确认</div>
        </td>
      </tr>
      <tr>
        <td><strong>实验步骤：</strong></td>
        <td>
          1、调节天平平衡（完成此项操作，请点击确认后再继续实验）。
          <strong class="confirmed" v-if="step > 1">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 1">确认</div><br />
          2、用天平测出小石块的质量（读数完成请点击确认），把实验数据记录在下表中。
          <strong class="confirmed" v-if="step > 2">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 2">确认</div><br />
          3、用量筒量取50ml水并记录在下表中（量取完毕请点击确认）。
          <strong class="confirmed" v-if="step > 3">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 3">确认</div><br />
          4、用细线系住小石块，将小石块缓缓地放入量筒内的水中，测出水和小石块的总体积（完成后请点击确认），把实验数据记录在下表中。
          <strong class="confirmed" v-if="step > 4">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 4">确认</div>
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
          		<td>小石块的质量 m/g</td>
          		<td>量筒内水的体积 V<sub>1</sub>/cm<sup>3</sup></td>
          		<td>量筒内水和小石块的总体积 V<sub>2</sub>/cm<sup>3</sup></td>
          		<td>小石块的体积 V<sub>3</sub>/cm<sup>3</sup></td>
          	</tr>
          	<tr>
          		<td><span contenteditable="true" v-html="answer[0]" answer-index="0" @input="answerChange"></span></td>
          		<td><span contenteditable="true" v-html="answer[1]" answer-index="1" @input="answerChange"></span></td>
          		<td><span contenteditable="true" v-html="answer[2]" answer-index="2" @input="answerChange"></span></td>
          		<td><span contenteditable="true" v-html="answer[3]" answer-index="3" @input="answerChange"></span></td>
          	</tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="vertical-align: middle;"><strong>实验结论：</strong></td>
        <td>
          测得小石块的密度为
          <span contenteditable="true" v-html="answer[4]" answer-index="4" @input="answerChange"></span>
          g／cm<sup>3</sup>
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
