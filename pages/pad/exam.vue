<template>
	<div :class="{'pad-testing' : status === 3}">
    <div class="pad-top" v-if="status === 3">
      <span>实验室：{{seat.roomName}}</span>
      <span>剩余时间：{{timeLimitM}}:{{timeLimitS}}</span>
      <span>实验时间：{{startTime}}-{{endTime}}</span>
    </div>
		<div class="pad-title">
      {{status < 0 ? '空闲中' : title[status]}}
      <div class='logout-btn' @click="confrimLogout">退出登录</div>
      <div class="lamp" :class="{'green-light':this.ws.linkState=== 1}"></div>
    </div>
    <div class="pad-main">
      <div class="exam-box">
        <div class="table-info">
          <span>实验室：{{seat.roomName}}</span>
          <span>座位号：{{seat.code}}</span>
        </div>
        <div class="examinee-info"  v-if="status > 0 ">
          <div>
            <span v-if="status === 3">座位号：{{seat.code}}</span>
            <span v-if="status === 1">实验时间：{{schedule.planDateStr + ' ' + schedule.startStr}}</span>
            <span v-if="status === 1">实验名称：{{examPaper.examName}}</span>
            <span>学生姓名：{{studentNameStr}}</span>
            <span>学生学号：{{studentCodeStr}}</span>
          </div>
        </div>
        <div class="before-exam" v-if="status < 1">
          <img src="../../static/images/pad/before-exam.png" /><br />
          <span>{{status === 0 ? '实验未开始' : '实验室空闲中'}}</span>
        </div>
        <div></div>
        <el-select v-model="paperId" placeholder="请选择" v-if="status === 10" >
          <el-option v-for="item in paperList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <component :is="this.paperList.filter(item => item.id === paperId)[0].com" ref="exmPaper"
          v-show="status === 3" :fnObj="paperFnObj"></component>
      </div>
    </div>
    <div class="warpper" v-if="data.doneTest === '0' && (status === 3 || status === 4)">
      <span>已交卷</span>
    </div>
    <el-confrim :confrimInfo='confrimInfo' />
	</div>
</template>

<script>
import "@/static/pad.css"
import paperListMixin from '@/mixins/paperListMixin'
import wsHeartMixin from '@/mixins/wsHeartMixin'
import commonMixin from '@/mixins/commonMixin'

