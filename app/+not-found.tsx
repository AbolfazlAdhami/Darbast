import { Link, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotFoundScreen() {
  return (
    <SafeAreaView classname="text-lg">
      <Stack.Screen options={{ title: "Oops!" }} />
      <Link href={"/(root)"}>Home</Link>
    </SafeAreaView>
  );
}
