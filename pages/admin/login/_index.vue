<template>
  <div>
    <div class="login-box">
      <div class="title"><img src="~/static/images/logo.png" />实验室管理系统后台</div>
      <div class="role-title" >{{roleList[selectedRoleIndex].name}}登录</div>
      <div class="form">
        <div class="form-item">
          <i class="iconfont icon-user"></i>
          <el-input v-model="form.username" placeholder="请输入账号"  maxlength='20'></el-input>
        </div>
        <div class="form-item">
          <i class="iconfont icon-mima"></i>
          <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
        </div>
        <el-checkbox v-model="checked">记住用户名和密码</el-checkbox>
        <div class="button" @click="login()">登 录</div>
      </div>
    </div>
  </div>
</template>

<script>
import util from '~/util/util.js'

export default {
  components: {},
  data() {
    return {
      roleList: [
        {name: "教师", type: "3", path: '/admin/teacher'},
        {name: "管理员", type: "1", path: '/admin/staff/class'},
      ],
      selectedRoleIndex: 0,
      form: {
        username: '',
        password: ''
      },
      checked: false
    }
  },
  mounted() {
    this.form.username = util.cookie.get('username')
    this.form.password = util.cookie.get('password')
    if(util.cookie.get('password')) this.checked = true
    this.selectedRoleIndex = this.$route.params.roleIndex === '0' ? 0 : 1
  },
  methods: {
    login () {
      console.log()
      util.cookie.delete('username')
      util.cookie.delete('password')
      if(this.checked) {
        util.cookie.set('username', this.form.username, 7)
        util.cookie.set('password', this.form.password, 7)
      }
      this.$store.dispatch('admin/LOGIN', {
        data: {
          loginName: this.form.username,
          password: this.form.password,
          logintType: this.roleList[this.selectedRoleIndex].type
        },
        cb: (res) => {
          console.log(res)
          if(res.succ) {
            this.$message.success('登录成功')
            let url = this.roleList[this.selectedRoleIndex].path
            window.location.href = url
          }
        }
      })
    }
  },
  head() {
    return {
      title: '后台登录-实验室管理系统'
    }
  }
}
</script>

<style>
body {
  background: url(../../../static/images/login-bg.png) no-repeat;
  background-size: cover;
}
</style>
