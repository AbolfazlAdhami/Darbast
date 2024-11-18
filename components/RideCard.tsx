import { Platform, StyleSheet, Text, View } from "react-native";
import { Ride } from "@/types/type";
import { ImageStyled, TextStyled, ViewStyled } from "./CoreStyled";

export default function RideCard({ ride: { driver, payment_status, created_at, destination_address, destination_latitude, destination_longitude, ride_time, origin_address } }: { ride: Ride }) {
  const mapApiKey = process.env.MAP_API_KEY;
  console.log(mapApiKey, "map api key 2");
  return (
    <ViewStyled className={`flex  ${Platform.OS === "android" ? "flex-row" : "flex-row-reverse"} items-center justify-between p-1 bg-white shadow-sm shadow-neutral-300 mb-3 rounded-lg`}>
      <ViewStyled className="p-3 flex flex-row items-center justify-between">
        <ViewStyled className="flex flex-row items-center justify-between">
          <ImageStyled
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=c105b2cb5d614c16bb8ec5dbd61decf5`,
            }}
            className="w-[80px] rounded-lg  h-[90px]"
          />
        </ViewStyled>
      </ViewStyled>
      <TextStyled className="text-lg">{driver.first_name}</TextStyled>
    </ViewStyled>
  );
}
