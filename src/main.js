import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'

const token = localStorage.getItem('token')
/*
if (token) {
    Vue.prototype.Axios.defaults.headers.common['Authorization'] = token
}*/



createApp(App).use(store).use(router).mount('#app')
