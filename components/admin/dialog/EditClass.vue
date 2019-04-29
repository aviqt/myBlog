<template>
    <el-form :model='form' ref='Form'  label-width="100px" :rules="rules" class="rule-form" onsubmit="return false">
      <el-form-item label="班级名：" prop='className'>
         <el-input v-model="form.className" autocomplete="off" maxlength="20"></el-input>
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
					className: ''
				},
        rules: {
          className: [
            { required: true, message: '班级名不能为空', trigger: 'blur' },
            { required: true, max:20, message: '班级名最多20个字符', trigger: 'blur' },
          ]
        }
      }
    },
    mounted() {
      if(this.data.classObj){
        this.form = {
          className: this.data.classObj.name,
        }
      }
    },
    methods: {
      onOk() {
        this.$refs['Form'].validate(valid => {
          if(valid) {
            if(this.data.classObj){
              this.editClass()
            }else{
              this.addClass()
            }
          }
        })
      },
      addClass() {
        this.$store.dispatch('admin/ADD_CLASS', {
          data: {
            name: this.form.className,
            parentId: this.data.gradeId
          },
          cb: (res) => {
            if(res.succ) {
              this.data.successFn && this.data.successFn()
              this.$message.success('添加班级成功')
            }
          }
        })
      },
      editClass() {
        this.$store.dispatch('admin/EDIT_CLASS', {
          data: {
            name: this.form.className,
            id: this.data.classObj.id
          },
          cb: (res) => {
            if(res.succ) {
              this.data.successFn && this.data.successFn()
              this.$message.success('编辑班级成功')
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
