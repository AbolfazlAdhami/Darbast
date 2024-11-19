import { ActivityIndicator, FlatList, Platform } from "react-native";
import { ImageStyled, SafeAreaViewStyled, TextStyled, TouchableBTN, ViewStyled } from "@/components/CoreStyled";
import RideCard from "@/components/RideCard";
import { RecentRides } from "@/data/Rides";
import { useUser, SignedOut } from "@clerk/clerk-expo";
import { styled } from "nativewind";
import { useState } from "react";
import { icons, images } from "@/constant";

const FlatListStyled = styled(FlatList);

const recentRides = RecentRides;
export default function Page() {
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  console.log(user);
  const handlesSingOut = async () => {
    await SignedOut({});
  };
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
          <ViewStyled className="flex flex-row justify-between items-center  my-6">
            <TextStyled className={`${Platform.OS === "android" ? "text-right" : "text-left"} text-lg text-neutral-950 font-noorBold`}>
              خوش اومدی
              {user?.firstName || user?.emailAddresses[0].emailAddress.split("@")[0]}👋
            </TextStyled>
            <TouchableBTN className="w-10 h-10 bg-white rounded-lg" onPress={handlesSingOut}>
              <ImageStyled source={icons.out} className="w-6 h-6" />
            </TouchableBTN>
          </ViewStyled>
        )}
      />
    </SafeAreaViewStyled>
  );
}
