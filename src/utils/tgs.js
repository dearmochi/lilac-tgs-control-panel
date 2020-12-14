import Axios from 'axios';

const defaultHeaders = () => ({
  "Api": process.env.LILAC_TGS_API_VERSION,
  "Authorization": "Bearer " + sessionStorage.getItem("bearerToken"),
});

/**
 * Sends a GET request to the TGS API.
 * @param {string} endpoint - The API endpoint.
 * @param {Object} headersOverride - Overrides the default headers if provided.
 */
const get = (endpoint = "", headersOverride) => {
  return Axios.get(process.env.LILAC_TGS_API_URL + endpoint, {
    headers: { ...defaultHeaders(), ...headersOverride },
  });
};

/**
 * Sends a POST request to the TGS API.
 * @param {string} endpoint - The API endpoint.
 * @param {Object} headersOverride - Overrides the default headers if provided.
 */
const post = (endpoint = "", headersOverride) => {
  return Axios.post(process.env.LILAC_TGS_API_URL + endpoint, {}, {
    headers: { ...defaultHeaders(), ...headersOverride },
  });
};

// Export
const Tgs = { get: get, post: post };
export default Tgs;