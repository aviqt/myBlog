<template>
  <div>
    <nuxt/>
  </div>
</template>

<script>
import util from '@/util/util.js'
export default {
  components: {},
  data() {
    return {
    }
  },
  mounted(){
      util.cookie.delete('ma')
    if(util.getQueryString('MA') != null) {
      
      util.cookie.delete('MA')
      util.cookie.set('MA', util.getQueryString('MA'))
    }
  },
  methods: {
  },
  computed: {}
}
</script>

<style>
  
</style>
