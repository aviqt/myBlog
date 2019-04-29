/*
 ** 统一处理axios相关
 */
import axios from 'axios'
import elm from 'element-ui'

// config
axios.defaults.timeout = 50000
axios.defaults.headers.post['Content-Type'] = 'application/json;'
const baseURL = 'http://118.31.60.159'


// 请求拦截
axios.interceptors.request.use((config) => {
  // config.data = config.data.data
	// console.log(config);
  return config
}, (error) => {
  return Promise.reject(error)
})


// 响应拦截
axios.interceptors.response.use((res) => {
  //console.log('RES:', res)
  if (res.status === 200) {
    if (res.data.succ) {
      //res.data.msg && elm.Message.success(res.data.msg)
      return res.data
    } else {
      res.data.msg && elm.Message.error({
        message: res.data.msg,
        showClose: false
      })
      //elm.Message.error(res.data.msg)
      if(res.data.code === '20011' || res.data.code === '502') {
        setTimeout(() => {
          let pathname = window.location.pathname
          let url =  pathname.indexOf('invigilate') !== -1 ? '/admin/login/teacher'  : '/pad/login'
          if(pathname.indexOf('admin') !== -1){
            url = pathname.indexOf('staff') !== -1 ? '/admin/login/staff' : '/admin/login/teacher'
          } 
          window.location.href = url
        },1000)
      }
      return res.data
    }
  } else {
    return Promise.reject(res)
  }
}, (error) => {
  return Promise.reject(error)
})

// export default axios
export default {
  $post(url, data, cb) {
    axios.post(url, data).then(resolve => {
      cb && cb(resolve)
    }, reject => {
      console.log('error:' + reject)
    })
  },
  $get(url, data, cb) {
    axios.get(url, {
      params: data
    }).then(resolve => {
      cb && cb(resolve)
    }, reject => {
      console.log('error:' + reject)
    })
  },
  axios,
  baseURL
}
