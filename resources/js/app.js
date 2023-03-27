require('./bootstrap');
// import BootstrapVue from 'bootstrap-vue';
import { createApp } from 'vue';
// import Vuex from 'vuex';
import App from './App.vue';

// import BootstrapVue from 'bootstrap-vue';
import BootstrapVue3 from 'bootstrap-vue-3';
// // import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import router from './router/index';
import VueAxios from 'vue-axios';
import axios from 'axios';
import { store } from './store/store';
// import '../assets/css/account.css';
// import "../assets/scss/app.scss"; 
// console.log(router.push);
// import '@resources/assets/js/pages/datatables.init.js';
const app = createApp(App);
// app.use(Vuex);
app.use(VueAxios, axios, BootstrapVue3);
app.use(store);
app.use(router)
app.config.globalProperties.$router = router.value;
app.mount('#app');