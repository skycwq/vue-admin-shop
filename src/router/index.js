import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'

Vue.use(VueRouter)
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
        path:'/search',
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