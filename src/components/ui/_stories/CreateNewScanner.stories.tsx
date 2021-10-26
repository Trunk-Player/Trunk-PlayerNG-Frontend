import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import CreateNewScanner from "../CreateNewScanner";

export default {
  title: "Ui/Create New Scanner",
  component: CreateNewScanner,
} as ComponentMeta<typeof CreateNewScanner>;

const TemplateLightMode: ComponentStory<typeof CreateNewScanner> = (_args) => (
  <div className="w-full h-screen flex justify-center items-center">
    <div className="w-4/12">
      <CreateNewScanner />
    </div>
  </div>
);

const TemplateDarkMode: ComponentStory<typeof CreateNewScanner> = (_args) => (
  <div className="dark bg-gray-800 w-full h-screen flex justify-center items-center">
    <div className="w-4/12">
      <CreateNewScanner />
    </div>
  </div>
);

export const LightMode = TemplateLightMode.bind({});

LightMode.args = {};

export const DarkMode = TemplateDarkMode.bind({});

DarkMode.args = {};
