import axios from 'axios'
import NProgress from 'nprogress' 
import 'nprogress/nprogress.css'
const mockAjax=axios.create({
    baseURL:'/mock',
    timeout:2000
    
})
mockAjax.interceptors.request.use(
    config=>{
        NProgress.start()
        return config
    }
)
mockAjax.interceptors.response.use(
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
export default mockAjax