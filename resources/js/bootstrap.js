import Vue from 'vue';
import axios from 'axios';
import VueRouter from 'vue-router';
import Form from './utilities/Form';



window.Vue = Vue;
Vue.use(VueRouter);
/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = axios;

window.axios.defaults.baseURL = process.env.APP_URL;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

window.axios.defaults.withCredentials = true;

window.Form = Form;