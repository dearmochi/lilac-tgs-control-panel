import store, { login as storeLogin, logout as storeLogout } from '../store.js';
import Tgs from './tgs';

/**
 * Attempts to authenticate with TGS with the given username and password.
 * @param {*} username The username.
 * @param {*} password The plaintext password.
 */
const login = (username, password) => {
  return Tgs.post("", {}, { "Authorization": "Basic " + btoa(username + ":" + password) })
    .then(response => {
      sessionStorage.setItem("bearerToken", response.data.bearer);
      sessionStorage.setItem("bearerTokenExpiry", Date.parse(response.data.expiresAt));

      return getUser();
    })
    .then(response => store.dispatch(storeLogin(response.data)))
    .catch(error => {
      sessionStorage.removeItem("bearerToken");
      sessionStorage.removeItem("bearerTokenExpiry");

      message.error("Failed to log in. (" + error.response.status + ")");
      throw error;
    });
};

/**
 * Returns the current user from TGS.
 */
const getUser = () => Tgs.get("User");

/**
 * Clears out any authentication info from the browser.
 */
const logout = () => {
  sessionStorage.removeItem("bearerToken");
  sessionStorage.removeItem("bearerTokenExpiry");
  store.dispatch(storeLogout());
};

// Export
const Auth = { login: login, logout: logout, user: getUser };
export default Auth;