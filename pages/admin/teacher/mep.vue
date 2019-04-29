<template>
  <div style="position: rlative;" :style="{height:DcSize.height + 'px'}">
    <div class='top-userInfo'>
      <strong>实验考试评卷系统</strong>
      您好，{{$store.state.admin.adminUserData.userName}}！
      <div class='button' @click="confrimLogout()"><i class="iconfont icon-power"></i> 退出</div>
    </div>
    <div class="container">
      <div class="box">
        <div class="box-head">
          电子卷信息
          <div class="camera-list">
            <span v-for="item,index in videoList" :key="index" :class="{selected: index === selectedVideoIndex}"
              @click="selectVideo(index)">{{index === 0 ? '全景录像' : '近景录像'}}</span>
              <span @click="viewPaper" :class="{selected: -1 === selectedVideoIndex}" v-if="paperInfo.id">查看试卷</span>
          </div>
        </div>
        <div class="box-body" style="overflow: auto;">
          <component :is="paperList.filter(item => item.id === paperInfo.id)[0].com" :paperInfo="paperInfo"
            v-if="selectedVideoIndex === -1"></component>
          <!--video-view></video-view-->
          <div id="playWnd" class="playWnd video-player-box" v-if="videoList.length != 0"></div>
        </div>
      </div>
      <div class="box">
        <div class="box-head">
          考查得分图片 
        </div>
        <div class="box-body" style="overflow:hidden;">
          <div class='img-list-btn' :style="{'line-height':imgBtnLineHeight}" @click="imgViewIndex--">
            <i class="el-icon-arrow-left"></i>
          </div>
          <div class='img-list-btn' :style="{'line-height':imgBtnLineHeight, right: 0}" @click="imgViewIndex++">
            <i class="el-icon-arrow-right"></i>
          </div>
          <div class="img-list-view" :style="{left:imgViewLeft}">
            <img v-for="pic,i in picList[selectedVideoIndex]" :key="i" @click="handleClickImg($event,i)" @error="handleImgError"
             src="http://experimentexam.oss-cn-beijing.aliyuncs.com/student/01.jpg"  :src="pic.picUrl"  />
          </div>
        </div>
      </div> 
      <div class="box">
        <div class="box-head">
          评分标准
        </div>
        <div class="box-body">
          <div class="point-top">
            <span>得分</span>
            <span>不得分</span>
          </div>
          <div class="score-rule-lines">
            <div class="rule-line" v-for="line,i in scoreRuleLines" :key="i" :style="{width: ruleLineWidth}">
              <strong>({{i+1}}) {{line.title}}</strong>
              <div class="rule-point " v-for="point,j in line.rules" :key="point.checkNum" 
                @keydown="SRLkeydown($event,point)" tabindex="0"
                @click="focusPointIndex = parseInt(point.checkNum)">
                <div>
                  {{point.checkNum}}. {{point.checkRemark}} 
                  <span v-if="point.examLine">( {{point.examLine && point.examLine.remark}} )</span>
                </div>
                <div style="width: 80px;text-align: center;">
                  <el-radio v-model="point.markInfoLine.answerRight" label="0"  :disabled="examData.isMarked === '0'">得分</el-radio>
                </div>
                <div style="width: 80px;text-align: center;">
                  <el-radio v-model="point.markInfoLine.answerRight" label="1"  :disabled="examData.isMarked === '0'">不得分</el-radio>
                </div>
              </div>
            </div>
          </div>
          <div class="score-total" v-if="scoreRuleLines.length > 0">
            <span>总分：{{totalScore}}分</span>
            <span>得分：<strong>{{score}}分</strong></span>
            <div class="operation">
              <el-button :type="markCompleted ? 'primary' : 'info'" @click="submitMark" 
                :disabled="!markCompleted"  v-if="examData.isMarked === '1'">
                {{markCompleted ? '完成评卷' : '未完成评卷'}}
              </el-button>
              <el-button type="primary" disabled v-if="examData.isMarked === '0'">
                已完成评卷
              </el-button>
              <el-button @click="getNextExam" v-if="status === 0">跳过>></el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-confrim :confrimInfo='confrimInfo' />
    <img-view :imgInfo='imgInfo'  v-if="imgInfo.show"></img-view>
  </div>
</template>

<script>
import $ from 'jquery'
import util from '~/util/util.js'
import commonMixin from '@/mixins/commonMixin'
import paperListMixin from '@/mixins/paperListMixin'
import webControlMixin from '@/mixins/webControlMixin'
import ImgView from '@/components/common/ImgView'

