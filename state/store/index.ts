import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import layoutReducer from "state/slices/layoutSlice";
import userReducer from "state/slices/userSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      layout: layoutReducer,
      user: userReducer,
    },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export type StoreType = typeof store;

export default store;
