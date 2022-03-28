import { retreiveCurrentUser } from "state/slices/userSlice";
import { handleTokenRefresh } from "state/slices/authenticationSlice";
import {
  getAccessToken,
  refreshAuthToken,
  refreshServerTokens,
} from "lib/auth/authentication";
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import store from "state/store";

const Axios = axios.create({
  baseURL: "https://panik.io/api",
  timeout: 10000,
  withCredentials: true,
});

const ServerAxios = axios.create({
  baseURL: "/api",
  timeout: 10000,
  withCredentials: true,
});

Axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const accessToken = getAccessToken();

    if (!config.headers) {
      config.headers = {};
    }

    config.headers["Accept"] = "application/json";

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Do something, call refreshToken() request for example;
        // return a request
        const response = await refreshAuthToken();
        if (response.access_token) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.access_token;
          store.dispatch(handleTokenRefresh(response));
          store.dispatch(
            retreiveCurrentUser({ accessToken: response.access_token })
          );
          refreshServerTokens(
            response.access_token,
            response.access_token_expiration,
            response.CSRF_TOKEN
          );
        }
        return Axios(error.config);
      }
      // if (error.response.status === ANOTHER_STATUS_CODE) {
      //   // Do something
      //   return Promise.reject(error.response.data);
      // }
    }
    return Promise.reject(error);
  }
);

export { ServerAxios };
export default Axios;
