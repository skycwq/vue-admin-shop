import { reqCategoryList } from '@/api'
const state = {
    categoryList: []
}
const mutations = {
    RECEIVE_CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
}
const actions = {
    async getCategoryList({commit}){
        const result=await reqCategoryList()
        if(result.code===200){
            commit('RECEIVE_CATEGORYLIST',result.data)
        }
    }
}
const getters = {}
const modules = {}

export default {
    state, mutations, actions, getters, modules
}