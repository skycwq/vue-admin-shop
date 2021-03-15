import axios from 'axios'
import NProgress from 'nprogress' 
import 'nprogress/nprogress.css'
const service=axios.create({
    baseURL:'/api',
    timeout:2000
    
})
service.interceptors.request.use(
    config=>{
        NProgress.start()
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