export default {
  mixins: [
    commonMixin,
    webControlMixin,
    paperListMixin
  ],
  components: {
    ImgView
  },
  data() {
    return {
      scoreRuleLines: [],
      picList: [],
      examIndex: 0,
      examData: [],
      status: 0,
      imgViewIndex: 0,
      imgInfo: [],
      paperInfo: [],
      focusPointIndex: 1,
    }
  },
  mounted() {
    let adminUserData = JSON.parse(window.localStorage.getItem('adminUserData'))
    this.$store.commit('admin/SET_USERDATA',adminUserData)
    //this.webControl = new WebControl()
    if(sessionStorage.getItem("mPIndex")){
      this.examIndex = sessionStorage.getItem("mPIndex") 
    }else {
      sessionStorage.setItem("mPIndex",this.examIndex)
    }
    this.getExamData()
  },
  methods: {
    SRLkeydown(e, point) {
      if(e.keyCode === 37) point.markInfoLine.answerRight = '0'
      if(e.keyCode === 39) point.markInfoLine.answerRight = '1'
      if(e.keyCode === 38) this.focusPointIndex = this.focusPointIndex > 1 ? this.focusPointIndex - 1  : 19
      if(e.keyCode === 40) this.focusPointIndex = this.focusPointIndex < 19 ? this.focusPointIndex + 1 : 1
      $('.rule-point').eq(this.focusPointIndex - 1).focus()
      e.preventDefault()
    },
    viewPaper(){
      this.selectedVideoIndex = -1
      this.setWndCover && this.setWndCover(true)
    },
    handleClickImg(e, i){
      //console.log(e)
      this.setWndCover && this.setWndCover(true)
      this.imgInfo = {
        show: true,
        src: e.target.src,
        picList: this.picList[this.selectedVideoIndex],
        currentIndex: i,
        handlCancleEvent: () => {this.setWndCover && this.setWndCover(false)},
      }
    },
    submitMark() {
      let markLine = []
      this.scoreRuleLines.map(line => {
        line.rules.map(point => {
          markLine.push({
            ruleLineId: point.id,
            answerRight: point.markInfoLine.answerRight ? point.markInfoLine.answerRight : ''
          })
        })
      })
      let formData = new FormData()
      formData.append('examHeaderId', this.examData.examHeaderId)
      formData.append('markLine', markLine)
      this.$store.dispatch('teacher/SUBMIT_MARK', {
        data: {
          examHeaderId: this.examData.examHeaderId,
          markLine: markLine,
        },
        cb: (res) => {
          if(res.succ) {
            this.$message.success('评卷成功')
            this.getNextExam()
          }
        }
      })
    },
    getNextExam(){
      sessionStorage.setItem("mPIndex", ++this.examIndex)
      this.getExamData()
    },
    getExamData(){
      let data = []
      let actionStr = ''
      if(sessionStorage.getItem("mPScheduleId")){
        data = {
          scheduleId: sessionStorage.getItem("mPScheduleId"),
          index: this.examIndex,
        }
        actionStr = 'teacher/GET_NEXT_EXAM'
        this.status = 0
      } else {
        data = {
          examHeaderId: sessionStorage.getItem("mpExamHeaderId"),
        }
        actionStr = 'teacher/GET_STUDENT_EXAM'
        this.status = 1
      }
      this.$store.dispatch(actionStr, {
        data,
        cb: (res) => {
          //console.log(res)
          if(res.succ) {
            this.examData = res.data ? res.data : []
            console.log(res.data)
            this.paperInfo.id = this.examData.paperId ? this.examData.paperId  : 1
            this.paperInfo.answer = []
            this.examData.examLines && this.examData.examLines.map(item => {
              this.paperInfo.answer.push(item.remark ? item.remark : '')
            })
            //this.examData.isMarked = '1'
            //this.videoList = res.data.video ? { 0:res.data.video.video2, 1:res.data.video.video1} : []
            this.videoList = []
            for(let key in res.data.video){
              this.videoList.push(res.data.video[key])
            }
            this.videoList.reverse()
            
            this.scoreRuleLines = res.data.scoreRuleLines ? res.data.scoreRuleLines : []
            this.scoreRuleLines = this.scoreRuleLines.map(item => {
              item.rules = item.rules.map(rule => {
                if(!rule.markInfoLine){
                  rule.markInfoLine = {answerRight:''}
                }
                return rule
              })
              return item
            })
            //console.log(this.scoreRuleLines)
            this.picList = res.data.pic ? res.data.pic : []
            this.picList = {
              0: res.data.pic2 ? res.data.pic2 : [] ,
              1: res.data.pic1 ? res.data.pic1 : [] ,
            }
            //console.log(this.picList)
            let st = setTimeout(() => {
              this.selectVideo(0)
            },500)
          }else{
            sessionStorage.setItem("mPIndex", --this.examIndex)
          }
        }
      })
    }
  },
  computed: {
    ruleLineWidth () {
      return ((this.DcSize.width - 20) * 0.4 - 40 - 20) + 'px'
    },
    imgBtnLineHeight () {
      return ((this.DcSize.height - 90) * 0.3 - 70) + 'px'
    },
    imgViewLeft(){
      let count = this.picList[this.selectedVideoIndex] ? this.picList[this.selectedVideoIndex].length : 0
      let imgViewWidth = document.getElementsByClassName('img-list-view')[0] ? document.getElementsByClassName('img-list-view')[0].offsetWidth : 0
      let imgViewBoxWidth = ((this.DcSize.width - 20) * 0.6 - 20) 
      let left = 0
      this.imgViewIndex = this.imgViewIndex > 0 ? this.imgViewIndex : 0
      this.imgViewIndex = this.imgViewIndex < count ? this.imgViewIndex : count
      for(let i = 0; i < this.imgViewIndex && i<count; i++){
        left += document.getElementsByClassName('img-list-view')[0].getElementsByTagName('img')[i].offsetWidth + 11
      }
      if(imgViewWidth < imgViewBoxWidth+ left && imgViewWidth !== 0){
        left = imgViewWidth - imgViewBoxWidth - 11
        this.imgViewIndex--
      }
      left = left > 0 ? left : 0
      return -left + 'px'
    },
    markCompleted () {
      let isCompleted = true
      this.scoreRuleLines.map(line => {
        line.rules.map(point => {
          isCompleted = isCompleted && point.markInfoLine.answerRight
        })
      })
      return isCompleted
    },
    totalScore () {
      let _score = 0
      this.scoreRuleLines.map(line => {
        line.rules.map(point => {
          _score += parseInt(point.reqNum)
        })
      })
      return _score
    },
    score () {
      let _score = 0
      this.scoreRuleLines.map(line => {
        line.rules.map(point => {
          _score += point.markInfoLine.answerRight === '0' ? parseInt(point.reqNum) : 0
        })
      })
      return _score
    },
  },
  head() {
    return {
      title: '实验考试评卷系统',
      script: [
        { src: '../../../jsWebControl-1.0.0.min.js' },
        { src: '../../../jsencrypt.min.js' },
      ]
    }
  }
}
</script>

