import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { isLogin } from '@/utils/auth';
import store from '@/store';
import router, { resetRouter } from '../index';

const loginRoutePath = '/login';

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.meta?.auth) {
    if (isLogin()) {
      if (store.getters.userId) {
        next();
      } else {
        store.dispatch('GetInfo').then(() => {
          next();
        }).catch(() => {
          store.dispatch('Logout').then(() => {
            next({ path: loginRoutePath });
          });
        });
      }
    } else {
      resetRouter();
      next({ name: 'Login', replace: true, query: { ...to.query, redirectPath: to.path } });
    }
  } else {
    next();
  }
});

// 路由后置拦截器
router.afterEach((to) => {
  if (to.meta?.title) {
    document.title = `${process.env.VUE_APP_SYSTEM_NAME} - ${to.meta.title}`;
  } else {
    document.title = `${process.env.VUE_APP_SYSTEM_NAME}`;
  }
  NProgress.done(); // 完成进度栏
});
