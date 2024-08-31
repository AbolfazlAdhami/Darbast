import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";
import { ImageStyled, TextInputStyled, TextStyled, ViewStyled } from "./CoreStyled";
import { InputFieldProps } from "@/types/type";
import { icons } from "@/constant";

const Input = ({ label, labelStyle, icon, iconStyle, className, secureTextEntry = false, containerStyle }: InputFieldProps) => {
  return (
    <KeyboardAvoidingView>
      <TouchableWithoutFeedback>
        <ViewStyled className="my-2 w-full">
          <TextStyled className={`mb-3 pr-4  font-noorSemiBold text-lg ${Platform.OS === "android" ? "text-left" : "text-right"} ${labelStyle}`}>
            {label}
          </TextStyled>
          <ViewStyled
            className={`flex p-3 flex-row
              items-center   bg-neutral-100  border-neutral-100 border focus:border-primary-500 rounded-full`}
          >
            {icon && <ImageStyled source={icon} className={`w-6 h-6 ${iconStyle}`} />}
            <TextInputStyled className="w-10/12 rounded-full font-noorSemiBold text-left" />
          </ViewStyled>
        </ViewStyled>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Input;
