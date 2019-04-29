<template>
	<div :class="{'pad-testing' : status === 3}">
    <div class="pad-top" v-if="status === 3">
      <span>实验室：{{labInfo.name}}</span>
      <span>实验时间：{{startTime}}-{{endTime}}</span>
    </div>
		<div class="pad-title">
      实验室信息
      <div class='logout-btn' @click="confrimLogout">退出登录</div>
    </div>
    <div class="pad-main">
      <lab-view :labInfo="labInfo" type="invigilate" v-if="status > 0"></lab-view >
      <div class="exam-box"  v-if="status === 0">
        <div class="before-exam" style="display: table; height: 100%; width: 100%;">
          <div style="display: table-cell; height: 100%; vertical-align: middle;">
            <img src="../../static/images/pad/before-exam.png" /><Br />
            <span>实验室空闲中</span>
          </div>
        </div>
      </div>
    </div>
    <div class="warpper" v-if="status === 10">
      <span>本次实验已结束</span>
    </div>
    <el-confrim :confrimInfo='confrimInfo' />
	</div>
</template>

<script>
import "@/static/pad.css"
import util from '~/util/util.js'
import LabView from "@/components/pad/LabView"
import commonMixin from '@/mixins/commonMixin'

export default {
  mixins: [commonMixin],
  components:{
    LabView
  },
  data() {
    return {
      title: ['空闲中','等待实验','等待实验','实验中','实验完毕'],
      status: -1,
      labInfo: [],
      st: null
    }
  },
  created() {
    this.getLabInfo()
  },
  mounted() {
  },
  destroyed () {
    clearTimeout(this.st)
  },
  methods: {
    getLabInfo () {
      clearTimeout(this.st)
      this.st = setTimeout(this.getLabInfo,5000)
      this.$store.dispatch('pad/TEACGER_GET_CLOSE_LABINFO', {
        params: {},
        cb: (res) => {
          console.log(res)
          if(res.succ && res.data) {
            this.labInfo = res.data
            this.labInfo.colNum = 4
            this.status = this.examStatusList.indexOf(res.data.examStatus)
            this.status = 3
            if(this.status === 3) this.startCountDown()
          } 
          if(!res.data){
            this.status = 0
          }
        }
      })
    },
    startCountDown () {
      clearInterval(this.countDown.timer)
      this.countDown.timer = setInterval(() => {
        if(this.labInfo.experimentSchedule){
          let planDate = util.dateFtt('yyyy/MM/dd',new Date(this.labInfo.experimentSchedule.planDate))
          let endTime = new Date(planDate + ' ' + this.labInfo.experimentSchedule.end)
          this.countDown.timeLimit = parseInt(( endTime.getTime() - new Date().getTime() ) / 1000)
          this.countDown.timeLimit  = this.countDown.timeLimit > 0 ? this.countDown.timeLimit  : 0
          if(this.countDown.timeLimit === 0){
            clearInterval(this.countDown.timer)
          }
        }
      }, 500)
    }
  },
  computed: {
    startTime () {
      if(this.labInfo.experimentSchedule){
        return this.labInfo.experimentSchedule.start.substr(0,5)
      }
      return '00:00'
    },
    endTime () {
      if(this.labInfo.experimentSchedule){
        return this.labInfo.experimentSchedule.end.substr(0,5)
      }
      return '00:00'
    },
  }
}
</script>

<style scoped>
  .pad-top span{
    width: 50%;
  }
</style>
