import { reqAddshop, reqdeleteone, reqshopCartInfo, reqUpdataOne ,reqDeleteAllCart,reqUpdateCartCheckedAll} from "@/api"

const state={
    shopCartList:[]
}
const mutations={
    RECEIVE_SHOPCARTLIST(state,shopCartList){
        state.shopCartList=shopCartList
    }
}
const actions={
    async getaddshop({commit},{skuId,skuNum}){
        const result=await reqAddshop(skuId,skuNum)
        if(result.code===200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //获取是购物车列表
    async getShopCartList({commit}){
        const result=await reqshopCartInfo()
        if(result.code===200){
            commit('RECEIVE_SHOPCARTLIST',result.data)
        }
    },
    //更新单个状态
    async updataOne({commit},{skuId,isChecked}){
        const result=await reqUpdataOne(skuId,isChecked)
        if(result.code===200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //跟新多个状态
    async updateCartCheckedAll({commit},{isChecked,skuIds}){
        const result = await reqUpdateCartCheckedAll(isChecked,skuIds)
        if(result.code === 200){
          return 'ok'
        }else{
          return Promise.reject(new Error('failed'))
        }
      },
      //删除单个商品
      async deleteOne({commit},skuId){
          const result=await reqdeleteone(skuId)
          if(result.code===200){
              return 'ok'
          }else{
              return Promise.reject(new Error('fail'))
          }
      },
      //删除全部商品
      async deleteAllCart({commit},skuIds){
        const result = await reqDeleteAllCart(skuIds)
        if(result.code === 200){
          return 'ok'
        }else{
          return Promise.reject(new Error('failed')) 
        }
      }
 
}
const getters={
    //全部已选数量
    checkedNum(state){
       return  state.shopCartList.reduce((pre,item) => {
            pre+=item.cartInfoList.reduce((pre1,item1) => {
            if(item1.isChecked){
                pre1+=item1.skuNum
            }
                return pre1
            },0)
            return pre
        },0)
    },
    //所有金额
    allMoney(state){
      return  state.shopCartList.reduce((pre,item) => {
            pre+=item.cartInfoList.reduce((pre1,item1) => {
              if(item1.isChecked){
                pre1+=item1.skuNum*item1.cartPrice
              }
                return pre1
            },0)
            return pre
        },0)
    }
}
const modules={}
  
export default {
    state,mutations,actions,getters,modules
}