import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/module1/',
      name: '/',
      component: () => import(/* webpackChunkName: "module1-home" */ '@module1/views/Home.vue')
    },
    {
      path: '/module1/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "module1-home" */ '@module1/views/Home.vue')
    },
    {
      path: '/module1/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "module1-about" */ '@module1/views/About.vue')
    },
    {
      path: '/module1/*',
      redirect: { name: 'home' }
    }
  ]
});
