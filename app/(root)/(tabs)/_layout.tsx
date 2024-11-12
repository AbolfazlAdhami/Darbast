import React from "react";
import { Stack } from "expo-router";


const Layout = () => {
  return (
    <Stack initialRouteName="" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home"  />
      <Stack.Screen name="chats" />
      <Stack.Screen name="profile" />
    </Stack>
  );
};

export default Layout;
