import axios from "axios";
import router from "@/router";


export const registerUsersModule = {
    state: () => ({
        status: '',
        token: localStorage.getItem('access_token') || '',
        user : {
           /* id:'',
            login:'',
            password:'',
            email:'',

            */
        }
    }),
    getters: {
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
        setUserSuccess(state, token, id){
            state.status = 'success'
            state.token = token
            state.user.id = id
        },
        setUserId(state, id){
            state.user.id = id
        }
    },
    actions: {
        Register({commit}, user) {
            console.log("1REGISTR")
            return new Promise((resolve, reject) => {
                commit('setStatusRequest');
                axios.post('http://diploma.local:8000/api/signup', {
                    user: user
                })
                    .then(response => {
                        console.log(response.data);
                        alert('SUCCESS');
                        //return;
                        let convert_response = JSON.parse(JSON.stringify(response.data));

                        let token = convert_response.access_token; //получаем токен от тела ответа от сервера
                        const id = convert_response.id;
                        console.log(convert_response.id);
                        console.log(token);

                        localStorage.setItem('access_token', token);//устанавливаем токен
                        localStorage.setItem('id', id);//устанавливаем id в стор, чтобы в profile изменять данные по id
                        axios.defaults.headers.common['Authorization'] = token
                        commit('setUserSuccess', token, id); //заносим id в юзера
                        commit('setUserId', id);
                        router.push('/main');

                    })
            })//отлавливаем ошибки - меняем статус удаляем токен
                .catch (error =>{
                    console.log(error)
                    console.error(error.response.data);
                    localStorage.removeItem('access_token')
                    localStorage.removeItem('id')
                    commit('setStatusError', error)
                })
        }
    },

    namespaced: true
}
