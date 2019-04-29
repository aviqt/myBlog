<template>
	<div class="container" :style="{height: DcSize.height + 'px'}">
    <div>
      <el-button type="primary" @click="linkToPath('/pad/login')">Pad Login</el-button><br />
      <el-button type="primary" @click="linkToPath('/admin/login/staff')">Staff Admin Login</el-button><br />
      <el-button type="primary" @click="linkToPath('/admin/login/teacher')">Teacher  Admin Login</el-button>
    </div>
	</div>
</template>

<script>
import commonMixin from '@/mixins/commonMixin'
import util from '@/util/util.js'
export default {
  mixins: [commonMixin],
  components: {},
  data() {
    return {
    };
  },
  created() {
    //document.documentElement.requestFullscreen()
    //this.$router.push(`/pad/login`)
  },
  mounted() {
  },
  methods: {
    fullSCreen(){
      var el = document.documentElement
      var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;     
      if(typeof rfs != "undefined" && rfs) {
         rfs.call(el)
      }
    },
    linkToPath(url){
      window.location.href = url
    }
  }
}
</script>

<style>
body {
  background: url(../static/images/bg.png) no-repeat;
  background-size: cover;
}

.container {
  text-align:center;
  width: 100%;
  display: table;
  line-height: 60px;
}

.container > div{
  display: table-cell;
  vertical-align: middle;
  opacity: 0.8;
}

</style>
