<template>
  <div class="experiment">
    <div class="experiment-inner">
      <paper-edit :paper="paper" v-show="editing"></paper-edit>
      <paper-view :paper="paper" v-if="!editing"></paper-view>
      <el-button type="primary" @click="editing = !editing">{{editing?'查看试卷':'编辑试卷'}}</el-button>
      <div style="height: 30px;"></div>
    </div>
  </div>
</template>

<script>
import PaperEdit from '@/components/common/PaperEdit'
import PaperView from '@/components/common/PaperView'
export default {
  components: {
    PaperEdit,
    PaperView
  },
  data() {
    return {
      editing: true,
      paper: {
        name: '',
        equipments: '',
        content: '',
        steps: ''
      }
    }
  }
}
</script>

<style scoped>
.experiment{
  height: 100%;
  width: 200%;
  overflow: auto;
  background: white;
}
.experiment-inner{
  height: 100%;
  width: 50%;
  padding: 20px;
}
</style>
