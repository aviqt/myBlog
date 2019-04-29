<template>
  <div class="admin-page">
    <div class="top">
      <span class="title">{{title}}</span>
    </div>
    <div class="action-bar">
      <el-button type="primary" size="small" @click="viewPaper">查看试卷</el-button>
    </div>
    <el-table :data="table.data" style="width: 100%" @sort-change="sortChange" border :max-height="DcSize.height - 230">
    	<el-table-column v-for='(item,i) in table.columns' :key='i' :prop='item.prop' :label='item.label' 
        :width='item.width' :min-width='item.minWidth' :fixed='item.fixed' :sortable="item.sortable" 
      ></el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
import R from '~/util/request.js'
import paperListMixin from '@/mixins/paperListMixin'
import tableListMixin from '@/mixins/tableListMixin'
import commonMixin from '@/mixins/commonMixin'

export default {
	layout: 'admin',
  mixins: [tableListMixin,paperListMixin,commonMixin],
  components: {},
  data () {
    return {
      title: '实验试卷管理',
    }
  },
  mounted ()  {
    this.table.columns = [
      { prop: 'id', label: '编号', sortable: false ,width: 200},
      { prop: 'name', label: '实验名称', sortable: false },
    ]
    this.table.data = this.paperList
  },
  methods: {
    viewPaper(){
      window.open('/pad/paperView')
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
