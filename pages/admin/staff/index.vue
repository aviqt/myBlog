<template>
  <div class="admin-page">
    <div class="top">
      <span class="title">{{title}}</span>
    </div>
    <div class="wood">
      <div class="tick-line" v-for="(item,index) in tickMark"  :style="{height: 100/tickMark.length + '%'}">
        <div v-for="(x,i) in item" :style="{left: (i+1)/(item.length+1)*100 + '%',background:colors[index]}">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import R from '~/util/request.js'

export default {
  components: {},
  data() {
    return {
      title: '后台首页',
      tickMark: [
        ['','','','','','','','',''],
        ['','','','','','','','','','',''],
        ['','','','','','','','','','','','','',''],
      ],
      colors: ['red','blue','green'],
      sd: true
    }
  },
  mounted() {
  	
  },
  methods: {
  },
  computed: {},
	layout: 'admin'
}
</script>

<style scoped>
.wood {
  height: 200px;
  background: #eee;;
  position: relative;
}
.wood .tick-line{
  height: 100% ;
  width: 100%;
  position: relative;
}
.wood .tick-line div{
  position: absolute;
  height: 100%;
  background: white;
  width: 1px;
  top: 0;
  opacity: 0.5;
}

</style>
