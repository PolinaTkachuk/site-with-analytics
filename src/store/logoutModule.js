import Vuex from 'vuex'
import axios from "axios";

export const logoutModule = {
    state: () => ({
        status: '',
        token: localStorage.getItem('token') || '',
    }),
    mutations: {
        setLogout(state) {
            state.status = ''
            state.token = ''
        },
    },
    actions: {
        Logout({commit}) {
            return new Promise(() => {
                commit('setLogout')
                localStorage.removeItem('token')
                console.log("token removed")
            })
        }
    },
    namespaced: true
}
