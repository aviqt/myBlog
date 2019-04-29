<template>
	<div class="pad-paper-view" ref="paper">
    <table class="layout-table">
      <tr>
        <td><strong>实验名称：</strong></td>
        <td><strong>实验8：粗盐提纯—过滤</strong></td>
      </tr>
      <tr>
        <td><strong>实验器材：</strong></td>
        <td>
          烧杯（2只）、玻璃棒、漏斗、药匙、10ml量筒、铁架台（带有铁圈）、滤纸、剪刀、胶头滴管、水、粗盐。（器材确认完成后请点击确认）
          <strong class="confirmed" v-if="step > 0">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 0">确认</div>
        </td>
      </tr>
      <tr>
        <td><strong>实验步骤：</strong></td>
        <td>
          1、取少许粗盐加入烧杯。<br />
          2、用量筒量取10ml水（完成后请点击确认）。
          <strong class="confirmed" v-if="step > 1">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 1">确认</div><br />
          3、溶解。<br />
          4、制作一个过滤器（完成后请点击确认）。
          <strong class="confirmed" v-if="step > 2">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 2">确认</div><br />
          5、过滤（完成后请点击确认）。
          <strong class="confirmed" v-if="step > 3">已确认</strong>
          <div class="button" @click="setTimePoint" v-if="step === 3">确认</div><br />
        </td>
      </tr>
      <tr>
        <td><strong>实验结果：</strong></td>
        <td>
          1、过滤前后的液体在外观上的主要区别是
          <span class="long-input"  contenteditable="true" v-html="answer[0]" answer-index="0" @input="answerChange"></span>。<br />
          2、用过滤法能否把粗盐中的的可溶性固体除去？答：
          <span class="long-input"  contenteditable="true" v-html="answer[1]" answer-index="1" @input="answerChange"></span>。<br />
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
