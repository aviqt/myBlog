<template>
  <div class="admin-page">
    <div class="top">
      <span class="title">{{title}}</span>
    </div>
    <div class="action-bar">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="showAddTeacher">添加老师</el-button>
      <el-button type="primary" size="small" icon="el-icon-plus" @click="showImportTeacher">导入老师</el-button>
    </div>
    <el-table :data="table.data" style="width: 100%" @sort-change="sortChange" border :max-height="DcSize.height - 230">
    	<el-table-column v-for='(item,i) in table.columns' :key='i' :prop='item.prop' :label='item.label' 
        :width='item.width' :min-width='item.minWidth' :fixed='item.fixed' :sortable="item.sortable" 
      ></el-table-column>
      <el-table-column label="操作"  width="300"  fixed='right' align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="showEditTeacher(scope.row)">编辑</el-button>
          <el-button size="mini" style="display:none;">重置密码</el-button>
          <el-button size="mini" type='danger' @click="confrimDT(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
import tableListMixin from '@/mixins/tableListMixin'
import commonMixin from '@/mixins/commonMixin'
// dialogBox
import EditTeacher from '@/components/admin/dialog/EditTeacher'
import BatchImport from '@/components/admin/dialog/BatchImport'


export default {
	layout: 'admin',
  mixins: [tableListMixin,commonMixin,],
  components: {},
  data () {
    return {
      title: '教师管理',
      dialogInfo: [],
    }
  },
  mounted ()  {
    this.getTeacherData()
  },
  methods: {
    getTeacherData(){
      this.$store.commit('admin/CHANGE_LOADING')
      this.$store.dispatch('admin/GET_ALL_TEACHER', {
        data: {},
        cb: (res) => {
          this.table.columns = [
            { prop: 'phone', label: '手机号', sortable: false },
            { prop: 'teacherName', label: '姓名', sortable: false },
          ]
          if(res.succ) {
             this.table.data = res.data
          }
          this.$store.commit('admin/CHANGE_LOADING')
        }
      })
    },
    confrimDT(teacher){
      console.log(teacher)
      this.confrimInfo = {
        show: true,
        isConfrim: true,
        handlEvent: ()=> {
          this.deleteTeacher(teacher)
        },
        title: '提醒',
        text: `确定要删除${teacher.teacherName}吗？`
      }
    },
    deleteTeacher(teacher){
      this.$store.dispatch('admin/DELETE_TEACHER', {
        data: {
          id: teacher.id
        },
        cb: (res) => {
          if(res.succ) {
            this.$message.success('删除成功')
            this.getTeacherData()
          }
        }
      })
    },
    showAddTeacher(){
      this.dialogInfo = {
        title: '添加老师',
        show: true,
        width: "500px",
        com: EditTeacher,
        data: {
          successFn: () => {
            this.dialogInfo.show = false
            this.getTeacherData()
          }
        }
      }
    },
    showEditTeacher(teacher){
      console.log(teacher)
      this.dialogInfo = {
        title: '编辑老师',
        show: true,
        width: "500px",
        com: EditTeacher,
        data: {
          teacher,
          successFn: () => {
            this.dialogInfo.show = false
            this.getTeacherData()
          }
        }
      }
    },
    showImportTeacher(){
      this.dialogInfo = {
        title: '导入老师',
        show: true,
        width: "500px",
        com: BatchImport,
        data: {
          successFn: () => {
            this.dialogInfo.show = false
            this.getTeacherData()
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
</style>
