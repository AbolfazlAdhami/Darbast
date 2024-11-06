import React from "react";
import { ReactNativeModal } from "react-native-modal";
import { OtpModalProps } from "@/types/type";
import { TextInputStyled, TextStyled, ViewStyled } from "./CoreStyled";
import { icons } from "@/constant";
import CustomButton from "./CustomButton";
import InputField from "./InputField";
import ErrorInfo from "./ErrorInfo";

function OtpModal({ isVisible, code, onChangText, error, onPress }: OtpModalProps) {
  return (
    <ReactNativeModal isVisible={isVisible}>
      <ViewStyled className="bg-white px-6 py-8 rounded-2xl min-h-[300px]">
        <TextStyled className="text-2xl text-center  font-noorSemiBold">تایید ایمیل کاربری</TextStyled>
        <TextStyled className="text-base font-noor text-center text-gray-400">کد تایید به ایمیل شما ارسال شد</TextStyled>
        <InputField label="کد تایید" icon={icons.lock} value={code} placeholder="12345" keyboardType="numeric" onChangeText={(value: string) => onChangText(value)} />
        <ErrorInfo message={error} />
        <CustomButton title="تایید کد" onPress={onPress} />
      </ViewStyled>
    </ReactNativeModal>
  );
}

export default OtpModal;
