/*
 ** 统一处理axios相关
 */
import axios from 'axios'
import elm from 'element-ui'

// 扩展Date
Date.prototype.format = function (format) {
  var date = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
        date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
}

// config
axios.defaults.timeout = 50000
axios.defaults.headers.post['Content-Type'] = 'application/json;'
// axios.defaults.baseURL = 'http://120.26.110.41:9090'
const baseURL = 'https://test.api.86edu.net'


// 请求拦截
axios.interceptors.request.use((config) => {
  // config.data = config.data.data
	console.log(config);
  return config
}, (error) => {
  return Promise.reject(error)
})

// 验证请求返回statusCode
let vStatusCode = function (statusCode) {
  if (statusCode == 100 || statusCode == 10 || statusCode == 200) {
    return true
  }
  return false
}

// 响应拦截
axios.interceptors.response.use((res) => {
  console.log('res++++res', res)
  if (res.status == 200) {
    if (res.data.statusCode) {
      // 503 特殊处理
      if (res.data.statusCode == 503) {
        elm.Message.error(res.data.msg);
        // 清除登录本地数据
        window.localStorage.setItem('backURL', window.location.pathname)
        window.location.href = '/user/signin'
        window.localStorage.removeItem('userData')
      }

      // 其他statusCode验证
      if (vStatusCode(res.data.statusCode)) {
        return res.data
      } else {
        if(res.data.statusCode == 90035) {
          console.log('0000000')
          return res.data
        }else if(res.data.statusCode == 20011){
          elm.Message.error(res.data.msg);
					//window.location.href = '/admin/login';
					window.localStorage.removeItem('adminUserData');
				}else {
          console.log(res.data)
          elm.Message.error(res.data.msg);
          return Promise.reject(res)
        }

      }
    } else {
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
      if (resolve.statusCode != 10 && resolve.statusCode != 100 && resolve.statusCode != 200 && resolve.statusCode != 90033 && resolve.statusCode != 90035) {
        elm.Message.error(resolve.msg);
        return;
      }
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
