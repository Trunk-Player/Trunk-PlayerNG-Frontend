import Axios from "@/utils/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { UserState } from "@/types/state/UserState";
import type { User } from "@/types/api/User";
import type { AppState } from "../store";

interface GetUserParams {
  accessToken?: string;
}

export const retreiveCurrentUser = createAsyncThunk(
  "user/retreiveCurrentUser",
  async ({ accessToken }: GetUserParams) => {
    const response = await Axios.get<User>("/auth/user/", {
      withCredentials: true,
      headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : undefined,
    });

    const data = response.data;

    return data;
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(retreiveCurrentUser.fulfilled, (state, { payload }) => {
      state.currentUser = payload;
    });
  },
});

export const { setCurrentUser } = userSlice.actions;

export const selectCurrentUser = (state: AppState) => state?.user?.currentUser;

export default userSlice.reducer;
