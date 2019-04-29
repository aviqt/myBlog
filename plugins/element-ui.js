import Vue from 'vue'
import Element from 'element-ui/lib/element-ui.common'
import locale from 'element-ui/lib/locale/lang/zh-CN'

if(!global.consoleSwitch){
 //console.log = ()=>{}
}

export default () => {
  Vue.use(Element, { locale })
}
