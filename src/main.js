import Vue from "vue";
import App from "./App.vue";
import Vant from "vant";

import "vant/lib/index.css";
import router from "./router";
import store from "./store";

import { Toast } from "vant";
import axios from "axios";
import qs from "qs";
import { Lazyload } from "vant";

Vue.config.productionTip = false;
Vue.use(Vant);
Vue.use(Toast);
Vue.use(axios);
Vue.use(qs);

Vue.use(Lazyload);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
