<template>
	<div class="edit-paper">
		<el-input placeholder="请输入实验名称" v-model="paper.name"> </el-input>
		<el-input placeholder="请输入实验所需要的器材" v-model="paper.equipments"
      type="textarea" rows="2"> </el-input>
		<el-input placeholder="请输入具体的实验步骤" v-model="paper.steps"
      type="textarea" rows="8"> </el-input>
    <div class="selfEditor" contenteditable="false" @blur="divChange" ref="xfjs" v-html="paper.content"></div>
    <div>
        <div ref="editor" style="text-align:left" @click="editorClick" class="editor"></div>
        <button @click="getContent">查看内容</button>
    </div>
	</div>
</template>

<script>
import E from 'wangeditor'
export default {
  props: ['paper'],
  data() {
    return {
      editor: null,
      lastEditRange: null,
    }
  },
  mounted() {
    this.editor = new E(this.$refs.editor)
    this.editor.customConfig.onchange = (html) => {
      this.paper.content = html
    }
    this.editor.customConfig.menus = ['emoticon']
    this.editor.create()
  },
  methods:{
    getContent () {
        alert(this.paper.content)
    },
    editorClick () {
      this.lastEditRange = getSelection().getRangeAt(0)
    },
    divChange () {
      this.paper.content = this.$refs.xfjs.innerHTML
    }
  }
}
</script>

<style >
.edit-paper > div{
  margin-bottom: 10px;
}
.ql-editor {
  height: 100px;
}
.selfEditor{
  padding: 10px;
  border: 1px solid #ddd
}
.editor{
  width: 100px;
}
</style>
