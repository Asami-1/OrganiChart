import Vue from 'vue';
import { firestorePlugin } from 'vuefire';
import router from './router';
import App from './App.vue';
import store from './store';


Vue.config.productionTip = false;
Vue.use(firestorePlugin);

new Vue({
  el: '#app',
  router,
  render: (h) => h(App),
  store,


  created() {
    setTimeout(() => {
      store.dispatch('updateStore');

    }, 5000);

  },
}).$mount('#app');

