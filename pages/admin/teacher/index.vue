<template>
  <div>
    <div class='top-userInfo'>
      欢迎回来，{{$store.state.admin.adminUserData.userName}}！
      <div class='button' @click="confrimLogout()"><i class="iconfont icon-power"></i> 退出</div>
    </div>
    <div class="login-box" style="height: 220px; margin-top: -110px;" v-if="step === 1">
      <div class="role-title" >选择模式</div>
      <div class="form">
        <div class="button" @click="startEx">实验室上课</div>
        <div class="button" @click="linkToPath('/admin/teacher/class/')">评卷管理</div>
      </div>
    </div>
    <div class="center-box" v-if="step === 2">
      <div class="my-lesson">
        <strong>我的实验课</strong>
        <div class="lesson-list">
          <div style="text-align: center;" v-if="scheduleList.length === 0">暂无实验安排</div>
          <div v-for="item,i in scheduleList" :key="i">
            {{i+1}}. {{getScheduleStr(item)}}
            <span class="button" v-if="i === 0" @click="linkToPath('/pad/closeLabInfo')">查看实验室</span>
            <span v-if="i != 0">未开始</span>
          </div>
        </div>
      </div>
      <div class="role-title" >实验安排</div>
      <div class="_form">
        <table>
          <tr>
            <td>选择实验室：</td>
            <td>
              <el-select v-model="form.lab" placeholder="请选择">
                <el-option
                  v-for="item in labs"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>实验类型：</td>
            <td>
              <el-select v-model="form.type" placeholder="请选择" @change="changeType">
                <el-option
                  v-for="item in types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>实验日期：</td>
            <td>
              <el-date-picker
                v-model="form.date"
                :picker-options="datePickerOptions"
                @change="getCourses"
                style="width:100%"
              ></el-date-picker>
            </td>
          </tr>
          <tr>
            <td>实验课时：</td>
            <td>
              <el-select v-model="form.course" placeholder="请选择">
                <el-option
                  v-for="item in courseList"
                  :key="item.num"
                  :label="item.description"
                  :value="item.num"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>实验班级：</td>
            <td>
              <el-select v-model="form.class" placeholder="请选择班级" >
                <el-option
                  v-for="item in classList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>实验内容：</td>
            <td>
              <el-select v-model="form.paper" placeholder="请选择" :multiple='paperSelectMultiple' collapse-tags>
                <el-option
                  v-for="item in paperList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align:left;">
              <span>PS：训练每个实验台2个学生，考试每个实验台1个学生。<br />考试为两个课时，学生分批考试。</span>
            </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align:center;">
              <el-button @click="step = 1"  :disabled="btnLocked">取消</el-button>
              <el-button type="primary" @click="addExperiment" :disabled="btnLocked">确定</el-button>
              <!--el-button type="primary" @click="linkToPath('/pad/invigilate')">进入监考</el-button-->
            </td>
          </tr>
        </table>
      </div>
    </div>
    <el-confrim :confrimInfo='confrimInfo' />
  </div>
</template>

<script>
import util from '~/util/util.js'
import paperListMixin from '@/mixins/paperListMixin'
import commonMixin from '@/mixins/commonMixin'


