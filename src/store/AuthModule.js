import Vuex from 'vuex'
import axios from "axios";

export const AuthModule = {
    state: () => ({
        status: '',
        token: localStorage.getItem('token') || '',
        user : {
            id:'',
            login:'',
            password:'',
            email:'',
        }
    }),
    getters: {
        isLoggedIn(state){
            return state => !!state.token
        },
        getLogin: state => {
            return state.user.login;
        },
        getPassword: state => {
            return state.user.password;
        },
        getEmail: state => {
            return state.user.email;
        },
    },
    mutations: {
        setStatusRequest(state){
            state.status = 'loading'
        },
        setStatusError(state){
            state.status = 'error'
        },
        //успешно полученны данные
        setUserSuccess(state, token, user){
            state.status = 'success'
            state.token = token
            state.user = user
        },
        setUpdateUsers(state,user, token){
            state.status = 'success'
            state.user = user
            state.token = token
        },

    },
    actions: {
        signIn({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('setStatusRequest');
                axios.post('https://localhost:8080/AuthUsers', {user})
                    .then(response=>{
                        const token = response.data.token //получаем токен от тела ответа от сервера
                        //получаем юзера из тех данных, что вводил пользователь и лежат на сервере (РЕАЛИЗУЕМ из БД)
                        const user = response.data.user
                        localStorage.setItem('token', token)
                        commit('setUserSuccess', token, user)
                        resolve(response)
                    })
            })//отлавливаем ошибки - меняем статус удаляем токен
                .catch (error =>{
                    console.log(error)
                    localStorage.removeItem('token')
                    commit('setStatusError', error)
                })
        },
        async UpdateUsers({state, commit}, user) {
            try {
                //const response = await axios.get('https://localhost:8080/AuthUsers', {user})
                //let user=   response.data.user
                //токен сохраняем тому же пользователю с новыми данными юзера
                let token = localStorage.getItem('token')
                commit('setUpdateUsers', user, token)

                console.log(token)
                console.log(user)
            } catch (e) {
                console.log(e)
            }
        },

    },
    namespaced: true
}
