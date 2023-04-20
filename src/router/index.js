import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      title: '首页', // 页面标题
      keepAlive: false, // 是否缓存
      auth: true, // 是否验证登录
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/user/login/index.vue'),
    meta: {
      title: '登录', // 页面标题
      keepAlive: false, // 是否缓存
      auth: false, // 是否验证登录
    },
  },
  {
    path: '/wxAuthErr',
    name: 'wxAuthErr',
    component: () => import('@/views/error/wxAuthErr.vue'),
    meta: {
      title: '认证失败',
      keepAlive: false,
      auth: false,
    },
  },
  {
    path: '/commonError',
    name: 'commonError',
    component: () => import('@/views/error/commonError.vue'),
    meta: {
      title: '错误',
      keepAlive: false,
      auth: false,
    },
  },
  {
    path: '*',
    component: () => import('@/views/error/notFound.vue'),
    meta: {
      title: 'notFound',
      keepAlive: false,
      auth: false,
    },
  },
];

const createRouter = () => new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;
