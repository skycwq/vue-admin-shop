import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'

Vue.use(VueRouter)
//组件当中所写的this.$router.push()  这个push方法是VueRouter原型身上的方法，所以路由器实例化对象可以使用
const originPush =  VueRouter.prototype.push    //把原来的push方法地址，保存起来，免得后面还要使用原来的方法
const originReplace = VueRouter.prototype.replace
//originPush()  //这样写是代表函数的调用，this默认指向window,而我们还要和之前一样，这个方法是由路由器对象去调的
//所以，我们应该让它调用的时候，this指向路由器对象
VueRouter.prototype.push = function(location,resolved,rejected){
  //后面假设再去使用this.$router.push(),调的就是我们改过来的这个push
  if(resolved === undefined && rejected === undefined){
    //代表调用push没有传递成功和失败的回调
    return originPush.call(this,location).catch(() => {})
  }else{
    //代表传递了回调函数（成功和失败至少传递了一个）
    return originPush.call(this,location,resolved,rejected)
  }
}

VueRouter.prototype.replace = function(location,resolved,rejected){
  //后面假设再去使用this.$router.replace(),调的就是我们改过来的这个replace
  if(resolved === undefined && rejected === undefined){
    //代表调用replace没有传递成功和失败的回调
    return originReplace.call(this,location).catch(() => {})
  }else{
    //代表传递了回调函数（成功和失败至少传递了一个）
    return originReplace.call(this,location,resolved,rejected)
  }
}
const routes=[
    {
        path:'/',
        redirect:'/home'
    },
    {
        path:'/home',
        component:Home
    },
    {
        path:'/search/:keyword?',
        name:'search',
        component:Search
    },
    {
        path:'/login',
        component:Login,
        meta:{
            isHide:true
          }
    },
    {
        path:'/register',
        component:Register,
        meta:{
            isHide:true
          }

    },
];
const router=new VueRouter({
    routes

})
export default router