<template>
	<div>
      <Signature></Signature>
      <Memory></Memory>
      <span>服务器时间：{{serverTime}}</span><br />
      <span>本地时间：{{localTime}}</span>
      <el-button @click="getTime" v-if="status === 0">获取时间</el-button>
	</div>
</template>

<script>
import util from '~/util/util.js'
import Signature from '@/components/board/Signature'
import Memory from '@/components/board/Memory'

export default {
  components: {
    Signature,
    Memory
  },
  data() {
    return {
      currentItemIndex: 0,
      status: 0,
      localTime: '',
      serverTime: ''
    }
  },
  methods: {
    getTime(){
      this.status = 1
      this.$store.dispatch('pad/GET_SERVER_CURRENTDATE', {
        data: {},
        cb: (res) => {
          if(res.succ) {
            this.serverTime = res.data ? util.dateFtt('hh:mm:ss',new Date(res.data)) : ''
            this.localTime = util.dateFtt('hh:mm:ss',new Date())
            setTimeout(this.getTime,500)
          }
        }
      })
    }
  }
}
</script>

<style>
</style>
