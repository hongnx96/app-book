// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
//import VueResource from 'vue-resource';
import VueValidate from 'vuelidate';
import { BootstrapVue } from 'bootstrap-vue';

import App from './App';
import router from './router/index';
import store from './store/index';

Vue.config.productionTip = false;

Vue.use(VueValidate);
Vue.use(BootstrapVue);
//Vue.use(VueResource);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