export default {
  mixins: [paperListMixin, wsHeartMixin, commonMixin],
  data() {
    return {
      title: ['实验未开始','准备实验','已签到','实验中','实验结束'],
      status: -1,
      paperId: 1,
      seat: [],
      schedule: [],
      examPaper:[],
      data: [] ,
      paperFnObj: {
        confirmSP: this.confirmSubmitPaper,
        SP: this.submitPaper
      }
    }
  },
  mounted() {
    window.onbeforeunload=function(e){     
      var e = window.event || e
      e.returnValue = ("确定离开当前页面吗？")
    } 
    this.linkWs()
  },
  destroyed () {
    clearInterval(this.st)
  },
  methods: {
    linkWs () {
      this.$store.dispatch('pad/IS_PAD_VALID', {
        params: {},
        cb: (res) => {
          if(res.data) {
            this.ws.url += "/socket/student"
            this.createWebSocket()
          } else {
            this.$message.error('该设备还没有绑定座位')
          }
        }
      })
    },
    startCountDown(){
      clearInterval(this.countDown.timer)
      this.$store.dispatch('pad/GET_SERVER_CURRENTDATE', {
        data: {},
        cb: (res) => {
          if(res.succ && this.data.schedule) {
            let now = res.data ? res.data : (new Date()).valueOf()
            let end = this.data.schedule.planDate + this.data.schedule.end + 8 * 60 * 60 * 1000
            this.countDown.timeLimit = parseInt(( end - now ) / 1000)
            this.countDown.timer = setInterval(() => {
              this.countDown.timeLimit--
              this.countDown.timeLimit  = this.countDown.timeLimit > 0 ? this.countDown.timeLimit  : 0
              if(this.countDown.timeLimit === 0  && this.$refs.exmPaper && this.data.doneTest != 0){
                this.$refs.exmPaper.submitPaper && this.$refs.exmPaper.submitPaper()
                clearInterval(this.countDown.timer)
              }
            }, 1000)
          }
        }
      })
      /*
      this.countDown.timer = setInterval(() => {
        if(this.data.schedule){
          let now = new Date().getTime()
          let end = this.data.schedule.planDate + this.data.schedule.end + 8 * 60 * 60 * 1000
          this.countDown.timeLimit = parseInt(( end - now ) / 1000)
          this.countDown.timeLimit  = this.countDown.timeLimit > 0 ? this.countDown.timeLimit  : 0
          if(this.countDown.timeLimit === 0  && this.$refs.exmPaper && this.data.doneTest != 0){
            this.$refs.exmPaper.submitPaper && this.$refs.exmPaper.submitPaper()
            clearInterval(this.countDown.timer)
          }
        }
      }, 500)
      */
    },
    handleWsData (data) {
      if(data.code === '510') {
        this.seat = data.data ? data.data : []
        return 
      }
      if(data.code !== '100') {
        return 
      }
      this.data = data ? data : []
      this.seat = data.seat ? data.seat : []
      this.schedule = data.schedule ? data.schedule : []
      this.examPaper = data.examPaper ? data.examPaper : []
      this.paperId = this.examPaper.id ? this.examPaper.id : 1
      this.status = -1
      this.status = this.examStatusList.indexOf(data.examStatus)
      if(this.status === 4  && this.$refs.exmPaper && this.data.doneTest != 0){
        this.$refs.exmPaper.submitPaper && this.$refs.exmPaper.submitPaper()
        clearInterval(this.countDown.timer)
      }
      if(this.status != 3) return
      this.startCountDown()
    },  
    handleImgError(e){
      e.target.src = require("@/static/images/pad/examinee.png")
    },
    confirmSubmitPaper (fn) {
      this.confrimInfo = {
        show: true,
        isConfrim: true,
        handlEvent: fn,
        title: '提前交卷',
        text: '交卷后无法继续做题！是否确认要提前交卷？'
      }
    },
    submitPaper(data){
      this.$store.dispatch('pad/SUBMIT_PAPER',{
        data:{
          ...data,
          course: this.data.schedule.course,
          scheduleId: this.data.schedule.id,
          paperId: this.paperId
        },
        cb: res => {
          if(res.succ) {
            this.$message.success('交卷成功，5秒后退出登录')
            this.data.doneTest = '0'
            window.onbeforeunload=function(e){     
              return ture
            } 
            this.st = setTimeout(()=>{
              this.logout()
            },5000)
          }
        }
      })
    }
  },
  computed: {
    startTime () {
      if(this.data.schedule && this.data.schedule.startStr){
        return this.data.schedule.startStr.substr(0,5)
      }
      return '00:00'
    },
    endTime () {
      if(this.data.schedule && this.data.schedule.endStr){
        return this.data.schedule.endStr.substr(0,5)
      }
      return '00:00'
    },
    studentNameStr(){
      if(this.data.student){
        let name1 = this.data.student[0] ? this.data.student[0].name : ''
        let name2 = this.data.student[1] ? ' , ' + this.data.student[1].name : ''
        return name1 + name2
      }
      return ''
    },
    studentCodeStr(){
      if(this.data.student){
        let code1 = this.data.student[0] ? this.data.student[0].code : ''
        let code2 = this.data.student[1] ? ' , ' + this.data.student[1].code : ''
        return code1 + code2
      }
      return ''
    }
  }
}
</script>

<style scoped>
  .pad-top span{
    width: 33.3%;
  }
</style>