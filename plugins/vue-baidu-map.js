import Vue from 'vue'
import BaiduMap from 'vue-baidu-map'

export default () => {
  Vue.use(BaiduMap, {
    /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key.  */
    /* ak: 's3z0E5MNTuOiv5rrYlqqjGQppGgP8Mja'  */
  })
}
