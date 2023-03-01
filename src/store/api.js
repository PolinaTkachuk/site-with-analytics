//проброс токена
import axios from "axios";

// start request
const api = axios.create();
api.interceptors.request.use(config => {
        if(localStorage.getItem('access_token')){
            config.headers.authorization=` Bearer ${localStorage.getItem('access_token')}`
        }
        return config;
    },
    error =>{})

// end request
api.interceptors.request.use(config => {
    if(localStorage.getItem('access_token')){
        config.headers.authorization=` Bearer ${localStorage.getItem('access_token')}`

    }
    return config;
}, error =>{
    if(error.response.status === 401){
        this.$router.push('/auth');
    }

})

this.api=api;
