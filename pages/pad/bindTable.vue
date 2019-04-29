<template>
	<div>
		<div class="pad-title">
      <i class="el-icon-arrow-left" v-if="status != 0" @click="status = 0"></i>
      {{title[status]}}
      <div class='logout-btn' @click="confrimLogout">退出登录</div>
    </div>
    <div class="pad-main">
      <lab-view :labInfo="labInfo" type="tablePicker" :toParent="chooseSeat" :value="form.seat" v-if="status === 2"></lab-view>
      <div class="pad-form" v-if="status === 0">
        <div class="select selectLab"  @click="status = 1">
          选择实验室
          <span>{{form.lab.name ? form.lab.name : '请选择'}}</span>
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="select selectTable" @click="showTablePicker">
          选择座位
          <span>{{form.seat.code ? form.seat.code : '请选择'}}</span>
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="pad-operation-menu">
        	<div class="pad-button" @click="bind" style="width:100%; line-height: 2rem;">确认绑定</div>
        </div>
      </div>
    </div>
    <div class="labPicker" v-if="status === 1">
    	<div v-for="(item,index) in labList" :key="index" @click="chooseLab(item)">{{item.name}}</div>
    </div>
    <el-confrim :confrimInfo='confrimInfo' />
	</div>
</template>

<script>
import "@/static/pad.css"
import LabView from "@/components/pad/LabView"

import commonMixin from '@/mixins/commonMixin'
export default {
  mixins: [commonMixin],
  components:{
    LabView
  },
  data() {
    return {
      title: ["绑定设备", "选择实验室", "选择座位"],
      status: 0,
      labInfo: {
        seats: [],
        colNum: 4
      },
      form: {
        lab: [],
        seat: ''
      },
      labList: []
    }
  },
  created() {
    this.getLabList()
    this.getBindInfo()
  },
  methods: {
    getBindInfo() {
      this.$store.dispatch('pad/BINDINFO', {
        data: {},
        cb: (res) => {
          if(res.succ) {
            this.form.lab = res.data ? res.data : []
            this.form.seat = this.form.lab.seats ? this.form.lab.seats[0] : []
            if(this.form.lab.id) this.getLabInfo()
          }
        }
      })
    },
    getLabList() {
      this.$store.dispatch('admin/GET_ALL_LABS', {
        data: {},
        cb: (res) => {
          if(res.succ) {
            this.labList = res.data ? res.data : []
          }
        }
      })
    },
    getLabInfo () {
      this.$store.dispatch('pad/GET_SEATS_BY_LABID', {
        data: {
          id: this.form.lab.id
        },
        cb: (res) => {
          if(res.succ) {
            this.labInfo.seats = res.data ? res.data : []
          }
        }
      })
    },
    showTablePicker () {
      if(this.form.lab){
        this.status = 2
      } else {
        this.$message.error('请先选择一个考场')
      }
    },
    chooseSeat (seat) {
      this.form.seat = seat
      this.status = 0
    },
    chooseLab (item) {
      if(this.form.lab !== item) {
        this.form.lab = item
        this.form.seat = ""
        this.getLabInfo()
      }
      this.status = 0
    },
    bind () {
      if(this.form.seat){
        this.$store.dispatch('pad/BIND_PAD_SEAT', {
          data: {
            id: this.form.seat.id
          },
          cb: (res) => {
            if(res.succ) {
              //console.log(res)
              this.$message.success('绑定成功')
              this.getRoomInfo()
              //this.$router.push(`/pad/exam`)
            }
          }
        })
      } else {
        this.$message.error('请选择一个座位')
      }
    }
  }
}
</script>

<style scoped>
.pad-title i{
  position: absolute;
  left: 0; 
  top: 0;
  font-size: 2.5rem;
  line-height: 3rem;
  cursor: pointer;
}
.pad-title i:active{
  color: #2E75FA;
}
  
.pad-form {
  width: 80%;
  margin: 0 auto;
  padding-top: 4rem;
}
.pad-form .select{
  background: white;  padding: 0 1.8rem 0 0.5rem;
  line-height: 3rem;
  position: relative;
}
.pad-form .select:active{
  opacity: 0.8;
}
.pad-form .select span{
  float: right;
  color: #aaa;
}
.pad-form .select i{
  color: #999;
  position: absolute;
  right: 0.5rem;
  line-height: 3rem;
  font-weight: bold;
}
.selectLab {
  border-bottom: 0.1rem solid #ddd;
}
.labPicker {
  position: fixed;
  background: white;
  left: 0;
  top: 3rem;
  bottom: 0;
  right: 0;
  overflow: auto;
  z-index: 2;
  line-height: 3rem;
}
.labPicker div{
  padding: 0 0.5rem;
  border-bottom: 1px solid #ddd;
}
.labPicker div:active{
  background: #fdfdfd;
}
</style>
