<template>
	<div class="pad-paper-view" ref="paper">
    <table class="layout-table">
      <tr>
        <td><strong>实验名称：</strong></td>
        <td><strong>实验6：科学实验基本操作</strong></td>
      </tr>
      <tr>
        <td><strong>实验器材：</strong></td>
        <td>
          托盘天平（附砝码）、量筒（10mL、50mL、100mL）3个、烧杯、玻璃棒、药匙、胶头滴管、滤纸、氯化钠、蒸馏水。（器材确认完成后请点击确认）
          <strong class="confirmed" v-if="step > 0">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 0">确认</div>
        </td>
      </tr>
      <tr>
        <td><strong>实验步骤：</strong></td>
        <td>
          1、计算配制溶质的质量分数为5%的氯化钠溶液50g，需要氯化钠
          <span contenteditable="true" v-html="answer[0]" answer-index="0" @input="answerChange"></span>
          g和水
          <span contenteditable="true" v-html="answer[1]" answer-index="1" @input="answerChange"></span>
          g。<br />
          2、调节天平平衡（完成此项操作，请点击确认后再继续实验）。
          <strong class="confirmed" v-if="step > 1">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 1">确认</div><br />
          3、 用托盘天平称量所需的氯化钠，倒入烧杯里（读数完请点击确认）。
          <strong class="confirmed" v-if="step > 2">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 2">确认</div><br />
          4、本实验选用
          <span contenteditable="true" v-html="answer[2]" answer-index="2" @input="answerChange"></span>
          ml的量筒比较合适。<br />
          5、用量筒量取蒸馏水
          <span contenteditable="true" v-html="answer[3]" answer-index="3" @input="answerChange"></span>
          ml（量取完请点击确认）。
          <strong class="confirmed" v-if="step > 3">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 3">确认</div><br />
          6、把量取好的水倒入装有氯化钠的烧杯里。用玻璃棒搅拌，使氯化钠溶解。(氯化钠溶解后请点击确认)
          <strong class="confirmed" v-if="step > 4">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 4">确认</div><br />
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
