import './bootstrap';
import routes from './routes';
import AppView from './views/app.vue';
import LoginView from './auth/login.vue';
import RegisterView from './auth/register.vue'


new Vue({
    el:'#app',
    router: routes,
    components: {AppView, LoginView, RegisterView},
});
