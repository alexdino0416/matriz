import Vue from 'vue';
import App from './App.vue';
import VeeValidate from 'vee-validate';
import Navbar from "./Components/Navbar.vue";
import OrderCard from "./Components/OrderCard.vue";

Vue.component("navbar", Navbar);
Vue.component("order-card", OrderCard);
Vue.use(VeeValidate);

new Vue({
  el: '#app',
  render: h => h(App)
})
