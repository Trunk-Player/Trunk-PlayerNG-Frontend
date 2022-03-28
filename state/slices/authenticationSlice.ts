import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Axios from "utils/axios";
import type { AppState } from "../store";
import { retreiveCurrentUser } from "./userSlice";
import { refreshAuthToken } from "lib/auth/authentication";

import { AuthenticationState } from "types/state/AuthenticationState";
import { ResponseLogin } from "types/api/responses/ResponseLogin";
import { ResponseRefreshToken } from "types/api/responses/ResponseRefreshToken";

interface LoginParams {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "authentication/loginUser",
  async ({ email, password }: LoginParams, { dispatch }) => {
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

    const data = response.data;

    if (data.access_token) {
      dispatch(retreiveCurrentUser({ accessToken: data.access_token }));
    }

    return data;
  }
);

export const refreshToken = createAsyncThunk(
  "authentication/refreshToken",
  async () => {
    return refreshAuthToken();
  }
);

const initialState: AuthenticationState = {
  authenticated: false,
  authenticationLoading: false,
  authenticationError: undefined,
  accessToken: undefined,
  accessTokenExpiration: undefined,
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    handleTokenRefresh: (
      state,
      { payload }: PayloadAction<ResponseRefreshToken>
    ) => {
      state.authenticationLoading = false;

      if (payload.access_token) {
        state.authenticated = true;
        state.authenticationError = undefined;
        state.accessToken = payload.access_token;
        state.accessTokenExpiration = payload.access_token_expiration;
      } else {
        state.authenticated = false;
        state.authenticationError =
          "Did not receive an access token from the api server.";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.authenticated = false;
      state.authenticationLoading = true;
      state.authenticationError = undefined;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.authenticationLoading = false;

      if (payload.access_token) {
        state.authenticated = true;
        state.authenticationError = undefined;
        state.accessToken = payload.access_token;
        state.accessTokenExpiration = payload.access_token_expiration;
      } else {
        state.authenticated = false;
        state.authenticationError =
          "Did not receive an access token from the api server.";
      }
    });
    builder.addCase(loginUser.rejected, (state, payload) => {
      state.authenticated = false;
      state.authenticationLoading = false;
      state.authenticationError = payload.error.message;
    });
    builder.addCase(refreshToken.pending, (state) => {
      state.authenticated = false;
      state.authenticationLoading = true;
      state.authenticationError = undefined;
    });
    builder.addCase(refreshToken.fulfilled, (state, { payload }) => {
      state.authenticationLoading = false;

      if (payload.access_token) {
        state.authenticated = true;
        state.authenticationError = undefined;
        state.accessToken = payload.access_token;
        state.accessTokenExpiration = payload.access_token_expiration;
      } else {
        state.authenticated = false;
        state.authenticationError =
          "Did not receive an access token from the api server.";
      }
    });
    builder.addCase(refreshToken.rejected, (state, payload) => {
      state.authenticated = false;
      state.authenticationLoading = false;
      state.authenticationError = payload.error.message;
    });
  },
});

export const { handleTokenRefresh } = authenticationSlice.actions;

export const selectIsAuthenticated = (state: AppState) =>
  state.authentication.authenticated;

export const selectIsAuthenticationLoading = (state: AppState) =>
  state.authentication.authenticationLoading;

export const selectAuthenticationError = (state: AppState) =>
  state.authentication.authenticationError;

export default authenticationSlice.reducer;
