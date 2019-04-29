<template>
  <div class="admin-page">
    <div class="top">
      <span class="title">{{title}}</span>
    </div>
    <div class="action-bar">
      <span  v-if="status === 1" @click="getScheduleList"> ← 返回查看所有课程信息</span>
    </div>
    <el-table :data="table.data" style="width: 100%" @sort-change="sortChange" border :max-height="DcSize.height - 230">
    	<el-table-column v-for='(item,i) in table.columns' :key='i' :prop='item.prop' :label='item.label' 
        :width='item.width' :min-width='item.minWidth' :fixed='item.fixed' :sortable="item.sortable" :formatter='item.formatter'
      ></el-table-column>
        <el-table-column label="实验名称" v-if="status === 0">
          <template slot-scope="scope">
              <div v-for="item,i in scope.row.papers" :key="i">{{item && item.examName}}</div>
              <div v-if="false">{{scope.row.papers[0] && scope.row.papers[0].examName}} *{{scope.row.papers.length}}</div>
          </template>
        </el-table-column>
      <el-table-column label="操作"  width="200"  fixed='right' align="center"  v-if="status === 0">
        <template slot-scope="scope">
          <el-button size="mini" @click="goToMarkPoint(scope.row.id)">评卷</el-button>
          <el-button size="mini" @click="getScheduleScoreById(scope.row.id)">查看成绩</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作"  width="200"  fixed='right' align="center"  v-if="status === 1">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" disabled v-if="!scope.row.id">未交卷</el-button>
          <el-button size="mini" v-if="scope.row.id" @click="lookOutPaper(scope.row.id)">查看试卷</el-button>
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
import util from '~/util/util.js'
import tableListMixin from '@/mixins/tableListMixin'
import commonMixin from '@/mixins/commonMixin'


export default {
	layout: 'admin',
  mixins: [tableListMixin,commonMixin,],
  components: {},
  data () {
    return {
      title: '实验评卷',
      dialogInfo: [],
      status: 0
    }
  },
  mounted ()  {
    this.getScheduleList()
  },
  methods: {
    getScheduleList(){
      this.$store.commit('admin/CHANGE_LOADING')
      this.$store.dispatch('teacher/TRAIN_SCHEDULE_LIST', {
        data: {},
        cb: (res) => {
          this.table.columns = [
            { prop: 'planDate', label: '实验时间', sortable: false , formatter: this.formatterDate},
            { prop: 'org.name', label: '班级', sortable: false },
            { prop: 'org.peopleAmount', label: '学生人数', sortable: false },
            //{ prop: 'papers', label: '实验名称', sortable: false , formatter: this.formatterPapers},
            { prop: 'lab.name', label: '实验室', sortable: false },
            { prop: 'type', label: '模式', sortable: false, formatter: this.formatterType},
          ]
          this.status = 0
          if(res.succ) {
             this.table.data = res.data
          }
          console.log(res.data)
          this.$store.commit('admin/CHANGE_LOADING')
        }
      })
    },
    getScheduleScoreById(id) {
      this.$store.commit('admin/CHANGE_LOADING')
      this.$store.dispatch('teacher/GET_SCHEDULE_SCORE', {
        data: {
          scheduleId: id
        },
        cb: (res) => {
          console.log(res.data)
          this.table.columns = [
            { prop: 'name', label: '姓名', sortable: false},
            { prop: 'code', label: '学号', sortable: false},
            { prop: 'seatCode', label: '座位', sortable: false},
            { prop: 'score', label: '成绩', sortable: false},
          ]
          this.status = 1
          if(res.succ && res.data) {
            this.table.data = []
            res.data.seats && res.data.seats.map(seat => {
              seat.student.map(item => {
                this.table.data.push({
                  seatCode: seat.code,
                  score: seat.score,
                  name: item.name,
                  code: item.code,
                  id: seat.examHeaderId
                })
              })
            })
          }
          this.$store.commit('admin/CHANGE_LOADING')
        }
      })
    },
    goToMarkPoint(id) {
      sessionStorage.setItem("mPScheduleId",id)
      sessionStorage.setItem("mPIndex",0)
      sessionStorage.removeItem('mpExamHeaderId')
      window.open('/admin/teacher/mep')
    },
    lookOutPaper(id) {
      sessionStorage.setItem("mpExamHeaderId",id)
      sessionStorage.removeItem('mPIndex')
      sessionStorage.removeItem('mPScheduleId')
      window.open('/admin/teacher/mep')
      console.log(id)
    },
    formatterDate(row, column, cellValue, index){
      return util.dateFtt('yyyy-MM-dd',new Date(cellValue)) + ' ' + row.start
    },
    formatterType(row, column, cellValue, index){
      return cellValue === '0' ? '训练' : '考试'
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
