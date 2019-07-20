import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/myself/login.vue"
import Register from "./views/myself/register.vue"
import Forgetpwd from "./views/myself/forgetpwd.vue"
import Yz from "./components/myself/Yz.vue"
import Xg from "./components/myself/Xg.vue"
import Myself from "./views/myself/myself.vue"
import Xq from "./views/activity/Xq.vue";
import Bm from "./views/activity/Bm.vue";
import Hd from "./views/activity/Hd.vue"

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children:[
        {
          path:'/myself',
          name:'Myself',
          component:Myself
        },
        {
          path:"/hd",
          name:"Hd",
          component:Hd
        }
      ]
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'/register',
      name:'Register',
      component:Register
    },
    {
      path:'/forgetpwd',
      redirect:'/yz',
      component:Forgetpwd,
      children:[
        {
          path:'/yz',
          name:'Yz',
          component:Yz
        },
        {
          path:'/xg',
          name:'Xg',
          component:Xg
        }
      ]
    },
    {
      path:"/xq",
      name:"Xq",
      component:Xq
    },
    {
      path:"/bm",
      name:"Bm",
      component:Bm
    }
    
  ]
});
