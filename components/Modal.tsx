import React from "react";
import { ReactNativeModal } from "react-native-modal";

function Modal({ isVisible, children, ...props }: any) {
  return (
    <ReactNativeModal isVisible={isVisible} {...props}>
      {children}
    </ReactNativeModal>
  );
}

export default Modal;
