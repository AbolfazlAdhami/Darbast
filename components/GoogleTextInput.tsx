import React from "react";
import { ViewStyled } from "./CoreStyled";
import { GoogleInputProps } from "@/types/type";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GoogleTextInput = ({ icon, initialLocation, containerStyle, handlePress, textInputBackgroundColor }: GoogleInputProps) => {
  const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

  return (
    <ViewStyled className={`flex flex-row items-center justify-center relative z-50 rounded-xl mb-4 ${containerStyle}}`}>
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="کجا دوست داری بری؟"
        debounce={200}
        styles={{
          textInputContainer: { alignItems: "center", justifyContent: "center", borderRadius: 20, marginHorizontal: 20, shadowColor: "#d4d4d4", position: "relative" },
          textInput: { textAlign: "right" },
        }}
        query={{
          key: GOOGLE_API_KEY,
        }}
      />
    </ViewStyled>
  );
};

export default GoogleTextInput;
