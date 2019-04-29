

let guid = function() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}


//"yyyy-MM-dd hh:mm:ss"
function dateFtt(fmt, date) { //author: meizz 
  var o = {
    "M+": date.getMonth() + 1, //月份 
    "d+": date.getDate(), //日 
    "h+": date.getHours(), //小时 
    "m+": date.getMinutes(), //分 
    "s+": date.getSeconds(), //秒 
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
    "S": date.getMilliseconds() //毫秒 
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
    }
  }
  return fmt
}


//cookie操作
let cookie = {
  set: function(key, val, time) { //设置cookie方法
    var date = new Date(); //获取当前时间
    var expiresDays = time; //将date设置为n天以后的时间
    date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); //格式化为cookie识别的时间
    document.cookie = key + "=" + val + ";expires=" + date.toGMTString(); //设置cookie
  },
  get: function(key) {
    var name = key + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
  },
  delete: function(key) { //删除cookie方法
    var date = new Date(); //获取当前时间
    date.setTime(date.getTime() - 10000); //将date设置为过去的时间
    document.cookie = key + "=v; expires =" + date.toGMTString(); //设置cookie
  }
}
/*获取URL参数*/
function getQueryString(name) { 
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
  var index = window.location.href.indexOf('?') !== -1? (window.location.href.indexOf('?')+1):1;
  var r = window.location.href.substr(index).match(reg); 
  if (r !== null) return unescape(r[2]); 
  return null; 
}

let checkPhone = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('手机号不能为空'));
  } else {
    const reg = /^1[1|3|4|5|7|8][0-9]\d{8}$/
    //console.log(reg.test(value));
    if (reg.test(value)) {
      callback();
    } else {
      return callback(new Error('请输入正确的手机号'));
    }
  }
}
// export default axios
export default {
  guid,
  dateFtt,
  cookie,
  checkPhone,
  getQueryString
}
