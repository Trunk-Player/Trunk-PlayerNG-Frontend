import React from "react";
import { NextIntlClientProvider } from "next-intl";
// @ts-expect-error
import { checkLanguage } from "@/utils/i18nUtils";

import type { Preview } from "@storybook/react";

import "../app/[locale]/globals.css";

const locale = checkLanguage("en");
const messages = require(`../messages/${locale}.json`);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <Story />
      </NextIntlClientProvider>
    ),
  ],
};

export default preview;
