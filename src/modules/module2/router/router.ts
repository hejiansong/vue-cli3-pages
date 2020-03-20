import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/module2/',
      name: 'home',
      component: () => import(/* webpackChunkName: "module2-home" */ '@module2/views/Home.vue'),
    },
    {
      path: '/module2/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "module2-home" */ '@module2/views/Home.vue'),
    },
    {
      path: '/module2/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "module2-about" */ '@module2/views/About.vue'),
    },
  ],
});
