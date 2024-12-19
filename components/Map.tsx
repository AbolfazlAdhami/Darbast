import React from "react";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

import { useLocationStore } from "@/hook/useLocationStore";
import { calculateRegion } from "@/lib/map";

const Map = () => {
  const GOOGLE_MAPS_APIKEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
  const { userLatitude, userLongitude, destinationLatitude, destinationLongitude } = useLocationStore();
  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  return (
    <MapView
      showsUserLocation
      provider={PROVIDER_DEFAULT}
      tintColor="#3498db"
      className="w-full h-full rounded-2xl"
      mapType="mutedStandard"
      showsPointsOfInterest={false}
      userInterfaceStyle="light"
      region={region}
    ></MapView>
  );
};

export default Map;
