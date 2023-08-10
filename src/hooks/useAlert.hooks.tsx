import React from "react";
import {
  toast,
  ToastPosition,
  ToastBody,
  Slide,
} from "../stories/components/Alert/Alert.component";
import { ToastContentProps } from "react-toastify";

const useAlert = (
  type: "info" | "error" | "success" | "warning" = "info",
  message = "Something happened",
  position: ToastPosition = "top-right",
  autoClose: number | false = 5000
) => {
  toast.dismiss();
  if (message !== "Something happened") {
    toast(
      (props: ToastContentProps) => <ToastBody {...props} message={message} />,
      {
        type,
        autoClose: autoClose,
        position,
        className: "Toastify__toast-main",
        closeButton: true,
        hideProgressBar: false,
        transition: Slide,
        draggable: true,
      }
    );
  }
};

export default useAlert;
