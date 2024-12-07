import { Platform } from "react-native";
import { TextStyled, ViewStyled } from "./CoreStyled";

const CurrentLocation = ({}) => {
  return (
    <ViewStyled>
      <TextStyled className={`text-xl font-noorBold ${Platform.OS == "ios" ? "text-right" : "text-left"}`}>موقعیت شما</TextStyled>
    </ViewStyled>
  );
};

export default CurrentLocation;
