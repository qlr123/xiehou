import Vue from "vue";
import App from "./App.vue";
import Vant from "vant";
import "vant/lib/index.css";
import router from "./router";
import store from "./store";
//11
import { Toast } from "vant";
import axios from 'axios';
import qs from 'qs'

Vue.config.productionTip = false;
Vue.use(Vant);
Vue.use(Toast);
Vue.use(axios);
Vue.use(qs);
//111
// import axios from "axios"
// Vue.config.productionTip = false;
// Vue.use(Vant);
// Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
