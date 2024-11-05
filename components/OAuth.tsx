import { ImageStyled, TextStyled, ViewStyled } from "./CoreStyled";
import CustomButton from "./CustomButton";
import { icons } from "@/constant";
import { useOAuth } from "@clerk/clerk-expo";

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleGoogleSingin = async () => {};

  return (
    <ViewStyled>
      <ViewStyled className="flex flex-row  justify-center items-center ">
        <ViewStyled className="flex-1 h-[1px] bg-general-100" />
        <TextStyled className="text-lg mx-5">یا</TextStyled>
        <ViewStyled className="flex-1 h-[1px] bg-general-100" />
      </ViewStyled>
      <CustomButton
        textVariant="primary"
        bgVariant="outline"
        className="w-full my-4 shadow-none border-none"
        IconLeft={() => <ImageStyled resizeMode="contain" source={icons.google} className="w-5 h-5 mx-2" />}
        title="ورود با اکانت گوگل"
        onPress={handleGoogleSingin}
      />
    </ViewStyled>
  );
};
export default OAuth;
