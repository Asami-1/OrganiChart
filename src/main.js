import Vue from 'vue';
import { firestorePlugin } from 'vuefire';
import router from './router';
import App from './App.vue';
import store from './store';


Vue.config.productionTip = false;
Vue.use(firestorePlugin);

/**
 * Instanciate the application. The router helps managing the views and the path, the store is local database.
 * 
 */
new Vue({
  el: '#app',
  router,
  render: (h) => h(App),
  store,

  /**
   * update du store à la création
   */
  created() {
    store.dispatch('updateStore');


  },
}).$mount('#app');

