import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/myself/login.vue";
import Register from "./views/myself/register.vue";
import Forgetpwd from "./views/myself/forgetpwd.vue";
import Yz from "./components/myself/Yz.vue";
import Xg from "./components/myself/Xg.vue";
import Myself from "./views/myself/myself.vue";
import Xq from "./views/activity/Xq.vue";
import Bm from "./views/activity/Bm.vue";
import Hd from "./views/activity/Hd.vue";
//zpy引入的start
import release from "./views/release/release.vue";
import addInfo from "./views/release/addInfo.vue";
import showInfo from "./components/showInfo.vue";
import favoredType from "./views/release/favoredType.vue";
//end

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children: [
        {
          path: "/myself",
          name: "Myself",
          component: Myself
        },
        {
          path: "/hd",
          name: "Hd",
          component: Hd
        },
        {
          path: "shouye",
          name: "shouye",
          component: () => import("./views/home/shouye.vue")
        },

        {
          path: "/",
          redirect: "/shouye"
        }
      ]
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/forgetpwd",
      redirect: "/yz",
      component: Forgetpwd,
      children: [
        {
          path: "/yz",
          name: "Yz",
          component: Yz
        },
        {
          path: "/xg",
          name: "Xg",
          component: Xg
        }
      ]
    },
    {
      path: "/xq",
      name: "Xq",
      component: Xq
    },
    {
      path: "/bm",
      name: "Bm",
      component: Bm
    },
    //zpy的路由start
    {
      path: "/favoredType",
      name: "favoredType",
      component: favoredType
    },
    {
      path: "/release",
      name: "release",
      component: release
    },
    {
      path: "/addInfo",
      name: "addInfo",
      component: addInfo,
      children: [
        {
          path: "showInfo",
          name: "showInfo",
          component: showInfo
        }
      ]
    },
    //end

    {
      path: "/shaixuan",
      name: "shaixuan",
      component: () => import("./views/home/filter.vue")
    },
    {
      path: "/dongtai",
      name: "dongtai",
      component: () => import("./views/home/dongtai.vue")
    },
    {
      path: "/myaction",
      name: "myaction",
      component: () => import("./views/home/myaction.vue")
    },
    {
      path: "/detail",
      name: "detail",
      component: () => import("./views/home/detail.vue")
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ]
});
