import { Link, Stack } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";

export default function NotFoundScreen() {
  return (
    <SafeAreaView classname="">
      <Stack.Screen options={{ title: "Oops!" }} />
    </SafeAreaView>
  );
}
