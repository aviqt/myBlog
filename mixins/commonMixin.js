import ElConfrim from '@/components/common/ElConfrim'
import request from '@/util/request.js'

export default {
  components: {
    ElConfrim
  },
  data () {
    return {
      R: request,
      loading: false,
      confrimInfo: {
        show: false,
        isConfrim: true,
        handlEvent: '',
        title: '',
        text: ''
      },
      examStatusList: [
        'BEFORE_EXAM',
        'WAITING_FOR_EXAM',
        'CONFIRMED_EXAM',
        'EXAMING',
        'AFTER_EXAM',
      ],
      countDown: {
        timer: null,
        timeLimit: 0
      },
      DcSize: {
        height: 0,
        width: 0
      },
      DcSizeHeight: 0,
      roleType: 1
    }
  },
  created () {
    this.DcSize.height = document.documentElement.clientHeight
    this.DcSize.width = document.documentElement.clientWidth
    window.addEventListener('resize' , () => {
      this.DcSize.height = document.documentElement.clientHeight
      this.DcSize.width = document.documentElement.clientWidth
    })
  },
  destroyed () {
    clearInterval(this.countDown.timer)
  },
  methods: {
    handleImgError(e){
      e.target.src = require("@/static/images/pad/before-exam.png")
    },
    linkToPath(url){
      window.location.href = url
    },
		logout () {
      let role = this.roleType === 1 ? 'staff' : 'teacher'
      this.$store.dispatch('admin/LOGOUT', {
        data: {},
        cb: (res) => {
          if(res.succ) {
            let pathname = window.location.pathname
            let url =  pathname.indexOf('invigilate') !== -1 || pathname.indexOf('closeLabInfo') !== -1 ? '/admin/login/teacher'  : '/pad/login'
            if(pathname.indexOf('admin') !== -1){
              url = pathname.indexOf('staff') !== -1 ? '/admin/login/staff' : '/admin/login/teacher'
            } 
            window.onbeforeunload=function(e){     
              return ture
            } 
            this.$message.success('退出登录成功')
            window.location.href = url
            //this.$router.push(`/admin/login/${role}`)
          }
        }
      })
		},
    confrimLogout () {
      this.setWndCover && this.setWndCover(true)
      this.confrimInfo = {
        show: true,
        isConfrim: true,
        handlEvent: this.logout,
        handlCancleEvent: () => {this.setWndCover && this.setWndCover(false)},
        title: '提醒',
        text: '确定要退出登录吗？'
      }
    },
    getServerDateStamp(){
      return (new Date()).getTime()
    }
  },
  computed: {
    timeLimitM () {
      return Math.floor(this.countDown.timeLimit / 60).toString().padStart(2, '0')
    },
    timeLimitS () {
      return (this.countDown.timeLimit % 60).toString().padStart(2, '0')
    }
  }
}


