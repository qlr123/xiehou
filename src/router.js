import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/myself/login.vue"
import Register from "./views/myself/register.vue"
import Forgetpwd from "./views/myself/forgetpwd.vue"
import Yz from "./components/myself/Yz.vue"
import Xg from "./components/myself/Xg.vue"
import Myself from "./views/myself/myself.vue"
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
        }
      ]
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
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
    }
  ]
});
