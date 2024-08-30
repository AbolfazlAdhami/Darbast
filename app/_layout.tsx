import { I18nManager, Platform } from "react-native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { getLocales } from "expo-localization";
import * as Updates from "expo-updates";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Dellbar: require("@/assets/fonts/Delbar Bold.ttf"),
    NoorBold: require("@/assets/fonts/Kohinoor Arabic Bold.ttf"),
    NoorLight: require("@/assets/fonts/Kohinoor Arabic Light.ttf"),
    Noor: require("@/assets/fonts/Kohinoor Arabic Regular.ttf"),
    NoorSemiBold: require("@/assets/fonts/Kohinoor Arabic Semibold.ttf"),
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });
  const shouldBeRTL = true;

  useEffect(() => {
    if (shouldBeRTL !== I18nManager.isRTL && Platform.OS !== "web") {
      I18nManager.allowRTL(shouldBeRTL);
      I18nManager.forceRTL(shouldBeRTL);
      // Updates.reloadAsync();
    }
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(root)" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
