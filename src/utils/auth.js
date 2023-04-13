import storage from 'store';

const TOKEN_KEY = process.env.VUE_APP_ACCESS_TOKEN_KEY;

const isLogin = () => !!storage.get(TOKEN_KEY);

const getToken = () => storage.get(TOKEN_KEY);

const setToken = (token) => {
  storage.set(TOKEN_KEY, token);
};

const clearToken = () => {
  storage.remove(TOKEN_KEY);
};

export {
  isLogin, getToken, setToken, clearToken,
};
