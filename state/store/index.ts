import { store, makeStore } from "./store";
import { ThunkAction, Action } from "@reduxjs/toolkit";

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export { makeStore };
export default store;
