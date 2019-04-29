<template>
  <div class="admin-page">
    <div class="top">
      <span class="title">{{title}}</span>
    </div>
    <div class="action-bar">
      <span  v-if="status === 1" @click="getClassData"> ← 返回查看班级信息</span>
    </div>
    <el-table :data="table.data" style="width: 100%" @sort-change="sortChange" border :max-height="DcSize.height - 230">
    	<el-table-column v-for='(item,i) in table.columns' :key='i' :prop='item.prop' :label='item.label' 
        :width='item.width' :min-width='item.minWidth' :fixed='item.fixed' :sortable="item.sortable" 
      ></el-table-column>
        <el-table-column label="性别" v-if="status === 1">
          <template slot-scope="scope">
              {{scope.row.sex === 1 ? '男' : '女'}}
          </template>
        </el-table-column>
      <el-table-column label="操作"  width="200"  fixed='right' align="center"  v-if="status === 0">
        <template slot-scope="scope">
          <el-button size="mini" @click="getStudentByClassId(scope.row.id)">查看学生</el-button>
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


export default {
	layout: 'admin',
  mixins: [tableListMixin,commonMixin,],
  components: {},
  data () {
    return {
      title: '班级管理',
      dialogInfo: [],
      status: 0
    }
  },
  mounted ()  {
    this.getClassData()
  },
  methods: {
    getClassData(){
      this.$store.commit('admin/CHANGE_LOADING')
      this.$store.dispatch('teacher/GET_CLASS_BY_TEACHER', {
        data: {},
        cb: (res) => {
          console.log(res.data)
          this.table.columns = [
            { prop: 'name', label: '班级名', sortable: false },
            { prop: 'peopleAmount', label: '学生人数', sortable: false },
          ]
          this.status = 0
          if(res.succ) {
             this.table.data = res.data
          }
          this.$store.commit('admin/CHANGE_LOADING')
        }
      })
    },
    getStudentByClassId(classId){
      this.$store.commit('admin/CHANGE_LOADING')
      this.$store.dispatch('teacher/GET_STUDENT_BY_CLASSID', {
        data: {
          id: classId
        },
        cb: (res) => {
          this.table.columns = [
            { prop: 'code', label: '学号', sortable: false },
            { prop: 'name', label: '姓名', sortable: false },
          ]
          this.status = 1
          if(res.succ) {
             this.table.data = res.data
          }
          this.$store.commit('admin/CHANGE_LOADING')
        }
      })
    }
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
