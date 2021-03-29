import axios from 'axios'
import NProgress from 'nprogress' 
import 'nprogress/nprogress.css'
import store from '@/store'
const service=axios.create({
    baseURL:'/api',
    timeout:2000
    
})
service.interceptors.request.use(
    config=>{
        NProgress.start()
        //用户没有登录的时候的唯一标识
       let userTempId=store.state.user.userTempId
       if(userTempId){
           config.headers.userTempId=userTempId
       }
       let token=store.state.user.token
       if(token){
           config.headers.token=token
       }
        return config
    }
)
service.interceptors.response.use(
    response=>{
        NProgress.done()
        return response.data
    },
    err=>{
        NProgress.done()
        alert('请求出现错误'+err.message||'未知错误')
        return new Promise(()=>{})
    }
)
export default service