export default {
  components: {},
  mixins: [paperListMixin, commonMixin],
  data() {
    return {
      btnLocked: false,
      step: 1,
      form: {
        lab: '',
        type: 0,
        date: '',
        course: '',
        class: '',
        paper: []
      },
      labs: [],
      types: [],
      courses: [],
      examCourses: [],
      courseList: [],
      classList: [],
      scheduleList: [],
      paperSelectMultiple: false,
      datePickerOptions:{
        disabledDate(time){
          return time.getTime() < Date.now() - 24*60*60*1000
        }
      }
    }
  },
  mounted() {
    let adminUserData = JSON.parse(window.localStorage.getItem('adminUserData'))
    this.$store.commit('admin/SET_USERDATA',adminUserData)
    this.form.date = new Date()
    this.types = [
      {value: 0, label: '训练'},
      {value: 1, label: '考试'},
    ]
    this.getLabs()
    this.getCourses()
    this.getClassList()
    this.getScheduleList()
  },
  methods: {
    getScheduleStr(arr){
      let time = util.dateFtt('yyyy-MM-dd',new Date(arr.planDate))
      let type = arr.type === '0' ? '训练' : '考试'
      let str = `${time},第${arr.course}节, ${arr.lab.name},${arr.org.name}, ${type}`
      return str
    },
    startEx(){
      this.$store.dispatch('teacher/START_INVIGILATE', {
        data: {},
        cb: (res) => {
          if(res.succ && res.data) {
            this.linkToPath('/pad/invigilate')
          } else {
            this.step = 2
          }
        }
      })
    },
    changeType(){
      this.clearCourse()
      this.form.paper = []
      setTimeout(()=>{
        this.paperSelectMultiple = this.form.type === 1 
      }, 200)
    },
    clearCourse(){
      this.form.course = ''
      this.courseList = this.form.type ===1 ? this.examCourses : this.courses
    },
    getScheduleList(){
      this.$store.dispatch('teacher/UNDONE_SCHEDULE_LIST', {
        data: {},
        cb: (res) => {
          if(res.succ) {
            console.log(res.data)
            this.scheduleList = res.data ? res.data.sort((a,b) => a.course - b.course).sort((a,b) => a.planDate - b.planDate) : []
          }
        }
      })
    },
    getLabs(){
      this.$store.dispatch('teacher/GET_LABS', {
        data: {},
        cb: (res) => {
          if(res.succ) {
             this.labs = res.data ? res.data : []
          }
        }
      })
    },
    getCourses(){
      this.$store.dispatch('teacher/GET_COURSES', {
        data: {},
        cb: (res) => {
          if(res.succ) {
            let now = new Date()
            if(util.dateFtt('yyyy-MM-dd',now) === util.dateFtt('yyyy-MM-dd',this.form.date)){
              let nowHms = util.dateFtt('hh:mm:ss',now)
              this.courses = res.data ? res.data.filter(item => nowHms < item.start ) : []
            } else {
              this.courses = res.data ? res.data : []
            }
            if(this.courses.length === 0){
              this.$message.error('今天已经没有剩余的课时！')
            }
            this.examCourses = []
            this.courses.forEach((item,index) => {
              if(index === this.courses.length - 1) return 
              this.examCourses.push({
                num: item.num,
                description: item.description + ' , ' + this.courses[index+1].description,
              })
            })
            this.clearCourse()
          }
        }
      })
    },
    getClassList(){
      this.$store.dispatch('teacher/GET_CLASS_BY_TEACHER', {
        data: {},
        cb: (res) => {
          if(res.succ) {
             this.classList = res.data ? res.data : []
          }
        }
      })
    },
    checkForm(){
      if(!this.form.lab){
        this.$message.error('请选择实验室')
        return false
      }
      if(this.form.type === ''){
        this.$message.error('请选择实验类型')
        return false
      }
      if(!this.form.course){
        this.$message.error('请选择实验课时')
        return false
      }
      if(!this.form.class){
        this.$message.error('请选择实验班级')
        return false
      }
      if(!this.form.paper){
        this.$message.error('请选择实验内容')
        return false
      }
      return true
    },
    addExperiment(){
      if(!this.checkForm() || this.btnLocked) return
      this.btnLocked = true
      let data = {
        labId: this.form.lab,
        type: this.form.type,
        planDate: util.dateFtt('yyyy-MM-dd',this.form.date),
        course: this.form.course,
        paperIds: typeof this.form.paper != 'object' ? [this.form.paper] : [...this.form.paper],
        classId: this.form.class
      }
      console.log(data)
      this.$store.dispatch('teacher/ADD_EXPERIMENT', {
        data: data,
        cb: (res) => {
          if(res.succ) {
            this.$message.success('安排实验成功')
            this.getScheduleList()
            this.form = {
               ...this.form,
               lab: '',
               type: 0,
               course: '',
               class: '',
               paper: []
            }
          }
          this.btnLocked= false
        }
      })
    }
  },
  head() {
    return {
      title: '实验室管理系统'
    }
  }
}
</script>

<style>
body {
  background: url(../../../static/images/login-bg.png) no-repeat;
  background-size: cover;
}
.my-lesson {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 105%;
  background: white;
  border-radius: 5px;
}
.my-lesson strong{
  color: #4177ff;
  line-height: 40px;
  font-size: 20px;
}
.lesson-list {
  height: 50px;
  overflow: auto;
  margin-bottom: 5px;
}
.lesson-list > div {
  line-height: 25px;
  font-size: 14px;
  text-align: left;
  padding: 0 20px;
}
.lesson-list > div  span{
  float: right;
  color: gray;
}
.lesson-list > div  .button{
  cursor: pointer;
  color: #4177ff;
}
</style>
