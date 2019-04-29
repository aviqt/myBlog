<template>
    <el-form :model='form' ref='Form'  label-width="100px" :rules="rules" class="rule-form">
      <el-form-item label="选择文件：">
         <input type="file" ref="fileInput" accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
      </el-form-item>
    </el-form>
</template>
<script>
  import R from '~/util/request.js'
  export default {
    props: ['data'],
    data() {
      return {
        form: [],
        rules: []
      }
    },
    mounted() {
    },
    methods: {
      onOk() {
        this.$refs['Form'].validate(valid => {
          if(valid) {
            if(this.data.classId){
              this.importStudent()
            } else {
              this.importTeacher()
            }
          }
        })
      },
      importStudent(){
         if (this.$refs.fileInput.files.length === 0) return
        let formData = new FormData()
        formData.append('file', this.$refs.fileInput.files[0])
        formData.append('id', this.data.classId)
        this.$store.dispatch('admin/IMPORT_STUDENT', {
          data: formData,
          cb: (res) => {
            if(res.succ) {
              this.data.successFn && this.data.successFn()
              this.$message.success('导入学生成功')
            }
          }
        })
      },
      importTeacher(){
         if (this.$refs.fileInput.files.length === 0) return
        let formData = new FormData()
        formData.append('file', this.$refs.fileInput.files[0])
        this.$store.dispatch('admin/IMPORT_TEACHER', {
          data: formData,
          cb: (res) => {
            if(res.succ) {
              this.data.successFn && this.data.successFn()
              this.$message.success('导入老师成功')
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
