import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import TypeNav from '@/components/TypeNav'
import store from '@/store/index'
import Carouseloop from '@/components/Carouseloop'
import * as API from '@/api'
import VueLazyload from 'vue-lazyload'
import loading from '@/assets/images/loading.gif'

//引入模拟接口

//组件库
import '@/plugins/element-ui'
import "@/mock/mockserve"
import 'swiper/css/swiper.css'
Vue.config.productionTip = false
Vue.component('Carouseloop',Carouseloop)
Vue.component('TypeNav', TypeNav)
Vue.use(VueLazyload,{loading})
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus=this
    Vue.prototype.$API=API
  },
  router,
  store
}).$mount('#app')
