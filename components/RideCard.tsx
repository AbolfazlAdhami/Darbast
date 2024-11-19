import { Platform, StyleSheet, Text, View } from "react-native";
import { Ride } from "@/types/type";
import { ImageStyled, TextStyled, ViewStyled } from "./CoreStyled";
import { icons } from "@/constant";
import { formatDate, formatTime } from "@/lib/utils";

export default function RideCard({ ride: { driver, payment_status, created_at, destination_address, destination_latitude, destination_longitude, ride_time, origin_address } }: { ride: Ride }) {
  return (
    <ViewStyled className={`flex  ${Platform.OS === "android" ? "flex-row" : "flex-row-reverse"} items-center justify-between p-1 bg-white shadow-sm shadow-neutral-300 mb-3 rounded-lg`}>
      <ViewStyled className="p-3 flex flex-col items-center justify-center">
        <ViewStyled className={`flex ${Platform.OS === "android" ? "flex-row" : "flex-row-reverse"} flex-row items-center justify-between`}>
          <ImageStyled
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=c105b2cb5d614c16bb8ec5dbd61decf5`,
            }}
            className="w-[120px] rounded-lg  h-[90px]"
          />
          <ViewStyled className="flex flex-col mx-2 gap-y-5 flex-1">
            <ViewStyled className="flex flex-row items-center gap-x-2">
              <ImageStyled source={icons.to} className="w-5 h-5" />
              <TextStyled className="text-sm " numberOfLines={1}>
                {origin_address}
              </TextStyled>
            </ViewStyled>
            <ViewStyled className="flex flex-row  items-center gap-x-2 ">
              <ImageStyled source={icons.point} className="w-5 h-5" />
              <TextStyled numberOfLines={1} className="text-sm">
                {destination_address}
              </TextStyled>
            </ViewStyled>
          </ViewStyled>
        </ViewStyled>
        <ViewStyled className="flex flex-col bg-general-500 w-full mt-5  rounded-lg p-2 items-center justify-center">
          <ViewStyled className="flex flex-row items-center justify-between w-full mb-5">
            <TextStyled className="text-sm font-noor text-gray-500">ساعت و تاریخ</TextStyled>
            <TextStyled className="text-xs font-noorLight">{formatDate(created_at)}</TextStyled>
          </ViewStyled>
          <ViewStyled className="flex flex-row items-center justify-between w-full mb-5">
            <TextStyled className="text-sm font-noor text-gray-500">زمان سفر</TextStyled>
            <TextStyled className="text-xs font-noorLight">{formatTime(ride_time)}</TextStyled>
          </ViewStyled>
          <ViewStyled className="flex flex-row items-center justify-between w-full mb-5">
            <TextStyled className="text-sm font-noor text-gray-500">راننده</TextStyled>
            <TextStyled className="text-xs font-noorLight ">
              {driver.first_name} {driver.last_name}
            </TextStyled>
          </ViewStyled>
          <ViewStyled className="flex flex-row items-center justify-between w-full mb-5">
            <TextStyled className="text-sm font-noor text-gray-500">تعداد صندلی</TextStyled>
            <TextStyled className="text-xs font-noorLight">{driver.car_seats}</TextStyled>
          </ViewStyled>
          <ViewStyled className="flex flex-row items-center justify-between w-full ">
            <TextStyled className="text-sm font-noor text-gray-500">وضعیت پرداخت</TextStyled>
            <TextStyled className={`text-sm font-noorBold capitalize  ${payment_status === "پرداخت شده" ? "text-green-500" : "text-red-500"}`}>{payment_status}</TextStyled>
          </ViewStyled>
        </ViewStyled>
      </ViewStyled>
    </ViewStyled>
  );
}
