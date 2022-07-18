import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { AppState } from "state/store";

import type { AppNotification } from "types/AppNotification";

const appNotificationsAdapter = createEntityAdapter<AppNotification>({
  selectId: (notification) => notification.uniqueId,
});

export const appNotificationsSlice = createSlice({
  name: "appnotifications",
  initialState: appNotificationsAdapter.getInitialState(),
  reducers: {
    addOrUpdateAppNotification: appNotificationsAdapter.setOne,
    addOrUpdateAppNotifications(state, action) {
      appNotificationsAdapter.setAll(state, action.payload.appnotifications);
    },
    removeAppNotification: appNotificationsAdapter.removeOne,
  },
  // eslint-disable-next-line no-unused-vars
  extraReducers: (_builder) => {},
});

export const {
  addOrUpdateAppNotification,
  addOrUpdateAppNotifications,
  removeAppNotification,
} = appNotificationsSlice.actions;

export const appNotificationsSelectors =
  appNotificationsAdapter.getSelectors<AppState>(
    (state) => state.appnotifications
  );

export const getAppNotifications = (state: AppState) =>
  appNotificationsSelectors.selectAll(state);

export default appNotificationsSlice.reducer;
