import $ from 'jquery'
import  "@/static/paper.css"

export default {
  props:['fnObj', 'paperInfo'],
  data() {
    return {
      answer: [],
      timePoint: [],
      step: 0,
      GTPLocked: false
    }
  },
  mounted() {
  	this.answer = new Array(this.$refs.paper.querySelectorAll('span[answer-index]').length)
    this.answer.fill("")
    if(this.paperInfo){
      $('span[answer-index]').attr({'contenteditable':'false'})
      $('span[answer-index]').css({'color':'red'})
      this.step = -1
      this.answer = this.paperInfo.answer
    }
    this.$refs.paper.addEventListener("keydown",(e) => {
      if(e.target.tagName == 'SPAN' && e.keyCode === 13){
          e.cancelBubble = true
          e.preventDefault()
          e.stopPropagation()
      }
    })
  },
  methods: {
    answerChange (e) {
      let value = e.target.innerText.replace(/[\'\"\\\/\b\f\n\r\t]/g, '')
      if(value.length > 100) {
        this.$message.error('最多输入100个字符。')
        e.target.innerText = this.answer[e.target.attributes['answer-index'].value]
        return
      }
      this.answer[e.target.attributes['answer-index'].value] = value
      //this.$set(this.answer, e.target.attributes['answer-index'].value, e.target.innerText)
      return false
    },
    setTimePoint () {
      if(this.GTPLocked) return
      this.GTPLocked = true
      this.$store.dispatch('pad/GET_SERVER_CURRENTDATE', {
        data: {},
        cb: (res) => {
          if(res.succ) {
            this.timePoint[this.step] = res.data ? res.data : (new Date()).valueOf()
            console.log(this.timePoint)
            this.GTPLocked = false
            this.step++
          }
        }
      })
    },
    submitPaper () {
      let data = {
        answers:[...this.answer],
        timestamps:[...this.timePoint]
      }
     this.fnObj.SP && this.fnObj.SP(data)
    },
    confirmSubmitPaper(){
      console.log(this.answer)
      if(this.answer.filter(item => item === '').length === 0) {
        this.fnObj.confirmSP && this.fnObj.confirmSP(this.submitPaper)
      } else {
        this.$message.error('试卷未完成，请完成后再尝试交卷。')
        $('span[answer-index]').css({'background':'rgba(255,0,0,0.2)'})
      }
    }
  }
}