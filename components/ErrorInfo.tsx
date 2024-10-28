import React from "react";
import { TextStyled, ViewStyled } from "./CoreStyled";
import { FieldError } from "react-hook-form";
import { Platform } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const ErrorInfo = ({ message }: { message?: string }) => {
  return (
    <ViewStyled className={`my-1 p-2 bg-red-600 rounded-full px-6 transition-all ease-linear mx-2 items-center flex-row ${Platform.OS === "android" ? "justify-start flex-row" : " flex-row-reverse"}`}>
      <AntDesign name="infocirlce" size={20} color="white" />
      <TextStyled className="text-white mx-2">{message}</TextStyled>
    </ViewStyled>
  );
};

export default ErrorInfo;
