import { doLogout } from "state/slices/userSlice";
import store from "state/store";
import { AccessTokenRefresh } from "types/api/custom/AccessTokenRefresh";
import { RefreshAuthTokenResults } from "types/lib/auth/RefreshAuthTokenResults";
import Axios from "utils/axios";

export const isLoggedIn = async (): Promise<boolean> => {
  const currentToken = store.getState().user.authenticationToken;
  if (!currentToken) {
    return false;
  }

  try {
    const verifyCall = await Axios.post("/auth/token/verify/", {
      token: currentToken.accessToken,
    });

    console.log("Verify", verifyCall);

    if (verifyCall.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
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

    console.log("Logout", logoutCall);

    if (logoutCall.status === 200) {
      store.dispatch(doLogout());
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

    console.log("Refresh", refreshCall);

    if (refreshCall.status === 200) {
      return {
        isSuccessful: true,
        authToken: {
          accessToken: refreshCall.data.access,
          expiration: new Date(refreshCall.data.access_token_expiration),
        },
      };
    } else {
      return { isSuccessful: false };
    }
  } catch {
    return { isSuccessful: false };
  }
};
