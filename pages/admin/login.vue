<template>
  <div>
    <div class="login-box">
      <div class="logo"><img src="~/static/images/logo-blue.png" /></div>
      <div class="title">宁波大学学术推荐管理系统</div>
      <div class="form">
        <div class="form-item">
          <i class="iconfont icon-user"></i>
          <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </div>
        <div class="form-item">
          <i class="iconfont icon-mima"></i>
          <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
        </div>
        <div class="button" @click="login()">登 录</div>
      </div>
    </div>
  </div>
</template>

<script>
import R from '~/util/request.js'

export default {
  components: {},
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      console.log(this.form)
			this.$router.push(`/admin`)
    }
  },
  head() {
    return {
      title: '登录-宁大学术论文后台管理系统'
    }
  }
}
</script>

<style>
body {
  background: url(../../static/images/login-bg.png) no-repeat;
  background-size: cover;
}
.form-item {
  padding-left: 40px;
  position: relative;
}
.form-item .iconfont {
  position: absolute;
  top: 3px;
  left: 5px;
  font-size: 30px;
  color: #dddee7;
}
</style>
