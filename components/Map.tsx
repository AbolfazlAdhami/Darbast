import React, { useState, useEffect } from "react";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { Drivers } from "@/data/Drivers";
import { generateMarkersFromData, calculateRegion } from "@/lib/map";
import { MarkerData } from "@/types/type";
import { useLocationStore } from "@/hook/useLocationStore";
import { useDriverStore } from "@/hook/useDriverStore";
import { icons } from "@/constant";

const Map = () => {
  const GOOGLE_MAPS_APIKEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
  const { userLatitude, userLongitude, destinationLatitude, destinationLongitude } = useLocationStore();
  const { selectedDriver, setSelectedDriver } = useDriverStore();
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });
  useEffect(() => {
    if (Array.isArray(Drivers)) {
      if (!userLatitude || !userLongitude) return;
      const newMarksData = generateMarkersFromData({ data: Drivers, userLatitude, userLongitude });
      setMarkers(newMarksData);
    }
  }, [Drivers]);

  return (
    <MapView
      showsUserLocation
      provider={PROVIDER_DEFAULT}
      tintColor="#3498db"
      style={{ width: "100%", height: "100%", borderRadius: 16 }}
      mapType="mutedStandard"
      showsPointsOfInterest={false}
      userInterfaceStyle="light"
      region={region}
    >
      {markers.map((marker) => (
        <Marker
          coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
          image={selectedDriver === marker.id ? icons.selectedMarker : icons.marker}
          key={marker.id}
          title={marker.title}
          // onPress={() => setSelectedDriver(marker.id)}
        />
      ))}
    </MapView>
  );
};

export default Map;
