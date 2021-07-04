import Vue from 'vue';
import VueRouter from 'vue-router';
import Statistiques from '../components/Statistiques.vue';

Vue.use(VueRouter);

/**
 * Router of the application. Links components to paths and redirects in a SPA fashion.
 */
const routes = [

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
