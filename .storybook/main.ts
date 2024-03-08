import path from "path";

import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  async webpackFinal(config, { configType }) {
    if (config?.resolve?.alias) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@/components": path.resolve(__dirname, "../components"),
        "@/config": path.resolve(__dirname, "../config"),
        "@/lib": path.resolve(__dirname, "../lib"),
        "@/messages": path.resolve(__dirname, "../messages"),
        "@/utils": path.resolve(__dirname, "../utils"),
      };
    }
    return config;
  },
};
export default config;
