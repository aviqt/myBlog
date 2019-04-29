<template>
  <div class="admin-page">
    <div class="top">
      <span class="title">{{title}}</span>
    </div>
    <div class="action-bar">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="showAddLab">添加实验室</el-button>
    </div>
    <el-table :data="table.data" style="width: 100%" @sort-change="sortChange" border :max-height="DcSize.height - 230">
    	<el-table-column v-for='(item,i) in table.columns' :key='i' :prop='item.prop' :label='item.label' 
        :width='item.width' :min-width='item.minWidth' :fixed='item.fixed' :sortable="item.sortable" 
      ></el-table-column>
      <el-table-column label="操作" fixed='right' align="center"  width="200" v-if="false">
        <template slot-scope="scope">
          <el-button size="mini" @click="showEditLab(scope.row)">编辑</el-button>
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
import EditLab from '@/components/admin/dialog/EditLab'


export default {
	layout: 'admin',
  mixins: [tableListMixin,commonMixin,],
  components: {},
  data () {
    return {
      title: '实验室管理',
      dialogInfo: [],
    }
  },
  mounted ()  {
    this.getLabData()
  },
  methods: {
    getLabData(){
      this.$store.commit('admin/CHANGE_LOADING')
      this.$store.dispatch('admin/GET_ALL_LABS', {
        data: {},
        cb: (res) => {
          this.table.columns = [
            { prop: 'id', label: '实验室编号', sortable: false , width: 200},
            { prop: 'name', label: '实验室名字', sortable: false },
            { prop: 'seatNum', label: '实验台个数', sortable: false },
          ]
          console.log(res.data)
          if(res.succ) {
             this.table.data = res.data
          }
          this.$store.commit('admin/CHANGE_LOADING')
        }
      })
    },
    showAddLab(){
      this.dialogInfo = {
        title: '添加实验室',
        show: true,
        width: "500px",
        com: EditLab,
        data: {
          successFn: () => {
            this.dialogInfo.show = false
            this.getLabData()
          }
        }
      }
    },
    showEditLab(lab){
      this.dialogInfo = {
        title: '编辑实验室',
        show: true,
        width: "500px",
        com: EditLab,
        data: {
          lab,
          successFn: () => {
            this.dialogInfo.show = false
            this.getLabData()
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
