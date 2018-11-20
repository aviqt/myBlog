<template>
  <div class="admin-page">
    <div class="top">
      <span class="title">{{title}}</span>
      <el-button type="primary" size="medium"  icon="el-icon-search">查询</el-button>
      <el-button type="primary" size="medium"  icon="el-icon-plus">添加</el-button>
    </div>
    <el-table :data="table.data" style="width: 100%">
    	<el-table-column v-for='(item,i) in table.columns' :prop='item.prop' :label='item.label' :width='item.width'
    	:min-width='item.minWidth' :fixed='item.fixed' :key='i'></el-table-column>
    </el-table>
     <el-pagination
      :current-page="page.currentPage"
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :total="page.total">
    </el-pagination>
  </div>
</template>

<script>
import R from '~/util/request.js'

export default {
  components: {},
  data () {
    return {
      title: '数据管理',
      table: { data: [], columns: [] },
      page: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 50],
        pageSize: 10,
        total: 200,
        layout: 'total, sizes, prev, pager, next, jumper'
      }
    }
  },
  mounted ()  {
    this.table.columns = [
      { prop: 'a', label: '任务名称' },
      { prop: 'b', label: '任务所在组' },
      { prop: 'c', label: '任务类名'},
      { prop: 'd', label: '触发器名称' },
      { prop: 'e', label: '触发器所在组' }
    ]
  },
  methods: {
  },
  computed: {},
	layout: 'admin'
}
</script>

<style scoped>
  
</style>
