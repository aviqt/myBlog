<template>
    <el-form :model='form' ref='Form'  label-width="100px" :rules="rules" class="rule-form"  onsubmit="return false">
      <el-form-item label="年级名：" prop='gradeName'>
         <el-input v-model="form.gradeName" autocomplete="off" maxlength="10"></el-input>
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
					gradeName: ''
				},
        rules: {
          gradeName: [
            { required: true, message: '年级名不能为空', trigger: 'blur' },
            { required: true, max:10, message: '年级名最多10个字符', trigger: 'blur' },
          ]
        }
      }
    },
    mounted() {
    },
    methods: {
      onOk() {
        this.$refs['Form'].validate(valid => {
          if(valid) this.addGrade()
        })
      },
      addGrade() {
        this.$store.dispatch('admin/ADD_GRADE', {
          data: {
            name: this.form.gradeName
          },
          cb: (res) => {
            if(res.succ) {
              this.data.successFn && this.data.successFn()
              this.$message.success('添加年级成功')
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
