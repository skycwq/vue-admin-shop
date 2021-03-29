import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('@/pages/Home')
const Login = () => import('@/pages/Login')
const Search = () => import('@/pages/Search')
const Register = () => import('@/pages/Register')
const Detail = () => import('@/pages/Detail')
const AddCartSuccess = () => import('@/pages/AddCartSuccess')
const ShopCart = () => import('@/pages/ShopCart')
const Pay = () => import('@/pages/Pay')
const Trade = () => import('@/pages/Trade')
const PaySuccess = () => import('@/pages/PaySuccess')
const Center = () => import('@/pages/Center')
const MyOrder = () => import('@/pages/Center/MyOrder')
const GroupOrder = () => import('@/pages/Center/GroupOrder')
import store from '@/store'

Vue.use(VueRouter)
//组件当中所写的this.$router.push()  这个push方法是VueRouter原型身上的方法，所以路由器实例化对象可以使用
const originPush = VueRouter.prototype.push    //把原来的push方法地址，保存起来，免得后面还要使用原来的方法
const originReplace = VueRouter.prototype.replace
//originPush()  //这样写是代表函数的调用，this默认指向window,而我们还要和之前一样，这个方法是由路由器对象去调的
//所以，我们应该让它调用的时候，this指向路由器对象
VueRouter.prototype.push = function (location, resolved, rejected) {
  //后面假设再去使用this.$router.push(),调的就是我们改过来的这个push
  if (resolved === undefined && rejected === undefined) {
    //代表调用push没有传递成功和失败的回调
    return originPush.call(this, location).catch(() => { })
  } else {
    //代表传递了回调函数（成功和失败至少传递了一个）
    return originPush.call(this, location, resolved, rejected)
  }
}

VueRouter.prototype.replace = function (location, resolved, rejected) {
  //后面假设再去使用this.$router.replace(),调的就是我们改过来的这个replace
  if (resolved === undefined && rejected === undefined) {
    //代表调用replace没有传递成功和失败的回调
    return originReplace.call(this, location).catch(() => { })
  } else {
    //代表传递了回调函数（成功和失败至少传递了一个）
    return originReplace.call(this, location, resolved, rejected)
  }
}
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path:'/pay',
    component:Pay, //本质就是在注册路由组件
    beforeEnter: (to, from, next) => {
      if(from.path === '/trade'){
        next()
      }else{
        next(false)
      }
    }
  },
  {
    path:'/paysuccess',
    component:PaySuccess, //本质就是在注册路由组件
    beforeEnter: (to, from, next) => {
      if(from.path === '/pay'){
        next()
      }else{
        next(false)
      }
    }
  },
  {
    path:'/trade',
    component:Trade, //本质就是在注册路由组件
    beforeEnter: (to, from, next) => {
      if(from.path === '/shopcart'){
        next()
      }else{
        next(false)
      }
    }

  },
  {
    path: '/center',
    component: Center,
    children:[
      {
        path:'myorder',
        component:MyOrder
      },
      {
        path:'grouporder',
        component:GroupOrder
      },
      {
        path:'',
        redirect:'myorder'
      }
    ]
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/search/:keyword?',
    name: 'search',
    component: Search
  },
  {
    path: '/login',
    component: Login,
    meta: {
      isHide: true
    }
  },
  {
    path: '/register',
    component: Register,
    meta: {
      isHide: true
    }

  },
  {
    path: '/detail/:goodsId?',
    component: Detail
  }, {
    path: '/addcartsuccess',
    component: AddCartSuccess
  },
  {
    path: '/shopcart',
    component: ShopCart
  }
];
const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },

})
router.beforeEach(async (to, from, next) => {
  let userInfo = store.state.user.userInfo
  let token = store.state.user.token
  if (token) {
    //如果有token说明登陆过，判断当前去哪
    if (to.path === '/login') {
      next('/')
    } else {
      //如果不赖登录继续判断
      if (userInfo.name) {
        next()
      } else {
        //如果用户信息没有值就发请求去获取成功了就随便失败了清除token会登录
        try {
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          store.dispatch('resetToken')
          next('/login')
        }
      }
    }
  } else {
    let targetTo=to.path
    if(targetTo.startsWith('/pay')||targetTo.startsWith('/paySuccess')||targetTo.startsWith('/center')){
      next('/login?Redirect='+targetTo)
    }else{
      next()
    }
  }
})
export default router