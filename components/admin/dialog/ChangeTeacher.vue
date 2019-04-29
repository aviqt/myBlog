<template>
    <el-form :model='form' ref='Form'  label-width="100px" :rules="rules" class="rule-form">
        <el-form-item label="选择老师：" prop='teacher'>
          <el-select v-model ="form.teacher">
            <el-option v-for="item in teacherList" :key="item.id" :label="item.teacherName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
    </el-form>
</template>
<script>
  import R from '~/util/request.js'
  export default {
    props: ['data'],
    data() {
      return {
        loading: false,
				form: {
					teacher: '',
				},
        teacherList: [],
        rules: {
          teacher: [
            { required: true, message: '老师不能为空', trigger: 'blur' },
          ],
        }
      }
    },
    mounted() {
      if(this.data.teacher){
        this.form = {
          teacher: this.data.teacher.id
        }
      }
      this.getAllTeacher()
    },
    methods: {
      onOk() {
        this.$refs['Form'].validate(valid => {
          if(valid) {
            this.changeTeacher()
          }
        })
      },
      changeTeacher(){
        this.$store.dispatch('admin/BIND_TEACHER_AND_CLASS', {
          data: {
            id: this.data.classObj.id,
            teacherId: this.form.teacher,
          },
          cb: (res) => {
            //console.log(res)
            if(res.succ) {
              this.data.successFn && this.data.successFn()
              this.$message.success('更改老师成功')
            }
          }
        })
      },
      getAllTeacher(){
        this.$store.dispatch('admin/GET_ALL_TEACHER', {
          data: {},
          cb: (res) => {
            console.log(res)
            if(res.succ) {
              this.teacherList = res.data
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
