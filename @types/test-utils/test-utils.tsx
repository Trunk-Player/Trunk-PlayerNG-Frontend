import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import messages from "@/messages/en.json";

import { NextIntlClientProvider } from "next-intl";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextIntlClientProvider
      locale="en"
      messages={messages}
    >
      {children}
    </NextIntlClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
