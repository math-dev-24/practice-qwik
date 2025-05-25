import type { Meta, StoryObj } from "storybook-framework-qwik";
import { Button, type ButtonProps } from "./button";

const meta: Meta<ButtonProps> = {
  component: Button,
};

type Story = StoryObj<ButtonProps>;

export default meta;

export const Primary: Story = {
  args: {
    label: "My button",
    size: "medium",
    disabled: false,
    fullWidth: false,
    type: "submit",
  },
  render: (props: any) => <Button {...props}>Some button</Button>,
};

export const Secondary: Story = {
  args: {
    label: "My button",
    size: "medium",
    variant: "secondary",
    disabled: false,
    fullWidth: false,
    type: "submit",
  },
  render: (props: any) => <Button {...props}>Some button</Button>,
};
