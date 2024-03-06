/* eslint-disable react/jsx-no-literals */
import { Button } from "@/components/ui/button";

import {
  ChevronRightIcon,
  EnvelopeOpenIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";

import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Ui/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: "default",
    children: "Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Button",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Button",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Button",
  },
};

export const Icon: Story = {
  args: {
    variant: "default",
    children: <ChevronRightIcon className="w-4 h-4" />,
  },
};

export const WithIcon: Story = {
  args: {
    variant: "default",
    children: (
      <>
        <EnvelopeOpenIcon className="mr-2 h-4 w-4" />
        Email
      </>
    ),
  },
};

export const Loading: Story = {
  args: {
    variant: "default",
    disabled: true,
    children: (
      <>
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        Please wait...
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    variant: "default",
    children: "Button",
    disabled: true,
  },
};
