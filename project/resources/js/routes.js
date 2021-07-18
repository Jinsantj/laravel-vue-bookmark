import VueRouter from 'vue-router';
import category from './models/category';

let routes = [

    {
        path: '/',
        component: require('./views/Home.vue').default
    },

    {
        path: '/categories/:id',
        name: 'Category',
        component: require('./views/Category.vue').default,
        props: true
    }
];

export default new VueRouter({
    history,
    routes,
});