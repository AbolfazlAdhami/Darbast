import React from "react";
import { ImageStyled, ViewStyled } from "./CoreStyled";
import { ImageSourcePropType } from "react-native";

type IconTabBarProps = {
  source: ImageSourcePropType;
  focused: boolean;
};

function IconTabBar({ focused, source }: IconTabBarProps) {
  return (
    <ViewStyled className={`flex flex-row items-center justify-center rounded-full transition-all ease-linear ${focused ? "bg-general-300" : ""}`}>
      <ViewStyled className={`rounded-full w-12 h-12 items-center justify-center transition-all ease-linear ${focused ? "bg-general-400" : ""} `}>
        <ImageStyled className={`transition-all ease-linear duration-150 ${focused ? "w-8 h-8" : "w-6 h-6"}`} tintColor={"#ffff"} resizeMode="contain" source={source} />
      </ViewStyled>
    </ViewStyled>
  );
}

export default IconTabBar;
