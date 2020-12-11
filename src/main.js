import Vue from "vue";
import App from "./App.vue";
import Paginate from 'vuejs-paginate'

Vue.config.productionTip = false;
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

import './assets/tailwind.css';

Vue.use(VueMaterial)
Vue.component('paginate', Paginate)
new Vue({
  render: h => h(App)
}).$mount("#app");
