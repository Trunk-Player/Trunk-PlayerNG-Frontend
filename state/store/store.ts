import { configureStore } from "@reduxjs/toolkit";

import layoutReducer from "@/state/slices/layoutSlice";
import appNotificationsReducer from "@/state/slices/appNotificationsSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      layout: layoutReducer,
      appnotifications: appNotificationsReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });
}

export const store = makeStore();
