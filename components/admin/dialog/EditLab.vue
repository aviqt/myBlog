<template>
    <el-form :model='form' ref='Form'  label-width="100px" :rules="rules" class="rule-form">
      <el-form-item label="名字：" prop='name'>
         <el-input v-model="form.name" autocomplete="off" maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="座位数：" prop='seatNum'>
         <el-input v-model.number="form.seatNum" autocomplete="off"  type="number"></el-input>
      </el-form-item>
    </el-form>
</template>
<script>
import R from '~/util/request.js'
export default {
  props: ['data'],
  data() {
			let checkNum = (rule,value,callback) => {
					if(!value) {
							return new Error('必填信息')
					}else {
							if(!Number.isInteger(value)) {
									callback(new Error('请输入数字值'))
							}else{
									if(value < 0) {
											callback(new Error('不能小于0'))
									}else if(value > 100){
											callback(new Error('不能大于100'))
									}else {
											callback()
									}
							}
					}
			}
    return {
      form: {
        name: '',
        seatNum: 0,
      },
      rules: {
        name: [
          { required: true, message: '名字不能为空', trigger: 'blur' },
          { required: true, max:10, message: '名字最多10个字符', trigger: 'blur' },
        ],
        seatNum: [
          { required: true, message: '座位数不能为空', trigger: 'blur' },
          { required: true , validator: checkNum, trigger: 'blur'}
        ]
      }
    }
  },
  mounted() {
    if(this.data.lab){
      this.form = {
        name: this.data.lab.name,
        seatNum: this.data.lab.seatNum,
      }
    }
  },
  methods: {
    onOk() {
      this.$refs['Form'].validate(valid => {
        if(valid) {
          if(this.data.lab){
            this.editLab()
          }else{
            this.addLab()
          }
        }
      })
    },
    addLab(){
      this.$store.dispatch('admin/ADD_LAB', {
        data: {
          name: this.form.name,
          seatNum: this.form.seatNum
        },
        cb: (res) => {
          if(res.succ) {
            this.data.successFn && this.data.successFn()
            this.$message.success('添加实验室成功')
          }
        }
      })
    },
    editLab(){
      this.$store.dispatch('admin/EDIT_LAB', {
        data: {
          id: this.data.lab.id,
          name: this.form.name,
          seatNum: this.form.seatNum
        },
        cb: (res) => {
          if(res.succ) {
            this.data.successFn && this.data.successFn()
            this.$message.success('编辑实验室成功')
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
