import React from "react";
import { ImageStyled, TextStyled, ViewStyled } from "./CoreStyled";
import { images } from "@/constant";
import { Platform } from "react-native";

function TopHeaderAuthPages({ title }: { title: string }) {
  return (
    <ViewStyled className="flex-1 relative w-full h-[200px]">
      <ImageStyled className="z-0 w-full h-[200px]" source={images.signUpCar} />
      <TextStyled className={`absolute ${Platform.OS === "android" ? "left-5" : "right-5 "} bottom-5 text-black font-noorSemiBold text-3xl`}>{title}</TextStyled>
    </ViewStyled>
  );
}

export default TopHeaderAuthPages;
