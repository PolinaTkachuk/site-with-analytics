import Vuex from 'vuex'
import axios from "axios";
import router from "@/router";

export const AuthModule = {
    state: () => ({
        status: '',
        token: localStorage.getItem('access_token') || '',
        user : {
            id:'',
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
                axios.post('http://diploma.local:8000/api/login', {user})
                    .then(response=>{
                        console.log("AUTHHHHHHHHHHHHH")
                        const token = response.data.token //получаем токен от сервера
                        //получаем юзера из тех данных, что вводил пользователь и лежат на сервере (РЕАЛИЗУЕМ из БД)
                        const user = response.data.user
                        // Храним полученный токен в localStorage
                        localStorage.setItem('access_token', token)
                        //console.log(JSON.parse(localStorage.getItem('access_token')))
                        axios.defaults.headers.common['Authorization'] = token
                        commit('setUserSuccess', token, user)
                        resolve(response)
                    })
            })//отлавливаем ошибки - меняем статус удаляем токен
                .catch (error =>{
                    console.log(error)
                    localStorage.removeItem('access_token')
                    commit('setStatusError', error)
                })
        },
        async UpdateUsers({state, commit}, user) {
            try {
                //const response = await axios.get('https://localhost:8080/AuthUsers', {user})
                //let user=   response.data.user
                //токен сохраняем тому же пользователю с новыми данными юзера
                let token = localStorage.getItem('access_token')
                commit('setUpdateUsers', user, token)

                console.log(token)
                console.log(user)
            } catch (e) {
                console.log(e)
            }
        },
        //проброс токена
        initApi(){
            // start request
            const api = axios.create();
            api.interceptors.request.use(config => {
                if(localStorage.getItem('access_token')){
                    config.headers = {
                        'authorization': ` Bearer ${localStorage.getItem('access_token')}`
                    };
                }
                return config;
                },
                error =>{})

            // end request
            api.interceptors.request.use(config => {
                if(localStorage.getItem('access_token')){
                    config.headers = {
                        'authorization': ` Bearer ${localStorage.getItem('access_token')}`
                    };
                }
                return config;
            }, error =>{
                if(error.response.status === 401){
                    router.push('/AuthUsers')
                }

            })

            this.api=api;
        },
    },
    namespaced: true
}
