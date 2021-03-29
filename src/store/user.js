
import { reqAuthCode, reqLeaveLogin, reqRegister,reqUserInfo,reqUserLogin} from '@/api'
import { getUserTempId } from '@/utils/userabout'
const state={
    userTempId:getUserTempId(),
    code:'',
    token:localStorage.getItem('TOKEN_KEY'),
    userInfo:{}
}
const mutations={
    RECEIVE_CODE(state,code){
        state.code=code
    },
    RECEIVE_TOKEN(state,token){
        state.token=token
    },
    
    RECEIVE_USERINFO(state,userInfo){
        state.userInfo=userInfo
    },
    //清除token
    RESET_TOKEN(state){
        state.token=''
    },
    //清除用户信息
    RESET_USERINFO(state){
        state.userInfo=''
    }
}
const actions={
    async getAuthCode({commit},phone){
        const result=await reqAuthCode(phone)
        if(result.code===200){
            commit('RECEIVE_CODE',result.data)
            return result.data
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //注册用户信息
    async getRegister({commit},userInfo){
        const result=await reqRegister(userInfo)
        if(result.code===200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //登录
    async getUserLogin({commit},userInfo){
        const result=await reqUserLogin(userInfo)
        if(result.code===200){
            commit('RECEIVE_TOKEN',result.data.token)
            localStorage.setItem('TOKEN_KEY',result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //根据token请求用户信息
    async getUserInfo({commit}){
        const result=await reqUserInfo()
        if(result.code===200){
            commit('RECEIVE_USERINFO',result.data)
            return result.data.name
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //清除token
    async resetToken({commit}){
        commit('RESET_TOKEN')
        localStorage.removeItem('RESET_TOKEN')
    },
    //退出登录
    async reqLeaveLogin({commit}){
        const result=await reqLeaveLogin()
        if(result.code===200){
            commit('RESET_USERINFO')
            
            localStorage.removeItem('TOKEN_KEY')
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    }
}
const getters={}
const modules={}
  
export default {
    state,mutations,actions,getters,modules
}