import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Grid from "./Grid.component";

export default {
  title: "Utility/Grid",
  component: Grid,
} as ComponentMeta<typeof Grid>;

const Template: ComponentStory<typeof Grid> = (args) => <Grid {...args} />;

export const Grids: ComponentStory<typeof Grid> = Template.bind({});
Grids.args = {
  children: (
    <>
      <div style={{ backgroundColor: "lightgray" }}>sample div</div>
      <div style={{ backgroundColor: "lightgray" }}>sample div</div>
      <div style={{ backgroundColor: "lightgray" }}>sample div</div>
      <div style={{ backgroundColor: "lightgray" }}>sample div</div>
      <div style={{ backgroundColor: "lightgray" }}>sample div</div>
    </>
  ),
  col: 2,
};
