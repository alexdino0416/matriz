import Vue from 'vue';
import VeeValidate from 'vee-validate';
import { VTooltip } from 'v-tooltip';
import App from './App.vue';
import Navbar from "./components/Navbar.vue";
import OrderCard from "./components/OrderCard.vue";

Vue.directive('tooltip', VTooltip);
Vue.component("navbar", Navbar);
Vue.component("order-card", OrderCard);
Vue.use(VeeValidate);

new Vue({
  el: '#app',
  render: h => h(App)
})
