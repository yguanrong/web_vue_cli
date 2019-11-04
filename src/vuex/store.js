import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        precinctId: 31011511,
        precinctName: '高东镇'
    },
    mutations: {
        changePrecinctId(state, payload) {
            state.precinctId = payload
        },
        changePrecinctName(state, payload) {
            state.precinctName = payload
        }
    },
    actions: {
        changePrecinctId({commit}, payload) {
            commit('changePrecinctId', payload)
        },
        changePrecinctName({commit}, payload) {
            commit('changePrecinctName', payload)
        }
    }
})
