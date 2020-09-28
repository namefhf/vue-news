import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
// 配置中文语言
dayjs.locale('zh-cn')
// 配置处理相对时间
dayjs.extend(relativeTime)
// console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))
Vue.filter('relativeTime', value => {
  // console.log(value)
  return dayjs(value).from(dayjs())
})
Vue.filter('datatime', value => {
  return dayjs(value).format('MM-DD HH:mm')
})
