<template>
	<div class="pad-testing">
    <div class="pad-main" style="top:0">
      <div class="exam-box">
        <div>&nbsp;</div>
        <el-select v-model="paperId" placeholder="请选择">
          <el-option v-for="item in paperList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <component :is="this.paperList.filter(item => item.id === this.paperId)[0].com"></component>
      </div>
    </div>
	</div>
</template>

<script>
import "@/static/pad.css"
import paperListMixin from '@/mixins/paperListMixin'

export default {
  mixins: [paperListMixin],
  data() {
    return {
      paperId: 1
    }
  },
  mounted() {
  },
  methods: {
    handleImgError(e){
      e.target.src = require("@/static/images/pad/examinee.png")
    }
  }
}
</script>

<style scoped>
</style>
