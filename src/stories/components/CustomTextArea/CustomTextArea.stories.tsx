import { ComponentMeta, ComponentStory } from "@storybook/react";
import Grid from "../Grid";
import CustomTextArea from "./CustomTextArea.component";

export default {
  title: "Textarea",
  component: CustomTextArea,
  argTypes: {},
} as ComponentMeta<typeof CustomTextArea>;

const Template: ComponentStory<typeof CustomTextArea> = (args) => {
  return (
    <Grid>
      <CustomTextArea id={""} placeholder={"Write Something..."} {...args} />
      <CustomTextArea
        id={""}
        required={true}
        placeholder={"Required Custom Text Area"}
        helperText={"This field is required."}
        error={true}
        {...args}
      />
      <CustomTextArea
        id={""}
        placeholder={"Required Custom Text Area"}
        helperText={"Helper Text"}
        error={false}
        {...args}
      />
      <CustomTextArea
        id={""}
        disabled={true}
        placeholder={"Disabled Custom Text Area"}
        {...args}
      />
    </Grid>
  );
};

export const CustomTextAreas = Template.bind({});
