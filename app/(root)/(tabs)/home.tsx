import { SafeAreaViewStyled } from "@/components/CoreStyled";
import RideCard from "@/components/RideCard";
import { RecentRides } from "@/data/Rides";
import { useUser } from "@clerk/clerk-expo";
import { FlatList } from "react-native";

const recentRides = RecentRides;
export default function Page() {
  const { user } = useUser();

  return (
    <SafeAreaViewStyled className="bg-general-500 pb-12 p-2 min-h-screen">
      <FlatList data={recentRides.slice(0, 5)} renderItem={({ item }) => <RideCard ride={item} />} />
    </SafeAreaViewStyled>
  );
}
