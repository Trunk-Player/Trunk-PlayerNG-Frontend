import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "types/state/UserState";
import { User } from "types/User";
import type { AppState } from "../store";

const initialState: UserState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (_builder) => {},
});

export const { setCurrentUser } = userSlice.actions;

export const selectCurrentUser = (state: AppState) => state.user.currentUser;

export default userSlice.reducer;
