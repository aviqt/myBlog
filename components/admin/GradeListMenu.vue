<template>
    <div class='grade-list'>
      <div class="item" v-for='(grade,i) in gradeList' :key="i"  :class="{'no-open':grade.id != currentSelectedInfo.gradeId}"
        :style="{height:(grade.subOrg.length + 2 ) * 37  + 'px'}">
        <div class='switch' @click='switchEvent(grade)'></div>
        <i class='icon iconfont icon-list'></i>
        <span @dblclick="rewriteGrade(grade)" >{{grade.name}}</span>
        <i class='btn iconfont icon-delete'></i>
        <div class="class-list">
          <div class="item" v-for='(item,j) in grade.subOrg' :key="j"
            :class="{'selected-class':currentSelectedInfo.classObj.id === item.id}">
            <i class='icon iconfont icon-subtract'></i>
            <span @click="chooseClass(item)" :title="item.name">{{item.name}}</span>
            <i class='btn iconfont icon-delete'></i>
            <i class="btn el-icon-edit" @click="editClass(item)"></i>
          </div>
          <div class='item addBtn' @click='addClass(grade)'>
            <span>+ 添加班级</span>
          </div>
        </div>
      </div>
      <div class='item addBtn' @click='addGrade'>
        <span>+ 添加年级</span>
      </div>
    </div>
</template>

<script>
export default {
  props: ['gradeList', 'currentSelectedInfo', 'addClass', 'addGrade', 'editClass'],
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    switchEvent(grade){
      this.currentSelectedInfo.gradeId = this.currentSelectedInfo.gradeId != grade.id ? grade.id : ''
    },
    chooseClass(obj){
      if(this.currentSelectedInfo.classObj === obj) return
      this.currentSelectedInfo.classObj = obj
      this.$emit('changeClass')
    },
    rewriteGrade(grade){
      console.log(grade)
    },
  }
}
</script>

<style scoped>
.grade-list {
  position: relative;
}
.grade-list > .item {
  position: relative;
  overflow: hidden;
  transition: all .15s;
}
.grade-list .no-open {
  height: 37px !important;
}
.grade-list > .item:before {
  content: '';
  position: absolute;
  top: 37px;
  bottom: 17px;
  left: 15px;
  border-left: 1px #ddd dashed;
}
.grade-list > .item  span{
  position: relative;
  display: block;
  border: 1px solid #ddd;
  line-height: 30px;
  border-radius: 3px;
  padding-left: 60px;
  margin-top: 5px;
  cursor: pointer;
  user-select: none; 
  color: #555;
}
.grade-list  .item  > .icon{
  position: absolute;
  left: 32px;
  top: 8px;
  font-size: 25px;
  color: #999;
  z-index: 2;
}
.class-list  .item  > .icon{
  top: 6px;
  left: 38px;
  font-size: 18px;
}
.grade-list  .item  > .btn{
  position: absolute;
  right: 8px;
  top: 11px;
  font-size: 18px;
  color: #bbb;
  cursor: pointer;
}
.grade-list  .item  > .icon-delete{
  display: none;
}
.class-list  .item  > .btn{
  top: 8px;
}
.grade-list  .item  > .btn:hover{
  color: #999;
}
.class-list {
  margin-left: 5px;
}
.class-list > .item {
  position: relative;
}
.class-list > .selected-class > span{
  background: #dee6ff;
}
.class-list > .item > span{
  margin-left: 30px;
  padding-left:32px;
  overflow: hidden;
  height: 32px;
  padding-right: 32px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.class-list > .item:before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 15px;
  left: 13px;
  width: 16px;
  border-bottom: 1px #ddd dashed;
}

.switch {
  position: absolute;
  height: 20px;
  width: 20px;
  border: 1px solid #ddd;
  border-radius: 3px;
  top: 11px;
  left: 5px;
  z-index: 10;
  cursor: pointer;
}
.switch:before {
  content: '';
  position: absolute;
  width: 70%;
  height: 6%;
  background: gray;
  left: 15%;
  top: 47%;
}
.switch:after {
  content: '';
  position: absolute;
  height: 70%;
  width: 6%;
  background: gray;
  top: 15%;
  left: 47%;
  display: none;
}
.no-open .switch:after{
  display: block;
}

.grade-list  .addBtn {
}
.grade-list  .addBtn  span{
  padding-left: 5px;;
  border: none;
  color: gray;
}
.grade-list  .addBtn  span:hover{
  color: #66b1ff;
}
</style>