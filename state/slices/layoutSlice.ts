import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LayoutState } from "types/state/LayoutState";
import type { AppState } from "../store";

const initialState: LayoutState = {
  mobileNavigationOpen: false,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleMobileNavbar: (state) => {
      state.mobileNavigationOpen = !state.mobileNavigationOpen;
    },
    setMobileNavbarOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileNavigationOpen = action.payload;
    },
  },
  extraReducers: (_builder) => {},
});

export const { toggleMobileNavbar, setMobileNavbarOpen } = layoutSlice.actions;

export const selectMobileNavbarOpen = (state: AppState) =>
  state.layout.mobileNavigationOpen;

export default layoutSlice.reducer;
