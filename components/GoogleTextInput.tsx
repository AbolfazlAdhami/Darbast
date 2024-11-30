import React from "react";
import { ViewStyled, TextStyled } from "./CoreStyled";
import { GoogleInputProps } from "@/types/type";

const GoogleTextInput = ({ icon, initialLocation, containerStyle, handlePress, textInputBackgroundColor }: GoogleInputProps) => {
  return (
    <ViewStyled className={`flex flex-row items-center justify-center relative z-50 rounded-xl mb-4 ${containerStyle}}`}>
      <TextStyled>GoogleInput</TextStyled>
    </ViewStyled>
  );
};

export default GoogleTextInput;
