import React,{ MouseEventHandler } from "react";
import { IconButton } from "@mui/material";
import Icons from "@miw/Icons";
import Button from "../Button";
import {
  StyledDialog,
  StyledDialogActions,
  StyledDialogBody,
  StyledDialogTitle,
} from "./Dialog.styled";

type CustomDialogProps = {
  isOpen: boolean;
  header: string;
  sideHeader?: string;
  content: JSX.Element;
  fullScreen?: boolean;
  isShowCloseIcon?: boolean;
  onClose?: MouseEventHandler;
  onSubmit?: MouseEventHandler;
  isSubmitLoading?: boolean;
  disableSubmit?: boolean;
  onCancel?: MouseEventHandler;
  submitButtonText?: string;
  cancelButtonText?: string;
  scroll?: "body" | "paper";
  maxHeight?: string;
  minHeight?: string;
  showHeader?: boolean;
  showFooter?: boolean;
};

const CustomDialog = ({
  isOpen,
  header,
  sideHeader,
  content,
  fullScreen,
  isShowCloseIcon,
  onClose,
  onSubmit,
  onCancel,
  submitButtonText,
  isSubmitLoading,
  disableSubmit,
  cancelButtonText,
  scroll = "paper",
  maxHeight,
  minHeight,
  showHeader = true,
  showFooter = true,
}: CustomDialogProps) => {
  return (
    <StyledDialog
      open={isOpen}
      fullScreen={fullScreen}
      scroll={scroll}
      onClose={onClose}
      max_height={maxHeight}
      min_height={minHeight}
    >
      {showHeader && (
        <StyledDialogTitle>
          <div>
            {header}
            {sideHeader !== null &&
              sideHeader !== "" &&
              sideHeader !== undefined && (
                <span className={"sideHeader"}>{sideHeader}</span>
              )}
          </div>
          {isShowCloseIcon ? (
            <IconButton aria-label="close" onClick={onClose}>
              <Icons.CloseIcon />
            </IconButton>
          ) : null}
        </StyledDialogTitle>
      )}
      <StyledDialogBody is_header={showHeader} is_footer={showFooter}>
        {content}
      </StyledDialogBody>
      {showFooter && (
        <StyledDialogActions>
          {cancelButtonText ? (
            <Button
              onClick={onCancel}
              size={"compact"}
              type={"reset"}
              variant={"outlined"}
              disabled={isSubmitLoading}
            >
              {cancelButtonText}
            </Button>
          ) : null}
          {submitButtonText && (
            <Button
              onClick={onSubmit}
              disabled={disableSubmit}
              isLoading={isSubmitLoading}
              size={"compact"}
              type={"submit"}
              variant={"outlined"}
            >
              {submitButtonText}
            </Button>
          )}
        </StyledDialogActions>
      )}
    </StyledDialog>
  );
};

CustomDialog.defaultProps = {
  header: "Header",
  sideHeader: "",
  content: <div>Content</div>,
  fullScreen: false,
  isShowCloseIcon: false,
  onClose: () => {},
  onSubmit: () => {},
  onCancel: () => {},
  submitButtonText: "Save",
  scroll: "paper",
  maxHeight: "58rem",
  minHeight: "0px",
};

export default CustomDialog;
