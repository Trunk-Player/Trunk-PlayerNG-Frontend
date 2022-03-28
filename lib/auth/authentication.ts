import store from "state/store";
import { AccessTokenRefresh } from "types/api/custom/AccessTokenRefresh";
import { ResponseRefreshToken } from "types/api/responses/ResponseRefreshToken";
import Axios, { ServerAxios } from "utils/axios";

export const isLoggedIn = (): boolean => {
  const isAuthenticated = store.getState().authentication.authenticated;
  console.log("isAuthenticated", isAuthenticated);
  return isAuthenticated;
};

export const getAccessToken = (): string | undefined => {
  return store.getState().authentication.accessToken;
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

export const refreshServerTokens = async (
  accessToken: string,
  accessTokenExpiration: string,
  csrfToken: string
): Promise<void> => {
  const response = await ServerAxios.post<void>("/auth/savetoken", {
    accessToken,
    accessTokenExpiration,
    csrfToken,
  });

  if (response.status !== 200) {
    throw Error(
      "The frontend server was unable to save the tokens from the api."
    );
  }

  return response.data;
};

export const refreshAuthToken = async (): Promise<ResponseRefreshToken> => {
  const response = await Axios.post<ResponseRefreshToken>(
    "/auth/token/refresh-token/"
  );

  if (response.status !== 200) {
    throw Error("The server returned an error while refreshing your login.");
  }

  return response.data;
};
