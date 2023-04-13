// import { showLoadingToast, showFailToast, showSuccessToast } from 'vant';
import { Toast } from 'vant';
import { getToken, clearToken } from '@/utils/auth';
import { encryptByCBC, decryptByCBC } from '@/utils/secret';
import Request from './axios';

const ACCESS_TOKEN = process.env.VUE_APP_ACCESS_TOKEN_KEY;
Toast.allowMultiple();

export default new Request({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 1000 * 60 * 2,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  // 实例级拦截器
  interceptors: {
    // 实例级请求拦截器
    requestInterceptor: (config) => {
      // 打开全局请求loading
      if (config.customs?.isLoading) {
        // eslint-disable-next-line no-param-reassign
        config.customs.loadingInstance = Toast.loading({
          duration: 0,
          forbidClick: true,
          message: config.customs?.loadingText || '数据加载中...',
        });
      }
      // 请求是否加密
      if (process.env.VUE_APP_IS_SECRET === 1 || process.env.VUE_APP_IS_SECRET === '1') {
        // eslint-disable-next-line no-param-reassign
        config.data = encryptByCBC({ message: JSON.stringify(config.data) });
      }
      // 防止缓存，给get请求加上时间戳
      if (config.method === 'get' || config.method === 'GET') {
        // eslint-disable-next-line no-param-reassign
        config.params = { ...config.params, t: new Date().getTime() };
      }
      const token = getToken();
      if (token) {
        // eslint-disable-next-line no-param-reassign
        config.headers[ACCESS_TOKEN] = token;
      }
      return config;
    },
    // 实例级响应拦截器
    responseInterceptor: (response) => {
      // 关闭打开全局请求loading
      if (response.config.customs?.isLoading) {
        response.config?.customs?.loadingInstance.clear();
      }
      // 请求是否加密
      if (process.env.VUE_APP_IS_SECRET === Number(process.env.VUE_APP_IS_SECRET)) {
        // eslint-disable-next-line no-param-reassign
        response.data = JSON.parse(decryptByCBC({ message: response.data }));
      }
      if (response.status === 203) {
        // window.$notification({ title: '登录过期', message: response.data.message, type: 'error' });
        Toast.fail({ message: `登录过期：${response.data.message}` });
        clearToken();
      } else if (response.data?.status === '403') {
        Toast.fail({ message: `无权访问，地址：${response.config.url}` });
      } else if (response.data?.success === false) {
        Toast.fail({
          message: `${process.env.NODE_ENV === 'development' ? `接口返回失败：${response.config.url}` : '操作失败'}，${
            response.data.message
          }`,
        });
      }
      // 接口请求成功提示
      if (response.data?.success && response.config?.customs?.successTip) {
        Toast.success({ message: `${response.config.customs.successTip}` });
      }
      return response.data;
    },
    // 请求响应失败拦截器
    responseInterceptorCatch: (error) => {
      if (error.config.customs?.isLoading) {
        error.config?.customs?.loadingInstance.clear();
      }
      Toast.fail({
        message: `网络请求错误：${error.config.url}，${error.message}`,
      });
      return Promise.reject(error);
    },
  },
});
