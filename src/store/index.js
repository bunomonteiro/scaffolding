import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {},
    state: () => ({
        count: 0
    }),
    mutations: {
        increment(state) {
            state.count += 1;
        }
    },
    actions: {
        increment({ commit }) {
            commit('increment')
        }
    },
    getters: {
        count: (state) => state.count,
    },
})
