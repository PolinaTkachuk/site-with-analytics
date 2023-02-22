import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/*
const token = localStorage.getItem('token')

if (token) {
    vue.prototype.axios.defaults.headers.common['Authorization'] = token
}
*/


createApp(App).use(store).use(router).mount('#app')
