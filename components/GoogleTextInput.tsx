import React from "react";
import { ImageStyled, ViewStyled } from "./CoreStyled";
import { GoogleInputProps } from "@/types/type";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { icons } from "@/constant";

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
          textInput: { textAlign: "right", width: "100%", marginTop: 5, borderRadius: 200, fontWeight: 600, backgroundColor: textInputBackgroundColor ?? "white" },
          listView: { backgroundColor: textInputBackgroundColor ?? "white", position: "relative", top: 0, width: "100%", borderRadius: 10, shadowColor: "#d4d4d4", zIndex: 99 },
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: "fa",
        }}
        renderLeftButton={() => (
          <ViewStyled className="justify-center items-center w-6 h-6">
            <ImageStyled className="w-6 h-6" resizeMode="contain" source={icon ?? icons.search} />
          </ViewStyled>
        )}
        onPress={(data, details = null) => {
          handlePress({
            latitude: details?.geometry.location.lat!,
            longitude: details?.geometry?.location.lng!,
            address: data?.description,
          });
        }}
        textInputProps={{
          placeholderTextColor: "gray",
          placeholder: initialLocation ?? "کجا دوست داری بری؟",
        }}
      />
    </ViewStyled>
  );
};

export default GoogleTextInput;
