<template>
  <div class="header-inner">
    <div class="head-right">
      欢迎您，{{$store.state.admin.adminUserData.userName}}
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
    this.roleType = window.location.href.indexOf('/staff') != -1 ? 1 : 0
    let adminUserData = JSON.parse(window.localStorage.getItem('adminUserData'))
    this.$store.commit('admin/SET_USERDATA',adminUserData)
  },
  methods: {
  }
}
</script>
<style scoped>
.header-inner {
  position: relative;
  height:100%;
  background: white;
  box-shadow: 0 0 3px gray;
}
.head-logo {
  width: 200px;
  text-align: center;
  float: left;
}
.head-title {
  float: left;
  line-height: 64px;
  font-size: 20px;
  font-weight: bold;
  padding-left: 20px;
}
.head-right {
  float: right;
  line-height: 64px;
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
  background: #eeeeee;
}
</style>
