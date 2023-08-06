import { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Button from "../Button";
import CustomDialog from "./Dialog.component";

export default {
  title: "CustomDialog",
  component: CustomDialog,
  argTypes: {},
} as ComponentMeta<typeof CustomDialog>;

const Template: ComponentStory<typeof CustomDialog> = (args) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    setOpen(false);
  };

  return (
    <>
      <Button size="mini" variant="outlined" onClick={handleClickOpen}>
        Open
      </Button>
      <CustomDialog
        isOpen={open}
        header={"Assign Task"}
        sideHeader={"Raven Richard"}
        content={<div>This is Content Area</div>}
        fullScreen={false}
        isShowCloseIcon={false}
        onClose={handleClose}
        onSubmit={onSubmit}
        submitButtonText={"Assign Task"}
        onCancel={handleClose}
        cancelButtonText={"Cancel"}
        scroll="paper"
        maxHeight="500px"
      />
    </>
  );
};

export const Dialog = Template.bind({});
