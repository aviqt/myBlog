<template>
	<div class="pad-paper-view" ref="paper">
    <table class="layout-table">
      <tr>
        <td><strong>实验名称：</strong></td>
        <td><strong>实验5：实验室制取二氧化碳</strong></td>
      </tr>
      <tr>
        <td><strong>实验器材：</strong></td>
        <td>
          锥形瓶、单孔橡皮塞（或双孔橡皮塞和长颈漏斗）、导管、橡皮管、集气瓶、玻璃片、火柴、木条、稀盐酸、石灰石、石灰水、水槽、试管、烧杯、量筒、胶头滴管、镊子、试管架、试管刷（器材确认完成后请点击确认）
          <strong class="confirmed" v-if="step > 0">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 0">确认</div>
        </td>
      </tr>
      <tr>
        <td><strong>实验步骤：</strong></td>
        <td>
          1、连接装置，并检查装置气密性（完成此项操作，请点击确认后再继续实验）。
          <strong class="confirmed" v-if="step > 1">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 1">确认</div><br />
          2、在锥形瓶里放入适量石灰石。<br />
          3、用量筒量取20ml稀盐酸（量取完毕请点击确认）。
          <strong class="confirmed" v-if="step > 2">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 2">确认</div><br />
          4、将盐酸加入锥形瓶中塞紧橡皮塞（或塞紧橡皮塞，往长颈漏斗里注入盐酸）。<br />
          5、收集二氧化碳，用燃着木条检验二氧化碳是否收集满。当出现
         <span class="long-input" contenteditable="true" v-html="answer[0]" answer-index="0" @input="answerChange"></span>
          现象时，说明已经收集满了。（检验时请点击确认）
          <strong class="confirmed" v-if="step > 3">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 3">确认</div><br />
          6、验证二氧化碳的性质：二氧化碳与石灰水的反应。实验现象为
         <span class="long-input" contenteditable="true" v-html="answer[1]" answer-index="1" @input="answerChange"></span>
           。（有现象请点击确认）
          <strong class="confirmed" v-if="step > 4">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 4">确认</div>
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
