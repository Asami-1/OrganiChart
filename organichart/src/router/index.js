import Vue from 'vue';
import VueRouter from 'vue-router';
import Statistiques from '../components/Statistiques.vue';
import Home from '../components/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/Statistiques',
    name: 'Statistiques',
    component: Statistiques,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
