/*
 ** 统一通用函数
 */
var hide_code = function (str, pos, length, newChar) {
  pos = pos || 0;
  length = length || 0;
  newChar = newChar || '*';
  if(pos + length > str.length){
    length = str.length - pos - 2
  }
  if (pos < 0 || length <= 0) {
      return str;
  }
  var repStr = "";
  for (var i = 0; i < length; i++) {
      repStr += newChar;
  }
  return str.slice(0, pos) + repStr + str.slice(pos + length, str.length);
}


// export default axios
export default {
  hide_code,
}
