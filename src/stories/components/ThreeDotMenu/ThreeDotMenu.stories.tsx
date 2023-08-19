import React from "react";
import ThreeDotItemMenu from "./ThreeDotMenu.component";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "MenuWithTag",
  component: ThreeDotItemMenu,
  argTypes: {},
} as ComponentMeta<typeof ThreeDotItemMenu>;

const Template: ComponentStory<typeof ThreeDotItemMenu> = (args) => {
  return <ThreeDotItemMenu {...args} />;
};

export const Simple: ComponentStory<typeof ThreeDotItemMenu> = Template.bind(
  {}
);
Simple.args = {
  menuItems: [
    { id: 1, value: "value", label: "label" },
    { id: 2, value: "value2", label: "label2" },
    { id: 3, value: "value3", label: "label3" },
  ],
  handleItemClick: (item) => console.log(item),
};
