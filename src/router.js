import { createRouter, createWebHistory } from 'vue-router';
import Registration from '@/components/Registration.vue';
import Movies from "@/components/Movies.vue";
import Login from "@/components/Login.vue";


const routes = [
    {
        path: '/registration',
        name: 'Registration',
        component: Registration
    },
    {
        path: '/movies',
        name: 'Movies',
        component: Movies
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;


