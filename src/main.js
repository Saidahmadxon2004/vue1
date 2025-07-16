// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store.js';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import VueNumeric from 'vue3-numeric'
import 'vue-select/dist/vue-select.css'; // Fixed from vue3-select
import vSelect from 'vue-select';

axios.defaults.baseURL = 'http://185.76.13.223:3020';
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Set Authorization header if token exists
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Create Vue app
const app = createApp(App);
// app.component('vue-numeric', VueNumeric)
app.use(router);
app.use(store);

app.component('v-select', vSelect);

app.config.globalProperties.$axios = axios;
app.mount('#app');