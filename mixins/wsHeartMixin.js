
export default {
  data () {
    return {
      ws: {
        obj: null,
        //url: 'wss://t.experiment.train.joyread.com.cn',
        url: 'ws://192.168.100.193',
        lockReconnect: false,
        tt: null,
        linkState: 0
      },
      heartCheck: {
        timeout: 3000,
        timeoutObj: null,
        serverTimeoutObj: null,
        start: this.heartCheckStart
      }
    }
  },
  mounted () {
    //this.createWebSocket()
  },
  destroyed() {
  	this.ws.tt && clearTimeout(this.ws.tt)
  },
  methods: {
    heartCheckStart () {
      let _this = this;
      _this.heartCheck.timeoutObj && clearTimeout(_this.heartCheck.timeoutObj)
      _this.heartCheck.serverTimeoutObj && clearTimeout(_this.heartCheck.serverTimeoutObj)
      _this.heartCheck.timeoutObj = setTimeout(() => {
        //console.log("Heart beat")
        _this.ws.obj.send && _this.ws.obj.send('ping')
        _this.heartCheck.serverTimeoutObj = setTimeout(() => {
          _this.ws.obj.close && _this.ws.obj.close()
        }, _this.heartCheck.timeout)
      }, _this.heartCheck.timeout)
    },
    reconnectWs () {
      let _this = this
      if (_this.ws.lockReconnect) {
        return
      }      
      _this.ws.lockReconnect = true
      _this.ws.tt && clearTimeout(_this.ws.tt)
      _this.ws.tt = setTimeout(() => {
       // console.log("Reconnect ws")
        _this.ws.lockReconnect = false
        _this.createWebSocket()
      }, _this.heartCheck.timeout + 1000)
    },
    createWebSocket () {
      let _this = this
      try {
        _this.ws.obj = new WebSocket(_this.ws.url)
        _this.initWebSocket()
      } catch(e) {
        _this.reconnectWs()
      }
    },
    initWebSocket () {
      let _this = this
      _this.ws.obj.onclose = function () {
        //console.log('链接关闭')
        _this.ws.linkState = 0
        _this.reconnectWs()
      };
      _this.ws.obj.onerror = function() {
        //console.log('发生异常了')
        _this.reconnectWs()
      };
      _this.ws.obj.onopen = function () {
        //心跳检测重置
        //console.log('链接成功')
        _this.ws.linkState = 1
        _this.heartCheck.start()
      };
      _this.ws.obj.onmessage = function (event) {
        //拿到任何消息都说明当前连接是正常的
        let data = ''
        try {
          data = JSON.parse(event.data)
          if(data.code === '506' || data.code === '508'){
            _this.ws.lockReconnect = true
            _this.$message.error(data.text)
          } else {
            _this.handleWsData && _this.handleWsData(data)
          }
        } catch {
          data = event.data
        }
        _this.heartCheck.start()
      }
    }
  }
}
