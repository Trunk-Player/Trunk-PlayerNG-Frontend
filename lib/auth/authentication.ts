import store from "state/store";
import { AccessTokenRefresh } from "types/api/custom/AccessTokenRefresh";
import { ResponseLogin } from "types/api/responses/ResponseLogin";
import { ResponseRefreshToken } from "types/api/responses/ResponseRefreshToken";
import Axios, { RefreshTokenAxios, ServerAxios } from "utils/axios";

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

export const doLogin = async (
  email: string,
  password: string
): Promise<ResponseLogin> => {
  const response = await Axios.post<ResponseLogin>(
    "/auth/token/",
    {
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );

  if (response.status !== 200) {
    throw Error(
      "The frontend server was unable to save the tokens from the api."
    );
  }

  return response.data;
};

export const doLogout = async (): Promise<void> => {
  const response = await Axios.post<void>("/auth/logout/", {
    withCredentials: true,
  });

  if (response.status !== 200) {
    throw Error("The frontend server was unable to logout from the api.");
  }

  return response.data;
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
  const response = await RefreshTokenAxios.post<ResponseRefreshToken>(
    "/auth/token/refresh-token/"
  );

  if (response.status !== 200) {
    throw Error("The server returned an error while refreshing your login.");
  }

  return response.data;
};
