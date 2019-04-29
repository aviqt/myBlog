<template>
  <div class="admin-page" style="height: 100%; padding: 0; overflow: auto;">
    <div class='grade-list-menu'>
      <grade-list-menu :gradeList='gradeList' :currentSelectedInfo='currentSelectedInfo' @changeClass="changeClass"
        :addClass="showAddClass" :editClass="showEditClass" :addGrade="showAddGrade" v-if="gradeList"
      ></grade-list-menu>
    </div>
    <div class="main-box" v-if="currentSelectedInfo.classObj">
      <div class="top">
        <span class="title">{{title}} - {{currentSelectedInfo.classObj.name}}</span>
        <strong :style="{color:unGroupedStudentList.length === 0 ? '#67C23A' : '#F56C6C'}">
          {{unGroupedStudentList.length === 0 ? '分组已完成' : '分组未完成'}}
        </strong>
      </div>
      <div class="action-bar" v-if="status === 0">
        实验老师绑定：{{teacher.teacherName}}
        <span  @click="showChangeTeacher">更改</span>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="showAddStudent">添加学生</el-button>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="showImportStudent">导入学生</el-button>
        <el-button type="primary" size="small" @click="getAllGroup">分组管理</el-button>
      </div>
      <div class="action-bar" v-if="status === 1">
        <span  @click="getStudentByClassId"> ← 返回查看学生信息</span>
        <el-button type="primary" size="small" @click="resetGroup">重置分组</el-button>
      </div>
      <el-table :data="table.data" style="width: 100%" @sort-change="sortChange" v-if="status != -1"
        border :max-height="status === 0 ? DcSize.height - 230 : DcSize.height - 300 " 
        :cell-style="cellStyle" :header-cell-style='headerCellStyle'>
        <el-table-column type="index" width="50" v-if="status === 0"></el-table-column>
        <el-table-column v-for='(item,i) in table.columns' :key='i' :prop='item.prop' :formatter='item.formatter'
          :label='item.label'  :width='item.width' :min-width='item.minWidth'  :fixed='item.fixed'  :sortable="item.sortable" 
        ></el-table-column>
        <el-table-column label="性别" v-if="status === 0" class-name="sex">
          <template slot-scope="scope">
              {{scope.row.sex === 1 ? '男' : '女'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed='right'  width="200"  align="center"  v-if="status === 0">
          <template slot-scope="scope">
            <el-button size="mini" @click="showEditStudent(scope.row)">编辑</el-button>
            <el-button size="mini" type='danger' @click="confrimDS(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed='right' align="center" width="200"  v-if="status === 1">
          <template slot-scope="scope">
            <el-button size="mini" @click="showSetGroup(scope.row)" v-if="scope.row.stuCode === null">安排学生</el-button>
            <el-button size="mini" type='danger' @click="confrimCOG(scope.row)" v-if="scope.row.stuCode !== null">清空学生</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="remark" v-if="status === 1 && unGroupedStudentList.length !== 0">
         <strong>未分组的学生：</strong>
        <span v-for="item,i of unGroupedStudentList" :key='i'>{{i===0 ? '' : ' , '}}{{ item.name }}</span>
      </div>
      <div class="pagination" v-if="page.show">
         <el-pagination :current-page.sync="page.currentPage" :page-sizes="page.pageSizes"  :page-size="page.pageSize"  
          :layout="page.layout" :total="page.total" @current-change="pageChange" background
        ></el-pagination>
      </div>
    </div>
    <el-dialog v-if="dialogInfo.show"  :title="dialogInfo.title" :visible.sync="dialogInfo.show" :width="dialogInfo.width">
      <component :is="dialogInfo.com" :data='dialogInfo.data' ref='dialogBox'></component>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogInfo.show = false">取 消</el-button>
          <el-button type="primary" @click="$refs.dialogBox.onOk()">确 定</el-button>
      </div>
    </el-dialog>
    <el-confrim :confrimInfo='confrimInfo' />
  </div>
</template>

<script>
import R from '~/util/request.js'
import GradeListMenu from '@/components/admin/GradeListMenu'
import tableListMixin from '@/mixins/tableListMixin'
import commonMixin from '@/mixins/commonMixin'
// dialogBox
import EditClass from '@/components/admin/dialog/EditClass'
import EditGrade from '@/components/admin/dialog/EditGrade'
import EditStudent from '@/components/admin/dialog/EditStudent'
import BatchImport from '@/components/admin/dialog/BatchImport'
import ChangeTeacher from '@/components/admin/dialog/ChangeTeacher'
import SetGroup from '@/components/admin/dialog/SetGroup'


export default {
	layout: 'admin',
  mixins: [tableListMixin,commonMixin,],
  components: {
    GradeListMenu
  },
  data () {
    return {
      status: -1, // 0表示学生信息，1表示分组信息
      title: '班级管理',
      dialogInfo: [],
      gradeList: [],
      unGroupedStudentList:[],
      teacher: [],
      currentSelectedInfo: {
        gradeId: '',
        classObj: ''
      }
    }
  },
  mounted ()  {
    this.getAllGrades()
  },
  methods: {
    cellStyle (cell) {
      //if(cell.column.label === '性别') return cell.row.sex === 1 ? 'color: #4177ff;' : 'color:red;'
    },
    headerCellStyle(param){
      //if(param.column.label === '性别')  return 'color: black;'
    },
    getAllGrades() {
      this.$store.commit('admin/CHANGE_LOADING')
      this.$store.dispatch('admin/GET_ALL_GRADES', {
        data: {}, 
        cb: (res) => {
          if(res.succ) {
            this.gradeList = res.data
            if(this.currentSelectedInfo.gradeId === '' && this.gradeList.length > 0){
              this.currentSelectedInfo.gradeId = this.gradeList[0].id
              if(this.gradeList[0].subOrg.length > 0) {
                this.currentSelectedInfo.classObj = this.gradeList[0].subOrg[0]
                this.changeClass()
              }
            }
          }
          this.$store.commit('admin/CHANGE_LOADING')
        }
      })
    },
    getAllGroup(){
      this.$store.commit('admin/CHANGE_LOADING')
      this.status = -1
      this.$store.dispatch('admin/ALL_GROUP', {
        data: {
          id: this.currentSelectedInfo.classObj.id
        },
        cb: (res) => {
          this.status = 1
          this.table.columns = [
            { prop: 'groupCode', label: '分组编号', sortable: false,width: 200},
            { prop: 'stuCode', label: '组员学号', sortable: false},
            { prop: 'stuName', label: '组员姓名', sortable: false}
          ]
          if(res.succ) {
             this.table.data = res.data
             this.getUnGroupedStudent()
          }
          this.$store.commit('admin/CHANGE_LOADING')
        }
      })
    },
    getUnGroupedStudent(){
      this.$store.dispatch('admin/UNGROUPED_STUDENT', {
        data: {
          id: this.currentSelectedInfo.classObj.id
        },
        cb: (res) => {
          //console.log(res)
          if(res.succ) {
            this.unGroupedStudentList = res.data
          }
        }
      })
    },
    getStudentByClassId(){
      this.$store.commit('admin/CHANGE_LOADING')
      this.status = -1
      this.$store.dispatch('admin/GET_STUDENT_BY_CLASSID', {
        data: {
          id: this.currentSelectedInfo.classObj.id
        },
        cb: (res) => {
          this.table.columns = [
            { prop: 'code', label: '学号', sortable: false },
            { prop: 'name', label: '姓名', sortable: false },
          ]
          this.status = 0
          console.log(res.data)
          if(res.succ) {
             this.table.data = res.data
          }
          this.$store.commit('admin/CHANGE_LOADING')
        }
      })
    },
    getTeacherByClassId(){
      this.$store.dispatch('admin/GET_TEACHER_BY_CLASSID', {
        data: {
          id: this.currentSelectedInfo.classObj.id
        },
        cb: (res) => {
          //console.log(res)
          if(res.succ) {
             this.teacher = res.data ? res.data : []
          }
        }
      })
    },
    changeClass(){
      this.getStudentByClassId()
      this.getTeacherByClassId()
      this.getUnGroupedStudent()
    },
    resetGroup(){
      this.$store.dispatch('admin/RESET_GROUP', {
        data: {
          id: this.currentSelectedInfo.classObj.id
        },
        cb: (res) => {
          if(res.succ) {
            this.$message.success('重置分组成功')
            this.getAllGroup()
          }
        }
      })
    },
    clearOneGroup(group){
      this.$store.dispatch('admin/CLEAR_ONE_GROUP', {
        data: {
          id: group.id
        },
        cb: (res) => {
          if(res.succ) {
            this.$message.success('清空分组成功')
            this.getAllGroup()
          }
        }
      })
    },
    confrimCOG(group){
      this.confrimInfo = {
        show: true,
        isConfrim: true,
        handlEvent: ()=> {
          this.clearOneGroup(group)
        },
        title: '提醒',
        text: `确定要清空分组${group.groupCode}吗？`
      }
    },
    deleteStudent(student){
      this.$store.dispatch('admin/DELETE_STUDENT', {
        data: {
          id: student.id
        },
        cb: (res) => {
          if(res.succ) {
            this.$message.success('删除成功')
            this.getStudentByClassId()
          }
        }
      })
    },
    confrimDS(student){
      this.confrimInfo = {
        show: true,
        isConfrim: true,
        handlEvent: ()=> {
          this.deleteStudent(student)
        },
        title: '提醒',
        text: `确定要删除${student.name}吗？`
      }
    },
    showAddClass(grade){
      this.dialogInfo = {
        title: `添加班级 - ${grade.name}`,
        show: true,
        width: "500px",
        com: EditClass,
        data: {
          gradeId: grade.id,
          successFn: () => {
            this.dialogInfo.show = false
            this.getAllGrades()
          }
        },
      }
    },
    showEditClass(classObj){
      this.dialogInfo = {
        title: `编辑班级`,
        show: true,
        width: "500px",
        com: EditClass,
        data: {
          classObj: classObj,
          successFn: () => {
            this.dialogInfo.show = false
            this.getAllGrades()
          }
        },
      }
    },
    showAddGrade(){
      this.dialogInfo = {
        title: '添加年级',
        show: true,
        width: "500px",
        com: EditGrade,
        data: {
          successFn: () => {
            this.dialogInfo.show = false
            this.getAllGrades()
          }
        }
      }
    },
    showAddStudent(){
      this.dialogInfo = {
        title: '添加学生',
        show: true,
        width: "500px",
        com: EditStudent,
        data: {
          classId: this.currentSelectedInfo.classObj.id,
          successFn: () => {
            this.dialogInfo.show = false
            this.getStudentByClassId()
          }
        }
      }
    },
    showImportStudent(){
      this.dialogInfo = {
        title: '导入学生',
        show: true,
        width: "500px",
        com: BatchImport,
        data: {
          classId: this.currentSelectedInfo.classObj.id,
          successFn: () => {
            this.dialogInfo.show = false
            this.getStudentByClassId()
          }
        }
      }
    },
    showEditStudent(student){
      this.dialogInfo = {
        title: `编辑学生`,
        show: true,
        width: "500px",
        com: EditStudent,
        data: {
          student,
          successFn: () => {
            this.dialogInfo.show = false
            this.getStudentByClassId()
          }
        }
      }
    },
    showChangeTeacher(){
      this.dialogInfo = {
        title: `更改老师`,
        show: true,
        width: "500px",
        com: ChangeTeacher,
        data: {
          teacher: this.teacher,
          classObj: this.currentSelectedInfo.classObj,
          successFn: () => {
            this.dialogInfo.show = false
            this.getTeacherByClassId()
          }
        }
      }
    },
    showSetGroup(group){
      this.dialogInfo = {
        title: '安排学生',
        show: true,
        width: "500px",
        com: SetGroup,
        data: {
          groupId: group.id,
          studentList: this.unGroupedStudentList,
          successFn: () => {
            this.dialogInfo.show = false
            this.getAllGroup()
          }
        }
      }
    },
  },
  computed: {}
}
</script>

<style scoped>
.pagination {
  text-align: right;
  margin-top: 20px;
}
.admin-page {
  height: 100%; 
  padding: 0 20px;
}
.main-box {
  margin-left: 220px;
  padding: 10px 15px;
  height: 100%;
  border-left: 15px solid #f0f3f4;
}
.grade-list-menu {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 220px;
  padding: 10px;
  overflow: auto;
}
.remark {
  padding: 10px 0;
  line-height: 25px;
}
</style>
