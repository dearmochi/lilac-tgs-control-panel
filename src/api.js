import Axios from 'axios';
import store, { logout } from './store';

Axios.interceptors.response.use(undefined, error => {
  // 401 in TGS means something went wrong with auth (bad token/expired),
  // boot them back to /login
  if (!!error.response && error.response.status === 401) {
    sessionStorage.removeItem("bearerToken");
    sessionStorage.removeItem("bearerTokenExpiry");
    store.dispatch(logout());
  }
  return Promise.reject(error);
});