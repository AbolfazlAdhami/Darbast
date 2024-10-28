import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";
import { ImageStyled, TextInputStyled, TextStyled, ViewStyled, PressableStyled } from "./CoreStyled";
import { InputFieldProps } from "@/types/type";
import { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const InputField = ({ label, labelStyle, icon, iconStyle, className, secureTextEntry = false, containerStyle, ...props }: InputFieldProps) => {
  const [hidden, setHidden] = useState<boolean>(secureTextEntry);

  return (
    <KeyboardAvoidingView behavior={"height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ViewStyled className="my-2 w-full">
          <TextStyled className={`mb-3 pr-4  font-noorSemiBold text-lg ${Platform.OS === "android" ? "text-left" : "text-right"} ${labelStyle}`}>{label}</TextStyled>
          <ViewStyled
            className={`flex p-3 ${Platform.OS === "android" ? "flex-row" : "flex-row-reverse"}
              items-center relative   bg-neutral-100  border-neutral-100 border transition-all ease-linear focus:border-primary-500 rounded-full`}
          >
            {icon && <ImageStyled source={icon} className={`w-6 h-6 ${Platform.OS == "android" ? "ml-2" : "mr-2"} ${iconStyle}`} />}
            <TextInputStyled secureTextEntry={hidden} className="w-10/12 rounded-full font-noorSemiBold  text-left" value={props.value} {...props} />
            {secureTextEntry && (
              <PressableStyled className="mx-1" onPress={() => setHidden(!hidden)}>
                {hidden ? <MaterialIcons name="visibility" size={20} color="black" /> : <MaterialIcons name="visibility-off" size={20} color="black" />}
              </PressableStyled>
            )}
          </ViewStyled>
        </ViewStyled>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
