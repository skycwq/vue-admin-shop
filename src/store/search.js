import { reqSearchInfo } from '@/api/index'
const state={
    searchInfo:{}
}
const mutations={
    RECIVE_SEARCHINFO(state,searchInfo){
        state.searchInfo=searchInfo
    }
}
const getters={
    goodsList(state){
       return state.searchInfo.goodsList
    },
    trademarkList(state){
        return state.searchInfo.trademarkList
    },
    attrsList(state){
        return state.searchInfo.attrsList
    }
}
const actions={
    //发送search请求
    async getSearchInfo({commit},searchParams){
        const result=await reqSearchInfo(searchParams)

        if(result.code===200){
            commit('RECIVE_SEARCHINFO',result.data)
        }
    }
}

export default {
    state,
    mutations,
    getters,
    actions,
  
}