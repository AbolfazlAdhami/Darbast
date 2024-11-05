import React from "react";
import { ReactNativeModal } from "react-native-modal";
import { ModalVerificationPropsType } from "@/types/type";
import { ImageStyled, TextStyled, ViewStyled } from "./CoreStyled";
import { images } from "@/constant";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

function ModalVerification({ isVisible }: ModalVerificationPropsType) {
  return (
    <ReactNativeModal isVisible={isVisible}>
      <ViewStyled className="bg-white px-6 py-8 rounded-2xl min-h-[300px]">
        <ImageStyled source={images.check} resizeMode="contain" className="w-[110px] h-[110px] mx-auto my-4" />
        <TextStyled className="text-2xl text-center  font-noorSemiBold">تایید شد!</TextStyled>
        <TextStyled className="text-base font-noor text-center text-gray-400">شما با موفقیت حساب خود را تأیید کردید.</TextStyled>
        <CustomButton title="صفحه اصلی" className="mt-4" onPress={() => router.replace("/(root)/home")} />
      </ViewStyled>
    </ReactNativeModal>
  );
}

export default ModalVerification;
