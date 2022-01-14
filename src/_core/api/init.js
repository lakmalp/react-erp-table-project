import axios from "axios"

export default function api() {
  const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true
  })

  api.interceptors.request.use(function (request) {
    request.headers.common['Content-Type'] = 'application/json';
    request.headers.common['Accept'] = 'application/json';
    return request;
  }, function (error) {
    return Promise.reject(error);
  });

  axios.interceptors.response.use(
    res => res,
    err => {
      if (err.response.status === 404) {
        throw new Error(`${err.config.url} not found`);
      }

      if (err.response.status === 401) {
        // auth_api_logout()
      }

      throw err;
    }
  );

  return api
}