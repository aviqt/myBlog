<template>
  <div class="side-nav">
		<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#323741"
			text-color="#fff" active-text-color="#fff" router>
			<div v-for='(item ,i) in navList' :index="item.routePath" :key='i' :is='item.com' >
				<i class='iconfont' :class="item.icon"></i>
				<span slot="title">{{ item.title }}</span>
			</div>
		</el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
				navList: [
					{routePath: '/admin',  title: '首页', icon: 'icon-home', com: 'el-menu-item'},
					{routePath: '/admin/', title: '信息统计', icon: 'icon-info',  com: 'el-menu-item'},
					{routePath: '/admin/', title: '人员管理', icon: 'icon-members',  com: 'el-menu-item'},
					{routePath: '/admin/dataManage', title: '数据管理', icon: 'icon-data',  com: 'el-menu-item'},
					{routePath: '/admin/', title: '后台设置', icon: 'icon-set',  com: 'el-menu-item'},
				]
      }
    },
    mounted() {
    },
    methods: {
    }
  }

</script>

<style scoped>
.side-nav .el-menu-item:hover, .side-nav .is-active {
  background: #2E75FA !important;
}
.side-nav .el-menu-item:hover i{
  color: white !important;
}
.side-nav .el-menu-item {
  font-size: 16px;
}
.side-nav .el-menu-item i{
  font-size: 18px;
}
</style>