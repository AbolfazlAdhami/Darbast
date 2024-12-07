import React from "react";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import { ViewStyled } from "./CoreStyled";

const Map = () => {
  const GOOGLE_MAPS_APIKEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
  // console.log(GOOGLE_MAPS_APIKEY);
  const region = {};

  return (
    <MapView
      showsUserLocation
      provider={PROVIDER_DEFAULT}
      tintColor="#3498db"
      className="w-full h-full rounded-2xl"
      mapType="mutedStandard"
      showsPointsOfInterest={false}
      userInterfaceStyle="light"
    ></MapView>
  );
};

export default Map;
