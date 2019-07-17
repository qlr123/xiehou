import Vue from "vue";
import App from "./App.vue";
import Vant from "vant";
import "vant/lib/index.css";
import router from "./router";
import store from "./store";
import { Toast } from "vant";

Vue.config.productionTip = false;
Vue.use(Vant);
Vue.use(Toast);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
