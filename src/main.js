import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 导入全局样式
import '@/styles/index.less'
// 自动设置rem基准值
import 'amfe-flexible'
import '@/utils/dayjs'
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
