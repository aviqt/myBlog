<template>
    <el-dialog :title="confrimInfo.title" :visible.sync="confrimInfo.show" width="300px" :before-close="handleClose">
      <div class='content'>{{confrimInfo.text}}</div>
      <span slot="footer" class="dialog-footer">
        <el-button v-if='confrimInfo.isConfrim' @click="handleCancelClick">取 消</el-button>
        <el-button type="primary" @click="handleOkClick()">确 定</el-button>
      </span>
    </el-dialog>
</template>
<script>
export default {
  props: ['confrimInfo'],
  data () {
    return {
    }
  },
  mounted () {
  },
  destroyed () {
  },
  methods: {
    handleOkClick () {
      this.confrimInfo.show = false
      this.confrimInfo.handlEvent && this.confrimInfo.handlEvent()
    },
    handleCancelClick () {
      this.confrimInfo.show = false
      this.confrimInfo.handlCancleEvent && this.confrimInfo.handlCancleEvent()
    },
    handleClose(done) {
      this.confrimInfo.handlCancleEvent && this.confrimInfo.handlCancleEvent()
     done()
    }
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
  font-size: 16px;
  line-height: 25px;
}
</style>
