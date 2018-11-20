import ElConfrim from '@/components/common/ElConfrim'
import request from '@/util/request.js'

export default {
  components: {
    ElConfrim
  },
  data () {
    return {
      R: request,
      loading: false,
      confrimInfo: {
        show: false,
        isConfrim: true,
        handlEvent: '',
        title: '',
        text: ''
      }
    }
  },
  mounted () {
  },
  methods: {
  }
}
