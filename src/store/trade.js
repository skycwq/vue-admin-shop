import { reqAddressList,  reqPurchaseOrder } from "@/api"

const state={
    tradeInfo:{},
    addressList:[]
}
const mutations={
    RECEIVE_TRADENO(state,tradeInfo){
        state.tradeInfo=tradeInfo
    },
    RECEIVE_ADDRESSLIST(state,addressList){
        state.addressList=addressList
    }
}
const actions={
    //订单详情
    async getPurchaseOrder({commit}){
        const result=await reqPurchaseOrder()
        if(result.code===200){
            commit('RECEIVE_TRADENO',result.data)
        }
    },
    //用户地址
    async getAddressList({commit}){
        const result=await reqAddressList()
        if(result.code===200){
            commit('RECEIVE_ADDRESSLIST',result.data)
        }
            
        
    }
}
const getters={
    detailArrayList(state){
        return state.tradeInfo.detailArrayList||[]
    }
}
export default{
    state,mutations,actions,getters
}