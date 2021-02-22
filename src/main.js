import Vue from 'vue';
import { firestorePlugin } from 'vuefire';
import router from './router';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(firestorePlugin);

new Vue({
  el: '#app',
  router,
  render: (h) => h(App),
}).$mount('#app');
