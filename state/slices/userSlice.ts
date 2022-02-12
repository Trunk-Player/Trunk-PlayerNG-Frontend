import { APIUser } from "../../types/api/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "types/state/UserState";
import { User } from "types/User";
import type { AppState } from "../store";
import { AuthenticationToken } from "types/api/custom/AuthenticationToken";

const initialState: UserState = {
  currentUser: null,
  authenticationToken: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    setCurrentUserFromAPI: (state, action: PayloadAction<APIUser>) => {},
    setAuthenticationToken: (
      state,
      action: PayloadAction<AuthenticationToken>
    ) => {
      state.authenticationToken = action.payload;
    },
  },
  extraReducers: (_builder) => {},
});

export const { setCurrentUser, setAuthenticationToken } = userSlice.actions;

export const selectCurrentUser = (state: AppState) => state.user.currentUser;

export default userSlice.reducer;
