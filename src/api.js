import Axios from 'axios';
import Auth from './utils/authentication';

Axios.interceptors.response.use(undefined, error => {
  // 401 in TGS means something went wrong with auth (bad token/expired),
  // boot them back to /login
  if (!!error.response && error.response.status === 401) {
    Auth.logout();
  }
  return Promise.reject(error);
});