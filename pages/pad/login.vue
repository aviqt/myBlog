<template>
	<div>
		<div class="pad-login-box">
      <div class="title">{{title}}</div>
      <div class="select-role" v-if="step === 1">
        <div v-for="(item,index) in roleList" :key="index" v-if="index != 1 && index != 2" @click="selectRole(index)">{{item.name}}登录</div>
      </div>
      <div class="pad-login-inner" v-if="step === 2">
        <div class="role-title" @click="backToSelectRole">{{roleList[selectedRoleIndex].name}}登录</div>
        <div class="pad-login-form">
          <div class="form-item">
            <i class="iconfont icon-user"></i>
            <el-input v-model="form.username" placeholder="请输入账号"  maxlength='20'></el-input>
          </div>
          <div class="form-item">
            <i class="iconfont icon-mima" style="font-weight: bold;"></i>
            <el-input v-model="form.password" placeholder="请输入密码" type="password"  @keyup.enter.native="login"></el-input>
          </div>
          <div class="button" @click="checkForm">登录</div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import "@/static/pad.css"
import util from '@/util/util.js'
import loginMixin from '@/mixins/loginMixin'

export default {
  mixins: [loginMixin],
  data() {
    return {
      title: '科学实验考试在线操作台',
      step:1
    }
  },
  mounted () {
    this.form.username = ''
    this.form.password = ''
  },
  methods: {
    selectRole (index) {
      this.selectedRoleIndex = index
      this.step = 2
    },
    backToSelectRole () {
      this.step = 1
      this.form.username = ''
      this.form.password = ''
    }
  }
}
</script>

<style>
body {
  background: url(../../static/images/pad/bg.png) no-repeat;
  background-size: cover;
}

</style>
