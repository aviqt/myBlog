<template>
    <el-form :model='form' ref='Form'  label-width="100px" :rules="rules" class="rule-form">
      <el-form-item label="学号：" prop='code'>
         <el-input v-model="form.code" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="姓名：" prop='name'>
         <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
        <el-form-item label="性别：" prop='sex'>
          <el-radio-group v-model="form.sex">
            <el-radio v-for="item in sexList" :key="item.value" :label="item.value" >{{item.label}}</el-radio>
          </el-radio-group>
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
					code: '',
					name: '',
					sex: 0
				},
        sexList: [
          {value: 1, label:'男'},
          {value: 0, label:'女'},
        ],
        rules: {
          code: [
            { required: true, message: '学号不能为空', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '姓名不能为空', trigger: 'blur' },
            { required: true, max:10, message: '姓名最多10个字符', trigger: 'blur' },
          ]
        }
      }
    },
    mounted() {
      if(this.data.student){
        this.form = {
          code: this.data.student.code,
          name: this.data.student.name,
          sex: this.data.student.sex,
        }
      }
    },
    methods: {
      onOk() {
        this.$refs['Form'].validate(valid => {
          if(valid) {
            if(this.data.student){
              this.editStudent()
            }else{
              this.addStudent()
            }
          }
        })
      },
      addStudent(){
        this.$store.dispatch('admin/ADD_STUDENT', {
          data: {
            classId: this.data.classId,
            code: this.form.code,
            name: this.form.name,
            sex: this.form.sex
          },
          cb: (res) => {
            //console.log(res)
            if(res.succ) {
              this.data.successFn && this.data.successFn()
              this.$message.success('添加学生成功')
            }
          }
        })
      },
      editStudent(){
        this.$store.dispatch('admin/EDIT_STUDENT', {
          data: {
            id: this.data.student.id,
            code: this.form.code,
            name: this.form.name,
            sex: this.form.sex
          },
          cb: (res) => {
            //console.log(res)
            if(res.succ) {
              this.data.successFn && this.data.successFn()
              this.$message.success('编辑学生成功')
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
