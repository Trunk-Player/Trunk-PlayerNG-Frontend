import { ComponentStory, ComponentMeta } from "@storybook/react";

import SidebarNavigation from "components/navigation/SidebarNavigation";

// Sample Data
import { navigation } from "config/sampleNavigation";

export default {
  title: "Navigation/Sidebar",
  component: SidebarNavigation,
} as ComponentMeta<typeof SidebarNavigation>;

const TemplateLightMode: ComponentStory<typeof SidebarNavigation> = (_args) => (
  <div className="w-full h-screen">
    <div className="w-64">
      <SidebarNavigation items={navigation} />
    </div>
  </div>
);

const TemplateDarkMode: ComponentStory<typeof SidebarNavigation> = (_args) => (
  <div className="dark bg-gray-900 w-full h-screen">
    <div className="w-64">
      <SidebarNavigation items={navigation} />
    </div>
  </div>
);

export const LightMode = TemplateLightMode.bind({});

LightMode.args = {};

export const DarkMode = TemplateDarkMode.bind({});

DarkMode.args = {};
