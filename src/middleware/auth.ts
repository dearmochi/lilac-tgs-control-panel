import { AuthActionType, AuthDispatch } from '../store/auth';
import axios from './axios';

const logIn = (dispatch: AuthDispatch, username: string, password: string) => {
  if (!dispatch) {
    return;
  }

  axios.post('/', undefined, {
    auth: {
      username: username,
      password: password
    }
  })
    .then(response => {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data?.bearer;
      return axios.get('/User');
    })
    .then(response => {
      dispatch({type: AuthActionType.LoggedIn, payload: { id: response.data?.id, name: response.data?.name }});
    })
    .catch(error => {
      if (error.response?.status === 401) {
        alert('Bad credentials!');
      } else {
        console.log(error);
      }
    })
};

//
export {
  logIn
};

