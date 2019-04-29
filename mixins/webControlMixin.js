import util from '~/util/util.js'
import $ from 'jquery'
  
export default {
  data() {
    return {
      videoList: [],
      selectedVideoIndex: 0,
      
      oWebControl: null, // 插件对象
      bIE: (!!window.ActiveXObject || 'ActiveXObject' in window), // 是否为IE浏览器
      pubKey: '',
      initCount: 0,
      
      playerOp: {
        cover:false,
        appkey: '29528221',
        secret: 'HlpaJEYU1vKU8Xu2Eaz9',
        ip: 't.manager.exam.joyread.com.cn',
        port: 8185,
        snapDir: 'D:\SnapDir',
        layout: '1x1',
        cameraIndexCode: 'e817fea9c41b4664a372c16912da5642',
        startTimeStamp: new Date().getTime() - 1000 * 60 * 60,
        endTimeStamp: new Date().getTime()
      },
    }
  },
  mounted() {
    window.addEventListener('resize' , () => {
      if(this.oWebControl) {
        if(!this.playerOp.cover){
          this.oWebControl.JS_Resize($('#playWnd').width(), $('#playWnd').height())
        }
      }
    })
  },
  beforeDestroy () {
    this.uninit()
  },
  methods: {
    // 切换摄像机
    selectVideo(index) {
      let video = Object.values(this.videoList)[index]
      this.selectedVideoIndex = index
      this.playerOp.cameraIndexCode = video.cameraIndex ? video.cameraIndex : this.playerOp.cameraIndexCode 
      this.playerOp.startTimeStamp = video.startTimeStamp * 1000
      this.playerOp.endTimeStamp = video.endTimeStamp * 1000
      setTimeout(() => {this.setWndCover && this.setWndCover(false)},200)
      if(this.oWebControl){
        this.startPlayback()
      }else{
        this.initPlugin()
      }
    },
    // 设置窗口遮挡
    setWndCover (cover) {
      if(!this.oWebControl) return
      this.playerOp.cover = cover
      if(cover || this.selectedVideoIndex === -1){
        this.oWebControl.JS_Resize(1, 1)
        $('#playWnd').hide()
      }else{
        $('#playWnd').show()
        this.oWebControl.JS_Resize($('#playWnd').width(), $('#playWnd').height())
      }
    },
    // 初始化插件
    initPlugin () {
      let that = this
      that.oWebControl = new WebControl({
        szPluginContainer: 'playWnd',
        iServicePortStart: 15900,
        iServicePortEnd: 15909,
        cbConnectSuccess: () => {
          that.setCallbacks()
          that.oWebControl.JS_StartService('window', {
            dllPath: './VideoPluginConnect.dll'
          }).then(function () {
            //console.log($('#playWnd').width())
            that.oWebControl.JS_CreateWnd('playWnd', $('#playWnd').width(), $('#playWnd').height()).then(function () {
              //console.log('JS_CreateWnd success')
              // 初始化视频
              if (that.oWebControl) {
                that.getPubKey(that.initPlayer)
              }
            })
          }, function () {
          })
        },
        cbConnectError: () => {
          that.oWebControl = null
          $('#playWnd').html('插件未启动，正在尝试启动，请稍候...')
          WebControl.JS_WakeUp('VideoWebPlugin://')
          that.initCount++
          if (that.initCount < 3) {
            setTimeout(function () {
              that.initPlugin()
            }, 3000)
          } else {
            $('#playWnd').html('插件启动失败，请检查插件是否安装！')
          }
        },
        cbConnectClose: function () {
          console.log('cbConnectClose')
          that.oWebControl = null
        }
      })
    },
    // 获取公钥
    getPubKey (callback) {
      let that = this
      that.oWebControl.JS_RequestInterface({
        funcName: 'getRSAPubKey',
        argument: JSON.stringify({
          keyLength: 1024
        })
      }).then(function (oData) {
        //console.log(oData)
        if (oData.responseMsg.data) {
          that.pubKey = oData.responseMsg.data
          //console.log(that.pubKey)
          callback()
        }
      })
    },
    // 设置窗口控制回调
    setCallbacks () {
      this.oWebControl.JS_SetWindowControlCallback({
        cbIntegrationCallBack: this.cbIntegrationCallBack
      })
    },
    // 推送消息
    cbIntegrationCallBack (oData) {
      console.log(oData.responseMsg)
    },
    showCBInfo (oData) {
      console.log(oData, oData.responseMsg)
    },
    // RSA加密
    setEncrypt (value) {
      let encrypt = new JSEncrypt()
      encrypt.setPublicKey(this.pubKey)
      return encrypt.encrypt(value)
    },
    // 初始化
    initPlayer () {
      let that = this
      var appkey = that.playerOp.appkey
      var secret = that.setEncrypt(that.playerOp.secret)
      var ip = that.playerOp.ip
      var port = that.playerOp.port
      var snapDir = that.playerOp.snapDir
      var layout = that.playerOp.layout
      var encryptedFields = ['secret']
      encryptedFields = encryptedFields.join(',')
    
      if (!appkey) {
        this.showCBInfo('appkey不能为空！', 'error')
        return
      }
      if (!secret) {
        this.showCBInfo('secret不能为空！', 'error')
        return
      }
      if (!ip) {
        this.showCBInfo('ip不能为空！', 'error')
        return
      }
      if (!port) {
        this.showCBInfo('端口不能为空！', 'error')
        return
      } else if (!/^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/.test(port)) {
        this.showCBInfo('端口填写有误！', 'error')
        return
      }
    
      this.oWebControl.JS_RequestInterface({
        funcName: 'init',
        argument: JSON.stringify({
          appkey: appkey,
          secret: secret,
          ip: ip,
          playMode: 1, // 回放
          port: port,
          snapDir: snapDir,
          layout: layout,
          encryptedFields: encryptedFields
        })
      }).then(function (oData) {
        that.startPlayback()
      })
    },
    // 录像回放
    startPlayback (cameraIndex = null, time = null) {
      var cameraIndexCode = cameraIndex || this.playerOp.cameraIndexCode
      var startTimeStamp = time ? new Date(time).getTime() : this.playerOp.startTimeStamp
      var endTimeStamp = this.playerOp.endTimeStamp
      var recordLocation = 1
      var transMode = 1
      var gpuMode = 0
    
      if (!cameraIndexCode) {
        this.showCBInfo('监控点编号不能为空！', 'error')
        return
      }
      if (Number.isNaN(+startTimeStamp) || Number.isNaN(+endTimeStamp)) {
        this.showCBInfo('时间格式有误！', 'error')
        return
      }
      this.oWebControl.JS_RequestInterface({
        funcName: 'startPlayback',
        argument: JSON.stringify({
          cameraIndexCode: cameraIndexCode,
          startTimeStamp: Math.floor(startTimeStamp / 1000),
          endTimeStamp: Math.floor(endTimeStamp / 1000),
          recordLocation: recordLocation,
          transMode: transMode,
          gpuMode: gpuMode
        })
      }).then(function (oData) {
        //console.log(oData)
      })
    },
    // 停止回放
    stopAllPlayback () {
      this.oWebControl.JS_RequestInterface({
        funcName: 'stopAllPlayback'
      }).then(function (oData) {
        this.showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''))
      })
    },
    // 销毁播放组件
    uninit () {
      let that = this
      // 反初始化
      this.oWebControl.JS_RequestInterface({
        funcName: 'uninit'
      }).then(function (oData) {
        console.log(oData)
      })
    
      // 销毁
      this.oWebControl.JS_RequestInterface({
        funcName: 'destroyWnd'
      }).then(function (oData) {
        console.log(oData)
      })
    
      if (this.bIE) {
        if (this.oWebControl != null) {
          this.oWebControl.JS_Disconnect().then(function () {
            console.log('JS_Disconnect')
          }, function () {})
        }
      } else {
        if (this.oWebControl != null) {
          this.oWebControl.JS_DestroyWnd().then(function () {
            console.log('JS_DestroyWnd')
          }, function () {})
          this.oWebControl.JS_StopService('window').then(function () {
            that.oWebControl.JS_Disconnect().then(function () {
              console.log('JS_Disconnect')
            }, function () {})
          })
        }
      }
    }
  },
}