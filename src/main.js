import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import 'vue3-select/dist/vue3-select.css'
import vSelect from 'vue-select'

import store from './store.js'
import axios from 'axios'

// VUE-NUMERIC import qilish
// s

// Axios global sozlamalari
axios.defaults.baseURL = 'http://185.76.13.223:3084'
axios.defaults.headers.common['Content-Type'] = 'application/json'

// Tokenni localStorage'dan olish
const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

// Vue ilovasini yaratish
const app = createApp(App)

// Axios'ni global qilish
app.config.globalProperties.$axios = axios

// Global komponent sifatida qo'shish
app.component('v-select', vSelect)
// app.component('vue-numeric', VueNumeric)

app.use(store)
app.use(router).mount('#app')
