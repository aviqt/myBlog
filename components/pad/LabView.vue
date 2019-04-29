<template>
	<div class="lab">
		<div class="dais">讲台</div>
    <div class="table-list">
      <div v-for="(item,index) in labInfo.seats" :key="index" :table-num="item.code" @click="changeSelectedSeat(item)"
        class="table" :class="{selected:selectedSeat.id === item.id && type === 'tablePicker'}"
        :style="{width:((100-10)/labInfo.colNum) + '%','margin': '0.5rem ' + (5/labInfo.colNum) + '%'}"
      >
        <div class="table-info" v-if="type === 'invigilate'">
          座位号：{{item.code}}<br />
          实验内容：{{item.exmPaper && item.exmPaper.examName}}<br />
          学生姓名：{{item.student[0] && item.student[0].name}}{{item.student[1] && ' , ' + item.student[1].name}}<br />
          学生学号：{{item.student[0] && item.student[0].code}}{{item.student[1] && ' , ' + item.student[1].code}}<br />
          <div class="confirm" v-if="item.student[0] && item.student[0].isConfirm === 0">已签到</div>
        </div>
        <div v-if="(type === 'tablePicker' && item.isBind === 0)" class="status" >已绑定</div>
        <div v-if="(type === 'invigilate' && item.student[0] && item.student[0].doneTest === 0)" class="status" >已交卷</div>
      </div>
    </div>
    <div class="pad-operation-menu" v-if="type === 'tablePicker'">
      <div @click='btnOkClick()' class="pad-button">确定</div>
    </div>
	</div>
</template>

<script>
	export default {
    props: ["labInfo", "type", "toParent", "value"],
		data() {
			return {
        selectedSeat: ""
			}
		},
    created () {
    	this.selectedSeat = this.value ? this.value : ""
      console.log(this.labInfo)
    },
    methods: {
      changeSelectedSeat (table) {
        if (this.type !== 'tablePicker') return
        this.selectedSeat = table
      },
      btnOkClick () {
        this.toParent && this.toParent(this.selectedSeat)
      }
    }
	}
</script>

<style scoped>
.lab {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 0 2rem 1rem;
}
.dais {
  width: 20%;
  line-height: 2.5rem;
  margin: 1rem auto;
  font-size: 1rem;
  text-align: center;
  background: white;
  border-radius: 0.3rem;
}
.table-list{
  position: relative;
  overflow: hidden;
}
.table-list .table{
  float: left;
  position: relative;
  text-align: center;
  background: white;
  border-radius: 0.3rem;
  height: 8rem;
  overflow: hidden;
}
.table-list .selected {
  background: red;
}
.table-list .table:before{
  content: attr(table-num);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  line-height: 7rem;
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
}
.table .table-info{
  position: relative;
  z-index: 2;
  font-size: 0.7rem;
  text-align: left;
  padding: 0.4rem;
  line-height: 1.2rem;
}
.table-info .confirm {
  position: absolute;
  background: #60c424;
  right: 0.5rem;
  top: 0.4rem;
  color: white;
  padding: 0 0.5rem;
  border-radius: 0.2rem;
}
.table .status {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  line-height: 7rem;
  font-size: 1.2rem;
  color: #fff;
  background: #4177ff;
  z-index: 3;
}

.table-list .selected .status{
  display: none;
}
</style>
