<template>
    <el-form :model='form' ref='Form'  label-width="100px" :rules="rules" class="rule-form">
      <el-form-item label="姓名：" prop='name'>
         <el-input v-model="form.name" autocomplete="off" maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="手机号：" prop='phone'>
         <el-input v-model="form.phone" autocomplete="off" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop='password'>
         <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
</template>
<script>
import R from '~/util/request.js'
import util from '~/util/util.js'
export default {
  props: ['data'],
  data() {
    return {
      form: {
        name: '',
        phone: '',
        password: '123456'
      },
      rules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { required: true, max:10, message: '姓名最多10个字符', trigger: 'blur' },
        ],
        phone: [
          { required: true , validator: util.checkPhone, trigger: 'blur'}
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
        ]
      }
    }
  },
  mounted() {
    if(this.data.teacher){
      this.form = {
        name: this.data.teacher.teacherName,
        phone: this.data.teacher.phone,
        password: this.data.teacher.password
      }
    }
  },
  methods: {
    onOk() {
      this.$refs['Form'].validate(valid => {
        if(valid) {
          if(this.data.teacher){
            this.editTeacher()
          }else{
            this.addTeacher()
          }
        }
      })
    },
    addTeacher(){
      this.$store.dispatch('admin/ADD_TEACHER', {
        data: {
          teacherName: this.form.name,
          phone: this.form.phone,
          password: this.form.password
        },
        cb: (res) => {
          //console.log(res)
          if(res.succ) {
            this.data.successFn && this.data.successFn()
            this.$message.success('添加老师成功')
          }
        }
      })
    },
    editTeacher(){
      this.$store.dispatch('admin/EDIT_TEACHER', {
        data: {
          id: this.data.teacher.id,
          teacherName: this.form.name,
          phone: this.form.phone,
          password: this.form.password
        },
        cb: (res) => {
          //console.log(res)
          if(res.succ) {
            this.data.successFn && this.data.successFn()
            this.$message.success('编辑老师成功')
          }
        }
      })
    }
  }
}
</script>
<style>
  .rule-form{
    top:0;
    left:100px;
  }
	.rule-form .el-input{
		width: 350px;
	}
</style>
