<template>
  <div class="header-inner">
    <div class="head-logo">
      <img src="@/static/images/logo-white.png" />
    </div>
    <div class="head-title">宁大学术论文后台管理系统</div>
    <div class="head-right">
      欢迎您，admin
      <div class='button' @click="confrimLogout()"><i class="iconfont icon-power"></i> 退出</div>
    </div>
    <el-confrim :confrimInfo='confrimInfo' />
  </div>
</template>

<script>
import commonMixin from '@/mixins/commonMixin'
export default {
  mixins: [commonMixin],
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
		logout () {
			this.$router.push(`/admin/login`)
		},
    confrimLogout () {
      this.confrimInfo = {
        show: true,
        isConfrim: true,
        handlEvent: this.logout,
        title: '提醒',
        text: '确定要退出登录吗？'
      }
    }
  }
}
</script>
<style scoped>
.header-inner {
  position: relative;
  height:100%;
}
.head-logo {
  width: 200px;
  text-align: center;
  float: left;
}
.head-title {
  float: left;
  line-height: 64px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  padding-left: 20px;
}
.head-right {
  float: right;
  line-height: 64px;
  color: white;
  font-size: 18px;
  padding-right: 20px;
}
.head-right .button{
  display: inline-block;
  height: 64px;
  margin-left: 10px;
  width: 80px;
  cursor: pointer;
	text-align: center;
}
.head-right .button:hover{
  background: #666666;
}
</style>
