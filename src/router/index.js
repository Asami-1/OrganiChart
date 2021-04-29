import Vue from 'vue';
import VueRouter from 'vue-router';
import Statistiques from '../components/Statistiques.vue';

Vue.use(VueRouter);

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
