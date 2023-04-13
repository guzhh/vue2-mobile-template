import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/plugins';
import '@/utils/debug';
import '@/router/guard/index';
import { setOrgEmitter } from '@/utils/scan-code-listener';
import '@/assets/style/global.less';
// import '@babel/polyfill';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

// 监听扫码
window.$readQRcodeInfo = (val) => {
  setOrgEmitter(val);
};
