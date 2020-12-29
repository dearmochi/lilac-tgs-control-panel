import api from '../api';

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
  return api.get(process.env.LILAC_TGS_API_URL + endpoint, {
    headers: { ...defaultHeaders(), ...headersOverride },
  });
};

/**
 * Sends a POST request to the TGS API.
 * @param {string} endpoint - The API endpoint.
 * @param {Object} payload - The data to POST.
 * @param {Object} headersOverride - Overrides the default headers if provided.
 */
const post = (endpoint = "", payload = {}, headersOverride) => {
  return api.post(process.env.LILAC_TGS_API_URL + endpoint, payload, {
    headers: { ...defaultHeaders(), ...headersOverride },
  });
};

/**
 * Sends a PUT request to the TGS API.
 * @param {string} endpoint - The API endpoint.
 * @param {Object} payload - The data to PUT.
 * @param {Object} headersOverride - Overrides the default headers if provided.
 */
const put = (endpoint = "", payload = {}, headersOverride) => {
  return api.put(process.env.LILAC_TGS_API_URL + endpoint, payload, {
    headers: { ...defaultHeaders(), ...headersOverride },
  });
};

/**
 * Sends a PATCH request to the TGS API.
 * @param {string} endpoint - The API endpoint.
 * @param {Object} payload - The data to PATCH.
 * @param {Object} headersOverride - Overrides the default headers if provided.
 */
const patch = (endpoint = "", payload = {}, headersOverride) => {
  return api.patch(process.env.LILAC_TGS_API_URL + endpoint, payload, {
    headers: { ...defaultHeaders(), ...headersOverride },
  });
};

/**
 * Sends a DELETE request to the TGS API.
 * @param {string} endpoint - The API endpoint.
 * @param {Object} headersOverride - Overrides the default headers if provided.
 */
const del = (endpoint = "", headersOverride) => {
  return api.delete(process.env.LILAC_TGS_API_URL + endpoint, {
    headers: { ...defaultHeaders(), ...headersOverride },
  });
};

// Export
const Tgs = { get: get, post: post, put: put, patch: patch, delete: del };
export default Tgs;

export const getUser = userId => Tgs.get("User/" + userId);