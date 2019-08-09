import Vue from 'vue';
import App from './App.vue';
import Navbar from "./Components/Navbar.vue";
import OrderCard from "./Components/OrderCard.vue";

Vue.component("navbar", Navbar);
Vue.component("order-card", OrderCard);

new Vue({
  el: '#app',
  render: h => h(App)
})
