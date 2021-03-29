import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import user from './user'
import search from './search'
import detail from './detail'
import addshopcart from './addshopcart'
import trade from './trade'

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
        home,user,search,detail,addshopcart,trade
    }
})
export default store