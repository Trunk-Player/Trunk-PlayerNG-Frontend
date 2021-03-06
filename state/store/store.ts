import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "state/slices/authenticationSlice";
import layoutReducer from "state/slices/layoutSlice";
import userReducer from "state/slices/userSlice";
import appNotificationsReducer from "state/slices/appNotificationsSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      authentication: authenticationReducer,
      layout: layoutReducer,
      user: userReducer,
      appnotifications: appNotificationsReducer,
    },
  });
}

export const store = makeStore();
