import React, { useEffect, useState, Fragment } from "react";
import { ActivityIndicator, FlatList, Platform } from "react-native";
import { ImageStyled, SafeAreaViewStyled, TextStyled, TouchableBTN, ViewStyled } from "@/components/CoreStyled";
import RideCard from "@/components/RideCard";
import { RecentRides } from "@/data/Rides";
import { useUser, SignedOut } from "@clerk/clerk-expo";
import { styled } from "nativewind";
import { icons, images } from "@/constant";
import { GoogleTextInput, CurrentLocation, Map } from "@/components";
import { useLocationStore } from "@/hook/useLocationStore";
import useGetLocation from "@/hook/useGetLocation";

const FlatListStyled = styled(FlatList);

const recentRides = RecentRides;

export default function Page() {
  const { setDestinationLocation } = useLocationStore();
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const { requestLocation } = useGetLocation();
  useEffect(() => {
    requestLocation();
  }, []);
  const handlesSingOut = async () => {
    await SignedOut({});
  };
  const handleDestinationPress = (location: { latitude: number; longitude: number; address: string }) => {};

  return (
    <SafeAreaViewStyled className="bg-general-500  min-h-screen">
      <FlatListStyled
        data={recentRides.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
        className="px-4"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={() => (
          <ViewStyled className="flex flex-col items-center my-12 justify-center">
            {!loading ? (
              <ViewStyled className="flex flex-col gap-y-4 items-center justify-center">
                <ImageStyled className="w-[350px] h-[250px]" source={images.noResult} />
                <TextStyled className="text-2xl font-noor text-neutral-500">سفری پیدا نشد.</TextStyled>
              </ViewStyled>
            ) : (
              <ActivityIndicator color={"#2F855A"} size={"large"} />
            )}
          </ViewStyled>
        )}
        ListHeaderComponent={() => (
          <Fragment>
            <ViewStyled className={`flex ${Platform.OS == "android" ? "flex-row" : "flex-row-reverse"} justify-between items-center  my-6`}>
              <TextStyled className={`${Platform.OS === "android" ? "text-right" : "text-left"} text-lg text-neutral-950 font-noorBold`}>
                خوش اومدی
                {user?.firstName && user?.emailAddresses[0].emailAddress.split("@")[0]}👋
              </TextStyled>
              <TouchableBTN className="w-12 h-12 items-center justify-center bg-white rounded-full" onPress={handlesSingOut}>
                <ImageStyled source={icons.out} className="w-6 h-6" />
              </TouchableBTN>
            </ViewStyled>
            <GoogleTextInput handlePress={handleDestinationPress} icon={icons.search} containerStyle="bg-white shadow-md shadow-neutral-300 " />
            <CurrentLocation />
            <ViewStyled className="flex flex-row items-center bg-tra h-[300px]">
              <Map />
            </ViewStyled>
            <TextStyled className={`text-lg  font-noorBold mt-5 mb-3 ${Platform.OS === "android" ? "text-left" : " text-right"}`}>ماشین های موجود</TextStyled>
          </Fragment>
        )}
      />
    </SafeAreaViewStyled>
  );
}
