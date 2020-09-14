import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入全局样式
import '@/styles/index.less'
// 加载vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 自动设置rem基准值
import 'amfe-flexible'
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
