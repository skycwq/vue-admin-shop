import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import user from './user'
Vue.use(Vuex)

const state={}
const mutations={}
const actions={}
const getters={}




const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        home,user
    }
})
export default store