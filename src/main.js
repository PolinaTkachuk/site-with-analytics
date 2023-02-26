import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";

const token = localStorage.getItem('token')
if (token) {
    axios.defaults.headers.common['Authorization'] = token;
}
else {
    axios.defaults.headers.common['Authorization'] = null;
    /*if setting null does not remove `Authorization` header then try
      delete axios.defaults.headers.common['Authorization'];
    */
}
//установили для нашего токена заголовок Authorization в axios,
// чтобы наши запросы могли быть обработаны,
// со стороны сервера если токен потребуется.


/*
const httpClient = axios.create({
    baseURL: 'http://localhost:8080',
});
httpClient.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});

 */
createApp(App).use(store).use(router).mount('#app')




