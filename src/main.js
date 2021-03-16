import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import TypeNav from '@/components/TypeNav'
import store from '@/store/index'
//引入模拟接口
import "@/mock/mockserve"
Vue.config.productionTip = false
Vue.component('TypeNav', TypeNav)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
