import Vuex from 'vuex'
import axios from "axios";
export const AuthModule = {
    state: () => ({
        status: '',
        token: localStorage.getItem('access_token') || '',
        id: localStorage.getItem('id') || '',
        user : [{
          /*  id:'',
            name:'',
            password:'',
            email:'',

           */
        }]
    }),
    getters: {
        isLoggedIn(state){
            return state => !!state.token
        },
        getLogin(state){
            return state.user.name;
        },
        getPassword: state => {
            return state.user.password;
        },
        getEmail: state => {
            return state.user.email;
        },
        getById: state => {
            return state.user.id;
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
        setEmail(state, email){
            state.user.email = email;
        },
        setName(state, name){
            state.user.name = name;
        },
        setUserId(state, id){
            state.user.id = id
        }
    },
    actions: {
        signIn({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('setStatusRequest');
                axios.post('http://diploma.local:8000/api/login', {user})
                    .then(response=>{
                        console.log("AUTHHHHHHHHHHHHH")

                        let convert_response = JSON.parse(JSON.stringify(response.data));
                        const token =  convert_response.access_token;  //получаем токен от сервера
                        const id = convert_response.id;

                        console.log(convert_response.id);
                        console.log(token);

                        localStorage.setItem('access_token', token)
                        localStorage.setItem('id', id);//устанавливаем id в стор, чтобы в profile изменять данные по id

                        //console.log(JSON.parse(localStorage.getItem('access_token')))
                        axios.defaults.headers.common['Authorization'] = token
                        //commit('setUserSuccess', token, user)
                        commit('setUserId', id);
                        resolve(response)

                    })
            })//отлавливаем ошибки - меняем статус удаляем токен
                .catch (error =>{
                    console.log(error)
                    localStorage.removeItem('access_token')
                    commit('setStatusError', error)
                })
        },
        saveProfile({state, commit}, user) {
            return new Promise((resolve, reject) => {
                console.log("saveProfile");
                axios.post('http://diploma.local:8000/api/main/saveProfile', {user})
                        .then(response=>{
                                console.log("saveProfile");
                                let convert_response = JSON.parse(JSON.stringify(response.data));
                                //const token =  convert_response.access_token;  //получаем токен от сервера
                                //токен сохраняем тому же пользователю с новыми данными юзера
                                // let token = localStorage.getItem('access_token')
                                // commit('setUserSuccess', user, token)

                        })
            })
                .catch (error =>{
                    console.log(error)
                    commit('setStatusError', error)
                })

        },

       async getUser({commit, state},id) {
           {
               return new Promise((resolve, reject) => {
                axios.get('http://diploma.local:8000/api/main/profile',{
                    params:{id:id}
                    })
               .then(response => {

                   let convert_response=JSON.parse(JSON.stringify(response.data));
                   let user = convert_response;
                  // let token

                   console.log(convert_response.email);
                   commit('setEmail', convert_response.email)
                   commit('setName', convert_response.name);
               })
               }).catch(error => console.log(error))

           }
       },

    },
    namespaced: true,
}