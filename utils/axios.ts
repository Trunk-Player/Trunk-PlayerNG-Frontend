import { retreiveCurrentUser } from "state/slices/userSlice";
import { handleTokenRefresh } from "state/slices/authenticationSlice";
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import store from "state/store";
import * as appLib from "lib/app/appLib";
import { getAccessToken, refreshAuthToken } from "lib/auth/authentication";

const apiConfig: AxiosRequestConfig = {
  baseURL: appLib?.getAPIBaseUrl
    ? appLib.getAPIBaseUrl() ?? undefined
    : undefined,
  timeout: 10000,
  withCredentials: true,
};

const Axios = axios.create(apiConfig);
const refreshTokenAxios = axios.create(apiConfig);

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
        const response = await refreshAuthToken();
        if (response.access_token) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.access_token;
          store.dispatch(handleTokenRefresh(response));
          store.dispatch(
            retreiveCurrentUser({ accessToken: response.access_token })
          );
        }
        return Axios(error.config);
      }
    }
    return Promise.reject(error);
  }
);

const changeBaseApiUrl = (baseApiUrl: string) => {
  Axios.defaults.baseURL = baseApiUrl;
};

export { refreshTokenAxios, changeBaseApiUrl };
export default Axios;
