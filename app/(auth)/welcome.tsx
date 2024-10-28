import { SafeAreaViewStyled, TextStyled, ImageStyled, TouchableBTN, ViewStyled } from "@/components/CoreStyled";
import React, { useRef, useState } from "react";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { onboarding } from "@/constant";
import { Platform } from "react-native";
import CustomButton from "@/components/CustomButton";

const OnBoarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const lastSlide = activeIndex === onboarding.length - 1;
  return (
    <SafeAreaViewStyled className={"h-full pb-4 flex items-center justify-between bg-white "}>
      <TouchableBTN className={`w-full p-5 justify-end  flex ${Platform.OS === "android" ? "items-start" : "items-end"}`} onPress={() => router.replace("/(auth)/sign-up")}>
        <TextStyled className="text-sm text-black font-noorSemiBold ">مرحله بعدی</TextStyled>
      </TouchableBTN>
      <Swiper
        ref={swiperRef}
        loop={false}
        activeDot={<ViewStyled className="w-[32px] rounded-full h-[4px] mx-1 bg-blue-500"></ViewStyled>}
        dot={<ViewStyled className="w-[32px] rounded-full h-[4px] mx-1 bg-neutral-300"></ViewStyled>}
        onIndexChanged={(index) => setActiveIndex(index)}
        style={{ flexDirection: Platform.OS == "android" ? "row-reverse" : "row" }}
      >
        {onboarding.map((item) => (
          <ViewStyled className="flex items-center justify-center gap-4 px-4 pt-12" key={item.id}>
            <ImageStyled source={item.image} className="w-full h-[300px] " resizeMode="contain" />
            <TextStyled className=" text-xl mt-10 text-center font-noorBold">{item.title}</TextStyled>
            <TextStyled className="text-center mt-4 text-base font-noor">{item.description}</TextStyled>
          </ViewStyled>
        ))}
      </Swiper>
      <CustomButton title={lastSlide ? "شروع ثبت نام" : "بعدی"} onPress={() => (lastSlide ? router.replace("/(auth)/sign-up") : swiperRef.current?.scrollBy(1))} className={"w-11/12 mt-10"} />
    </SafeAreaViewStyled>
  );
};

export default OnBoarding;