<style scoped>
 .playWnd{
  background: white;
  width: 100%;
  height: 100%;
 }
body {
  background-size: cover;
}
.top-userInfo {
  background: #000;
  color: white;
}
.top-userInfo > strong{
  font-size: 25px;
  float: left;
  margin-left: 20px;
  display: inline-block;
}
.top-userInfo .button:hover{
  background: #666;
}
.container {
  position: absolute;
  top: 90px;
  right: 0;
  bottom: 0;
  left: 20px;
}
.container .box{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin-right: 20px;
  margin-bottom: 20px;
}
.container .box:nth-child(1){
  right: 40%; 
  bottom: 30%;
}
.container .box:nth-child(2){
  right: 40%; 
  top: 70%;
}
.container .box:nth-child(3){
  left: 60%; 
}
.box-head {
  border-left: #4177ff solid 5px;
  line-height: 30px;
  padding-left: 8px;
  font-size: 22px;
  font-weight: bold;
}
.box-head .camera-list{
  position: absolute;
  left: 150px;
  top: 0;
}
.camera-list span{
  font-size: 16px;
  cursor: pointer;
  padding: 0 15px;
  font-weight: normal;
}
.camera-list .selected{
  color: #4177ff;
  font-weight: bold;
}
.box-body {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  top: 35px;
  background: white;
}
.point-top {
  position: absolute;
  width: 160px;
  right: 30px;
  top: -30px;
  line-height: 30px;
  text-align: right;
  display: table;
}
.point-top span{
  display: table-cell;
  width: 80px;
  text-align: center;
}
.focus{
  color: #4177ff;
}
.img-list-btn {
  position: absolute;
  bottom: 10px;
  top: 10px;
  width: 40px;
  background: rgba(0,0,0,0.2);
  z-index: 2;
  cursor:pointer;
  color: white;
  font-size: 40px;
  text-align: center;
  font-weight: bold;
  display: none;
}
.box-body:hover .img-list-btn{
  display: block;
}
.img-list-btn:hover {
  background: rgba(0,0,0,0.5);
}
.img-list-view {
  height: 100%;
  padding: 10px 0;
  white-space: nowrap;
  position: absolute;
  transition: all 0.2s;
  font-size: 0px;
}
.img-list-view img{
  height: 100%;
  margin-right: 10px;
  cursor: pointer;
  user-select:none;
}
</style>
