import { reqCategoryList ,reqBannerList,reqFloorList} from '@/api'
const state = {
    categoryList: [],
    bannersList:[],
    floorsList:[]
}
const mutations = {
    RECEIVE_CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    RECEIVE_BANNERSLIST(state,bannersList){
        state.bannersList=bannersList
    },
    RECEIVE_FLOORSLIST(state,floorsList){
        state.floorsList=floorsList
    }

}
const actions = {
    async getCategoryList({commit}){
        const result=await reqCategoryList()
        if(result.code===200){
            commit('RECEIVE_CATEGORYLIST',result.data)
        }
    },
    async getBannersList({commit}){
        const result=await reqBannerList()
        if(result.code===200){
            commit('RECEIVE_BANNERSLIST',result.data)
        }
       
    },
    async getFloorsList({commit}){
        const result=await reqFloorList()
        if(result.code===200){
            commit ('RECEIVE_FLOORSLIST',result.data)
        }
    }
    
}
const getters = {}
const modules = {}

export default {
    state, mutations, actions, getters, modules
}