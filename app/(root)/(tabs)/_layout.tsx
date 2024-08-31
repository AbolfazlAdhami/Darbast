import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="chats" />
      <Stack.Screen name="home" />
      <Stack.Screen name="profile" />
    </Stack>
  );
};

export default Layout;
