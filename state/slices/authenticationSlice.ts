import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "utils/axios";
import type { AppState } from "../store";
import { AuthenticationState } from "types/state/AuthenticationState";
import { LoginResponse } from "types/api/custom/LoginResponse";
import { setCurrentUser } from "./userSlice";

interface LoginParams {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "authentication/loginUser",
  async ({ email, password }: LoginParams, { dispatch }) => {
    const response = await Axios.post<LoginResponse>(
      "/auth/login/",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    const data = response.data;

    if (data.user) {
      dispatch(setCurrentUser(data.user));
    }

    return data;
  }
);

const initialState: AuthenticationState = {
  authenticated: false,
  authenticationLoading: false,
  authenticationError: undefined,
  expiration: undefined,
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      state.authenticated = payload;
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

      if (payload.user) {
        state.authenticated = true;
        state.authenticationError = undefined;
      } else {
        state.authenticated = false;
        state.authenticationError =
          "Did not receive a user object from the server.";
      }
    });
    builder.addCase(loginUser.rejected, (state, payload) => {
      state.authenticated = false;
      state.authenticationLoading = false;
      state.authenticationError = payload.error.message;
    });
  },
});

// export const {} = authenticationSlice.actions;

export const selectIsAuthenticated = (state: AppState) =>
  state.authentication.authenticated;

export const selectIsAuthenticationLoading = (state: AppState) =>
  state.authentication.authenticationLoading;

export const selectAuthenticationError = (state: AppState) =>
  state.authentication.authenticationError;

export default authenticationSlice.reducer;
