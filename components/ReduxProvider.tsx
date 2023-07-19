"use client";

import { store } from "@/state/store/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";

type ReduxProviderType = {
  children: ReactNode;
};

function ReduxProvider({ children }: ReduxProviderType) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
