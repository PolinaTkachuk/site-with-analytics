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
    },
    actions: {
       // async fetchFormRegister( commit, user) {
       //     try {
        Register({commit}, user) {
                console.log("1REGISTR")
                return new Promise( (resolve,reject) => {
                    commit('setStatusRequest');
                    //axios({url: 'https://localhost:8080/RegisterUsers', data: user, method: 'POST' })
                    axios.post('http://localhost:8000/RegisterUsers', {
                        user: user,
                        header: ("Access-Control-Allow-Origin: *"),
                    })
                        .then(response=>{
                            console.log("2REGISTR")
                            const token = response.data.token //получаем токен от тела ответа от сервера
                            //получаем юзера из тех данных, что вводил пользователь и лежат на сервере (РЕАЛИЗУЕМ из БД)
                            let user = response.data.user
                            localStorage.setItem('token', token)
                            commit('setUserSuccess', token, user)

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
