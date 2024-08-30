import { SafeAreaViewStyled, TextStyled } from "@/components/CoreStyled";
import React from "react";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

const OnBoarding = () => {
  return (
    <SafeAreaViewStyled className={"h-full flex items-center justify-between bg-white "}>
      <TouchableOpacity className="w-full p-5 justify-end items-end flex" onPress={() => router.replace("/(auth)/sign-in")}>
        <TextStyled className="text-sm text-black font-noorSemiBold ">مرحله بعدی</TextStyled>
      </TouchableOpacity>
    </SafeAreaViewStyled>
  );
};

export default OnBoarding;
