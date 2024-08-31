import { SafeAreaViewStyled } from "@/components/CoreStyled";
import { Link, Stack } from "expo-router";

export default function NotFoundScreen() {
  return (
    <SafeAreaViewStyled className="text-lg">
      <Stack.Screen options={{ title: "Oops!" }} />
      <Link href={"/(root)"}>Home</Link>
    </SafeAreaViewStyled>
  );
}
