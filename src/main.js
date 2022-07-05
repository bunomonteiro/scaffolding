import Vue from 'vue';
import App from './App.vue';

import routerFactory from './router';
import store from './store';

const router = routerFactory();

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
