import store from "state/store";
import { AccessTokenRefresh } from "types/api/custom/AccessTokenRefresh";
import { RefreshAuthTokenResults } from "types/lib/auth/RefreshAuthTokenResults";
import Axios from "utils/axios";

export const isLoggedIn = (): boolean => {
  const isAuthenticated = store.getState().authentication.authenticated;
  console.log("isAuthenticated", isAuthenticated);
  return isAuthenticated;
};

export const getAccessToken = (): string | undefined => {
  const token = store.getState().user.authenticationToken?.accessToken;
  if (token) {
    return token;
  } else {
    return undefined;
  }
};

export const apiLogout = async (): Promise<boolean> => {
  try {
    const logoutCall = await Axios.post<AccessTokenRefresh>(
      "/auth/logout/",
      {},
      {
        withCredentials: true,
      }
    );

    if (logoutCall.status === 200) {
      //store.dispatch(doLogout());
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
};

export const refreshAuthToken = async (): Promise<RefreshAuthTokenResults> => {
  try {
    const refreshCall = await Axios.post<AccessTokenRefresh>(
      "/auth/token/refresh/",
      {},
      {
        withCredentials: true,
      }
    );

    if (refreshCall.status === 200) {
      return {
        isSuccessful: true,
        authToken: {
          accessToken: refreshCall.data.access,
          //expiration: refreshCall.data.access_token_expiration,
        },
      };
    } else {
      return { isSuccessful: false };
    }
  } catch {
    return { isSuccessful: false };
  }
};
