<template>
  <div class="container"> 
		<div class="header">
			<admin-header />
		</div>
		<div class="sideNav">
			<side-nav />
		</div>
		<div class="main"  v-loading='$store.state.admin.loading'>
			<div class="main-inner">
				<nuxt/>
			</div>
		</div>
  </div>
</template>

<script>
import AdminHeader from '@/components/admin/Header'
import SideNav from '@/components/admin/SideNav'

export default {
  components: {
		AdminHeader,
		SideNav
	},
  data() {
    return {
    }
  },
  methods: {
  },
  computed: {},
  head() {
    return {
      title: '实验考试后台管理系统'
    }
  }
}
</script>

<style scoped>
.container {
	position: relative;
	height: 100%;
	width: 100%;
	background: #f0f3f4;
}
.header{
	position: absolute;
	height: 64px;
	top: 0;
	left: 200px;
	right: 0;
  background: linear-gradient(165deg, #636063 75%, #323741 75%);
	background: #323741;
}
.sideNav{
	position: absolute;
	width: 200px;
	top: 0;
	left: 0;
	bottom: 0;
	background: #323741;
}
.main{
	position: absolute;
	top: 64px;
	left: 200px;
	bottom: 0;
	right: 0;
	padding: 20px;
}
.main-inner {
	position: relative;
	height: 100%;
	width: 100%;
	background: white;
	overflow: auto;
}
</style>
