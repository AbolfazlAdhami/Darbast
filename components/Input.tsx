import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";
import { ImageStyled, TextInputStyled, TextStyled, ViewStyled } from "./CoreStyled";
import { InputFieldProps } from "@/types/type";
import { useState } from "react";

const Input = ({ label, labelStyle, icon, iconStyle, className, secureTextEntry = false, containerStyle, ...props }: InputFieldProps) => {
  const [hidden, setHidden] = useState<boolean>(true);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ViewStyled className="my-2 w-full">
          <TextStyled className={`mb-3 pr-4  font-noorSemiBold text-lg ${Platform.OS === "android" ? "text-left" : "text-right"} ${labelStyle}`}>{label}</TextStyled>
          <ViewStyled
            className={`flex p-3 ${Platform.OS === "android" ? "flex-row-reverse" : "flex-row"}
              items-center   bg-neutral-100  border-neutral-100 border transition-all ease-linear focus:border-primary-500 rounded-full`}
          >
            {icon && <ImageStyled source={icon} className={`w-6 h-6 ${Platform.OS == "android" ? "ml-2" : "mr-2"} ${iconStyle}`} />}
            <TextInputStyled className="w-10/12 rounded-full font-noorSemiBold text-left" {...props} />
          </ViewStyled>
        </ViewStyled>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Input;
