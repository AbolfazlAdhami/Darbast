import { useState } from "react";
import { useLocationStore } from "./useLocationStore";
import * as Location from "expo-location";

const useGetLocation = () => {
  const { setUserLocation } = useLocationStore();
  const [hasPermissions, setHasPermission] = useState<boolean>(false);

  const requestLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setHasPermission(false);
      return;
    }
    setHasPermission(true);
    const location = await Location.getCurrentPositionAsync();
    const address = await Location.reverseGeocodeAsync({
      latitude: location.coords?.latitude,
      longitude: location.coords?.longitude,
    });
    setUserLocation({ latitude: location.coords.latitude, longitude: location.coords?.longitude, address: `${address[0].name} ${address[0].region}` });
  };

  return { requestLocation, hasPermissions };
};

export default useGetLocation;
