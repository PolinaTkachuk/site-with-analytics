import axios from "axios";

export const registerUsersModule = {
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
    },
    actions: {
       // async fetchFormRegister( commit, user) {
       //     try {
        register({commit}, user) {
                return new Promise((resolve, reject) => {
                    commit('setStatusRequest');
                    let response = axios.post('https://localhost:8080/RegisterUsers', {user})
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
        }
    },
    namespaced: true
}
/*.finally {
                commit('setStatusRequest', 'loading');
            }*/


