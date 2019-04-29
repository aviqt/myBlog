import util from '~/util/util.js'
  
export default {
  data() {
    return {
      roleList: [
        {name: "学生", type: "1", path: '/pad/exam/'},
        {name: "教师", type: "2", path: '/admin/teacher/'},
        {name: "管理员", type: "3", path: '/admin/staff/class/'},
        {name: "工作人员", type: "3", path: '/pad/bindTable/'},
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
  },
  methods: {
    checkForm () {
      if(this.form.username && this.form.password){
        this.login()
      } else {
        this.$message.error('请输入账号和密码')
      }
    },
    login () {
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
          loginType: this.roleList[this.selectedRoleIndex].type
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
}