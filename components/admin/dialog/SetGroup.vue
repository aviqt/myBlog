<template>
    <el-form :model='form' ref='Form'  label-width="100px" :rules="rules" class="rule-form">
      <el-form-item label="学生1：" prop='stu1'>
          <el-select v-model ="form.stu1">
            <el-option v-for="item in data.studentList.filter(item => item.id !== form.stu2 )" 
             :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="学生2：" prop='stu2'>
          <el-select v-model ="form.stu2">
            <el-option v-for="item in data.studentList.filter(item => item.id !== form.stu1 )" 
             :key="item.id" :label="item.name" :value="item.id"></el-option>
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
					stu1: null,
					stu2: null
				},
        rules: {}
      }
    },
    mounted() {
    },
    methods: {
      onOk() {
        this.$refs['Form'].validate(valid => {
          if(valid) {
            this.setGroup()
          }
        })
      },
      setGroup(){
        let formData = new FormData()
        formData.append('id', this.data.groupId)
        formData.append('studentIds', [this.form.stu1,this.form.stu2].filter(item => item).join(','))
        
        this.$store.dispatch('admin/GROUP_STUDENT', {
          data: formData,
          cb: (res) => {
            //console.log(res)
            if(res.succ) {
              this.data.successFn && this.data.successFn()
              this.$message.success('安排学生成功')
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
